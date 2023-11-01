import {
  getCollectionID,
  getCollectionTitle,
  listCollection,
} from '../../scripts/collections.js';
import { createCollectionCardElement } from '../../scripts/card-html-builder.js';

export default class CollectionsDataSource {
  cursor = null;

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
      () => { this.showMore(); },
      this.pageNumber,
      false,
      false,
      () => { this.isLastPage(); },
    );
  }

  isLastPage() {
    return false;
  }

  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    this.container = container;
    const list = await listCollection(5, this.cursor);
    this.cursor = list.cursor;
    infiniteResultsContainer.resultsCallback(
      container,
      list.items,
      () => { this.showMore(); },
      0,
      true,
      true,
      () => { this.isLastPage(); },
    );
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
      () => {
        const id = getCollectionID(item);
        infiniteResultsContainer.selectItem(id);
      },
    );
    return card;
  }
}
