import { emitEvent, EventNames } from '../events.js';
import { getNavHeight } from '../../blocks/adp-header/adp-header.js'

const NUMBER_OF_PLACEHOLDERS = 10;
const DEFAULT_NO_RESULTS_MSG = '';
const ADP_ITEM_CSS_CLASS = 'adp-result-item';

export default class InfiniteResultsContainer {
  #currentlySelectedElement;

  #lastPage;

  #container;

  #lastScrollDistance;

  datasource;

  #selectedItems = [];

  constructor(block, datasource) {
    if (!datasource.getItemId) {
      throw new Error(`Datasource ${datasource?.constructor?.name} must implement function getItemId`, datasource);
    }
    if (!datasource.createItemElement) {
      throw new Error(`Datasource ${datasource?.constructor?.name} must implement function createItemElement`, datasource);
    }
    if (!datasource.registerResultsCallback) {
      throw new Error(`Datasource ${datasource?.constructor?.name} must implement function registerResultsCallback`, datasource);
    }
    this.datasource = datasource;
    block.innerHTML = '';
    block.parentElement.classList.add('adp-infinite-results-wrapper');
    block.classList.add('adp-infinite-results');
    const items = document.createElement('div');
    items.id = 'items';
    items.classList.add('items', 'adp-infinite-results-container');
    this.#container = items;
    block.appendChild(items);

    this.datasource.registerResultsCallback(items, this);
  }

  #getIdsFromSelection() {
    return this.#selectedItems.map((item) => item.dataset.itemId);
  }

  #getScrollParent(node) {
    if (node == null) {
      return null;
    }

    if (node.scrollHeight > node.clientHeight) {
      return node;
    }
    return this.#getScrollParent(node.parentNode);
  }

  #bindScrollHandler(container, showMoreCallback, isLastPageCallback) {
    // Use event on scroll instead to pre-emptively load the next page of results as
    // an IntersectionObserver doesn't fire before the user reaches the bottom of the page.
    // Using a scroll caclulation gives a smoother infinite scroll experience.
    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = this.#getScrollParent(container);
      // newScrollDistance is the distance from the top of the page to the
      // "page fold" (bottom of the viewport)
      const newScrollDistance = scrollTop + clientHeight;

      // If the user has scrolled 75% of the way through the currently loaded results
      // and we are not on the last page of results, then load the next page of results.
      // * scrollHeight - is the total height of the page (with current results loaded)
      // * scrollTop - is the current scroll position from the top of the page
      // * clientHeight - is the height of the browser window (viewport)
      if (newScrollDistance >= scrollHeight - (scrollHeight * 0.75)
            && newScrollDistance > this.#lastScrollDistance + (scrollHeight - scrollTop)
            && !isLastPageCallback()) {
        this.#lastScrollDistance = scrollTop + clientHeight;
        showMoreCallback();
      }
    });
  }

  /**
   * Remove all placeholder cards from the container
   * @param {HTMLElement} cardsContainer - cards container element
   */
  static removePlaceholderCards(cardsContainer) {
    cardsContainer.querySelectorAll('.placeholder-card').forEach((el) => {
      el.remove();
    });
  }

  static createPlaceholderCardElement() {
    const card = document.createElement('div');
    card.className = 'adp-result-item placeholder-card';
    return card;
  }

  /**
   * We add hidden cards to the end of the list to make sure the infinite scroll styles properly
   * i.e. We want to keep the same number of cards in every row of the flex container
   * @param {HTMLElement} elem - cards container element
   * @param {Array} arrayOfCards - array of cards to add placeholders to
   */
  static addPlaceholderCards(elem, arrayOfCards) {
    for (let i = 0; i < NUMBER_OF_PLACEHOLDERS; i += 1) {
      const card = InfiniteResultsContainer.createPlaceholderCardElement();
      arrayOfCards.push(card);
    }
  }

  /**
   * Get the item, if you pass in an item id it will return the element.
   * If you pass in an element it will return the element.
   *
   * @param {string|HTMLElement} item - item id {string} or item card element {HTMLElement}
   * @returns {HTMLElement} - element
   */
  #getItem(item) {
    if (item instanceof HTMLElement) {
      return item;
    }
    // if it's an object then get the item id from the datasource
    if (typeof item === 'object') {
      return this.getItemByItemId(this.datasource.getItemId(item));
    }
    // if it's a string or number then get the item by the item id
    if (typeof item === 'string' || typeof item === 'number') {
      return this.getItemByItemId(item);
    }
    return undefined;
  }

  /**
   * Returns an element by the item id
   *
   * @param {string} itemId - item id
   * @returns {HTMLElement} - element
   */
  getItemByItemId(itemId) {
    return this.#container.querySelector(`.${ADP_ITEM_CSS_CLASS}[data-item-id="${itemId}"]`);
  }

  /**
   * De-selects the currently selected item element or the item element passed in
   * @param {string|HTMLElement} asset - asset id {string} or item element element {HTMLElement}
   * @param {boolean} removeFromURL - whether to remove the asset id from the URL or not
   */
  deselectItem(item) {
    let itemCard;
    if (!item) {
      if (this.#currentlySelectedElement) {
        itemCard = this.#currentlySelectedElement;
      }
    } else {
      itemCard = this.#getItem(item);
    }
    if (itemCard) {
      itemCard.classList.remove('selected');
      itemCard.removeAttribute('aria-expanded');
    }
    this.datasource.onItemDeselected?.(itemCard, itemCard.dataset.itemId, this);
  }

  /**
   * Adds an item to multi-selection (sets css class 'checked' on the item's {HTMLElement})
   * @param {*} item - item id {string} or item card element {HTMLElement} or item object json {object}
   */
  addItemToMultiSelection(item) {
    const itemCard = this.#getItem(item);
    if (itemCard) {
      itemCard.classList.add('checked');
      itemCard.attributes['aria-selected'] = true;
      this.#selectedItems = [...this.#selectedItems, itemCard];
    }
    this.#container.classList.add('has-multi-selection');
    emitEvent(itemCard, EventNames.ADD_ITEM_MULTISELECT, {
      id: itemCard.dataset.itemId,
      name: itemCard.dataset.itemName,
      selections: this.#getIdsFromSelection(),
    });
  }

  /**
   * Removes an item to multi-selection (removes css class 'checked' on the item's {HTMLElement})
   * @param {*} item - item id {string} or item card element {HTMLElement} or item object json {object}
   */
  removeItemFromMultiSelection(item) {
    const itemCard = this.#getItem(item);
    if (itemCard) {
      itemCard.classList.remove('checked');
      itemCard.removeAttribute('aria-selected');
      itemCard.querySelector('input[type="checkbox"]').checked = false;
      this.#selectedItems = this.#selectedItems.filter((selectionItem) => selectionItem.dataset.itemId !== itemCard.dataset.itemId);
      if (this.#selectedItems.length === 0) {
        this.#container.classList.remove('has-multi-selection');
      }
    }
    emitEvent(itemCard, EventNames.REMOVE_ITEM_MULTISELECT, {
      id: itemCard.dataset.itemId,
      name: itemCard.dataset.itemName,
      selections: this.#getIdsFromSelection(),
    });
  }

  /**
   * Selects the item element in the UI
   * @param {string|HTMLElement} item - item id {string} or item card element {HTMLElement}
   */
  #selectItemElement(item) {
    const itemElem = this.#getItem(item);

    if (itemElem) {
      if (this.#currentlySelectedElement) {
        this.#currentlySelectedElement.classList.remove('selected');
        this.#currentlySelectedElement.attributes['aria-selected'] = false;
      }
      itemElem.classList.add('selected');
      itemElem.attributes['aria-selected'] = true;
      this.#currentlySelectedElement = itemElem;
    }
  }

  #scrollToElement(element, padding = 26) {
    const rect = element.getBoundingClientRect();
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const headerHeight = getNavHeight();
    const elementTop = rect.top - headerHeight + scrollPosition;
    const elementBottom = rect.bottom + scrollPosition;
    const windowHeight = window.innerHeight;
    if (elementTop < scrollPosition) {
    // Element is above current scroll position
      window.scrollTo({
        top: Math.max(0, elementTop - padding),
        behavior: 'smooth',
      });
    } else if (elementBottom > scrollPosition + windowHeight) {
    // Element is below current scroll position
      window.scrollTo({
        top: elementBottom + padding - windowHeight,
        behavior: 'smooth',
      });
    }
  }

  hasPreviousItem() {
    if (this.#currentlySelectedElement) {
      const previousAssetCard = this.#currentlySelectedElement.previousElementSibling;
      return !!previousAssetCard;
    }
    return false;
  }

  hasNextItem() {
    if (this.#currentlySelectedElement) {
      const nextItemElement = this.#currentlySelectedElement.nextElementSibling;
      if (nextItemElement
        && nextItemElement.classList.contains(ADP_ITEM_CSS_CLASS)
        && !nextItemElement.classList.contains('placeholder-card')) {
        return nextItemElement;
      }
    }
    return false;
  }

  /**
   * Handle when an item element is clicked
   * @param {HTMLElement|string} asset Asset to select
   */
  async selectItem(item) {
    const assetCard = this.#getItem(item);
    const { itemId } = assetCard.dataset;

    if (assetCard.classList.contains('selected')) {
      this.deselectItem();
    } else {
      this.#selectItemElement(itemId);
      this.datasource.onItemSelected?.(assetCard, itemId, this);
      // Scroll to the selected item
      await new Promise((resolve) => {
        setTimeout(() => {
          this.#scrollToElement(assetCard);
          resolve();
        }, 100);
      });
    }
  }

  async selectNextItem() {
    if (this.#currentlySelectedElement) {
      const nextItemCard = this.#currentlySelectedElement.nextElementSibling;
      if (nextItemCard) {
        await this.selectItem(nextItemCard);
        return nextItemCard.dataset.itemId;
      }
    }
    return undefined;
  }

  async selectPreviousItem() {
    if (this.#currentlySelectedElement) {
      const previousItemCard = this.#currentlySelectedElement.previousElementSibling;
      if (previousItemCard) {
        await this.selectItem(previousItemCard);
        return previousItemCard.dataset.itemId;
      }
    }
    return undefined;
  }

  getExcludedItemActions() {
    return this.datasource.getExcludedItemActions?.();
  }

  async scrollToTopOfContainer() {
    window.scrollTo({
      top: this.#container.offsetTop,
      behavior: 'smooth',
    });
  }

  #reset() {
    this.#container.innerHTML = '';
    this.#currentlySelectedElement = null;
    this.#lastPage = null;
    this.#lastScrollDistance = 0;
    this.#selectedItems = [];
  }

  /**
   * Clears all selections
   */
  clearAllSelections() {
    this.#selectedItems = [];
    this.#container.querySelectorAll('.adp-result-item.checked').forEach((el) => {
      this.removeItemFromMultiSelection(el);
    });
    this.#container.classList.remove('has-multi-selection');
  }

  /**
   * Creates the no results element
   * @param {string|HTMLElement} noResultsMessage - message to display when there are no results
   */
  #createNoResultsElement(noResultsMessage) {
    const noResults = document.createElement('div');
    noResults.classList.add('adp-no-results');
    if (typeof noResultsMessage === 'string') {
      noResults.innerText = noResultsMessage;
    } else {
      noResults.appendChild(noResultsMessage);
    }
    return noResults;
  }

  #renderNoResults(containerElem, isError = false) {
    let noResultsElement;
    if (isError) {
      noResultsElement = this.#createNoResultsElement(this.datasource.notFoundMessage?.()
                              || this.datasource.noResultsMessage?.()) || DEFAULT_NO_RESULTS_MSG;
    } else {
      noResultsElement = this.#createNoResultsElement(this.datasource.noResultsMessage?.() || DEFAULT_NO_RESULTS_MSG);
    }
    containerElem.append(noResultsElement);
  }

  /**
   * Callback function to render the results
   * @param {HTMLElement} container - container element to render the results in
   * @param {Array<object>} items - items to render
   * @param {Function} showMoreCallback - function to call to load more results
   * @param {number} pageNumber - current page number
   * @param {boolean} isFirstRender - true if first render, false otherwise
   * @param {boolean} isNewSearch - true if new search, false otherwise
   * @param {Function} lastPageCallback - function to call to check if we reached the last page
   *  (called before showMore to check if we need to load more results)
   */
  async resultsCallback(container, items, showMoreCallback, pageNumber, isFirstRender, isNewSearch, lastPageCallback) {
    if (isFirstRender) {
      const scrollHandler = () => {
      // Send event when the triggers an infinite scroll showMore event
        emitEvent(document.documentElement, EventNames.INFINITE_SCROLL, { datasource: this.datasource });
        showMoreCallback();
      };
      this.#bindScrollHandler(container, scrollHandler, lastPageCallback);
    }
    const page = pageNumber || 0;
    const cards = this.#container;
    // if it's a new search then reset the tracking variables
    if (isNewSearch) {
      this.#reset();

      // if there are no results or an error (items is undefined)
      // then render the no results element
      const isErrorNotFound = items === undefined;
      const isNoResults = items && items.length === 0;
      if (isErrorNotFound || isNoResults) {
        this.#lastPage = page;
        this.#renderNoResults(cards, isErrorNotFound);
      }
    }

    // check if new search or new page
    if (isNewSearch || this.#lastPage < page) {
      this.#lastPage = page;

      // add new result cards
      let newCards = [];
      const createItemElement = async (item) => {
        const card = await this.datasource.createItemElement(item, this);
        card.classList.add('adp-result-item');
        card.dataset.itemId = this.datasource.getItemId(item);
        if (this.datasource.getItemName) {
          card.dataset.itemName = this.datasource.getItemName(item);
        }
        return card;
      };
      // Collect all promises before appending to the DOM to avoid layout thrashing
      for (const item of items) {
        const card = createItemElement(item);
        newCards.push(card);
      }
      newCards = await Promise.all(newCards);

      InfiniteResultsContainer.removePlaceholderCards(cards);
      InfiniteResultsContainer.addPlaceholderCards(cards, newCards);
      cards.append(...newCards);

      const itemId = this.datasource.getItemIdtoSelect?.();
      if (isNewSearch && itemId) {
        const assetCard = this.#getItem(itemId);
        if (assetCard) {
          this.selectItem(assetCard);
        }
      }
      // If the items don't fill the viewport then we need to load more
      // results to make sure the item is in the viewport.
      if (!lastPageCallback()) {
        const rect = this.#container
          .querySelector(`.adp-result-item:nth-last-child(${NUMBER_OF_PLACEHOLDERS + 1})`)
          ?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight) {
          await showMoreCallback();
        }
      }
    }
  }

  /**
   * Hides the container
   */
  hide() {
    this.#container.classList.add('hidden');
  }
}
