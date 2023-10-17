import { decorateIcons } from '../../scripts/lib-franklin.js';
import {
  getQueryVariable, getAnchorVariable, addDownloadHandlers, removeParamFromWindowURL,
} from '../../scripts/scripts.js';
import { getCardViewConfig, getCardViewSettings, getSearchFieldConfig } from '../../scripts/site-config.js';
import {
  getFileTypeCSSClass, getFileType, isVideo, getFailedPlaceholderImgSrc,
} from '../../scripts/filetypes.js';
import { getOptimizedPreviewUrl } from '../../scripts/polaris.js';
// eslint-disable-next-line import/no-cycle
import { openAssetDetails, closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';
import { createMetadataHTML } from '../../scripts/metadata-html-builder.js';
// Define algolia search client globals
/* global instantsearch search */

const cardViewConfig = await getCardViewConfig();
const cardViewSettings = await getCardViewSettings();
const searchFieldConfig = await getSearchFieldConfig();
let currentlySelectedAssetCard;
let lastPage = null;
let lastRenderArgs;
let lastScrollDistance = 0;

function getVideoOverlayCSSClass(format) {
  if (isVideo(format)) {
    return 'icon icon-videoThumbnailOverlay';
  }
  return '';
}

/**
 * In case the preview image fails to load, we replace it with a placeholder image
 * @param {HTMLElement} cardElem - card element
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

/**
 * Remove all placeholder cards from the container
 * @param {HTMLElement} cardsContainer - cards container element
 */
function removePlaceholderCards(cardsContainer) {
  cardsContainer.querySelectorAll('.placeholder-card').forEach((el) => {
    el.remove();
  });
}

/**
 * We add hidden cards to the end of the list to make sure the infinite scroll styles properly
 * i.e. We want to keep the same number of cards in every row of the flex container
 * @param {HTMLElement} elem - cards container element
 * @param {Array} arrayOfCards - array of cards to add placeholders to
 */
function addPlaceholderCards(elem, arrayOfCards) {
  for (let i = 0; i < 10; i += 1) {
    const card = document.createElement('div');
    card.className = 'asset-card placeholder-card';
    arrayOfCards.push(card);
  }
}

/**
 * Check if the current render is a new search or not
 * i.e. if the search query or refinement filters have changed
 * @param {*} priorRenderArgs - last render args from last time the widget was rendered
 * @param {*} currentRenderArgs - current render args from current render
 * @returns {boolean} - true if new search, false otherwise
 */
function checkIfNewSearch(priorRenderArgs, currentRenderArgs) {
  if (!priorRenderArgs || !priorRenderArgs.results
    || priorRenderArgs.results.params === undefined) return true;
  const queryWithoutPaging = currentRenderArgs.results.params.replace(/&page=\d+/, '');
  const lastQueryWithoutPaging = priorRenderArgs.results.params.replace(/&page=\d+/, '');
  return queryWithoutPaging !== lastQueryWithoutPaging;
}

/**
 * Create the asset card container and bind the scroll handler to it
 * @param {*} container - instantsearch widget container element
 * @param {*} scrollHandler - scroll handler function
 */
function createCardContainerAndBindScrollHandler(container, scrollHandler) {
  const cards = document.createElement('div');
  cards.classList.add('cards');
  container.appendChild(cards);

  // Use event on scroll instead to pre-emptively load the next page of results as
  // intersection observer doesn't fire before the user reaches the bottom of the page./
  window.addEventListener('scroll', () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = document.documentElement;
    // newScrollDistance is the distance from the top of the page to the
    // "page fold" (bottom of the viewport)
    const newScrollDistance = scrollTop + clientHeight;

    // If the user has scrolled 75% of the way through the currently loaded results
    // and we are not on the last page of results, then load the next page of results.
    // * scrollHeight - is the total height of the page (with current results loaded)
    // * scrollTop - is the current scroll position from the top of the page
    // * clientHeight - is the height of the browser window (viewport)
    if (newScrollDistance >= scrollHeight - (scrollHeight * 0.75)
      && newScrollDistance > lastScrollDistance + (scrollHeight - scrollTop)
      && !lastRenderArgs.isLastPage) {
      lastScrollDistance = scrollTop + clientHeight;
      scrollHandler();
    }
  });
}

function getAssetCard(asset) {
  if (asset instanceof HTMLElement) {
    return asset;
  } if (typeof asset === 'string') {
    return document.querySelector(`.asset-card[data-asset-id="${asset}"]`);
  }
  return undefined;
}

/**
 * De-selects the currently selected asset card or the asset card passed in
 * @param {*} asset - asset id {string} or asset card element {HTMLElement}
 * @param {boolean} removeFromURL - whether to remove the asset id from the URL or not
 */
export function deselectAssetCard(asset, removeFromURL = true) {
  let assetCard;
  if (!asset) {
    if (currentlySelectedAssetCard) {
      assetCard = currentlySelectedAssetCard;
    }
  } else {
    assetCard = getAssetCard(asset);
  }
  if (assetCard) {
    assetCard.classList.remove('selected');
    assetCard.attributes['aria-selected'] = false;
  }
  if (removeFromURL) {
    removeParamFromWindowURL('assetId');
  }
}

/**
 * Selects the asset card in the UI
 * @param {*} asset - asset id {string} or asset card element {HTMLElement}
 */
function selectAssetCard(asset) {
  const assetCard = getAssetCard(asset);

  if (assetCard) {
    assetCard.classList.add('selected');
    assetCard.attributes['aria-selected'] = true;
    currentlySelectedAssetCard = assetCard;
  }
}

function scrollToElement(element, padding = 20) {
  const rect = element.getBoundingClientRect();
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollPosition;
  const elementBottom = rect.bottom + scrollPosition;
  const windowHeight = window.innerHeight;
  if (elementTop < scrollPosition) {
    // Element is above current scroll position
    window.scrollTo({
      top: Math.max(0, elementTop - padding - 70),
      behavior: 'smooth',
    });
  } else if (elementBottom > scrollPosition + windowHeight) {
    // Element is below current scroll position
    window.scrollTo({
      top: elementBottom + padding - windowHeight,
      behavior: 'smooth',
    });
  }
}

/**
 * Handle when an asset card is clicked
 * @param {string} assetId - asset id
 * @param {HTMLElement} assetCard - asset card element
 */
export async function selectAsset(asset) {
  const assetCard = getAssetCard(asset);
  const { assetId } = assetCard.dataset;

  if (assetCard.classList.contains('selected')) {
    deselectAssetCard();
    closeAssetDetails();
  } else {
    deselectAssetCard(null, false);
    currentlySelectedAssetCard = assetCard;
    selectAssetCard(assetId);
    await openAssetDetails(assetId);
    await new Promise((resolve) => {
      setTimeout(() => {
        scrollToElement(assetCard);
        resolve();
      }, 100);
    });
  }
}

export async function selectNextAsset() {
  if (currentlySelectedAssetCard) {
    const nextAssetCard = currentlySelectedAssetCard.nextElementSibling;
    if (nextAssetCard) {
      deselectAssetCard();
      selectAsset(nextAssetCard);
    }
  }
}

export async function selectPreviousAsset() {
  if (currentlySelectedAssetCard) {
    const previousAssetCard = currentlySelectedAssetCard.previousElementSibling;
    if (previousAssetCard) {
      deselectAssetCard();
      selectAsset(previousAssetCard);
    }
  }
}

/**
 * Create the asset card element given the search result hit
 * @param {*} hit - search result hit
 * @returns {HTMLElement} asset card element
 */
function createCardElement(hit) {
  const { assetId } = hit;
  const dcFormat = hit['dc-format'];
  const dcTitle = hit['dc-title'];
  const repoName = hit['repo-name'];
  const title = dcTitle ?? repoName;
  const fileType = getFileType(dcFormat);

  const card = document.createElement('div');
  card.classList.add('asset-card');
  card.classList.add(`fileType-${fileType}`);
  card.innerHTML = `<div class="preview">
      <a class="thumbnail asset-link">
          <img>
          <div class="preview-overlay"><span></span></div>
      </a>
      <div class="filetype-icon-overlay"><span class="icon"></span></div>
  </div>
  <div class="title">
  </div>
  <div class="metadata">
  </div>
  <div class="actions">
      <a class="actions-download"><span class="icon icon-download"></span>Download</a>
  </div>`;

  card.querySelector('.preview').addEventListener('click', async () => {
    await selectAsset(card);
  });
  card.querySelector('.title').addEventListener('click', async () => {
    await selectAsset(card);
  });
  card.querySelector('.metadata').addEventListener('click', async () => {
    await selectAsset(card);
  });

  card.dataset.assetId = assetId;

  const img = card.querySelector('img');
  img.dataset.fileformat = dcFormat;
  img.style.visibility = 'hidden';
  getOptimizedPreviewUrl(assetId, repoName, 350).then((url) => {
    img.src = url;
    img.style.visibility = '';
  });
  img.alt = title;

  const span1 = card.querySelector('.preview-overlay span');
  span1.className = getVideoOverlayCSSClass(dcFormat);

  const span2 = card.querySelector('.filetype-icon-overlay span');
  span2.className = `icon icon-${getFileTypeCSSClass(dcFormat)}`;

  const titleDiv = card.querySelector('.title');
  titleDiv.title = title;
  titleDiv.textContent = title;

  const metadataElem = card.querySelector('.metadata');

  const metadataFieldsElem = createMetadataHTML(cardViewConfig, hit, cardViewSettings.hideEmptyMetadataProperty);
  metadataElem.appendChild(metadataFieldsElem);
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

  decorateIcons(card);
  handleImageFailures(card);
  const actionsDownloadA = card.querySelector('.actions-download');
  addDownloadHandlers(actionsDownloadA, assetId, repoName, dcFormat);

  return card;
}

export async function scrollToSearchResults() {
  window.scrollTo({
    top: document.getElementById('assets').offsetTop,
    behavior: 'smooth',
  });
}

export default async function decorate(block) {
  const hits = document.createElement('div');
  hits.id = 'assets';
  hits.classList.add('assets');
  block.appendChild(hits);
  block.classList.add('asset-browser');

  const infiniteHits = instantsearch.connectors.connectInfiniteHits((renderArgs, isFirstRender) => {
    const {
      currentPageHits, showMore, widgetParams,
    } = renderArgs;
    const { container } = widgetParams;

    const isNewSearch = checkIfNewSearch(lastRenderArgs, renderArgs);

    lastRenderArgs = renderArgs;

    if (isFirstRender) {
      createCardContainerAndBindScrollHandler(container, showMore);
      return;
    }

    const cards = container.querySelector('.cards');

    // if it's a new search then reset the tracking variables
    if (isNewSearch) {
      cards.innerHTML = '';
      lastPage = null;
      lastScrollDistance = 0;
    }

    // check if new search or new page
    if (isNewSearch || lastPage < renderArgs.results.page) {
      lastPage = renderArgs.results.page;

      // add new result cards
      const newCards = [];

      for (const hit of currentPageHits) {
        const card = createCardElement(hit);
        newCards.push(card);
      }

      removePlaceholderCards(cards);
      addPlaceholderCards(cards, newCards);
      cards.append(...newCards);

      const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
      if (isNewSearch && assetId) {
        const assetCard = getAssetCard(assetId);
        if (assetCard) {
          selectAsset(assetCard);
        }
      }
    }
  });
  // Note: "configure" doesn't work with infiniteHits.
  // The change doesn't get applied unless we use "customConfigure"
  const customConfigure = window.instantsearch.connectors.connectConfigure(
    () => { },
  );
  function getFilters() {
    if (searchFieldConfig.hideExpiredAssets) {
      const currentDate = new Date();
      const currentEpoch = Math.floor(currentDate.getTime() / 1000);
      // Algolia does not support filters based on mixed types; for example boolean & numeric field types
      // is_pur-expirationDate is a boolean type; but aloglia's engine treats boolean false as 0
      // so we can use that to our advantage for numberic filters
      return `is_pur-expirationDate = 0 OR pur-expirationDate > ${currentEpoch}`;
    }
    return '';
  }

  window.search.addWidgets([
    customConfigure({
      searchParameters: {
        hitsPerPage: 40,
        filters: getFilters(),
      },
    }),
    infiniteHits({
      container: document.querySelector('#assets'),
    }),
  ]);

  // close selected asset when new search doesn't contain the selected asset
  window.search.on('render', () => {
    const { helper } = window.search;
    const selectedAssetId = currentlySelectedAssetCard?.dataset.assetId;
    if (selectedAssetId) {
      if (helper.lastResults.hits.find((hit) => hit.assetId === selectedAssetId)) {
        selectAssetCard(selectedAssetId);
        scrollToElement(currentlySelectedAssetCard);
      } else {
        deselectAssetCard();
        closeAssetDetails();
        scrollToSearchResults();
      }
    }
  });
  search.start();
}
