import { emitEvent, EventNames } from '../../scripts/events.js';
import { getCardViewConfig, getCardViewSettings, getSearchFieldConfig } from '../../scripts/site-config.js';
import { createAssetCardElement } from '../../scripts/card-html-builder.js';
// eslint-disable-next-line import/no-cycle
import { openAssetDetailsPanel, closeAssetDetailsPanel } from '../adp-asset-details-panel/adp-asset-details-panel.js';
import { getAssetID, getAssetName } from '../../scripts/metadata.js';
import { getAnchorVariable, getQueryVariable } from '../../scripts/scripts.js';

const searchFieldConfig = await getSearchFieldConfig();
const searchResultsCardViewConfig = await getCardViewConfig();
const searchResultsCardViewSettings = await getCardViewSettings();

/**
 * @typedef AlgoliaAssetRecord
 * @property {string} assetId ID of the asset from its source repository.
 */

/**
 * @typedef AlgoliaSearchResults
 * @property {Array<AlgoliaAssetRecord>} hits Search hits that are included on the current page.
 * @property {number} hitsPerPage Number of hits included on each page of the search.
 * @property {number} nbHits Total number of hits matching the current search.
 * @property {number} nbPages Total number of pages of hits in the current search.
 * @property {string} query Full text of the search query.
 * @property {number} page 0-based index of the current page of the results.
 */

/**
 * @typedef AlgoliaRenderArgs
 * @property {Array<AlgoliaAssetRecord>} currentPageHits Search hits that are included on the current page.
 * @property {Array<AlgoliaAssetRecord>} hits Search hits that are included on the current page.
 * @property {function} showMore Can be invoked with no arguments to retrieve more results for the current
 *  search from Algolia.
 * @property {AlgoliaSearchResults} results Results for the current search.
 * @property {boolean} isFirstPage True if the current page is the first page in the result set. False otherwise.
 * @property {boolean} isLastPage True if the current page is the last page in the result set. False otherwise.
 */

export default class InstantSearchDataSource {
  /**
   * @type {AlgoliaRenderArgs}
   */
  lastRenderArgs;

  constructor() {
    this.lastRenderArgs = null;
  }

  /**
   * Check if the current render is a new search or not
   * i.e. if the search query or refinement filters have changed
   * @param {*} priorRenderArgs - last render args from last time the widget was rendered
   * @param {*} currentRenderArgs - current render args from current render
   * @returns {boolean} - true if new search, false otherwise
   */
  static checkIfNewSearch(priorRenderArgs, currentRenderArgs) {
    if (!priorRenderArgs || !priorRenderArgs.results
        || priorRenderArgs.results.params === undefined) return true;
    const queryWithoutPaging = currentRenderArgs.results.params.replace(/&page=\d+/, '');
    const lastQueryWithoutPaging = priorRenderArgs.results.params.replace(/&page=\d+/, '');
    const isNewSearch = queryWithoutPaging !== lastQueryWithoutPaging;
    if (isNewSearch) {
      emitEvent(document, EventNames.SEARCH_RESULTS_CHANGED, {
        query: currentRenderArgs.results.query,
        facets: currentRenderArgs.results.disjunctiveFacets,
        results: currentRenderArgs.results,
      });
    }
    return isNewSearch;
  }

  /**
   * Based on render arguments from Algolia, retrieves the current page number specified
   * by the arguments.
   * @param {AlgoliaRenderArgs} renderArgs Render information as provided by Algolia.
   * @returns {number} 0-based index of the current page, or -1 if no page specified.
   */
  static getPageNumber(renderArgs) {
    if (renderArgs && renderArgs.results && renderArgs.results.page !== undefined) {
      return renderArgs.results.page;
    }
    return -1;
  }

  /**
   * Compares two sets of render arguments from Algolia and determines if difference between
   * the two indicates a new page. This is determined based on whether the render args
   * indicate a new search, and whether the page number is different.
   * @param {AlgoliaRenderArgs} priorRenderArgs Render information as provided by Algolia.
   * @param {AlgoliaRenderArgs} currentRenderArgs Render information as provided by Algolia.
   * @returns {boolean} True if the render args are on different pages, false otherwise.
   */
  static checkIfNewPage(priorRenderArgs, currentRenderArgs) {
    const isNewSearch = InstantSearchDataSource.checkIfNewSearch(priorRenderArgs, currentRenderArgs);
    const priorPage = InstantSearchDataSource.getPageNumber(priorRenderArgs);
    const currentPage = InstantSearchDataSource.getPageNumber(currentRenderArgs);
    return !isNewSearch && priorPage >= 0 && currentPage >= 0 && priorPage !== currentPage;
  }

  /**
   * Based on render arguments from Algolia, retrieves the current query specified
   * by the arguments.
   * @param {AlgoliaRenderArgs} renderArgs Render information as provided by Algolia.
   * @returns {string} Search query, which may be falsy if there is none specified.
   */
  static getQuery(renderArgs) {
    if (renderArgs && renderArgs.results) {
      return renderArgs.results.query;
    }
    return '';
  }

  /**
   * Compares two sets of render arguments from Algolia and determines if the search query
   * is different between them.
   * @param {AlgoliaRenderArgs} priorRenderArgs Render information as provided by Algolia.
   * @param {AlgoliaRenderArgs} currentRenderArgs Render information as provided by Algolia.
   * @returns {boolean} True if the render args have a different query.
   */
  static checkIfNewQuery(priorRenderArgs, currentRenderArgs) {
    const priorQuery = InstantSearchDataSource.getQuery(priorRenderArgs);
    const currentQuery = InstantSearchDataSource.getQuery(currentRenderArgs);
    return !!currentQuery && currentQuery !== priorQuery;
  }

  isLastPage() {
    return this.lastRenderArgs?.isLastPage;
  }

  /**
   * Registers the data source with an infinite results container so that the container is notified whenever
   * the data source has more results to load.
   * @param {HTMLElement} container Element containing the infinite results.
   * @param {import('../../scripts/infinite-results/InfiniteResultsContainer.js').default} infiniteResultsContainer
   *  Infinite results container that will be notified of new results.
   */
  registerResultsCallback(container, infiniteResultsContainer) {
    const infiniteHits = window.instantsearch.connectors.connectInfiniteHits((
      /**
       * @type {AlgoliaRenderArgs}
       */
      renderArgs,
      /**
       * @type {boolean}
       */
      isFirstRender,
    ) => {
      const isNewSearch = InstantSearchDataSource.checkIfNewSearch(this.lastRenderArgs, renderArgs);
      const {
        currentPageHits, showMore, results,
      } = renderArgs;
      infiniteResultsContainer.resultsCallback(
        container,
        currentPageHits,
        () => { showMore(); },
        results?.page,
        isFirstRender,
        isNewSearch,
        () => this.isLastPage(),
      );
      const isNewPage = InstantSearchDataSource.checkIfNewPage(this.lastRenderArgs, renderArgs);
      const eventData = {
        pageResultCount: currentPageHits?.length,
        pageIndex: results?.page,
        pageSize: results?.hitsPerPage,
        totalResultCount: results?.nbHits,
      };
      if (isNewPage) {
        emitEvent(container, EventNames.SEARCH_PAGED, eventData);
      } else if (InstantSearchDataSource.checkIfNewQuery(this.lastRenderArgs, renderArgs)) {
        emitEvent(container, EventNames.SEARCH, {
          ...eventData,
          query: results.query,
        });
      }
      this.lastRenderArgs = renderArgs;
    });
    // Note: "configure" doesn't work with infiniteHits.
    // The change doesn't get applied unless we use "customConfigure"
    const customConfigure = window.instantsearch.connectors.connectConfigure(
      () => { },
    );
    const getFilters = () => {
      if (searchFieldConfig.hideExpiredAssets) {
        const currentDate = new Date();
        const currentEpoch = Math.floor(currentDate.getTime() / 1000);
        // Algolia does not support filters based on mixed types; for example boolean & numeric field types
        // is_pur-expirationDate is a boolean type; but aloglia's engine treats boolean false as 0
        // so we can use that to our advantage for numberic filters
        return `is_pur-expirationDate = 0 OR pur-expirationDate > ${currentEpoch}`;
      }
      return '';
    };

    window.search.addWidgets([
      customConfigure({
        searchParameters: {
          hitsPerPage: 40,
          filters: getFilters(),
        },
      }),
      infiniteHits({
        container,
      }),
    ]);
    window.search.start();
  }

  createItemElement(item, infiniteResultsContainer) {
    const assetId = getAssetID(item);
    const card = createAssetCardElement(
      item,
      searchResultsCardViewConfig,
      searchResultsCardViewSettings.hideEmptyMetadataProperty,
      [],
      {
        selectItemHandler: () => {
          infiniteResultsContainer.toggleSelection(assetId);
        },
        addAddToMultiSelectionHandler: () => {
          infiniteResultsContainer.addItemToMultiSelection(assetId);
        },
        removeItemFromMultiSelectionHandler: () => {
          infiniteResultsContainer.removeItemFromMultiSelection(assetId);
        },
      },
    );
    return card;
  }

  getItemId(resultItem) {
    return getAssetID(resultItem);
  }

  getItemName(resultItem) {
    return getAssetName(resultItem);
  }

  getItemIdtoSelect() {
    const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
    if (assetId) {
      return assetId;
    }
    return undefined;
  }

  onItemDeselected(item, itemId) {
    closeAssetDetailsPanel();
    emitEvent(item, EventNames.ASSET_DESELECTED, {
      assetId: itemId,
    });
  }

  async onItemSelected(item, itemId, infiniteResultsContainer) {
    await openAssetDetailsPanel(itemId, infiniteResultsContainer);
    infiniteResultsContainer.scrollToItem(itemId);
    emitEvent(item, EventNames.ASSET_SELECTED, {
      assetId: itemId,
    });
  }
}
