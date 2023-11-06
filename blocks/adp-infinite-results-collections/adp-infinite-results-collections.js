import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-unresolved
import CollectionsDatasource from './CollectionsDatasource.js';

export default async function decorate(block) {
  const instantSearchDatasource = new CollectionsDatasource();
  const infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
  infiniteResultsContainer.render();
}
