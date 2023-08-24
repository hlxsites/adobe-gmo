import { getAssetMetadata, getOptimizedDeliveryUrl } from '../../scripts/polaris.js';
import { getQueryVariable, getAnchorVariable } from '../../scripts/scripts.js';
import { getMetadataValue } from '../../scripts/metadata.js';

/**
 * Create and return an img element for the asset
 * @param {*} id the asset id (repo:assetId)
 * @param {*} name the SEO name of the asset (usually repo:name)
 * @param {*} title the title of the asset (usually dc:title)
 * @param {*} type the file type of the asset (usually dc:format)
 * @returns an img element
 */
function getImageElement(id, name, title, type) {
  const url = getOptimizedDeliveryUrl(id, name, 1024);
  const imgElem = document.createElement('img');
  if (type) {
    imgElem.src = url;
    const altAttrib = (title) ? title.trim().replace(/"/, '"') : name.trim().replace(/"/, '"');
    imgElem.alt = altAttrib;
  }
  return imgElem;
}

export default async function decorate(block) {
  const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
  const assetJSON = await getAssetMetadata(assetId);
  const assetName = getMetadataValue('repo:name', assetJSON);
  const assetTitle = getMetadataValue('title', assetJSON);
  const format = getMetadataValue('dc:format', assetJSON);
  const imgElem = getImageElement(assetId, assetName, assetTitle, format);
  block.appendChild(imgElem);
}
