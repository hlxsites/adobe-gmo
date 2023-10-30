import {
  getCollection,
  listCollection,
} from '../../scripts/collections.js';

function getCollectionIdFromURL() {
  const url = new URL(document.location);
  const path = url.pathname;
  const parts = path.split('/');
  const collectionId = parts[parts.length - 1];
  return collectionId;
}

function createCardForCollection() {
}

export default async function decorate(block) {
  const collectionId = getCollectionIdFromURL();
  if (collectionId) {
    const collection = getCollection(collectionId);
    if (collection) {
      createCardForCollection(block, collection);
    }
  } else {
    const list = await listCollection();
    console.log(config);
  }
}
