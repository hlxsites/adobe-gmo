import {
  EventNames,
} from './events.js';

import {
  getAdminConfig, } from './site-config.js';

export function loadDataLayer() {
  //Add launch script to <head>
  addLaunchScriptToHead();
  //Add Event Listeners
  document.addEventListener(EventNames.DOWNLOAD, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.SEARCH, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.FACET, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_QUICK_PREVIEW, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_DETAIL, (e) => addDataLayer(e,e.detail));
  //Comment out to eliminate error adobe-client-data-layer.min.js:1 Uncaught RangeError: Maximum call stack size exceeded
  //document.addEventListener(EventNames.INFINITE_SCROLL, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.SESSION_STARTED, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_SELECTED, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_DESELECTED, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ADD_ITEM_MULTISELECT, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.ASSET_QUICK_PREVIEW_CLOSE, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.CLOSE_BANNER, (e) => addDataLayer(e,e.detail));
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

async function addLaunchScriptToHead()
{
  var result=await getAdminConfig();
  // Create a new <script> element
  var newScript = document.createElement('script');
      newScript.src = result.launchScript;
      newScript.async = true;
  // Append the <script> element to the <head> tag
  document.head.appendChild(newScript);
}
