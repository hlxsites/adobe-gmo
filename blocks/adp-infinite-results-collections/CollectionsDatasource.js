import { createLinkHref, navigateTo } from '../../scripts/scripts.js';
import {
  getCollectionID,
  getCollectionTitle,
  searchListCollection,
} from '../../scripts/collections.js';
import { createCollectionCardElement } from '../../scripts/card-html-builder.js';

//Todo Pagination needs to be fixed not all cards are shown when there are a lot collections to show

export default class CollectionsDatasource {
  //cursor;

  infiniteResultsContainer = null;

  container = null;

  pageNumber = 0;


  lastPage = false;

  async showMore() {
    //const list = await listCollection(5, this.cursor);
    const list = await searchListCollection(5, this.pageNumber);

    //this.cursor = list.cursor;
    this.pageNumber += 1;

    if (this.pageNumber >= list.nbPages){
      this.lastPage = true;
    }

    /*
    this.infiniteResultsContainer.resultsCallback(
      this.container,
      list.items,
      () => this.showMore(),
      this.pageNumber,
      false,
      false,
      () => this.isLastPage(),
    );
    */
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
  /*
  isLastPage() {
    return !this.cursor;
  }
  */


  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    this.container = container;


    //const list = await listCollection(5, this.cursor);

    const list = await searchListCollection(5, this.pageNumber);

    //this.cursor = list.cursor;
    /*
    infiniteResultsContainer.resultsCallback(
      container,
      list.items,
      () => this.showMore(),
      0,
      true,
      true,
      () => this.isLastPage(),
    );
    */

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
