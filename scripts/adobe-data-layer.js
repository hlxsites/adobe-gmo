import {
  EventNames,
} from './events.js';

export function loadDataLayer() {
  //Add Event Listeners
  //document.addEventListener(EventNames.DOWNLOAD, (e) => downloadDataLayer(e.detail));

  document.addEventListener(EventNames.DOWNLOAD, (e) => addDataLayer(e,e.detail));
  document.addEventListener(EventNames.SEARCH, (e) => addDataLayer(e,e.detail));
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
