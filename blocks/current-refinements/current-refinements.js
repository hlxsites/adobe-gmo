import { fetchSiteConfig } from '../../scripts/site-config.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';
import { closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';

// Define algolia search client globals
/* global instantsearch */

// read in from configuration
const refinementList = await fetchSiteConfig('refinements');
const refinementsByProperty = {};
for (const item of refinementList) {
  refinementsByProperty[item.property] = item;
}

const TEXT_CLEAR_REFINEMENTS = 'clear-refinements';

export default function decorate(block) {
  const currentRefinements = document.createElement('div');
  currentRefinements.id = 'current-refinements';
  currentRefinements.classList.add('current-refinements');
  block.appendChild(currentRefinements);

  const clearRefinements = document.createElement('div');
  clearRefinements.id = 'clear-refinements';
  clearRefinements.classList.add('clear-refinements', 'hidden');
  currentRefinements.appendChild(clearRefinements);

  window.search.addWidgets([
    instantsearch.widgets.clearRefinements(
      {
        container: `#${TEXT_CLEAR_REFINEMENTS}`,
        cssClasses: {
          root: 'clear-all',
          button: 'clear-all-button',
        },
        templates: {
          resetLabel({ hasRefinements }, { html }) {
            if (hasRefinements) {
              clearRefinements.classList.remove('hidden');
            } else {
              clearRefinements.classList.add('hidden');
            }
            return html`${hasRefinements ? 'Clear all' : ''}`;
          },
        },
      },
    ),
  ]);

  const renderCurrentRefinements = (renderOptions) => {
    const {
      items, widgetParams, refine,
    } = renderOptions;

    const refinementsEl = widgetParams.container;
    const clearRefinementEl = refinementsEl.querySelector('#clear-refinements');
    refinementsEl.innerHTML = '';

    const createRefinementDataAttribtues = (refinement) => Object.keys(refinement)
      .map((key) => `data-${key}="${refinement[key]}"`)
      .join(' ');
    items.forEach((item) => {
      item.refinements.forEach((refinement) => {
        // decorate facet type
        const facetType = refinementsByProperty[refinement.attribute]
          ? refinementsByProperty[refinement.attribute].name : refinement.label;
        // decorate facet value
        let facetValue = refinement.value;
        const refinementConfig = refinementsByProperty[refinement.attribute];
        if (refinementConfig && refinementConfig['data-type']) {
          facetValue = formatAssetMetadata(refinementConfig.attribute, refinement.label, refinementConfig['data-type']);
        }
        const refinementItemEl = document.createElement('div');
        refinementItemEl.classList.add('current-refinement-item');
        refinementItemEl.innerHTML = `
          <span class="current-refinement-label">${facetType} - ${facetValue}</span>
          <button class="current-refinement-delete" ${createRefinementDataAttribtues(refinement)}></button>
        `;
        refinementItemEl.querySelector('button').addEventListener('click', () => {
          refine(refinement);
          closeAssetDetails();
        });
        refinementsEl.appendChild(refinementItemEl);
      });
    });
    refinementsEl.appendChild(clearRefinementEl);
  };

  const customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements(
    renderCurrentRefinements,
  );

  window.search.addWidgets([
    customCurrentRefinements({
      container: document.querySelector('#current-refinements'),
    }),
  ]);
}
