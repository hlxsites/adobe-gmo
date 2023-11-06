import { setLastPartofURL } from '../../scripts/scripts.js';
import {
  getCollectionID,
  getCollectionTitle,
  listCollection,
} from '../../scripts/collections.js';
import { createCollectionCardElement } from '../../scripts/card-html-builder.js';

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

  getItemId(resultItem) {
    return getCollectionID(resultItem);
  }

  getItemName(resultItem) {
    return getCollectionTitle(resultItem);
  }

  createItemElement(item, infiniteResultsContainer) {
    const id = getCollectionID(item);
    const card = createCollectionCardElement(
      item,
      {
        selectItemHandler: () => {
          infiniteResultsContainer.toggleSelection(id);
        },
        deselectItemHandler: () => {
          infiniteResultsContainer.deselectItem(id);
        },
      },
    );
    return card;
  }

  onItemSelected(itemElement, itemId) {
    setLastPartofURL(`collection/${itemId}`, true);
  }
}
