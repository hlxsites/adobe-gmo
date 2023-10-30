import { EventNames } from '../../scripts/events.js';
import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
import LinkShareDatasource from './LinkShareDatasource.js';

let infiniteResultsContainer;

export default async function decorate(block) {
  const instantSearchDatasource = new LinkShareDatasource();
  infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
  addEventListener(EventNames.ASSET_QUICK_PREVIEW_CLOSE, (e) => {
    infiniteResultsContainer.deselectItem(e.detail.assetId);
  });
}

export function selectNextCard() {
  return infiniteResultsContainer.selectNextItem();
}

export function selectPreviousCard() {
  return infiniteResultsContainer.selectPreviousItem();
}

export function selectCard(card) {
  return infiniteResultsContainer.selectItem(card);
}

export function hasNextCard() {
  return infiniteResultsContainer.hasNextItem();
}

export function hasPreviousCard() {
  return infiniteResultsContainer.hasPreviousItem();
}

export function openLinkShare(id) {
  const url = `/share/${id}`;
  // change the url
  window.history.pushState({}, '', url);
}
