import {
  getCollection, getAssetIdFromCollectionItem,
} from '../../scripts/collections.js';
import { createAssetCardElement } from '../../scripts/card-html-builder.js';
import {
  getAnchorVariable, getQueryVariable, setHashParamInWindowURL, removeParamFromWindowURL, getPathParams,
} from '../../scripts/scripts.js';
import { getCardViewConfig, getCardViewSettings } from '../../scripts/site-config.js';
import { openAssetDetailsPanel, closeAssetDetailsPanel } from '../adp-asset-details-panel/adp-asset-details-panel.js';
import { getAssetMetadata } from '../../scripts/polaris.js';
import { EventNames, emitEvent } from '../../scripts/events.js';

const searchResultsCardViewConfig = await getCardViewConfig();
const searchResultsCardViewSettings = await getCardViewSettings();

export default class CollectionsDatasource {
  /**
   * @type {InfiniteResultsContainer}
   */
  infiniteResultsContainer = null;

  /**
   * @type {HTMLElement}
   */
  container = null;

  constructor(collectionId) {
    this.collectionId = collectionId;
  }

  async showMore() {
    // not needed
  }

  isLastPage() {
    return true;
  }

  async loadCollection(collectionId) {
    this.collectionId = collectionId;
    const collection = await getCollection(collectionId);
    this.infiniteResultsContainer.resultsCallback(
      this.container,
      collection.items,
      () => this.showMore(),
      0,
      true,
      true,
      () => this.isLastPage(),
    );
  }

  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    const collection = await getCollection(getPathParams().at(-1));
    if (collection === undefined) {
      return;
    }
    this.container = container;
    infiniteResultsContainer.resultsCallback(
      container,
      collection.items,
      () => this.showMore(),
      0,
      true,
      true,
      () => this.isLastPage(),
    );
  }

  async createItemElement(item, infiniteResultsContainer) {
    const assetJSON = await getAssetMetadata(getAssetIdFromCollectionItem(item));
    const assetId = this.getItemId(item);
    const card = await createAssetCardElement(
      assetJSON,
      searchResultsCardViewConfig,
      searchResultsCardViewSettings.hideEmptyMetadataProperty,
      this.getExcludedItemActions(),
      {
        selectItemHandler: () => {
          infiniteResultsContainer.toggleSelection(assetId);
        },
        deselectItemHandler: () => {
          infiniteResultsContainer.deselectItem(assetId);
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

  getItemId(item) {
    return item.id;
  }

  getExcludedItemActions() {
    return [];
  }

  noResultsMessage() {
    return 'No assets found in this collection.';
  }

  notFoundMessage() {
    return 'Collection not found.';
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
    removeParamFromWindowURL('assetId');
  }

  onItemSelected(item, itemId) {
    openAssetDetailsPanel(itemId, this.infiniteResultsContainer);
    emitEvent(item, EventNames.ASSET_SELECTED, {
      assetId: itemId,
    });
    setHashParamInWindowURL('assetId', itemId);
  }
}
