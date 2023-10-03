import { closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';

const searchMinChars = 3;

function handleSearch(query, search) {
  if (searchMinChars && query.length < searchMinChars) {
    return;
  }
  closeAssetDetails();
  search(query);
}

export default function decorate(block) {
  if (window.search) {
    const searchField = document.createElement('div');
    block.appendChild(searchField);
    window.search.addWidgets([
    // eslint-disable-next-line no-undef
      instantsearch.widgets.searchBox({
        container: searchField,
        cssClasses: {
          root: 'search-field',
          input: 'search-field-input',
        },
        placeholder: 'Search all assets',
        queryHook: handleSearch,
      }),
    ]);
    block.appendChild(searchField);
  }
}
