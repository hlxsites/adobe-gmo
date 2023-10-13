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
async function getImageElement(id, name, title, type) {
  const imgElem = document.createElement('img');
  imgElem.style.visibility = 'hidden';
  if (type) {
    getOptimizedDeliveryUrl(id, name, 1024).then((url) => {
      imgElem.src = url;
      imgElem.style.visibility = '';
    });
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
  const imgElem = await getImageElement(assetId, assetName, assetTitle, format);
  block.appendChild(imgElem);
}
