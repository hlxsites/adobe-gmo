import { getAnchorVariable, getQueryVariable } from '../../scripts/scripts.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';

export default async function decorate(block) {
  const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
  const metadataElem = await fetchMetadataAndCreateHTML('asset-details-page', assetId, false);
  const detailsElem = document.createElement('span');
  detailsElem.classList.add('panel-heading');
  detailsElem.textContent = 'Details';
  block.appendChild(detailsElem);
  block.appendChild(metadataElem);
}
