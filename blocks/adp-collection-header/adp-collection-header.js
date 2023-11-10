import { getCollection, getCollectionIdFromURL } from '../../scripts/collections.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';

function createCollectionInfoHeader(collectionInfoHeader, collection) {
  // include back to collections listing similar to hide filters button
  collectionInfoHeader.innerHTML = `
        <div class="back-button">
            <a href="/collections"><span class="icon icon-filter-open"></span><span class="text">Back to Collections</span></a>
        </div>
        <div class="collection-title">
        ${collection.title}
        </div>
        <div class="stats">
            (<span class="stats-count-label">${collection.items.length}</span><span class="stats-text-label"> assets</span>)
        </div>
    `;
  decorateIcons(collectionInfoHeader);
}

export default async function decorate(block) {
  block.innerHTML = '';
  // if the url is a collection url, then we need to show the collection info header
  const collectionId = getCollectionIdFromURL();
  if (collectionId) {
    const collection = await getCollection(collectionId);
    const collectionInfoHeader = createCollectionInfoHeader(block, collection);
    block.appendChild(collectionInfoHeader);
  }
}
