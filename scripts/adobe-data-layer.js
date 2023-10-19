import {
  EventNames,
} from './events.js';

export function loadDataLayer() {
  //Add Event Listeners
  document.addEventListener(EventNames.DOWNLOAD, (e) => downloadDataLayer(e.detail.assetId,e.detail.repoName));
}

function downloadDataLayer(assetId,name) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  var downloadAsset = {
    assetId : assetId,
    name : name
  }
  window.adobeDataLayer.push({
    event : EventNames.DOWNLOAD,
    downloadAsset : downloadAsset
  });
}
