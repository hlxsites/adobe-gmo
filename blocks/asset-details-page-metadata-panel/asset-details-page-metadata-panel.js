import { getAnchorVariable, getQueryVariable } from '../../scripts/scripts.js';
import { fetchMetadataAndCreateHTML } from '../../scripts/metadata-html-builder.js';
import { getDetailViewConfig, getDetailViewSettings } from '../../scripts/site-config.js';

export default async function decorate(block) {
  const assetId = getQueryVariable('assetId') || getAnchorVariable('assetId');
  const metadataViewConfig = getDetailViewConfig();
  const metadataDetailViewSettings = await getDetailViewSettings().hideEmptyMetadataProperty;
  const metadataElem = await fetchMetadataAndCreateHTML(
    metadataViewConfig,
    assetId,
    metadataDetailViewSettings.hideEmptyMetadataProperty,
    false,
  );
  const detailsElem = document.createElement('span');
  detailsElem.classList.add('panel-heading');
  detailsElem.textContent = 'Details';
  block.appendChild(detailsElem);
  block.appendChild(metadataElem);
}
