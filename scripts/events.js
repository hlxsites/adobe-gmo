export const EventNames = {
  /**
   * Sent whenever a user has successfully requested to download an asset.
   *
   * The event's detail will contain the following properties:
   * * assetId: ID of the asset that was downloaded.
   * * repoName: Repository from which the asset was downloaded.
   */
  DOWNLOAD: 'download',
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
