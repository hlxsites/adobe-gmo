import {
  decorateIcons,
} from '../../scripts/lib-franklin.js';
import {
  addDownloadHandlers,
} from '../../scripts/scripts.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import {
  formatAssetMetadata, getMetadataValue,
} from '../../scripts/metadata.js';
import {
  getAssetMetadata,
} from '../../scripts/polaris.js';
// eslint-disable-next-line import/no-cycle
import { selectNextAsset, selectPreviousAsset, deselectAssetCard } from '../infinite-results/infinite-results.js';
// eslint-disable-next-line import/no-cycle
import { openModal } from '../asset-details-modal/asset-details-modal.js';
import { getDetailViewConfig, getDetailViewSettings } from '../../scripts/site-config.js';
import { addAssetToContainer } from '../../scripts/assetPanelCreator.js';
import { startCCE, addExpressEditorHandler } from '../../scripts/scripts.js';

/**
 * Close the asset details panel and deselect the asset card
 */
export function closeAssetDetails() {
  document.querySelector('.asset-details-panel').classList.remove('open');

  deselectAssetCard();
}

export function disableButtons(block) {
  const selectedAsset = document.querySelector('#assets .asset-card.selected');
  if (!selectedAsset) return;
  // reset the buttons first
  const preButton = block.querySelector('.action-previous-asset');
  const nextButton = block.querySelector('.action-next-asset');
  preButton.classList.remove('disabled');
  nextButton.classList.remove('disabled');
  const previousAssetCard = selectedAsset.previousElementSibling;
  const nextAssetCard = selectedAsset.nextElementSibling;
  if (!previousAssetCard || !previousAssetCard.getAttribute('data-asset-id')) {
    preButton.classList.add('disabled');
  }
  if (!nextAssetCard || !nextAssetCard.getAttribute('data-asset-id')) {
    nextButton.classList.add('disabled');
  }
}

export async function openAssetDetails(assetId) {
  if (!assetId) return;

  const assetJSON = await getAssetMetadata(assetId);
  if (!assetJSON) return;

  const fileName = getMetadataValue('repo:name', assetJSON);
  console.log(assetJSON);
  const title = formatAssetMetadata(getMetadataValue('dc:title', assetJSON));
  const fileFormat = getMetadataValue('dc:format', assetJSON);
  const assetDetailsPanel = document.querySelector('.asset-details-panel');
  const metadataContainer = assetDetailsPanel.querySelector('#asset-details-metadata-container');
  metadataContainer.innerHTML = '';
  const metadataViewConfig = await getDetailViewConfig();
  const detailViewSettings = await getDetailViewSettings();
  const metadataFieldsElem = await fetchMetadataAndCreateHTML(
    metadataViewConfig,
    assetJSON,
    detailViewSettings.hideEmptyMetadataProperty,
  );
  metadataContainer.appendChild(metadataFieldsElem);

  const imgPanel = document.querySelector('#asset-details-image-panel');
  await addAssetToContainer(assetId, fileName, title, fileFormat, imgPanel);

  disableButtons(assetDetailsPanel);
  // clone the download element to remove previous event listener before adding a new one
  const actionsDownloadA = assetDetailsPanel.querySelector('.action-download-asset');
  const clone = actionsDownloadA.cloneNode(true);
  actionsDownloadA.parentNode.replaceChild(clone, actionsDownloadA);
  addDownloadHandlers(clone, assetId, fileName, fileFormat);
  

  const actionsExpress = assetDetailsPanel.querySelector('.action-edit-asset');
  const exClone = actionsExpress.cloneNode(true);
  actionsExpress.parentNode.replaceChild(exClone, actionsExpress);
  addExpressEditorHandler(exClone, assetId, fileName, fileFormat);

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
              <button id="asset-details-express" class="action action-edit-asset" title="Edit in Express" aria-label="Edit in Express">
                <span class="icon icon-express-logo"></span>
              </button>
            </div>
            <div class="top-right">
              <button id="asset-details-fullscreen" class="action action-asset-fullscreen" title="Fullscreen" aria-label="Fullscreen">
                <span class="icon icon-fullScreen"></span>
              </button>
              <button id="asset-details-previous" class="action action-previous-asset" title="Previous lala" aria-label="Previous">
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
  block.querySelector('#asset-details-fullscreen').addEventListener('click', async () => {
    block.querySelector('iframe')?.remove();
    await openModal();
  });
  console.log("local hehe");
  startCCE();

}
