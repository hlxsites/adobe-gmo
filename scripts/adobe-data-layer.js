import {
  EventNames,
} from './events.js';

export function loadDataLayer() {
  //Add Event Listeners
  //document.addEventListener(EventNames.DOWNLOAD, (e) => downloadDataLayer(e.detail.assetId,e.detail.repoName));
  document.addEventListener(EventNames.DOWNLOAD, (e) => downloadDataLayer(e.detail));
}

function downloadDataLayer(detail) {
  window.adobeDataLayer = window.adobeDataLayer || [];
  var downloadAsset = {
    assetId : detail.assetId,
    repoName : detail.repoName,
    renditionName : detail.renditionName
  }
  window.adobeDataLayer.push({
    event : EventNames.DOWNLOAD,
    downloadAsset : downloadAsset
  });
}
