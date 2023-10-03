import { getAnchorVariable, getQueryVariable } from '../../scripts/scripts.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import { getDetailViewConfig } from '../../scripts/site-config.js';

export default async function decorate(block) {
  const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
  const metadataViewConfig = getDetailViewConfig();
  const metadataElem = await fetchMetadataAndCreateHTML(metadataViewConfig, assetId, false);
  const detailsElem = document.createElement('span');
  detailsElem.classList.add('panel-heading');
  detailsElem.textContent = 'Details';
  block.appendChild(detailsElem);
  block.appendChild(metadataElem);
}
