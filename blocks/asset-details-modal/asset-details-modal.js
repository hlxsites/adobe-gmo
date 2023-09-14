import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getAnchorVariable, addDownloadHandlers } from '../../scripts/scripts.js';
import { getAssetMetadata, getOptimizedDeliveryUrl } from '../../scripts/polaris.js';
import { getMetadataValue } from '../../scripts/metadata.js';
// eslint-disable-next-line import/no-cycle
import { closeAssetDetails, disableButtons } from '../asset-details-panel/asset-details-panel.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import { selectPreviousAsset, selectNextAsset } from '../infinite-results/infinite-results.js';
import { getFileTypeCSSClass } from '../../scripts/filetypes.js';

let scale = 1;
function getImageElement(id, name, title, type) {
  const url = getOptimizedDeliveryUrl(id, name, 1024);
  const imgElem = document.createElement('img');
  if (type) {
    imgElem.src = url;
    const altAttrib = (title) ? title.trim().replace(/"/, '"') : name.trim().replace(/"/, '"');
    imgElem.alt = altAttrib;
  }
  return imgElem;
}

async function getImage(assetId) {
  const assetJSON = await getAssetMetadata(assetId);
  const assetName = getMetadataValue('repo:name', assetJSON);
  const assetTitle = getMetadataValue('title', assetJSON);
  const format = getMetadataValue('dc:format', assetJSON);
  const imgElem = getImageElement(assetId, assetName, assetTitle, format);
  return imgElem;
}

export function closeModal(block) {
  document.body.classList.remove('no-scroll');
  const modalOverlay = block.querySelector('.modal-fullscreen-overlay');
  modalOverlay.classList.remove('open');
  const modal = block.querySelector('.modal-container');
  modal.classList.remove('open');
  modal.querySelector('#asset-details-next')?.classList.remove('hidden');
  modal.querySelector('#asset-details-previous')?.classList.remove('hidden');
  modal.querySelector('.divider.first')?.classList.remove('hidden');
  const currentUrl = window.location.href;
  const assetIdIndex = currentUrl.indexOf('#assetId');
  // eslint-disable-next-line max-len
  const newUrl = assetIdIndex !== -1 ? currentUrl.substring(0, assetIdIndex) : currentUrl;
  window.history.pushState({}, '', newUrl);
  closeAssetDetails();
}

function updateZoomLevel(block) {
  const img = block.querySelector('.modal-image img');
  img.style.transform = `scale(${scale})`;
  const zoomLevel = block.querySelector('.asset-details-page-zoom-level');
  zoomLevel.textContent = `${Math.round(scale * 100)}%`;
}

async function createImagePanel(modal, assetId) {
  const imgElem = await getImage(assetId);
  const imgPanel = modal.querySelector('.modal-image');
  imgPanel.querySelector('img')?.remove();
  imgPanel.appendChild(imgElem);
  updateZoomLevel(modal);
}

async function createMetadataPanel(modal, assetJSON) {
  const metadataElem = await fetchMetadataAndCreateHTML('asset-details-page', assetJSON, false);
  const modalMetadata = modal.querySelector('.modal-metadata');
  const metadataToggle = modal.querySelector('#asset-details-page-metadata');
  if (!metadataToggle.classList.contains('open')) {
    metadataToggle.classList.add('open');
  }
  if (!modalMetadata.classList.contains('open')) {
    modalMetadata.classList.add('open');
  }
  modalMetadata.querySelector('.metadata-container')?.remove();
  modalMetadata.appendChild(metadataElem);
}

function createHeaderPanel(modal, assetJSON, assetId) {
  // set fileName
  const fileNameDiv = modal.querySelector('.file-name');
  const fileName = getMetadataValue('repo:name', assetJSON);
  fileNameDiv.textContent = fileName;
  // create fileTypeIcon
  const fileTypeIcon = modal.querySelector('.file-type-icon');
  const iconSpan = document.createElement('span');
  const dcFormat = getMetadataValue('dc:format', assetJSON);
  const iconClass = getFileTypeCSSClass(dcFormat || 'application/octet-stream');
  iconSpan.classList.add('icon', `icon-${iconClass}`);
  fileTypeIcon.querySelector('span')?.remove();
  fileTypeIcon.appendChild(iconSpan);
  decorateIcons(modal);
  // disable nav buttons if needed
  disableButtons(modal);
  // clone the download element to remove previous event listener before adding a new one
  const actionsDownloadA = modal.querySelector('#asset-details-page-download');
  const clone = actionsDownloadA.cloneNode(true);
  actionsDownloadA.parentNode.replaceChild(clone, actionsDownloadA);
  addDownloadHandlers(clone, assetId, fileName);
}

export async function openModal() {
  scale = 1;
  let assetId = getAnchorVariable('assetId');
  if (!assetId) {
    const selectedAsset = document.querySelector('#assets .asset-card.selected');
    assetId = selectedAsset.getAttribute('data-asset-id');
    window.history.replaceState(window.history.state, '', `#assetId=${assetId}`);
  }
  if (assetId) {
    if (!document.body.classList.contains('no-scroll')) {
      document.body.classList.add('no-scroll');
    }
    const modalOverlay = document.querySelector('.modal-fullscreen-overlay');
    if (!modalOverlay.classList.contains('open')) {
      modalOverlay.classList.add('open');
    }
    const modal = document.querySelector('.modal-container');
    if (!modal.classList.contains('open')) {
      modal.classList.add('open');
    }
    const assetJSON = await getAssetMetadata(assetId);

    createImagePanel(modal, assetId);

    createMetadataPanel(modal, assetJSON);

    createHeaderPanel(modal, assetJSON, assetId);
  }
}

export default function decorate(block) {
  block.innerHTML = `<div class="modal-fullscreen-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">
          <div class="modal-header-left">
            <div class="file-type-icon"></div>
            <div class="file-name"></div>
          </div>
          <div class="modal-header-right">
            <button id="asset-details-page-download" class="action action-download-asset" title="Download" aria-label="Download">
              <span class="icon icon-download"></span>
            </button>
            <button id="asset-details-page-metadata" class="action action-metadata-asset open" title="Hide or View Toggle" aria-label="Metadata">
              <span class="icon icon-info"></span>
            </button>
            <div class="divider first"></div>
            <button id="asset-details-previous" class="action action-previous-asset" title="Previous" aria-label="Previous">
              <span class="icon icon-previous"></span>
            </button>
            <button id="asset-details-next" class="action action-next-asset" title="Next" aria-label="Next">
              <span class="icon icon-next"></span>
            </button>
            <div class="divider second"></div>
            <button id="asset-details-page-zoom-in" class="action action-zoom-in" title="Zoom In" aria-label="Zoom In">
              <span class="icon icon-zoomIn"></span>
            </button>
            <button id="asset-details-page-zoom-out" class="action action-zoom-out" title="Zoom Out" aria-label="Zoom Out">
              <span class="icon icon-zoomOut"></span>
            </button>
            <div class="asset-details-page-zoom-level">100%</div>
            <div class="divider third"></div>
            <button id="asset-details-close" class="action action-close" aria-label="Close">
              <span class="icon icon-close"></span>
            </button>
          </div>
      </div>
      <div class="modal-body">
        <div class="modal-image"></div>
        <div class="modal-metadata open">
          <div class="modal-metadata-heading">Details</div>
        </div>
      </div>
    </div>`;
  decorateIcons(block);

  block.querySelector('#asset-details-close').addEventListener('click', () => {
    closeModal(block);
  });

  // eslint-disable-next-line func-names
  block.querySelector('#asset-details-page-metadata').addEventListener('click', function () {
    this.classList.toggle('open');
    block.querySelector('.modal-metadata').classList.toggle('open');
  });

  block.querySelector('#asset-details-previous').addEventListener('click', () => {
    selectPreviousAsset();
    openModal();
  });

  block.querySelector('#asset-details-next').addEventListener('click', () => {
    selectNextAsset();
    openModal();
  });

  block.querySelector('#asset-details-page-zoom-in').addEventListener('click', () => {
    scale += 0.1;
    updateZoomLevel(block);
  });

  block.querySelector('#asset-details-page-zoom-out').addEventListener('click', () => {
    if (scale > 0.2) {
      scale -= 0.1;
      updateZoomLevel(block);
    }
  });

  const assetId = getAnchorVariable('assetId');
  // open modal if assetId is present in the URL
  if (assetId) {
    block.querySelector('#asset-details-next').classList.add('hidden');
    block.querySelector('#asset-details-previous').classList.add('hidden');
    block.querySelector('.divider.first').classList.add('hidden');
    openModal();
  }
}
