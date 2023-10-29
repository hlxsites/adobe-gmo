import { addEventListener, EventNames } from '../../scripts/events.js';
import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-cycle
import InstantSearchDataSource from './InstantSearchDatasource.js';

/** @type {InfiniteResultsContainer} */
let infiniteResultsContainer;

export default async function decorate(block) {
  const instantSearchDatasource = new InstantSearchDataSource();
  infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
  addEventListener(EventNames.CLOSE_BANNER, () => {
    infiniteResultsContainer.clearAllSelections();
  });
}

export function getNextAssetCard() {
  return infiniteResultsContainer.selectNextItem();
}

export function getPreviousAssetCard() {
  return infiniteResultsContainer.selectPreviousItem();
}

export function getSelectedAssetCard() {
  return infiniteResultsContainer.getSelectedItem();
}

export function selectAssetCard(asset) {
  return infiniteResultsContainer.selectItem(asset);
}

export function hasNextAsset() {
  return infiniteResultsContainer.hasNextItem();
}

export function hasPreviousAsset() {
  return infiniteResultsContainer.hasPreviousItem();
}
