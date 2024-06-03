import { getBearerToken } from './security.js';

import {
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
  getBackendApiKey,
  getSearchIndex,
  initDeliveryEnvironment,
  getOptimizedDeliveryUrl
} from './polaris.js';

import { getAdminConfig } from './site-config.js';

import { createSearchEndpoint, logError } from './scripts.js';

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
 * Search Asset for  programName and campaignName parameters.
 *
 * @param {string} - Program Name.
 * @param {string} - Campaign Name.
 * @returns {Image <object>} Resolves with image object.
 * @throws {Error} If an HTTP error or network error occurs.
 */

export async function searchAsset(programName, campaignName, imageWidth = 80) {
  const adminConfig = await getAdminConfig();
  const deliveryURL = await initDeliveryEnvironment();

  const indexName =  await getSearchIndex();

  // Initialize the facetFilters array
  const facetFilters = [];
  if (programName) { // Check if programName is not null
    facetFilters.push('gmo-programName :'+programName);
  }
  if (campaignName) { // Check if campaignName is not null
    facetFilters.push('gmo-campaignName :'+ campaignName);
  }
  const data = {
    requests: [
      {
        indexName: indexName,
        params: {
          facetFilters: facetFilters,
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
    const response = await fetch(createSearchEndpoint(), options);
    // Handle response codes
    if (response.status === 200) {
      // Asset retrieved successfully
      const responseBody = await response.json();
      const assetData = responseBody.results[0].hits[0];
      if (assetData)
      {
        const totalAssets = responseBody.results[0].nbHits;
        const thumbnailURL = await getOptimizedDeliveryUrl(assetData.assetId, assetData['repo-name'], imageWidth);
        return {imageUrl : thumbnailURL, imageAltText: assetData['repo-name'], assetCount: totalAssets};
      }
      else
      {
        return null;
      }
    }
    // Handle other response codes
    throw new Error(`Failed to search asset: ${response.status} ${response.statusText}`);
  } catch (error) {
    logError('searchAsset', error);
    throw error;
  }
}
