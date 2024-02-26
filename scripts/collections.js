import { getBearerToken } from './security.js';
import {
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
} from './polaris.js';
import { getPathParams, logError } from './scripts.js';
import { emitEvent, EventNames } from './events.js';

import { getAdminConfig } from './site-config.js';

export function getCollectionIdFromURL() {
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

async function getRequestHeadersSearchCollections() {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json',
    'x-api-key': 'asset_search_service',
    Authorization: token,
    'x-ch-Request': 'search',
    'x-adobe-accept-experimental': '1',
  };
}

async function getRequestHeaders() {

  const token = await getBearerToken();

  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
    'X-Adobe-Accept-Experimental': '1',
  };
}

async function getRequestHeadersWithEtag(etag) {

  const token = await getBearerToken();

  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
    'X-Adobe-Accept-Experimental': '1',
    'If-Match': etag,
  };
}

async function getRequestHeadersWithIfMatchPatchJSON(etag) {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json-patch+json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
    'X-Adobe-Accept-Experimental': '1',
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
 * Constructs and returns the base URL for search collections.
 *
 * @returns {string} The search collections URL.
 */
export function getSearchCollectionsUrl() {
  return `${getDeliveryEnvironment()}/adobe/assets/search`;
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

    const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId}/items`, options);

    // Handle response codes
    if (response.status === 200) {

      const responseBody = await response.json();

      responseBody.etag = response.headers.get('Etag');
      responseBody.title = responseBody.self[0].collectionMetadata?.title ?? '';
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
 * Search Lists collections with optional limit and page parameters.
 *
 * @param {number} - The optional maximum number of collections to retrieve.
 * @param {number} - The optional page number for paginating the results.
 * @returns {Promise<object>} A promise that resolves with a list of collections.
 * @throws {Error} If an HTTP error or network error occurs.
 */

export async function searchListCollection(limit = undefined, page = 0) {
  // Construct the query parameters
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append('limit', limit);
  }

  if (page) {
    queryParams.append('page', page);
  }

  const adminConfig = await getAdminConfig();
  const indexName = adminConfig.searchCollectionIndex;
  const data = {
    requests: [
      {
        indexName: indexName,
        params: {
          facets: [],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: limit,
          page: page,
          query: '',
          tagFilters: ''
        }
      }
    ]
  };

  const options = {
    method: 'POST',
    headers: await getRequestHeadersSearchCollections(),
    body: JSON.stringify(data),
  };

  // Include the query parameters in the URL
  const queryString = queryParams.toString();
  const url = `${getSearchCollectionsUrl()}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, options);
    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();

      // Transform the data
      const transformedData = {
        page: responseBody.results[0].page,
        nbHits: responseBody.results[0].nbHits,
        nbPages: responseBody.results[0].nbPages,
        items: responseBody.results[0].hits.map(hit => ({
          id: hit.collectionId,
          title: hit.collectionMetadata.metadata?.title ?? hit.collectionMetadata.title,
          description: hit.collectionMetadata.metadata?.description ?? hit.collectionMetadata.description
        }))
      };

      return transformedData;
    }
    // Handle other response codes
    throw new Error(`Failed to search list collection: ${response.status} ${response.statusText}`);
  } catch (error) {
    logError('searchListCollection', error);
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

    const patchOperations = [];
    if (addOperation) {
      for (const op of addOperation) {
        patchOperations.push({ 'op': 'add', 'id': op.value.id, 'type': 'asset' });
      }
    }
    if (deleteOperation) {
      for (const op of deleteOperation) {
        patchOperations.push({ 'op': 'remove', 'id': op.value.id, 'type': 'asset' });
      }
    }

    const options = {
      method: 'POST',
      headers: await getRequestHeadersWithIfMatchPatchJSON(etag),
      body: JSON.stringify(patchOperations),
    };

    const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId}/items`, options);

    if (response.status === 200 || response.status === 204) {

      const responseBody = await getCollection(collectionId);

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
 * @param {string} collectionName - Collection name used for emit delete event.
 * @param {string} etag - Used for in the header for the delete operation.
 * @returns {Promise<void>} A promise that resolves when the collection is updated.
 * @throws {Error} If an HTTP error or network error occurs.
 */
export async function deleteCollection(collectionId, collectionName, etag) {
  try {

    const options = {
      method: 'DELETE',
      headers: await getRequestHeadersWithEtag(etag),
    };

    const response = await fetch(`${getBaseAssetsCollectionsUrl()}/${collectionId}`, options);

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
