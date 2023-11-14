import { decorateIcons } from '../../scripts/lib-franklin.js';
import {
  getAnchorVariable, createTag, addHashParamToWindowURL, sortMetadata,
} from '../../scripts/scripts.js';
import { closeModal, removeParamFromWindowURL } from '../../scripts/shared.js';
import { authorizeURL, getAssetMetadata } from '../../scripts/polaris.js';
import {
  getAssetName, getAssetMimeType, getAssetTitle,
} from '../../scripts/metadata.js';
// eslint-disable-next-line import/no-cycle
import { disableActionButtons } from '../adp-asset-details-panel/adp-asset-details-panel.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import { getFileTypeCSSClass } from '../../scripts/filetypes.js';
import { getDetailViewConfig, getDetailViewSettings } from '../../scripts/site-config.js';
import { addAssetToContainer } from '../../scripts/asset-panel-html-builder.js';
import { getAvailableRenditions } from '../../scripts/renditions.js';
import { addDownloadEventListener } from '../adp-download-modal/adp-download-modal.js';
import { populateShareModalInfo } from '../adp-share-modal/adp-share-modal.js';
import { EventNames, emitEvent } from '../../scripts/events.js';
import { addExpressEditorHandler, fileValidity, getCCEverywhere } from '../../scripts/express.js';

let scale = 1;
let assetId;
let assetName;
let format;
let assetJSON;
let originalAssetURL;
let resultsManagerObj;

function updateZoomLevel(block) {
  let asset = block.querySelector('.modal-image img');
  if (!asset) {
    asset = block.querySelector('.modal-image iframe');
  }
  asset.style.transform = `scale(${scale})`;
  const zoomLevel = block.querySelector('.asset-details-page-zoom-level');
  zoomLevel.textContent = `${Math.round(scale * 100)}%`;
}

async function createImagePanel(modal) {
  const imgPanel = modal.querySelector('.modal-image');
  assetName = getAssetName(assetJSON);
  const assetTitle = getAssetTitle(assetJSON);
  format = getAssetMimeType(assetJSON);
  await addAssetToContainer(assetId, assetName, assetTitle, format, imgPanel);
  updateZoomLevel(modal);
}

async function getMetadataElement() {
  const metadataViewConfig = await getDetailViewConfig();
  const detailViewSettings = await getDetailViewSettings();
  return fetchMetadataAndCreateHTML(metadataViewConfig, assetJSON, detailViewSettings.hideEmptyMetadataProperty, false);
}

async function createMetadataPanel(modal) {
  const metadataElem = await getMetadataElement(assetJSON);
  const modalMetadata = modal.querySelector('.modal-metadata');
  const infoButton = modal.querySelector('#asset-details-page-metadata');
  const downloadButton = modal.querySelector('#asset-details-page-download');
  const shareButton = modal.querySelector('#asset-details-page-share');
  infoButton.classList.add('open');
  downloadButton.classList.remove('open');
  shareButton.classList.remove('open');
  modalMetadata.classList.add('open');

  removeMetadataContainers(modalMetadata);
  modalMetadata.querySelector('.modal-metadata-heading').textContent = 'Details';
  const sortedMetadata = sortMetadata(metadataElem);
  modalMetadata.appendChild(sortedMetadata);
}

function createHeaderPanel(modal) {
  // set fileName
  const fileNameDiv = modal.querySelector('.file-name');
  fileNameDiv.textContent = assetName;
  // create fileTypeIcon
  const fileTypeIcon = modal.querySelector('.file-type-icon');
  const iconSpan = document.createElement('span');
  const mimeType = getAssetMimeType(assetJSON);
  const iconClass = getFileTypeCSSClass(mimeType);
  iconSpan.classList.add('icon', `icon-${iconClass}`);
  fileTypeIcon.querySelector('span')?.remove();
  fileTypeIcon.appendChild(iconSpan);
  decorateIcons(modal);
  // disable nav buttons if needed
  disableActionButtons(modal);

  // ensure express button only shows for valid asset types
  const expressBtn = modal.querySelector('.action-edit-asset');
  const validCheck = fileValidity(format);
  if (getCCEverywhere() && validCheck.isValid) {
    expressBtn.classList.remove('hidden');
  } else if (!expressBtn.classList.contains('hidden')) {
    expressBtn.classList.add('hidden');
  }

  const assetHeight = assetJSON.assetMetadata['tiff:ImageLength'];
  const assetWidth = assetJSON.assetMetadata['tiff:ImageWidth'];
  const actionsExpress = modal.querySelector('.action-edit-asset');
  const exClone = expressBtn.cloneNode(true);
  actionsExpress.parentNode.replaceChild(exClone, actionsExpress);
  addExpressEditorHandler(exClone, assetId, assetName, assetHeight, assetWidth, 'image', document);
}

export async function openAssetDetailsModal(id, resultsManager) {
  resultsManagerObj = resultsManager;
  scale = 1;
  assetId = id || getAnchorVariable('assetId');
  if (!getAnchorVariable('assetId')) {
    addHashParamToWindowURL('assetId', assetId);
  }
  if (assetId) {
    if (!document.body.classList.contains('no-scroll')) {
      document.body.classList.add('no-scroll');
    }
    const modal = document.querySelector('.modal-container');
    if (!modal.classList.contains('open')) {
      modal.classList.add('open');
    }
    assetJSON = await getAssetMetadata(assetId);

    createImagePanel(modal, assetId);
    createMetadataPanel(modal, assetJSON);
    createHeaderPanel(modal, assetJSON, assetId);
    modal.showModal();
    emitEvent(document.body, EventNames.ASSET_DETAIL, {
      assetId,
      assetName: getAssetName(assetJSON),
    });
  }
}

function addRenditionSwitcherEventListener(container, assetContainer) {
  const textContainers = container.querySelectorAll('.text-container');
  let asset = assetContainer.querySelector('img');
  if (!asset) {
    asset = assetContainer.querySelector('iframe');
  }
  originalAssetURL = asset.src;
  textContainers.forEach((textContainer) => {
    textContainer.addEventListener('click', async (e) => {
      const self = e.currentTarget;
      const header = self.querySelector('.header');
      if (header) {
        return;
      }
      textContainers.forEach((innerTextContainer) => {
        innerTextContainer.parentElement.classList.remove('active');
      });
      const rendition = self.parentElement;
      rendition.classList.add('active');
      if (rendition.querySelector('.file-name')?.textContent === 'Original') {
        asset.src = originalAssetURL;
      } else {
        const checkbox = rendition.querySelector('input');
        const url = checkbox.getAttribute('data-url');
        // if the url is a blob url, then we don't need to authorize it
        if (url.includes('blob')) {
          asset.src = url;
        } else {
          const authURL = await authorizeURL(url);
          asset.src = authURL;
          checkbox.setAttribute('data-url', authURL);
        }
      }
    });
  });
}

function removeMetadataContainers(modalMetadata) {
  modalMetadata.querySelector('.metadata-container')?.remove();
  modalMetadata.querySelector('.rendition-container')?.remove();
  modalMetadata.querySelector('.adp-share-modal-details-container')?.remove();
}

async function handleClickButton(block, button, textContent, callback) {
  const modalMetadata = block.querySelector('.modal-metadata');
  if (button.classList.contains('open')) {
    button.classList.remove('open');
    modalMetadata.classList.remove('open');
  } else {
    modalMetadata.classList.add('open');

    // remove open class from sibling buttons
    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach((innerButton) => {
      innerButton.classList.remove('open');
    });
    // add open class to current button
    button.classList.add('open');

    // remove containers
    removeMetadataContainers(modalMetadata);
    modalMetadata.querySelector('.modal-metadata-heading').textContent = textContent;

    // Execute callback
    await callback();
  }
}

export default function decorate(block) {
  block.innerHTML = `
    <dialog class="modal-container">
      <div class="modal-header">
          <div class="modal-header-left">
            <div class="file-type-icon"></div>
            <div class="file-name"></div>
          </div>
          <div class="modal-header-right">
            <button id="asset-details-previous" class="action action-previous-asset" title="Previous" aria-label="Previous">
              <span class="icon icon-previous"></span>
            </button>
            <button id="asset-details-next" class="action action-next-asset" title="Next" aria-label="Next">
              <span class="icon icon-next"></span>
            </button>
            <div class="divider first"></div>
            <button id="asset-details-page-zoom-in" class="action action-zoom-in" title="Zoom In" aria-label="Zoom In">
              <span class="icon icon-zoomIn"></span>
            </button>
            <button id="asset-details-page-zoom-out" class="action action-zoom-out" title="Zoom Out" aria-label="Zoom Out">
              <span class="icon icon-zoomOut"></span>
            </button>
            <div class="asset-details-page-zoom-level">100%</div>
            <div class="divider second"></div>
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
        <div class="modal-right-panel">
          <button
            id="asset-details-page-metadata"
            class="action action-metadata-asset open"
            title="Hide or View Toggle"
            aria-label="Metadata"
          >
            <span class="icon icon-info"></span>
          </button>
          <button id="asset-details-page-download" class="action action-download-asset" title="Download" aria-label="Download">
            <span class="icon icon-download"></span>
          </button>
          <button id="asset-details-page-share" class="action action-share-asset" title="Share" aria-label="Share">
            <span class="icon icon-share"></span>
          </button>
          <button id="asset-details-express" class="action action-edit-asset" title="Edit in Express" aria-label="Edit in Express">
            <span class="icon icon-cc-express"></span>
          </button>
        </div>
      </div>
    </dialog>`;
  decorateIcons(block);

  block.querySelector('#asset-details-close').addEventListener('click', () => {
    closeModal(block);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && block.querySelector('.modal-container').open) {
      closeModal(block);
    }
  });

  // eslint-disable-next-line func-names
  block.querySelector('#asset-details-page-metadata').addEventListener('click', async function () {
    const modalMetadata = block.querySelector('.modal-metadata');
    await handleClickButton(block, this, 'Details', async () => {
      const metadataElem = await getMetadataElement(assetJSON);
      modalMetadata.appendChild(metadataElem);
    });
  });

  async function generateRendtionDownloadHTML(modalMetadata) {
    modalMetadata.querySelector('.metadata-container')?.remove();
    modalMetadata.querySelector('.rendition-container')?.remove();
    modalMetadata.querySelector('.modal-metadata-heading').textContent = 'Download';

    // create select all checkbox
    const renditionContainer = createTag('div', { class: 'rendition-container' });
    const renditionFields = createTag('div', { class: 'rendition-fields' });
    const renditionHeader = createTag('div', { class: 'rendition header' });
    const headerCheckbox = createTag('input', {
      type: 'checkbox', name: 'all', value: 'all', id: 'detail-download-all', class: 'intermediate',
    });
    const headerTextContainer = createTag('div', { class: 'text-container' });
    const headerText = createTag('div', { class: 'header' });
    headerText.textContent = 'Select All';
    headerTextContainer.appendChild(headerText);
    renditionHeader.appendChild(headerCheckbox);
    renditionHeader.appendChild(headerTextContainer);
    renditionFields.appendChild(renditionHeader);

    // create rendition checkboxes
    const renditions = await getAvailableRenditions(assetId, assetName, format);
    renditions.forEach((rendition) => {
      const renditionDiv = createTag('div', { class: 'rendition' });
      const checkbox = createTag('input', {
        type: 'checkbox',
        name: 'rendition',
        value: `${rendition.fileName}`,
        'data-url': `${rendition.url}`,
        id: `${rendition.fileName}`,
        'data-format': `${rendition.format}`,
        'data-asset-id': assetId,
        'data-asset-name': assetName,
      });
      const textContainer = createTag('div', { class: 'text-container' });
      const fileName = createTag('div', { class: 'file-name' });
      fileName.textContent = rendition.name;
      if (fileName.textContent === 'Original') {
        renditionDiv.classList.add('active');
        checkbox.checked = true;
      }
      const fileInfo = createTag('div', { class: 'file-info' });
      const fileFormat = createTag('div', { class: 'file-format' });
      fileFormat.textContent = rendition.format;
      const divider = createTag('div', { class: 'divider' });
      const fileSize = createTag('div', { class: 'file-size' });
      const width = rendition.width ? `${rendition.width}` : 'Auto';
      const height = rendition.height ? `${rendition.height}` : 'Auto';
      fileSize.textContent = `${width} x ${height} px`;
      fileInfo.appendChild(fileFormat);
      fileInfo.appendChild(divider);
      fileInfo.appendChild(fileSize);
      textContainer.appendChild(fileName);
      textContainer.appendChild(fileInfo);
      renditionDiv.appendChild(checkbox);
      renditionDiv.appendChild(textContainer);
      renditionFields.appendChild(renditionDiv);
    });
    if (renditions.length === 1) {
      headerCheckbox.classList.remove('intermediate');
      headerCheckbox.checked = true;
    }
    renditionContainer.appendChild(renditionFields);

    // create download button
    const actionsContainer = createTag('div', { class: 'actions-container' });
    const downloadButton = createTag('button', { class: 'action download' });
    downloadButton.textContent = 'Download 1 file';
    actionsContainer.appendChild(downloadButton);
    renditionContainer.appendChild(actionsContainer);
    addDownloadEventListener(renditionContainer);
    const assetContainer = block.querySelector('.modal-image');
    addRenditionSwitcherEventListener(renditionContainer, assetContainer);
    modalMetadata.appendChild(renditionContainer);
  }

  // eslint-disable-next-line func-names
  block.querySelector('#asset-details-page-download').addEventListener('click', async function () {
    const modalMetadata = block.querySelector('.modal-metadata');
    await handleClickButton(block, this, 'Download', async () => {
      // generate rendition download HTML
      generateRendtionDownloadHTML(modalMetadata);
    });
  });

  // eslint-disable-next-line func-names
  block.querySelector('#asset-details-page-share').addEventListener('click', async function () {
    const modalMetadata = block.querySelector('.modal-metadata');
    await handleClickButton(block, this, 'Share', async () => {
      const shareDetailsContainer = document.createElement('div');
      shareDetailsContainer.classList.add('adp-share-modal-details-container');
      const shareModalBodyRight = document.querySelector('.adp-share-modal-block .share-link-body-right').cloneNode(true);
      shareDetailsContainer.appendChild(shareModalBodyRight);
      await modalMetadata.appendChild(shareDetailsContainer);
      const shareLinkExpiryContainer = block.querySelector('.share-link-body-right .share-link-expiry-container');
      shareLinkExpiryContainer.classList.remove('multi-select');
      await populateShareModalInfo(
        shareDetailsContainer,
        [decodeURIComponent(assetId)],
        getAssetTitle(assetJSON) || assetName,
      );
    });
  });

  block.querySelector('#asset-details-previous').addEventListener('click', async (e) => {
    emitEvent(e.target, EventNames.PREVIOUS_ASSET, { assetId });
    const id = await resultsManagerObj.selectPreviousItem(assetId);
    openAssetDetailsModal(id, resultsManagerObj);
  });

  block.querySelector('#asset-details-next').addEventListener('click', async (e) => {
    emitEvent(e.target, EventNames.NEXT_ASSET, { assetId });
    const id = await resultsManagerObj.selectNextItem(assetId);
    openAssetDetailsModal(id, resultsManagerObj);
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

  assetId = getAnchorVariable('assetId');
  // open modal if assetId is present in the URL
  if (assetId) {
    block.querySelector('#asset-details-next').classList.add('hidden');
    block.querySelector('#asset-details-previous').classList.add('hidden');
    block.querySelector('.divider.first').classList.add('hidden');
    getAssetMetadata(assetId).then(() => {
      openAssetDetailsModal(assetId, resultsManagerObj);
    }).catch(() => {
      removeParamFromWindowURL('assetId');
    });
  }
}
