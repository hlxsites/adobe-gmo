import {
  decorateIcons,
} from '../../scripts/lib-franklin.js';
import {
  getQueryVariable, getAnchorVariable, addDownloadHandlers,
} from '../../scripts/scripts.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import {
  formatAssetMetadata, getMetadataValue,
} from '../../scripts/metadata.js';
import {
  getFailedPlaceholderImgSrc,
} from '../../scripts/filetypes.js';
import {
  getOptimizedDeliveryUrl, getAssetMetadata,
} from '../../scripts/polaris.js';
// eslint-disable-next-line import/no-cycle
import { selectNextAsset, selectPreviousAsset, deselectAssetCard } from '../infinite-results/infinite-results.js';

/**
 * Close the asset details panel and deselect the asset card
 */
export function closeAssetDetails() {
  document.querySelector('.asset-details-panel').classList.remove('open');

  deselectAssetCard();
}

/**
   * Create and return an img element for the asset
   * @param {string} id the asset id (repo:assetId)
   * @param {string} name the SEO name of the asset (usually repo:name)
   * @param {string} title the title of the asset (usually dc:title)
   * @param {string} type the file type of the asset (usually dc:format)
   * @returns an img element
   */
function getImageElement(id, name, title, type) {
  const url = getOptimizedDeliveryUrl(id, name, 1024);
  const imgElem = document.createElement('img');
  if (type) {
    imgElem.src = url;
    const altAttrib = (title) ? title.trim().replace(/"/, '"') : name.trim().replace(/"/, '"');
    imgElem.alt = altAttrib;
    imgElem.onerror = function () {
      this.src = getFailedPlaceholderImgSrc(type);
    };
  }
  return imgElem;
}

function disableButtons(assetDetailsPanel) {
  const selectedAsset = document.querySelector('#assets .asset-card.selected');
  if (!selectedAsset) return;
  // reset the buttons first
  assetDetailsPanel.querySelector('#asset-details-previous').classList.remove('disabled');
  assetDetailsPanel.querySelector('#asset-details-next').classList.remove('disabled');
  const previousAssetCard = selectedAsset.previousElementSibling;
  const nextAssetCard = selectedAsset.nextElementSibling;
  if (!previousAssetCard || !previousAssetCard.getAttribute('data-asset-id')) {
    assetDetailsPanel.querySelector('#asset-details-previous').classList.add('disabled');
  }
  if (!nextAssetCard || !nextAssetCard.getAttribute('data-asset-id')) {
    assetDetailsPanel.querySelector('#asset-details-next').classList.add('disabled');
  }
}

export async function openAssetDetails(assetId) {
  if (!assetId) return;

  const assetJSON = await getAssetMetadata(assetId);
  if (!assetJSON) return;

  const fileName = getMetadataValue('repo:name', assetJSON);
  const title = formatAssetMetadata(getMetadataValue('dc:title', assetJSON));
  const fileFormat = getMetadataValue('dc:format', assetJSON);
  const imgElem = getImageElement(assetId, fileName, title, fileFormat);
  const assetDetailsPanel = document.querySelector('.asset-details-panel');
  const metadataContainer = assetDetailsPanel.querySelector('#asset-details-metadata-container');
  metadataContainer.innerHTML = '';
  const metadataFieldsElem = await fetchMetadataAndCreateHTML('asset-details', assetJSON);
  metadataContainer.appendChild(metadataFieldsElem);

  const imgPanel = document.querySelector('#asset-details-image-panel');
  if (imgElem) {
    const oldImg = imgPanel.querySelector('img');
    if (oldImg) {
      oldImg.remove();
      imgPanel.appendChild(imgElem);
    } else {
      imgPanel.appendChild(imgElem);
    }
  }
  disableButtons(assetDetailsPanel);
  // clone the download element to remove previous event listener before adding a new one
  const actionsDownloadA = assetDetailsPanel.querySelector('.action-download-asset');
  const clone = actionsDownloadA.cloneNode(true);
  actionsDownloadA.parentNode.replaceChild(clone, actionsDownloadA);
  addDownloadHandlers(clone, assetId, fileName);

  // show the asset details panel
  assetDetailsPanel.classList.add('open');

  // scroll to the top of the panel
  if (assetDetailsPanel.parentElement.scrollTop > 0) {
    assetDetailsPanel.parentElement.scrollTop = 0;
  }
}

export default async function decorate(block) {
  block.innerHTML = ` 
        <div class="asset-details-header-container">
          <div class="asset-details-header">
            <div class="top-left">
              <button id="asset-details-download" class="action action-download-asset" title="Download" aria-label="Download">
                <span class="icon icon-download"></span>
              </button>
            </div>
            <div class="top-right">
              <button id="asset-details-fullscreen" class="action action-asset-fullscreen" title="Fullscreen" aria-label="Fullscreen">
                <span class="icon icon-fullScreen"></span>
              </button>
              <button id="asset-details-previous" class="action action-previous-asset" title="Previous" aria-label="Previous">
                <span class="icon icon-previous"></span>
              </button>
              <button id="asset-details-next" class="action action-next-asset" title="Next" aria-label="Next">
                <span class="icon icon-next"></span>
              </button>
              <button id="asset-details-close" class="action action-close" title="Close" aria-label="Close">
                <span class="icon icon-close"></span>
              </button>
            </div>
          </div>
      </div>
      <div id="asset-details-panel-container">
        <div id="asset-details-image-panel"></div>
        <div id="asset-details-metadata-container"></div>
      </div>
      `;
  decorateIcons(block);
  block.querySelector('#asset-details-close').addEventListener('click', () => {
    closeAssetDetails();
  });
  block.querySelector('#asset-details-previous').addEventListener('click', () => {
    selectPreviousAsset();
  });
  block.querySelector('#asset-details-next').addEventListener('click', () => {
    selectNextAsset();
  });
}
