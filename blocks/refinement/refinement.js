import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getFilterConfig, getFilterSettings } from '../../scripts/site-config.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';
import { closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';
import { scrollToSearchResults } from '../infinite-results/infinite-results.js';

// Define algolia search client globals
/* global instantsearch */

const TEXT_HIDE_FILTERS = 'Hide filters';
const TEXT_SHOW_FILTERS = 'Filters';

function addFilterButton(block) {
  const toggleFilterPanelButton = document.createElement('div');
  toggleFilterPanelButton.classList.add('refinements-toggle');
  toggleFilterPanelButton.innerHTML = `<button id="filterButton">
  <span class="icon icon-filter-open"></span>
  <span class="icon icon-filter-closed hidden"></span>
  <span class="text">${TEXT_HIDE_FILTERS}</span>
</button><span class="filter-divider hidden"></span>`;
  toggleFilterPanelButton.onclick = () => {
    const span = toggleFilterPanelButton.querySelector('span.text');
    if (span.textContent === TEXT_HIDE_FILTERS) {
      span.textContent = TEXT_SHOW_FILTERS;
      document.querySelector('.refinement-wrapper').classList.remove('open');
      document.querySelector('.section.infinite-results-container').classList.add('left-closed');
      toggleFilterPanelButton.querySelector('#filterButton > span.icon.icon-filter-closed').classList.remove('hidden');
      toggleFilterPanelButton.querySelector('#filterButton > span.icon.icon-filter-open').classList.add('hidden');
      toggleFilterPanelButton.querySelector('.filter-divider').classList.remove('hidden');
      toggleFilterPanelButton.classList.add('closed');
    } else {
      span.textContent = TEXT_HIDE_FILTERS;
      document.querySelector('.refinement-wrapper').classList.add('open');
      document.querySelector('.section.infinite-results-container').classList.remove('left-closed');
      toggleFilterPanelButton.querySelector('#filterButton > span.icon.icon-filter-open').classList.remove('hidden');
      toggleFilterPanelButton.querySelector('#filterButton > span.icon.icon-filter-closed').classList.add('hidden');
      toggleFilterPanelButton.querySelector('.filter-divider').classList.add('hidden');
      toggleFilterPanelButton.classList.remove('closed');
    }
  };
  document.createElement('span');
  block.appendChild(toggleFilterPanelButton);
}

export default async function decorate(block) {
  // refinement container
  const refinements = document.createElement('div');
  block.closest('.refinement-wrapper').classList.add('open');
  refinements.id = 'refinements';
  refinements.classList.add('refinements');
  addFilterButton(block);
  block.appendChild(refinements);

  const filterConfig = await getFilterConfig();
  const filterSettings = await getFilterSettings();
  Object.values(filterConfig).forEach((refinement) => {
    if (!refinement.metadataField) {
      return;
    }
    const refinementDiv = document.createElement('div');
    refinementDiv.classList.add('refinement');
    const label = document.createElement('span');
    label.classList.add('label');
    label.textContent = refinement.label || refinement.metadataField;
    refinementDiv.appendChild(label);
    const options = document.createElement('div');
    options.id = `${refinement.metadataField}-options`;
    options.classList.add('refinement-options');
    refinementDiv.appendChild(options);
    refinements.appendChild(refinementDiv);
    window.search.addWidgets([
      instantsearch.widgets.refinementList(
        {
          container: `#${refinement.metadataField}-options`,
          attribute: refinement.metadataField,
          operator: refinement.operator || 'or',
          limit: 10,
          showMore: true,
          searchable: true,
          searchableIsAlwaysActive: false,
          cssClasses: {
            searchableInput: `${refinement.metadataField}-searchable-input`,
          },
          templates: {
            item(item, { html }) {
              const { count, value } = item;
              const updatedLabel = formatAssetMetadata(refinement.metadataField, item.label);
              return html`
                <input type="checkbox" class="ais-RefinementList-checkbox" value=${value}/>
                <span class="ais-RefinementList-labelText" title="${updatedLabel}">${updatedLabel}</span>
                <span class="ais-RefinementList-count">${count}</span>
              `;
            },
          },
        },
      ),
    ]);
    // set facet visibility
    // Should be hidden when there are no refinements or results from searched facets;
    // visible otherwise
    const observer = new MutationObserver(() => {
      const noRefinementsEl = options.querySelector('.ais-RefinementList--noRefinement');
      if (noRefinementsEl) {
        if (noRefinementsEl.querySelector('.ais-RefinementList-searchBox')
            && noRefinementsEl.querySelector('.ais-RefinementList-noResults')) {
          refinementDiv.classList.remove('hidden');
        } else {
          refinementDiv.classList.add('hidden');
        }
      } else {
        refinementDiv.classList.remove('hidden');
      }
    });
    observer.observe(options, {
      subtree: true,
      attributes: true,
    });
  });

  await decorateIcons(block);

  block.querySelectorAll('.refinement').forEach((el) => {
    const labelElem = el.querySelector('.label');
    if (labelElem) {
      labelElem.onclick = () => {
        const options = el.querySelector('.refinement-options');
        if (options.style.display !== 'none') {
          options.style.display = 'none';
          labelElem.setAttribute('aria-expanded', 'false');
        } else {
          options.style.display = 'block';
          labelElem.setAttribute('aria-expanded', 'true');
        }
      };
      const options = el.querySelector('.refinement-options');
      options.style.display = filterSettings.expandFilterCategoryByDefault ? 'block' : 'none';
      labelElem.setAttribute('aria-expanded', filterSettings.expandFilterCategoryByDefault);
      labelElem.setAttribute('aria-controls', options.id);
      labelElem.setAttribute('role', 'button');
    }
  });

  const refinementsEl = block.querySelector('.refinements');
  const obs = new MutationObserver(() => {
    const searchInputEl = refinementsEl.querySelectorAll('input[class*=-searchable-input]');
    searchInputEl.forEach((el) => {
      const searchBoxEl = el.closest('.ais-RefinementList-searchBox');
      if (el.disabled) {
        searchBoxEl.classList.remove('refinementList-search-shown');
        searchBoxEl.classList.add('refinementList-search-hidden');
      } else {
        searchBoxEl.classList.remove('refinementList-search-hidden');
        searchBoxEl.classList.add('refinementList-search-shown');
      }
    });
    const refinementCheckboxs = document.querySelectorAll(
      '.ais-RefinementList-item',
    );
    refinementCheckboxs.forEach((refinementCheckbox) => {
      refinementCheckbox.addEventListener('click', () => {
        closeAssetDetails();
        scrollToSearchResults();
      });
    });
  });
  obs.observe(refinementsEl, { childList: true, subtree: true });
}
