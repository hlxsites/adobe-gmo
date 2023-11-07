import { addEventListener, EventNames } from '../../scripts/events.js';
import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-cycle
import InstantSearchDataSource from './InstantSearchDatasource.js';

/** @type {InfiniteResultsContainer} */
let infiniteResultsContainer;

export default async function decorate(block) {
  const instantSearchDatasource = new InstantSearchDataSource();
  infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
  infiniteResultsContainer.render();
  addEventListener(EventNames.ASSET_QUICK_PREVIEW_CLOSE, (e) => {
    infiniteResultsContainer.deselectItem(e.detail.assetId);
  });
  addEventListener(EventNames.CLOSE_BANNER, () => {
    infiniteResultsContainer.clearAllSelections();
  });
}
