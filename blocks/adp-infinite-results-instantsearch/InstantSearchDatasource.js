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

export default class InstantSearchDataSource {
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

  isLastPage() {
    return this.lastRenderArgs?.isLastPage;
  }

  registerResultsCallback(container, infiniteResultsContainer) {
    const infiniteHits = window.instantsearch.connectors.connectInfiniteHits((renderArgs, isFirstRender) => {
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
