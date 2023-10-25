import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';

function addFacetListRefinement(refinement, refinementContainer) {
  window.search.addWidgets([
    window.instantsearch.widgets.refinementList(
      {
        container: refinementContainer,
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
    const refinementDiv = refinementContainer.closest('.adp-refinement');
    const noRefinementsEl = refinementDiv.querySelector('.ais-RefinementList--noRefinement');
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
  observer.observe(refinementContainer, {
    subtree: true,
    attributes: true,
  });

  const refinementsEl = refinementContainer;
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
  });
  obs.observe(refinementsEl, { childList: true, subtree: true });
}

export default function decorate(block) {
  const cfg = readBlockConfig(block);
  const { refinement } = JSON.parse(cfg.blockdata);
  block.textContent = '';
  addFacetListRefinement(
    refinement,
    block,
  );
}
