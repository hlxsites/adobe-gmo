import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-unresolved
import CollectionsDataSource from './CollectionsDataSource.js';

/** @type {InfiniteResultsContainer} */
let infiniteResultsContainer;

export default async function decorate(block) {
  const instantSearchDatasource = new CollectionsDataSource();
  infiniteResultsContainer = new InfiniteResultsContainer(block, instantSearchDatasource);
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
