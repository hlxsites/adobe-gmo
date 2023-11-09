export const EventNames = {
  /**
   * Sent whenever a user selects an asset in the infinite results panel.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   * * assetName: Name of the asset that was viewed.
   */
  ASSET_SELECTED: 'asset-selected', /* user selected an asset in the infinite results panel */

  /**
   * Sent whenever a user deselects an asset in the infinite results panel.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   * * assetName: Name of the asset that was viewed.
   */
  ASSET_DESELECTED: 'asset-deselected',

  /**
   * Sent whenever a user adds an asset to their cart.
   *
   * The event's detail will contain the following properties:
   * * id: ID of the item that was added.
   * * name: Name of the item that was added.
   * * type: Type of the item that was added.
   * * selections: Array of the selected ids.
   */
  ADD_ITEM_MULTISELECT: 'add-item-multiselect',

  /**
   * Sent whenever a user removes an asset from their cart.
   *
   * The event's detail will contain the following properties:
   * * id: ID of the item that was removed.
   * * name: Name of the item that was removed.
   * * type: Type of the item that was removed.
   * * selections: Array of the selected ids.
   */
  REMOVE_ITEM_MULTISELECT: 'remove-item-multiselect',

  /**
   * Sent whenever a user clicks the previous asset button in the asset details quick view.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   * * assetName: Name of the asset that was viewed.
   */
  PREVIOUS_ASSET: 'previous-asset', /* user clicked previous asset in the asset details quick view or modal */

  /**
   * Sent whenever a user clicks the next asset button in the asset details quick view.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   * * assetName: Name of the asset that was viewed.
   */
  NEXT_ASSET: 'next-asset',

  /**
   * Sent whenever the search results change.  This can happen when the user performs a search,
   * changes the refinements (facets / filters).
   *
   * The event's detail will contain the following properties:
   * * query: The current search query.
   * * facets: The current search facets.
   * * results: The current search results.
   */
  SEARCH_RESULTS_CHANGED: 'search-results-changed',

  /**
   * Sent whenever a user performs a text search for assets.
   *
   * The event's detail will contain the following properties:
   * * query: Text that the user searched for.
   * * pageResultCount: The number of results that are in the first page.
   * * pageIndex: 0-index based number of the page, which will always be 0 (indicating the first page).
   * * pageSize: The maximum number of results that are included on each page.
   * * totalResultCount: The total number of results across all pages.
   */
  SEARCH: 'search',

  /**
   * Sent whenever a user includes or excludes a facet from their filter.
   *
   * The event's detail will contain the following properties:
   * * previous: An array of the facet filters previously in place.
   * * current: An array of the facet filters now in place.
   */
  FACET: 'facet',

  /**
   * Sent whenever a user has successfully requested to download an asset.
   *
   * The event's detail will contain the following properties:
   * * downloads: Array of the items that were downloaded. Each item in the array will contain the following:
   *   * assetId: ID of the asset that was downloaded.
   *   * assetName: Name of the asset that was downloaded.
   */
  DOWNLOAD: 'download',

  /**
   * Sent whenever a user opens an asset's quick preview.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   * * assetName: Name of the asset that was viewed.
   */
  ASSET_QUICK_PREVIEW: 'asset-quick-preview',

  /**
   * Sent whenever a user closes an asset's quick preview.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was viewed.
   */
  ASSET_QUICK_PREVIEW_CLOSE: 'asset-quick-preview-close',

  /**
   * Sent whenever a user closes the top header banner (the one that displays the
   * number of selected items)
   */
  CLOSE_BANNER: 'close-banner',

  /**
   * Sent whenever a user opens an asset's extended details modal.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was opened.
   * * assetName: The name of the asset that was opened.
   */
  ASSET_DETAIL: 'asset-detail',

  /**
   * Sent whenever a user causes search results to load another page worth of items.
   *
   * The event's detail will contain the following properties:
   * * pageResultCount: The number of results that are in the new page.
   * * pageIndex: 0-index based number of the page. For example, the first page is
   *    index 0, second page is index 1, etc.
   * * pageSize: The maximum number of results that are included on each page.
   * * totalResultCount: The total number of results across all pages.
   */
  SEARCH_PAGED: 'search-paged',

  /**
   * Sent whenever a user shares one or more assets.
   *
   * The event's detail will contain the following properties:
   * * shared : Array of the share assets. Each item in the array will contain the following:
   *   * assetId: ID of the asset that was shared.
   *   * assetName: Name of the asset that was shared.
   */
  SHARE_LINK: 'share-link',

  /**
   * Sent whenever a logged in users starts a new session.
   *
   * The event's detail will contain the following properties:
   * * email: Email address of the user.
   * * displayName: The user's full name.
   */
  SESSION_STARTED: 'session-started',

  /**
   * Sent whenever one of the portal's pages loads.
   *
   * The event's detail will contain the following properties:
   * * url: Full URL of the page that was loaded.
   */
  PAGE_VIEW: 'page-view',
};

/**
 * Emits a new event that can inform consumers of key actions in the site. The event
 * will bubble all the way to the document, so consumers can listen for the event
 * on the element provided in the method, or any of its parents up to and including
 * the document.
 * @param {HTMLElement} element The element that will be the target of the event.
 * @param {string} eventName The name of the event to send.
 * @param {*} [eventData] Additional data, if any, to include in the event's detail.
 */
export function emitEvent(element, eventName, eventData = {}) {
  const event = new CustomEvent(eventName, {
    detail: eventData,
    bubbles: true,
  });
  element.dispatchEvent(event);
}

/**
 * Registers a callback that will be invoked whenever a given event is sent.
 * @param {string} eventName The name of the event to listen for.
 * @param {function} callback Will be invoked with standard javascript
 *  event information as a parameter. The data will include a "detail"
 *  property containing any non-standard information associated with
 *  the event.
 */
export function addEventListener(eventName, callback) {
  document.addEventListener(eventName, callback);
}
