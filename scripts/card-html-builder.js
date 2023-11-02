import { decorateIcons, toCamelCase, toClassName } from './lib-franklin.js';
import { getOptimizedPreviewUrl } from './polaris.js';
import {
  isVideo, getFailedPlaceholderImgSrc, getFileType, getFileTypeCSSClass,
} from './filetypes.js';
import {
  getAssetID, getAssetMimeType, getAssetName, getAssetTitle,
} from './metadata.js';
import { createMetadataHTML } from './metadata-html-builder.js';
import { openDownloadModal } from '../blocks/adp-download-modal/adp-download-modal.js';
import { getCollectionID, getCollectionTitle } from './collections.js';
import { openModal as openShareModal } from '../blocks/adp-share-modal/adp-share-modal.js';
import { getCollection } from './collections.js';
function getVideoOverlayCSSClass(format) {
  if (isVideo(format)) {
    return 'icon icon-videoThumbnailOverlay';
  }
  return '';
}

/**
 * In case the preview image fails to load, we replace it with a placeholder image
 * @param {HTMLElement} cardElement - card element
 */
function handleImageFailures(cardElement) {
  cardElement.querySelectorAll('.thumbnail > img').forEach((el) => {
    el.addEventListener('error', (e) => {
      e.target.src = getFailedPlaceholderImgSrc(e.target.dataset.fileformat);
      const parentElem = e.target.closest('.preview');
      if (parentElem) {
        parentElem.classList.add('placeholder-img-not-found');
      }
    });
  });
}

function createActionButton(action, label, clickHandler, iconClass) {
  // Create the 'a' element
  const a = document.createElement('a');
  a.className = `action-${action}`;

  // Create the 'span' element
  const span = document.createElement('span');
  span.className = `icon icon-${(iconClass)?toCamelCase(iconClass):toCamelCase(action)}`;

  // Append the 'span' to the 'a'
  a.appendChild(span);

  // Add the text node "Download" to the 'a'
  const downloadText = document.createTextNode(label);
  a.appendChild(downloadText);
  decorateIcons(a);
  // Add the click handler
  a.addEventListener('click', (e) => {
    e.preventDefault();
    clickHandler();
  });
  return a;
}

/**
 * Create the card element for the asset including the metadata
 * @param {*} asset - asset metadata object - either the algolia instantsearch hit or the polaris asset /metadata JSON
 * @param {*} assetMetadataConfig - asset metadata configuration
 * @param {boolean} hideEmptyMetadataProperty - whether to hide empty metadata properties or not
 * @param {*} excludedActions - list of actions to exclude from the card, e.g. ['share']
 * @param {*} options - options for the card element
 * @param {*} options.selectAssetHandler - function to call when the asset is selected
 * @param {*} options.deselectAssetHandler - function to call when the asset is deselected
 * @param {*} options.addAddToMultiSelectionHandler - function to call when the asset is added to the multi-selection
 * @param {*} options.removeItemFromMultiSelectionHandler - function to call when the asset is removed from the multi-selection
 * @param {*} options.createThumbnailHandler - function to call when the thumbnail is created
 * @returns - the card element
 */
export function createAssetCardElement(
  asset,
  assetMetadataConfig,
  hideEmptyMetadataProperty,
  excludedActions,
  options = {
    selectAssetHandler,
    deselectAssetHandler,
    addAddToMultiSelectionHandler,
    removeItemFromMultiSelectionHandler,
  }
) {
  const assetId = getAssetID(asset);
  const repoName = getAssetName(asset);
  const title = getAssetTitle(asset);
  const mimeType = getAssetMimeType(asset);
  const card = createCardElement(
    mimeType,
    assetId,
    repoName,
    title,
    options,
  );

  const metadataElem = card.querySelector('.metadata');
  const cardMetadataElem = createCardMetadataHTML(assetMetadataConfig, asset, hideEmptyMetadataProperty);
  metadataElem.appendChild(cardMetadataElem);

  decorateIcons(card);
  const actionsElement = document.createElement('div');
  actionsElement.className = 'actions';
  card.appendChild(actionsElement);
  const downloadButton = createActionButton('download', 'Download', () => {
    openDownloadModal(assetId, repoName, mimeType);
  });
  actionsElement.appendChild(downloadButton);

  if (!excludedActions || !excludedActions.includes('share')) {
    const shareButton = createActionButton('share', 'Share', () => {
      openShareModal(assetId, repoName, title, mimeType);
    }, 'share');
    actionsElement.appendChild(shareButton);
  }
  return card;
}

export function createCollectionCardElement(
  collection,
  options = {
    selectAssetHandler,
    deselectAssetHandler,
    addAddToMultiSelectionHandler,
    removeItemFromMultiSelectionHandler,
  },
) {
  const id = getCollectionID(collection);
  const title = getCollectionTitle(collection);
  const config = [{
    aemMetadataField: 'description',
    label: 'Description',
    metadataField: 'description',
    layout: 'row',
  }];

  const card = createCardElement(
    'collection',
    id,
    title,
    title,
    options,
  );
  const metadataElem = card.querySelector('.metadata');
  const cardMetadataElem = createCardMetadataHTML(config, collection, true, metadataElem);
  metadataElem.appendChild(cardMetadataElem);
  return card;
}

function createCardElement(
  mimeType,
  id,
  name,
  title,
  options = {},
) {
  const fileType = getFileType(mimeType);

  const card = document.createElement('div');
  card.classList.add(`filetype-${fileType}`);

  if (mimeType === 'collection') {
    card.innerHTML = `
    <div class="preview preview-collection">
      <a class="thumbnail asset-link" href="">
      </a>
      <div class="filetype-icon-overlay"><span class="icon"></span></div>
    </div>
    <div class="title"></div>
    <div class="metadata"></div>
  `;

    card.querySelector('.preview-collection .thumbnail').addEventListener('click', (e) => {
      e.preventDefault();
      options.selectItemHandler(card);
    });

    options.createThumbnailHandler(card, id, title);
  } else {
    console.log('card ', card);
    card.innerHTML = `
    <div class="preview">
      <a class="thumbnail asset-link" href="">
          <img>
          <div class="preview-overlay"><span></span></div>
      </a>
      <div class="filetype-icon-overlay"><span class="icon"></span></div>
    </div>
    <div class="title"></div>
    <div class="metadata"></div>
  `;

    card.querySelector('.preview .thumbnail').addEventListener('click', (e) => {
      e.preventDefault();
      options.selectItemHandler(card);
    });

    const img = card.querySelector('.preview .thumbnail img');
    getOptimizedPreviewUrl(id, name, 350).then((url) => {
      img.src = url;
      img.style.visibility = '';
      img.alt = title;
    });

    const span1 = card.querySelector('.preview-overlay span');
    span1.className = getVideoOverlayCSSClass(mimeType);
  }

  const span2 = card.querySelector('.filetype-icon-overlay span');
  span2.className = `icon icon-${getFileTypeCSSClass(mimeType)}`;

  const titleDiv = card.querySelector('.title');
  titleDiv.title = title;
  titleDiv.textContent = title;
  handleImageFailures(card);

  // if we support multi-selection, add checkbox to card
  if (options.addAddToMultiSelectionHandler && options.removeItemFromMultiSelectionHandler) {
    const checkboxLabel = document.createElement('label');
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.setAttribute('aria-label', `Add "${title}" to the selection`);
    checkboxContainer.appendChild(checkboxInput);
    checkboxLabel.appendChild(checkboxContainer);
    card.querySelector('.preview').appendChild(checkboxLabel);
    checkboxInput.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.checked) {
        options.addAddToMultiSelectionHandler(id);
      } else {
        options.removeItemFromMultiSelectionHandler(id);
      }
    });
  }

  return card;
}


function createCardMetadataHTML(assetMetadataConfig, asset, hideEmptyMetadataProperty) {
  const metadataFieldsElem = createMetadataHTML(assetMetadataConfig, asset, hideEmptyMetadataProperty);
  // add style to metadata element to make it span 2 or 3 columns if there are empty spaces
  const numOfRows = 2;
  const numOfColumns = 3;
  const emptySpaces = (numOfRows * numOfColumns) - metadataFieldsElem.children.length;

  function markTruncatedFields() {
    const metadataNodes = metadataFieldsElem.querySelectorAll('.metadata-field');
    // skip spanning on 1st row
    for (let i = numOfColumns; i < metadataNodes.length; i += 1) {
      // remove any span assignments so they can assigned based on window resize
      metadataNodes[i].classList.remove('span-2-columns');
      metadataNodes[i].classList.remove('span-3-columns');
      metadataNodes[i].classList.remove('truncated');

      const valueField = metadataNodes[i].querySelector('.value');
      if (valueField.scrollWidth > valueField.clientWidth) {
        // nodes to be truncated
        metadataNodes[i].classList.add('truncated');
      }
    }
    // design choice: span data columns in 2nd row when there are unused columns
    const truncatedFields = metadataFieldsElem.querySelectorAll('.metadata-field.truncated');
    if (emptySpaces === 1) {
      if (truncatedFields.length === 1) {
        // when there is only 1 item that's truncated, span it to entire row
        truncatedFields[0].classList.add('span-2-columns');
      } else if (truncatedFields.length === 2) {
        // when there are multiple items truncated; span only last item to 2 columns,
        // there will be no more columns left after spanning the last item.
        truncatedFields[truncatedFields.length - 1].classList.add('span-2-columns');
      }
    } else if (emptySpaces === 2) {
      if (truncatedFields.length === 1) {
        // when there is only 1 item that's truncated, span it to entire row
        truncatedFields[0].classList.add('span-3-columns');
      }
    }
  }

  if (emptySpaces > 0) {
    const resizeObserver = new ResizeObserver(markTruncatedFields);
    resizeObserver.observe(metadataFieldsElem);
  }
  return metadataFieldsElem;
}
