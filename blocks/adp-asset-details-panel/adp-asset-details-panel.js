import {
  decorateIcons,
} from '../../scripts/lib-franklin.js';
import { openDownloadModal } from '../adp-download-modal/adp-download-modal.js';
// eslint-disable-next-line import/no-cycle
import { openAssetDetailsModal } from '../adp-asset-details-modal/adp-asset-details-modal.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import {
  getAssetMimeType, getAssetTitle, getAssetName, getAssetHeight, getAssetWidth,
} from '../../scripts/metadata.js';
import {
  getAssetMetadata,
} from '../../scripts/polaris.js';
import { getQuickViewConfig, getQuickViewSettings } from '../../scripts/site-config.js';
import { addAssetToContainer } from '../../scripts/asset-panel-html-builder.js';
import { EventNames, emitEvent } from '../../scripts/events.js';
// eslint-disable-next-line import/no-cycle
import { addShareModalHandler } from '../adp-share-modal/adp-share-modal.js';
import { startCCE, addExpressEditorHandler, fileValidity, ccEverywhere } from '../../scripts/express.js';

let resultsManager;
/**
 * Close the asset details panel and deselect the item element
 */
export function closeAssetDetailsPanel() {
  const panel = document.querySelector('.adp-asset-details-panel');
  panel.classList.remove('open');
  emitEvent(panel, EventNames.ASSET_QUICK_PREVIEW_CLOSE, { assetId: panel.dataset.assetId });
  document.querySelector('#share-link-expiry-date-calendar-dialog')?.remove(); // remove the calendar dialog created by the share modal
}

/**
 * Disable nav buttons (if necessary). Disables previous or next buttons if there are no more assets to show.
 * @param {HTMLElement} block - the asset details panel block or the asset details modal block
 */
export function disableActionButtons(block) {
  // reset the buttons first
  const preButton = block.querySelector('.action-previous-asset');
  const nextButton = block.querySelector('.action-next-asset');
  preButton.classList.remove('disabled');
  nextButton.classList.remove('disabled');
  if (!resultsManager?.hasPreviousItem()) {
    preButton.classList.add('disabled');
  }
  if (!resultsManager?.hasNextItem()) {
    nextButton.classList.add('disabled');
  }
  if (resultsManager?.getExcludedItemActions?.()?.includes?.('share')) {
    block.querySelector('.action-share-asset')?.classList.add('hidden');
  }
}

export async function openAssetDetailsPanel(assetId, resultsManagerObj) {
  resultsManager = resultsManagerObj;
  if (!assetId) return;

  const assetJSON = await getAssetMetadata(assetId);
  if (!assetJSON) return;

  const assetDetailsPanel = document.querySelector('.adp-asset-details-panel');
  if (!assetDetailsPanel) return;
  if (assetDetailsPanel.dataset.assetId === assetId) {
    if (!assetDetailsPanel.classList.contains('open')) {
      assetDetailsPanel.classList.add('open');
    }
    return;
  }
  const fileName = getAssetName(assetJSON);
  const title = getAssetTitle(assetJSON);
  const fileFormat = getAssetMimeType(assetJSON);

  // ensure express button only shows for valid asset types
  const expressBtn = assetDetailsPanel.querySelector(".action-edit-asset");
  let validCheck = fileValidity(fileFormat);
  if (ccEverywhere && validCheck.isValid) {
    expressBtn.classList.remove('hidden');
  } else {
    if (!expressBtn.classList.contains('hidden')) {
      expressBtn.classList.add('hidden');
    }
  }

  const metadataContainer = assetDetailsPanel.querySelector('#asset-details-metadata-container');
  metadataContainer.innerHTML = '';
  const metadataViewConfig = await getQuickViewConfig();
  const quickViewSettings = await getQuickViewSettings();
  assetDetailsPanel.setAttribute('data-asset-id', assetId);
  const metadataFieldsElem = await fetchMetadataAndCreateHTML(
    metadataViewConfig,
    assetJSON,
    quickViewSettings.hideEmptyMetadataProperty,
  );
  metadataContainer.appendChild(metadataFieldsElem);

  const imgPanel = document.querySelector('#asset-details-image-panel');
  await addAssetToContainer(assetId, fileName, title, fileFormat, imgPanel);

  disableActionButtons(assetDetailsPanel, resultsManager);

  // follow above design pattern for express button handler
  let assetHeight = getAssetHeight(assetJSON);
  let assetWidth = getAssetWidth(assetJSON);
  if (!(assetHeight)) assetHeight = 1000;
  if (!(assetWidth)) assetWidth = 1000;
  const actionsExpress = assetDetailsPanel.querySelector('.action-edit-asset');
  const exClone = actionsExpress.cloneNode(true);
  actionsExpress.parentNode.replaceChild(exClone, actionsExpress);
  addExpressEditorHandler(exClone, assetId, fileName, assetHeight, assetWidth, validCheck.fileType);

  // add share modal handler to share button
  const shareElement = assetDetailsPanel.querySelector('.action-share-asset');
  const newShareElement = shareElement.cloneNode(true);
  shareElement.parentElement.replaceChild(newShareElement, shareElement);
  addShareModalHandler(newShareElement, assetId, fileName, getAssetTitle(assetJSON), fileFormat);

  // show the asset details panel
  assetDetailsPanel.classList.add('open');

  // scroll to the top of the panel
  if (assetDetailsPanel.parentElement.scrollTop > 0) {
    assetDetailsPanel.parentElement.scrollTop = 0;
  }
  emitEvent(document.documentElement, EventNames.ASSET_QUICK_PREVIEW, {
    assetId: assetId,
    assetName: fileName,
  });
}

export default async function decorate(block) {
  block.innerHTML = ` 
        <div class="asset-details-header-container">
          <div class="asset-details-header">
            <div class="top-left">
              <button id="asset-details-download" class="action action-download-asset" title="Download" aria-label="Download">
                <span class="icon icon-download"></span>
              </button>
              <button id="asset-details-share" class="action action-share-asset" title="Share" aria-label="Share">
                <span class="icon icon-share"></span>
              </button>
              <button id="asset-details-express" class="action action-edit-asset" title="Edit in Express" aria-label="Edit in Express">
                <span class="icon icon-cc-express"></span>
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

  // clone the download element to remove previous event listener before adding a new one
  const actionsDownloadA = block.querySelector('.action-download-asset');
  actionsDownloadA.addEventListener('click', () => {
    const { assetId } = block.dataset;
    openDownloadModal(assetId);
  });

  // add event listeners
  block.querySelector('#asset-details-close').addEventListener('click', () => {
    closeAssetDetailsPanel();
  });
  block.querySelector('#asset-details-previous').addEventListener('click', async (e) => {
    const { assetId } = block.dataset;
    emitEvent(e.target, EventNames.PREVIOUS_ASSET, { assetId });
    const prevId = await resultsManager.selectPreviousItem();
    if (prevId) {
      openAssetDetailsPanel(prevId, resultsManager);
    }
  });
  block.querySelector('#asset-details-next').addEventListener('click', async (e) => {
    const { assetId } = block.dataset;
    emitEvent(e.target, EventNames.NEXT_ASSET, { assetId });
    const nextId = await resultsManager.selectNextItem();
    if (nextId) {
      openAssetDetailsPanel(nextId, resultsManager);
    }
  });
  block.querySelector('#asset-details-fullscreen').addEventListener('click', () => {
    block.querySelector('iframe')?.remove();
    const { assetId } = block.dataset;
    openAssetDetailsModal(assetId, resultsManager);
  });
  await startCCE();
}
