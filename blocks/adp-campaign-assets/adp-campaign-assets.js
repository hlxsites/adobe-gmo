import { getBearerToken } from '../../scripts/security.js';
import {
  getOptimizedPreviewUrl,
  getSearchIndex,
  getAssetHandlerApiKey,
  getDeliveryEnvironment,
  getBackendApiKey,
} from '../../scripts/polaris.js';

import {
  isVideo, getFailedPlaceholderImgSrc, getFileType, getFileTypeCSSClass,
} from '../../scripts/filetypes.js';

import { logError } from '../../scripts/scripts.js';

import { decorateIcons, toCamelCase, toClassName } from '../../scripts/lib-franklin.js';

import { getCSSVar } from '../../scripts/shared.js';



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


function getMaxThumbnailWidth() {
  let maxWidth = getCSSVar('--card-image-max-width');
  if (maxWidth) {
    maxWidth = maxWidth.replace('px', '');
    if (!Number.isNaN(Number(maxWidth))) {
      return Number(maxWidth);
    }
  }
  return 100;
}

function getVideoOverlayCSSClass(format) {
  if (isVideo(format)) {
    return 'icon icon-videoThumbnailOverlay';
  }
  return '';
}

function createAssetThumbnail(card,id, name, title, mimeType) {
  const previewElem = card.querySelector('.preview .thumbnail');
  getOptimizedPreviewUrl(id, name, getMaxThumbnailWidth()).then((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = title;
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.margin = '5px'; // Add some spacing between thumbnails
    img.dataset.fileformat = mimeType;
    img.onerror = () => {
      createFailedImageReplacement(previewElem, img, mimeType);
    };
    previewElem.appendChild(img);
  }).catch(() => {
    const img = document.createElement('img');
    img.alt = title;
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.margin = '5px'; // Add some spacing between thumbnails
    img.dataset.fileformat = mimeType;
    createFailedImageReplacement(previewElem, img, mimeType);
    previewElem.appendChild(img);
  });
  // if it's a video, add the video play icon over the middle of the thumbnail
  if (isVideo(mimeType)) {
    // create <div class="preview-overlay"><span></span></div>
    const div = document.createElement('div');
    div.className = 'preview-overlay';
    const span = document.createElement('span');
    div.appendChild(span);
    previewElem.appendChild(div);
    span.className = getVideoOverlayCSSClass(mimeType);
  }
}


function createCardElement(
  mimeType,
  id,
  name,
  title
) {
  const fileType = getFileType(mimeType);

  const card = document.createElement('div');
  card.setAttribute('data-item-name', name);

  card.innerHTML = `
    <div class="preview preview-${toClassName(getFileType(mimeType))}">
      <a class="thumbnail asset-link" href="">
      </a>
    </div>
  `;
  decorateIcons(card);
  return card;
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

      let card = createCardElement(hit["dc-format"],hit["assetId"],hit["repo-name"],hit["repo-name"]);

      createAssetThumbnail(card,hit["assetId"], hit["repo-name"], hit["repo-name"], hit["dc-format"]);

/*
      console.log('card');
      console.log(card);

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

*/
     // Append the image element to the campaignAssetsContainer
     campaignAssetsContainer.appendChild(card);
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




