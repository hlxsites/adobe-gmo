import { addEventListener, EventNames } from '../../scripts/events.js';
import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
import LinkShareDatasource from './LinkShareDatasource.js';

let infiniteResultsContainer;

export default async function decorate(block) {
  const instantSearchDatasource = new LinkShareDatasource();
  infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
  infiniteResultsContainer.render();

  addEventListener(EventNames.ASSET_QUICK_PREVIEW_CLOSE, (e) => {
    infiniteResultsContainer.deselectItem(e.detail.assetId);
  });
  addEventListener(EventNames.CLOSE_BANNER, () => {
    infiniteResultsContainer.clearAllSelections();
  });
}

export function openLinkShare(id) {
  const url = `/share/${id}`;
  // change the url
  window.history.pushState({}, '', url);
}

export function selectAllAssets() {
  infiniteResultsContainer.selectAllItems();
}

export function deselectAllAssets() {
  infiniteResultsContainer.deselectAllItems();
}


