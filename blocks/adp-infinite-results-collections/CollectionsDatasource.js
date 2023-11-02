import { setLastPartofURL } from '../../scripts/scripts.js';
import {
  getCollectionID,
  getCollectionTitle,
  listCollection,
  getCollection,
} from '../../scripts/collections.js';
import { createCollectionCardElement } from '../../scripts/card-html-builder.js';
import { getOptimizedPreviewUrl } from '../../scripts/polaris.js';

export default class CollectionsDatasource {
  cursor;

  infiniteResultsContainer = null;

  container = null;

  pageNumber = 0;

  async showMore() {
    const list = await listCollection(5, this.cursor);
    this.cursor = list.cursor;
    this.pageNumber += 1;
    this.infiniteResultsContainer.resultsCallback(
      this.container,
      list.items,
      () => this.showMore(),
      this.pageNumber,
      false,
      false,
      () => this.isLastPage(),
    );
  }

  isLastPage() {
    return !this.cursor;
  }

  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    this.container = container;
    const list = await listCollection(5, this.cursor);
    this.cursor = list.cursor;
    infiniteResultsContainer.resultsCallback(
      container,
      list.items,
      () => this.showMore(),
      0,
      true,
      true,
      () => this.isLastPage(),
    );
  }

  async createThumbnailHandler(card, collectionId, title, imgIndex = 0) {
    const collection = await getCollection(collectionId);
    const imgContainer = card.querySelector('.preview-collection .thumbnail');
    const images = collection.items.filter((item) => item.type === 'asset');
    const imagesToFetch = images.slice(0, 4 - imgIndex);

    for (let index = 0; index < imagesToFetch.length; index += 1) {
      const item = imagesToFetch[index];
      getOptimizedPreviewUrl(item.id, null, 120).then((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.style.visibility = '';
        img.alt = title;
        imgContainer.appendChild(img);
      });
    }
  }

  getItemId(resultItem) {
    return getCollectionID(resultItem);
  }

  getItemName(resultItem) {
    return getCollectionTitle(resultItem);
  }

  createItemElement(item, infiniteResultsContainer) {
    const card = createCollectionCardElement(
      item,
      {
        selectItemHandler: () => {
          const id = getCollectionID(item);
          infiniteResultsContainer.selectItem(id);
        },
        createThumbnailHandler: (cardElement, id, title) => {
          this.createThumbnailHandler(cardElement, id, title);
        },
      },
    );
    return card;
  }

  onItemSelected(itemElement, itemId) {
    setLastPartofURL(itemId);
  }
}
