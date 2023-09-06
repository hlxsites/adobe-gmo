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

export default function decorate(block) {
  const currentRefinements = document.createElement('div');
  currentRefinements.id = 'current-refinements';
  currentRefinements.classList.add('current-refinements');
  block.appendChild(currentRefinements);

  const renderCurrentRefinements = (renderOptions, isFirstRender) => {
    const {
      items, widgetParams, refine,
    } = renderOptions;

    if (isFirstRender) {
      const currRefinementsDivEl = document.createElement('div');
      currRefinementsDivEl.classList.add('ais-CurrentRefinements');

      const currrefinementListEl = document.createElement('ul');
      currrefinementListEl.classList.add('ais-CurrentRefinements-list', 'refinement-list');

      currRefinementsDivEl.appendChild(currrefinementListEl);
      widgetParams.container.appendChild(currRefinementsDivEl);
      return;
    }

    const refinementsEl = widgetParams.container.querySelector('.ais-CurrentRefinements-list');
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
        const li = document.createElement('li');
        li.classList.add('ais-CurrentRefinements-item', 'refinement-item');
        li.innerHTML = `
          <span class="ais-CurrentRefinements-label refinement-label">${facetType} -</span>
          <span class="ais-CurrentRefinements-category refinement-category">
            <span class="ais-CurrentRefinements-categoryLabel refinement-category-label">${facetValue}</span>
            <button class="ais-CurrentRefinements-delete refinement-delete" ${createRefinementDataAttribtues(refinement)}></button>
          </span>
        `;
        li.querySelector('button').addEventListener('click', () => {
          refine(refinement);
          closeAssetDetails();
        });
        refinementsEl.appendChild(li);
      });
    });
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
