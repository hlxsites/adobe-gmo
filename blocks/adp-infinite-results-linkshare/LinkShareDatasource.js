import { getLinkShare, getAssetsFromLinkShare } from '../../scripts/link-share.js';
import { getLastPartFromURL, getAnchorVariable, getQueryVariable } from '../../scripts/scripts.js';
import { getCardViewConfig, getCardViewSettings } from '../../scripts/site-config.js';
import { createAssetCardElement } from '../../scripts/card-html-builder.js';
import { openAssetDetailsPanel, closeAssetDetailsPanel } from '../adp-asset-details-panel/adp-asset-details-panel.js';
import { getAssetID, getAssetName } from '../../scripts/metadata.js';
import { EventNames, emitEvent } from '../../scripts/events.js';

const searchResultsCardViewConfig = await getCardViewConfig();
const searchResultsCardViewSettings = await getCardViewSettings();

export default class LinkShareDatasource {
  infiniteResultsContainer = null;

  async showMore() {
    // not needed
  }

  isLastPage() {
    return true;
  }

  async registerResultsCallback(container, infiniteResultsContainer) {
    this.infiniteResultsContainer = infiniteResultsContainer;
    const share = await getLinkShare(getLastPartFromURL());
    if (share === undefined) {
      return;
    }
    infiniteResultsContainer.resultsCallback(
      container,
      await getAssetsFromLinkShare(share),
      () => { this.showMore(); },
      0,
      true,
      true,
      () => { this.isLastPage(); },
    );
  }

  async createItemElement(item, infiniteResultsContainer) {
    const assetId = getAssetID(item);
    const card = await createAssetCardElement(
      item,
      searchResultsCardViewConfig,
      searchResultsCardViewSettings.hideEmptyMetadataProperty,
      this.getExcludedItemActions(),
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

  getItemId(item) {
    return item.assetId;
  }

  getItemName(item) {
    return getAssetName(item);
  }

  getExcludedItemActions() {
    return ['share'];
  }

  noResultsMessage() {
    return 'No assets found in this link share.';
  }

  notFoundMessage() {
    return 'Link share not found.';
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

  onItemSelected(item, itemId, infiniteResultsContainer) {
    openAssetDetailsPanel(itemId, infiniteResultsContainer);
    emitEvent(item, EventNames.ASSET_SELECTED, {
      assetId: itemId,
    });
  }
}
