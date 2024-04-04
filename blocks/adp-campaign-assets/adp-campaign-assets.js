import { getBearerToken } from '../../scripts/security.js';
import {
  getOptimizedPreviewUrl,
  getSearchIndex,
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
  getBackendApiKey,
} from '../../scripts/polaris.js';
import { logError } from '../../scripts/scripts.js';

import { decorateIcons } from '../../scripts/lib-franklin.js';



/**
 * Constructs and returns the base URL for search collections.
 *
 * @returns {string} The search collections URL.
 */
export function getSearchCollectionsUrl() {
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

/**
 * Get Latest Campaign Assets with optional limit parameter.
 * @param {String} - The campaignName.
 * @param {number} - The number of assets to retrieve.
 * @returns {Promise<object>} A promise that resolves with a list of collections.
 * @throws {Error} If an HTTP error or network error occurs.
 */

export async function getLatestCampaignAssets(campaignName, limit = 10) {
  // Construct the query parameters
  const queryParams = new URLSearchParams();

  const indexName = getSearchIndex();

  if (limit) {
    queryParams.append('limit', limit);
  }

  if (campaignName) {
    queryParams.append('campaignName', campaignName);
  }

  const data = {
    requests: [
      {
        indexName: indexName,
        params: {
          "facetFilters": [
              campaignName
          ],
          highlightPostTag: '__/ais-highlight__',
          highlightPreTag: '__ais-highlight__',
          hitsPerPage: limit,
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

  // Include the query parameters in the URL
  const queryString = queryParams.toString();
  const url = `${getSearchCollectionsUrl()}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, options);
    // Handle response codes
    if (response.status === 200) {
      // Collection retrieved successfully
      const responseBody = await response.json();

      return responseBody;
    }
    // Handle other response codes
    throw new Error(`Failed to search list collection: ${response.status} ${response.statusText}`);
  } catch (error) {
    logError('getLatestCampaignAssets', error);
    throw error;
  }
}


async function createCampaignAssets(block) {
  // include back to collections listing similar to hide filters button
  block.innerHTML = `
        <div class="adp-campaign-assets">Latest Assets (10)</div>
  `;

  const campaignAssetsContainer = document.createElement('div');
  campaignAssetsContainer.className = 'campaign-assets-thumbnails';

  //Todo Hardcode the campaignName for now
  const campaignAssets = await getLatestCampaignAssets('gmo-campaignName:Everyone Can', 10);

  for (const hit of campaignAssets.results[0].hits) {

      const imageUrl = await getOptimizedPreviewUrl(hit["assetId"], hit["repo-name"], 100, hit["dc-format"]);

      // Create an img element and set its source to the imageUrl
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = "Campaign Asset";
      imageElement.style.width = '100px'; // Set a fixed width for thumbnails, adjust as necessary
      imageElement.style.height = '100px'; // Set a fixed height for thumbnails, adjust as necessary
      imageElement.style.margin = '5px'; // Add some spacing between thumbnails

      // Append the image element to the campaignAssetsContainer
      campaignAssetsContainer.appendChild(imageElement);
  }

  // Append the campaignAssetsContainer to the block after the loop completes
  block.appendChild(campaignAssetsContainer);
  decorateIcons(block);
  return block;
}
export default async function decorate(block) {
  block.innerHTML = '';
  createCampaignAssets(block);
}




