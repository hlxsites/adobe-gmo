import { getLastPartFromURL } from '../../scripts/scripts.js';
import InfiniteResultsContainer from '../../scripts/infinite-results/InfiniteResultsContainer.js';
// eslint-disable-next-line import/no-unresolved
import CollectionDatasource from './CollectionDatasource.js';

/** @type {InfiniteResultsContainer} */
let infiniteResultsContainer;

export default async function decorate(block) {
  const collectionId = getCollectionIdFromURL();
  const collectionDatasource = new CollectionDatasource(collectionId);
  infiniteResultsContainer = new InfiniteResultsContainer(block, collectionDatasource);
  collectionDatasource.loadCollection(collectionId);
  // listen for changes in the URL, if there is a collection id then load the collection
  window.addEventListener('popstate', async () => {
    // if the url is /collections/1234 then load the collection
    await collectionDatasource.loadCollection(getCollectionIdFromURL());
  });
}

function getCollectionIdFromURL() {
  if (window.location.pathname.startsWith('/collections/')) {
    const collectionId = getLastPartFromURL();
    if (collectionId !== undefined) {
      return collectionId.replaceAll('_', ':');
    }
  }
  return undefined;
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
