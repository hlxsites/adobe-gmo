import { fetchSiteConfig } from '../../scripts/site-config.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';

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

  window.search.addWidgets([
    instantsearch.widgets.currentRefinements(
      {
        container: '#current-refinements',
        transformItems: (items) => {
          for (let i = 0; i < items.length; i += 1) {
            // eslint-disable-next-line max-len
            items[i].label = refinementsByProperty[items[i].attribute] ? refinementsByProperty[items[i].attribute].name : items[i].label;
            items[i].refinements.forEach((refinement) => {
              const refinementConfig = refinementsByProperty[refinement.attribute];
              if (refinementConfig && refinementConfig['data-type']) {
                refinement.label = formatAssetMetadata(refinementConfig.attribute, refinement.label, refinementConfig['data-type']);
              }
            });
          }
          return items;
        },
      },
    ),
  ]);
}
