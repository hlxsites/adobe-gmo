import { decorateIcons } from '../../scripts/lib-franklin.js';
import {
  getFileTypeCSSClass,
} from '../../scripts/filetypes.js';
import { getAssetMetadata } from '../../scripts/polaris.js';
import { getMetadataValue } from '../../scripts/metadata.js';
import {
  getQueryVariable, getAnchorVariable,
} from '../../scripts/scripts.js';

function createFileTypeIcon(dcFormat) {
  const fileTypeIconClass = getFileTypeCSSClass(dcFormat);
  const fileTypeIcon = document.createElement('span');
  fileTypeIcon.classList.add('icon');
  fileTypeIcon.classList.add(`icon-${fileTypeIconClass}`);
  return fileTypeIcon;
}

export default async function decorate(block) {
  const assetJSON = await getAssetMetadata(getQueryVariable('assetId') || getAnchorVariable('assetId'));
  block.innerHTML = `
        <div class="top-left">
        <div class="file-type-image"></div>
        <div class="asset-details-page-title"></div>
        </div>
        <div class="top-right">
        <button id="asset-details-page-download" class="action action-download-asset" title="Download" aria-label="Download">
            <span class="icon icon-download"></span>
        </button>
        <button id="asset-details-page-share" class="action action-share-asset" title="Share" aria-label="Share">
            <span class="icon icon-share"></span>
        </button>
        <div class="divider">
            <style>
            #vertical-divider line {stroke: #AAAAAA; stroke-width:1}
            </style>
            <svg id="vertical-divider" width="2" height="26">
            <line x1="0" y1="0" x2="0" y2="50"></line>
            </svg>
        </div>
        <button id="asset-details-page-metadata-toggle" class="action action-previous-asset" title="Hide or View Toggle" aria-label="Metadata">
            <span class="icon icon-info"></span>
        </button>
        <button id="asset-details-page-zoom-in" class="action action-zoom-in" title="Zoom In" aria-label="Zoom In">
            <span class="icon icon-zoomIn"></span>
        </button>
        <button id="asset-details-page-zoom-out" class="action action-zoom-out" title="Zoom Out" aria-label="Zoom Out">
            <span class="icon icon-zoomOut"></span>
        </button>
        <div class="asset-details-page-zoom-level">100%</div>
        </div>
        `;
  const assetTitleDiv = block.querySelector('.asset-details-page-title');
  assetTitleDiv.textContent = getMetadataValue('repo:name', assetJSON);

  const dcFormat = getMetadataValue('dc:format', assetJSON);
  const fileTypeIcon = createFileTypeIcon(dcFormat || 'application/octet-stream');
  block.querySelector('.file-type-image').appendChild(fileTypeIcon);

  decorateIcons(block);
}
