import { fetchSiteConfig } from '../../scripts/site-config.js';
import { closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';

const config = await fetchSiteConfig('main');
const searchMinChars = config.find((elem) => elem.configProperty === 'searchMinChars')?.value;

function handleSearch(query, search) {
  if (searchMinChars && query.length < searchMinChars) {
    return;
  }
  closeAssetDetails();
  search(query);
}

export default function decorate(block) {
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
