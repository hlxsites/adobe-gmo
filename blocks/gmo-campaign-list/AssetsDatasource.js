import { getBearerToken } from '../../security.js';
import {
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
  getBackendApiKey,
} from '../../polaris.js';

import { getAdminConfig } from '../../site-config.js';

import { logError } from '../../scripts.js';


/**
 * Constructs and returns the base URL for search assets.
 *
 * @returns {string} The search collections URL.
 */
export function getSearchAssetsUrl() {
  return `${getDeliveryEnvironment()}/adobe/assets/search`;
}



async function getRequestHeadersSearchAssets() {
  const token = await getBearerToken();
  return {
    'Content-Type': 'application/json',
    'x-api-key': getBackendApiKey(),
    Authorization: token,
    'x-adobe-accept-experimental': '1',
    'x-adp-request': 'search',
  };
}


const getFilters = () => {
  const currentDate = new Date();
  const currentEpoch = Math.floor(currentDate.getTime() / 1000);
  // Algolia does not support filters based on mixed types; for example boolean & numeric field types
  // is_pur-expirationDate is a boolean type; but aloglia's engine treats boolean false as 0
  // so we can use that to our advantage for numberic filters
  return `is_pur-expirationDate = 0 OR pur-expirationDate > ${currentEpoch}`;
};


/**
 * Search Lists collections with optional limit and page parameters.
 *
 * @param {number} - The optional maximum number of collections to retrieve.
 * @param {number} - The optional page number for paginating the results.
 * @returns {Promise<object>} A promise that resolves with a list of collections.
 * @throws {Error} If an HTTP error or network error occurs.
 */

export async function searchAsset(programName, campaignName) {

  const adminConfig = await getAdminConfig();
  const indexName = adminConfig.searchCollectionIndex;

  const data = {
    requests: [
      {
        indexName: indexName,
        params: {
          facetFilters: [
            {'gmo-programName': programName},
            {'gmo-campaignName': campaignName}
          ],
          filters: getFilters(),
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: 1,
          page: 0,
          query: '',
          tagFilters: ''
        }
      }
    ]
  };

  const options = {
    method: 'POST',
    headers: await getRequestHeadersSearchAssets(),
    body: JSON.stringify(data),
  };



  try {
    const response = await fetch(`${getSearchAssetsUrl()}`, options);
    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();

      return responseBody;

      // Transform the data

 /*
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
*/
    }
    // Handle other response codes
    throw new Error(`Failed to search asset: ${response.status} ${response.statusText}`);
  } catch (error) {
    logError('searchAsset', error);
    throw error;
  }
}
