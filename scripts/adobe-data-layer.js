import {
  EventNames,
} from './events.js';

export function loadDataLayer() {
  //Add Event Listeners
  document.addEventListener(EventNames.DOWNLOAD, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.SEARCH, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.FACET, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_QUICK_PREVIEW, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_DETAIL, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.INFINITE_SCROLL, (e) => addDataLayer(e,e.detail));
}

//Generic function to add to the adobeDataLayer
function addDataLayer(event,detail) {
  if(typeof detail !== "undefined")
  {
    window.adobeDataLayer = window.adobeDataLayer || [];
    window.adobeDataLayer.push({
      event : event.type,
      detail : event.detail
    });
  }
}
