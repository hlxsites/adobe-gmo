import { getBearerToken } from './security.js';
import {
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
} from './polaris.js';
import { getPathParams, logError } from './scripts.js';
import { emitEvent, EventNames } from './events.js';

export function getCollectionIdFromURL() {
  /* Todo remove this comment
  if (window.location.pathname.startsWith('/collection/')) {
    return getPathParams().at(-1);
  }
  */
  if (window.location.pathname.includes('/collection/')) {
    return getPathParams().at(-1);
  }
  return undefined;
}
export function getCollectionID(item) {
  return item.id;
}

export function getCollectionTitle(item) {
  return item.title;
}

export function getCollectionDescription(item) {
  return item.description;
}

export function getAssetIdFromCollectionItem(assetItem) {
  return assetItem.id;
}

/* Todo delete this function when code is complete */
async function getRequestHeadersOriginal() {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
  };
}



async function getRequestHeaders() {
  const token = await getBearerToken();
  /*Todo delete logging token*/ console.log('AuthToken ',token);

  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    'Authorization': token,
    'x-ch-request': 'collection',
    'X-Adobe-Accept-Experimental': '1',
  };
}

/* Todo delete this function when code is complete */
async function getRequestHeadersWithIfMatch(etag) {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
    'If-Match': etag,
  };
}

async function getRequestHeadersWithIfMatchPatchJSON(etag) {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json-patch+json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
    'If-Match': etag,
  };
}


/**
 * Constructs and returns the base URL for collections.
 *
 * @returns {string} The base collections URL.
 */
export function getBaseCollectionsUrl() {
  return `${getDeliveryEnvironment()}/adobe/collections`;
}


/**
 * Constructs and returns the base URL for assets collections. (New)
 *
 * @returns {string} The base collections URL.
 */
export function getBaseAssetsCollectionsUrl() {
  return `${getDeliveryEnvironment()}/adobe/assets/collections`;
}




/**
 * Todo Delete this function after code is complete
 * Retrieves a collection by its unique identifier.
 *
 * @param {string} collectionId - The unique identifier of the collection to retrieve.
 * @returns {Promise<object>} A promise that resolves with the retrieved collection.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function getCollectionOld(collectionId) {
  try {
    const options = {
      method: 'GET',
      headers: await getRequestHeaders(),
    };

    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();
      responseBody.etag = response.headers.get('If-none-match');
      return responseBody;
    } if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to get collection (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to retrieve collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('getCollection', error);
    throw error;
  }
}

/**
 * Retrieves a collection by its unique identifier.
 *
 * @param {string} collectionId - The unique identifier of the collection to retrieve.
 * @returns {Promise<object>} A promise that resolves with the retrieved collection.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function getCollection(collectionId) {
  try {

    const options = {
      method: 'GET',
      headers: await getRequestHeaders(),
    };

  //Todo delete logging
  console.log("Options");
  console.log(options);

    //const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    const collectionId2='urn:cid:aem:6156b683-27ba-4e70-82b4-fe97eb38ac19';

    const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId2}/items`, options);

    //const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId}/items`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully

    const responseBody = await response.json();
     //responseBody.etag = response.headers.get('If-none-match');//Old getCollection
    responseBody.etag = response.headers.get('Etag');


//Todo Delete Debug Code
    // Access the response headers
    const headers = response.headers;
    console.log("Show Response Headers")
    // Loop through and log all headers
    headers.forEach((value, name) => {
      console.log(`${name}: ${value}`);
    });
//Todo Delete Debug Code

      return responseBody;
    } if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to get collection (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to retrieve collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('getCollection', error);
    throw error;
  }
}

/**
 * Todo Delete this function after code is complete
 * Creates a new collection. (Old/Deprecated)
 *
 * @param {string} title - The title of the new collection.
 * @param {string} description - The description of the new collection (optional).
 * @param {Array<object>} items - An array of items to include in the collection (optional).
 * @param {object} collectionDetails - From the collection modal to be used by emitEvent
 * @returns {Promise<object>} A promise that resolves with the created collection.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function createCollectionOld(title, description, items) {
  try {
    const options = {
      method: 'POST',
      headers: await getRequestHeaders(),
      body: JSON.stringify({ title, description, items }),
    };

    const response = await fetch(`${getBaseCollectionsUrl()}`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection created successfully
      const responseBody = await response.json();

      const assetsArray = items.map((obj) => ({ assetId: obj.id, assetName: obj.name }));

      const collectionDetails = {
        collectionName: title,
        collectionId: responseBody.id,
        assets: assetsArray,
      };
      // Emit create creation event
      emitEvent(document.documentElement, EventNames.CREATE_COLLECTION, collectionDetails);

      return responseBody;
    } if (response.status === 400) {
      // Handle 400 error
      const errorResponse = await response.json();
      throw new Error(`Failed to create collection (400): ${errorResponse.detail}`);
    } else if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to create collection (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to create collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('createCollection', error);
    throw error;
  }
}


/**
 * Creates a new collection.
 *
 * @param {string} title - The title of the new collection.
 * @param {string} description - The description of the new collection (optional).
 * @param {Array<object>} items - An array of items to include in the collection (optional).
 * @param {object} collectionDetails - From the collection modal to be used by emitEvent
 * @returns {Promise<object>} A promise that resolves with the created collection.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function createCollection(title, description, items) {
  try {
    const options = {
      method: 'POST',
      headers: await getRequestHeaders(),
      body: JSON.stringify({ title, description, items }),
    };
debugger;
    const response = await fetch(`${getBaseAssetsCollectionsUrl()}`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection created successfully
      const responseBody = await response.json();

      const assetsArray = items.map((obj) => ({ assetId: obj.id, assetName: obj.name }));

      const collectionDetails = {
        collectionName: title,
        collectionId: responseBody.id,
        assets: assetsArray,
      };
      // Emit create creation event
      emitEvent(document.documentElement, EventNames.CREATE_COLLECTION, collectionDetails);

      return responseBody;
    } if (response.status === 400) {
      // Handle 400 error
      const errorResponse = await response.json();
      throw new Error(`Failed to create collection (400): ${errorResponse.detail}`);
    } else if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to create collection (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to create collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('createCollection', error);
    throw error;
  }
}

/**
 * Lists collections with optional limit and cursor parameters.
 *
 * @param {number} - The optional maximum number of collections to retrieve.
 * @param {string} - The optional cursor for paginating the results.
 * @returns {Promise<object>} A promise that resolves with a list of collections.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function listCollection(limit = undefined, cursor = '') {
  // Construct the query parameters
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append('limit', limit);
  }

  if (cursor) {
    queryParams.append('cursor', cursor);
  }

/*
  const options = {
    method: 'GET',
    headers: await getRequestHeaders(),
  };
*/

  const options = {
    method: 'GET',
    headers: await getRequestHeadersOriginal(),
  };
  // Include the query parameters in the URL
  const queryString = queryParams.toString();
  const url = `${getBaseCollectionsUrl()}${queryString ? `?${queryString}` : ''}`;

  //New List Collection is not working yet
  //const url = `${getBaseAssetsCollectionsUrl()}${queryString ? `?${queryString}` : ''}`;

  console.log('options');
  console.log(options);

  console.log('url');
  console.log(url);

  debugger;

  try {
    const response = await fetch(url, options);
    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();
      return responseBody;
    }
    // Handle other response codes
    throw new Error(`Failed to list collection: ${response.status} ${response.statusText}`);
  } catch (error) {
    logError('listCollection', error);
    throw error;
  }
}


/**
 * Todo Delete this function after code is complete
 * Updates a collection using JSON patch operations.
 *
 * @param {string} collectionId - The unique identifier of the collection to patch.
 * @param {string} etag - The entity tag (ETag) value to use for conditional requests.
 * @param {object} addOperation - The JSON patch operation to add an item to the collection (optional).
 * @param {object} deleteOperation - The JSON patch operation to remove an item from the collection (optional).
* @returns {Promise<void>} A promise that resolves when the collection is updated.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function patchCollectionOld(collectionId, etag, addOperation = '', deleteOperation = '') {
  try {
    const patchOperations = [];
    if (addOperation) {
      for (const op of addOperation) {
        op.op = 'add';
        patchOperations.push(op);
      }
    }
    if (deleteOperation) {
      for (const op of deleteOperation) {
        op.op = 'remove';
        patchOperations.push(op);
      }
    }
    const options = {
      method: 'PATCH',
      headers: await getRequestHeadersWithIfMatch(etag),
      body: JSON.stringify(patchOperations),
    };
    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    if (response.status === 200) {
      const responseBody = await response.json();

      if (addOperation) {
        const assetsArray = addOperation.map((obj) => ({ assetId: obj.value.id, assetName: obj.value.name }));
        const collectionDetails = {
          collectionName: responseBody.title,
          collectionId: responseBody.id,
          assets: assetsArray,
        };
        emitEvent(document.documentElement, EventNames.ADD_TO_COLLECTION, collectionDetails);
      } else if (deleteOperation) {
        const assetsArray = deleteOperation.map((obj) => ({ assetId: obj.value.id, assetName: obj.value.name }));
        const collectionDetails = {
          collectionName: responseBody.title,
          collectionId: responseBody.id,
          assets: assetsArray,
        };
        emitEvent(document.documentElement, EventNames.DELETE_FROM_COLLECTION, collectionDetails);
      }

      return responseBody;
    } if (response.status === 400) {
      // Handle 400 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (400): ${errorResponse.detail}`);
    } else if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (404): ${errorResponse.detail}`);
    } else if (response.status === 412) {
      // Handle 412 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (412): ${errorResponse.detail}`);
    } else {
      throw new Error(`Failed to update collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    logError('patchCollection', error);
    throw error;
  }
}


/**
 * Updates a collection using JSON patch operations.
 *
 * @param {string} collectionId - The unique identifier of the collection to patch.
 * @param {string} etag - The entity tag (ETag) value to use for conditional requests.
 * @param {object} addOperation - The JSON patch operation to add an item to the collection (optional).
 * @param {object} deleteOperation - The JSON patch operation to remove an item from the collection (optional).
* @returns {Promise<void>} A promise that resolves when the collection is updated.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function patchCollection(collectionId, etag, addOperation = '', deleteOperation = '') {

  try {

    /* Expected Body
    [
      {
        "op": "add",
        "id": "urn:aaid:aem:ffe295fb-7e6a-462a-91f7-ab34cf6ee13d",
        "type": "asset"
      }
    ]
    */
    const patchOperations = [];
    if (addOperation) {
      for (const op of addOperation) {
        patchOperations.push({'op':'add', 'id':op.value.id, 'type': 'asset'});
      }
    }
    if (deleteOperation) {
      for (const op of deleteOperation) {
        patchOperations.push({'op':'remove', 'id':op.value.id, 'type': 'asset'});
      }
    }
    const options = {
      method: 'POST',
      headers: await getRequestHeadersWithIfMatchPatchJSON(etag),
      body: JSON.stringify(patchOperations),
    };

    console.log('options');
    console.log(options);

    debugger;

    const collectionId2='urn:cid:aem:6156b683-27ba-4e70-82b4-fe97eb38ac19';


    //const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId}`, options);

    const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId2}/items`, options);


    if (response.status === 200 || response.status === 204) {


      console.log('Patch Collection Success!!');


      //const responseBody = await response.json();

      const responseBody = await getCollection(collectionId2);

      const collectionData = responseBody.self[0];

      if (addOperation) {
        const assetsArray = addOperation.map((obj) => ({ assetId: obj.value.id, assetName: obj.value.name }));
        const collectionDetails = {
          collectionName: collectionData.collectionMetadata.title,
          collectionId: collectionData.id,
          assets: assetsArray,
        };
        emitEvent(document.documentElement, EventNames.ADD_TO_COLLECTION, collectionDetails);
      } else if (deleteOperation) {
        const assetsArray = deleteOperation.map((obj) => ({ assetId: obj.value.id, assetName: obj.value.name }));
        const collectionDetails = {
          collectionName: collectionData.collectionMetadata.title,
          collectionId: collectionData.id,
          assets: assetsArray,
        };
        emitEvent(document.documentElement, EventNames.DELETE_FROM_COLLECTION, collectionDetails);
      }



      return responseBody;
    } if (response.status === 400) {
      // Handle 400 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (400): ${errorResponse.detail}`);
    } else if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (404): ${errorResponse.detail}`);
    } else if (response.status === 412) {
      // Handle 412 error
      const errorResponse = await response.json();
      throw new Error(`Failed to patch collection (412): ${errorResponse.detail}`);
    } else {
      throw new Error(`Failed to update collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    logError('patchCollection', error);
    throw error;
  }
}

/**
 * Deletes a collection.
 *
 * @param {string} collectionId - The unique identifier of the collection to delete.
 * @returns {Promise<void>} A promise that resolves when the collection is updated.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function deleteCollection(collectionId, collectionName) {
  try {
    const options = {
      method: 'DELETE',
      headers: await getRequestHeaders(),
    };

    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    if (response.status !== 204) {
      throw new Error(`Failed to delete collection: ${response.status} ${response.statusText}`);
    }

    const collectionDetails = {
      collectionId,
      collectionName,
    };
    // Emit delete creation event
    emitEvent(document.documentElement, EventNames.DELETE_COLLECTION, collectionDetails);
  } catch (error) {
    logError('deleteCollection', error);
    throw error;
  }
}
