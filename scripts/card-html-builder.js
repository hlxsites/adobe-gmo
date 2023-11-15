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
import { getCollection, getCollectionID, getCollectionTitle } from './collections.js';
import { openModal as openShareModal } from '../blocks/adp-share-modal/adp-share-modal.js';
import { closeAssetDetailsPanel } from '../blocks/adp-asset-details-panel/adp-asset-details-panel.js';
import { getLicenseAgreementFlags } from './site-config.js';
import { logError } from './scripts.js';

const licenseAgreementFlags = await getLicenseAgreementFlags();
let assetObj;

function getVideoOverlayCSSClass(format) {
  if (isVideo(format)) {
    return 'icon icon-videoThumbnailOverlay';
  }
  return '';
}

function createAssetThumbnail(card, id, name, title, mimeType) {
  const previewElem = card.querySelector('.preview .thumbnail');
  getOptimizedPreviewUrl(id, name, 350).then((url) => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = title;
    img.dataset.fileformat = mimeType;
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
  span.className = `icon icon-${(iconClass) ? toCamelCase(iconClass) : toCamelCase(action)}`;

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
  options,
) {
  const assetId = getAssetID(asset);
  const repoName = getAssetName(asset);
  const title = getAssetTitle(asset);
  const mimeType = getAssetMimeType(asset);
  assetObj = asset;
  // Add default thumbnail handler if not provided
  if (!options.createThumbnailHandler) {
    options.createThumbnailHandler = createAssetThumbnail;
  }

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

function createCollectionThumbnail(card, collectionId, title) {
  const imgContainer = card.querySelector('.preview-collection .thumbnail');
  getCollection(collectionId)?.then((collection) => {
    const images = collection.items.filter((item) => item.type === 'asset');
    const imagesToFetch = images.slice(0, 4);
    // Set styles based on the current count of images
    if (images.length === 1) {
      imgContainer.classList.add('one-image');
    }
    if (images.length === 2) {
      imgContainer.classList.add('two-image');
    }
    if (images.length === 3) {
      imgContainer.classList.add('three-image');
    }
    for (let index = 0; index < imagesToFetch.length; index += 1) {
      const item = imagesToFetch[index];
      getOptimizedPreviewUrl(item.id, null, 120)
        .then((url) => {
          const img = document.createElement('img');
          img.src = url;
          img.alt = title;
          imgContainer.appendChild(img);
        })
        .catch((error) => {
          logError(`Image not found for asset ID: ${error}`);
        });
    }
  });
}

export function createCollectionCardElement(
  collection,
  options,
) {
  const id = getCollectionID(collection);
  const title = getCollectionTitle(collection);
  // Add default thumbnail handler if not provided
  if (!options.createThumbnailHandler) {
    options.createThumbnailHandler = createCollectionThumbnail;
  }

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

  card.innerHTML = `
    <div class="preview preview-${toClassName(getFileType(mimeType))}">
      <a class="thumbnail asset-link" href="">
      </a>
      <div class="filetype-icon-overlay"><span class="icon"></span></div>
    </div>
    <div class="title"></div>
    <div class="metadata"></div>
  `;
  options.createThumbnailHandler(card, id, name, title, mimeType);

  card.querySelector('.metadata').addEventListener('click', (e) => {
    e.preventDefault();
    updateCheckboxState(card, id, options);
  });

  card.querySelector('.preview .thumbnail').addEventListener('click', (e) => {
    e.preventDefault();
    updateCheckboxState(card, id, options);
  });

  const span2 = card.querySelector('.filetype-icon-overlay span');
  span2.className = `icon icon-${getFileTypeCSSClass(mimeType)}`;

  const titleDiv = card.querySelector('.title');
  titleDiv.title = title;
  titleDiv.textContent = title;
  handleImageFailures(card);
  if (assetObj) {
    let isLicensed = false;
    if (assetObj.assetMetadata) {
      for (let i = 0; i < licenseAgreementFlags.length; i += 1) {
        if (assetObj.assetMetadata[licenseAgreementFlags[i]]) {
          isLicensed = true;
          break;
        }
      }
    } else {
      for (let i = 0; i < licenseAgreementFlags.length; i += 1) {
        if (assetObj[licenseAgreementFlags[i].replace(/:/g, '-')]) {
          isLicensed = true;
          break;
        }
      }
    }
    card.dataset.isLicensed = isLicensed;
  }

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
        // if detail panel is opened, close it
        if (document.querySelector('.adp-asset-details-panel').classList.contains('open')) {
          closeAssetDetailsPanel();
        }
        options.addAddToMultiSelectionHandler(id);
      } else {
        options.removeItemFromMultiSelectionHandler(id);
      }
    });
  }
  decorateIcons(card);
  return card;
}

function updateCheckboxState(card, id, options) {
  if (document.querySelector('.adp-infinite-results-container').classList.contains('has-multi-selection')) {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      checkbox.checked = false;
      options.removeItemFromMultiSelectionHandler(id);
    } else {
      checkbox.checked = true;
      options.addAddToMultiSelectionHandler(id);
    }
  } else {
    options.selectItemHandler(card);
  }
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
