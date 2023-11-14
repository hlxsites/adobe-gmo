import { decorateIcons } from './lib-franklin.js';
import { getOptimizedPreviewUrl } from './polaris.js';

/**
 * Create a single row for the table of multi selected assets
 * @param assetId
 * @param assetName
 * @param title
 * @param format
 * @returns {HTMLDivElement}
 */
function createAssetRow(assetId, assetName, title, format) {
  const row = document.createElement('div');
  row.classList.add('asset-row');
  row.innerHTML = `
    <div class="asset-row-content">
      <div class="asset-thumbnail">
        <img/>
      </div>
      <div class="asset-name">${title || assetName}</div>
    </div>
    <button class='action asset-action-remove' aria-label='Remove'>
      <span class='icon icon-close'></span>
    </button>
  `;

  const assetImg = row.querySelector('.asset-thumbnail img');
  assetImg.dataset.fileformat = format;
  assetImg.style.visibility = 'hidden';
  getOptimizedPreviewUrl(assetId, assetName, 24).then((url) => {
    assetImg.src = url;
    assetImg.style.visibility = '';
    assetImg.alt = title;
  });

  const removeButton = row.querySelector('.asset-action-remove');
  removeButton.addEventListener('click', () => {
    row.remove();
  });

  return row;
}

function sortTable(header, table, ascending) {
  const rows = [...table.querySelectorAll('.asset-row')];
  rows.sort((a, b) => {
    const nameA = a.querySelector('.asset-name').textContent.toUpperCase();
    const nameB = b.querySelector('.asset-name').textContent.toUpperCase();
    return nameA.localeCompare(nameB);
  });
  if (!ascending) {
    rows.reverse();
  }
  rows.forEach((row) => {
    table.appendChild(row);
  });

  const sortIcon = header.querySelector('.multi-selected-assets-table-header .icon');
  if (ascending) {
    sortIcon.classList.remove('opposite');
  } else {
    sortIcon.classList.add('opposite');
  }
  decorateIcons(header);
}

/**
 * Create a table of multi selected assets
 * @returns {HTMLDivElement}
 */
export default async function createMultiSelectedAssetsTable() {
  const tableContainer = document.createElement('div');
  tableContainer.classList.add('multi-selected-assets-table-container');
  tableContainer.innerHTML = `
    <div class="multi-selected-assets-table-header">Name<span class='icon icon-arrow-down'></span></div>
    <div class="multi-selected-assets-table"/>
  `;

  const table = tableContainer.querySelector('.multi-selected-assets-table');
  table.classList.add('multi-selected-assets-table');

  const selectedAssets = [...document.querySelectorAll('.adp-infinite-results.block .adp-result-item.checked')];
  selectedAssets.forEach((asset) => {
    const assetId = asset.getAttribute('data-item-id');
    const assetName = asset.getAttribute('data-item-name');
    const title = asset.querySelector('.title')?.textContent;
    const format = asset.querySelector('.thumbnail img')?.getAttribute('data-fileformat');
    const row = createAssetRow(assetId, assetName, title, format);
    row.setAttribute('data-asset-id', assetId);
    row.setAttribute('data-asset-name', assetName);
    row.setAttribute('data-fileformat', format);
    table.appendChild(row);
  });

  // Handle sorting
  const header = tableContainer.querySelector('.multi-selected-assets-table-header');
  sortTable(header, table, true); // sort ascending by default
  header.setAttribute('aria-sort-ascending', 'true');
  header.addEventListener('click', () => {
    const sortOrder = !(header.getAttribute('aria-sort-ascending') === 'true');
    header.setAttribute('aria-sort-ascending', sortOrder.toString());
    sortTable(header, table, sortOrder);
  });

  decorateIcons(tableContainer);
  return tableContainer;
}
