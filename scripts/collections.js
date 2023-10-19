import { getBearerToken } from './security.js';
import {
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
} from './polaris.js';

async function getRequestHeaders() {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json',
    'x-api-key': await getAssetHandlerApiKey(),
    Authorization: token,
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

    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();
      responseBody.etag = response.headers.get('If-None-Match');
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
    console.error('Error retrieving collection:', error);
    throw error;
  }
}

/**
 * Creates a new collection.
 *
 * @param {string} title - The title of the new collection.
 * @param {string} description - The description of the new collection (optional).
 * @param {Array<object>} items - An array of items to include in the collection (optional).
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

    const response = await fetch(`${getBaseCollectionsUrl()}`, options);

    // Handle response codes
    if (response.status === 200) {
      // Collection created successfully
      const responseBody = await response.json();
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
    console.error('Error creating collection:', error);
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

  const options = {
    method: 'GET',
    headers: await getRequestHeaders(),
  };

  // Include the query parameters in the URL
  const queryString = queryParams.toString();
  const url = `${getBaseCollectionsUrl()}${queryString ? `?${queryString}` : ''}`;

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
    console.error('ErFailed to list collection:', error);
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
      addOperation.op = 'add';
      patchOperations.push(addOperation);
    }
    if (deleteOperation) {
      deleteOperation.op = 'remove';
      patchOperations.push(deleteOperation);
    }
    const options = {
      method: 'PATCH',
      headers: await getRequestHeaders(),
      body: JSON.stringify(patchOperations),
    };

    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    if (response.status === 200) {
      const responseBody = await response.json();
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
    console.error('Error updating collection:', error);
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
export async function deleteCollection(collectionId) {
  try {
    const options = {
      method: 'DELETE',
      headers: await getRequestHeaders(),
    };

    const response = await fetch(`${getBaseCollectionsUrl()}/${collectionId}`, options);

    if (response.status === 204) {
      console.log('Collection deleted successfully');
    } else {
      throw new Error(`Failed to delete collection: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
}
