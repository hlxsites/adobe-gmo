import { getFilterConfig } from '../../scripts/site-config.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';
import { closeAssetDetails } from '../asset-details-panel/asset-details-panel.js';

const filterConfig = await getFilterConfig();

const TEXT_CLEAR_REFINEMENTS = 'clear-refinements';

export default function decorate(block) {
  const currentRefinements = document.createElement('div');
  currentRefinements.id = 'current-refinements';
  currentRefinements.classList.add('current-refinements');
  block.appendChild(currentRefinements);

  const clearRefinements = document.createElement('div');
  clearRefinements.id = TEXT_CLEAR_REFINEMENTS;
  clearRefinements.classList.add(TEXT_CLEAR_REFINEMENTS, 'hidden');
  currentRefinements.appendChild(clearRefinements);
  const customClearRefinements = window
    .instantsearch.connectors.connectClearRefinements((renderOptions, isFirstRender) => {
      const { refine, hasRefinements, widgetParams } = renderOptions;
      const { container } = widgetParams;

      if (hasRefinements) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }

      if (isFirstRender) {
        container.innerHTML = `
      <div class="ais-ClearRefinements clear-all">
        <button class="ais-ClearRefinements-button clear-all-button">Clear all</button>
      </div>`;
        container.addEventListener('click', () => {
          refine();
          window.dispatchEvent(new Event('clear-all-refinements'));
        });
      }
    });

  window.search.addWidgets([
    customClearRefinements(
      {
        container: clearRefinements,
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

    const createRefinementDataAttributes = (refinement) => Object.keys(refinement)
      .map((key) => `data-${key}="${refinement[key]}"`)
      .join(' ');
    items.forEach((item) => {
      item.refinements.forEach((refinement) => {
        // decorate facet type
        const refinementConfig = filterConfig[refinement.attribute];
        const facetLabel = refinementConfig?.label || refinement.label;

        // decorate facet value
        const facetValue = formatAssetMetadata(refinementConfig.metadataField, refinement.value);
        const refinementItemEl = document.createElement('div');
        refinementItemEl.classList.add('current-refinement-item');
        const operator = refinement.operator || '-';
        refinementItemEl.innerHTML = `
          <span class="current-refinement-label">${facetLabel} ${operator} ${facetValue}</span>
          <button class="current-refinement-delete" ${createRefinementDataAttributes(refinement)}></button>
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

  const customCurrentRefinements = window.instantsearch.connectors.connectCurrentRefinements(
    renderCurrentRefinements,
  );

  window.search.addWidgets([
    customCurrentRefinements({
      container: document.querySelector('#current-refinements'),
    }),
  ]);
}
