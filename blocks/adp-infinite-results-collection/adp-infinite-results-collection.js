import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-unresolved
import CollectionDatasource from './CollectionDatasource.js';
import { getCollectionIdFromURL } from '../../scripts/collections.js';
import { EventNames, addEventListener } from '../../scripts/events.js';

/** @type {InfiniteResultsContainer} */
let infiniteResultsContainer;

export default async function decorate(block) {
  const collectionId = getCollectionIdFromURL();
  const collectionDatasource = new CollectionDatasource(collectionId);
  infiniteResultsContainer = new InfiniteResultsContainer(block, collectionDatasource);
  infiniteResultsContainer.render();
  addEventListener(EventNames.ASSET_QUICK_PREVIEW_CLOSE, (e) => {
    infiniteResultsContainer.deselectItem(e.detail.assetId);
  });
  addEventListener(EventNames.CLOSE_BANNER, () => {
    //Uncheck select all checkbox
    document.getElementById('select-all-checkbox').checked = false;
    infiniteResultsContainer.clearAllSelections();
  });
}

export function getNextCard() {
  return infiniteResultsContainer.getNextCard();
}

export function getPreviousCard() {
  return infiniteResultsContainer.getPreviousCard();
}

export function selectCard(card) {
  return infiniteResultsContainer.selectCard(card);
}

export function hasNextCard() {
  return infiniteResultsContainer.hasNextCard();
}

export function hasPreviousCard() {
  return infiniteResultsContainer.hasPreviousCard();
}


export function selectAllAssets() {
  infiniteResultsContainer.selectAllItems();
}

export function deselectAllAssets() {
  infiniteResultsContainer.deselectAllItems();
}
