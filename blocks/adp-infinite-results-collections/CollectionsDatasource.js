import { createLinkHref, navigateTo } from '../../scripts/scripts.js';
import {
  getCollectionID,
  getCollectionTitle,
  searchListCollection,
} from '../../scripts/collections.js';
import { createCollectionCardElement } from '../../scripts/card-html-builder.js';

export default class CollectionsDatasource {
  infiniteResultsContainer = null;

  container = null;

  pageNumber = 0;

  lastPage = false;

  async showMore() {

    this.pageNumber += 1;
    const list = await searchListCollection(5, this.pageNumber);
    
    if (this.pageNumber >= list.nbPages){
      this.lastPage = true;
    }

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
    return this.lastPage;
  }

  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    this.container = container;

    const list = await searchListCollection(5, this.pageNumber);

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
    navigateTo(createLinkHref(`collection/${itemId}`));
  }
}
