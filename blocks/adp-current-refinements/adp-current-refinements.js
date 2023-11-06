import { getFilterConfig } from '../../scripts/site-config.js';
import { formatAssetMetadata } from '../../scripts/metadata.js';
import { closeAssetDetailsPanel } from '../adp-asset-details-panel/adp-asset-details-panel.js';
import { EventNames, emitEvent } from '../../scripts/events.js';

const filterConfig = await getFilterConfig();

const TEXT_CLEAR_REFINEMENTS = 'clear-refinements';

/**
 * Emits the site's facet event, but only if the current and updated arrays
 * are different.
 * @param {HTMLElement} element Element that will emit the event.
 * @param {Array<string>} current Current list of facet values.
 * @param {Array<string>} updated New list of facet values.
 */
function sendFacetEvent(element, current, updated) {
  if (!arraysMatch(current, updated)) {
    emitEvent(element, EventNames.FACET, {
      previous: [...current],
      current: [...updated],
    });
  }
}

/**
 * Determines whether two string arrays contain the same values.
 * @param {Array<string>} refinements1 First array to test.
 * @param {Array<string>} refinements2 Array against which first array is tested.
 * @returns {boolean} True if the arrays contain the same values, false otherwise.
 */
function arraysMatch(refinements1, refinements2) {
  let matching = refinements1.length === refinements2.length;

  for (let i = 0; (i < refinements1.length) && (matching); i += 1) {
    matching = refinements1[i] === refinements2[i];
  }

  return matching;
}

export default function decorate(block) {
  block.textContent = '';
  let refinements = [];
  const currentRefinements = document.createElement('div');
  currentRefinements.id = 'current-refinements';
  currentRefinements.classList.add('adp-current-refinements');
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

    const newRefinements = [];
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
      
        // Create facet event object
        newRefinements.push({
          facet: facetLabel,
          value: facetValue,
          ...(refinement.operator && {operator}),
          label: `${facetLabel} ${operator} ${facetValue}`
        });

        refinementItemEl.innerHTML = `
          <span class="current-refinement-label">
            <span class="current-refinement-label-facet-label">${facetLabel}</span>
            <span class="current-refinement-label-operator">${operator}</span>
            <span class="current-refinement-label-facet-value">${facetValue}</span>
          </span>
          <button class="current-refinement-delete" ${createRefinementDataAttributes(refinement)}></button>
        `;
        refinementItemEl.querySelector('button').addEventListener('click', () => {
          refine(refinement);
          closeAssetDetailsPanel();
        });
        refinementsEl.appendChild(refinementItemEl);
      });
    });
    refinementsEl.appendChild(clearRefinementEl);
    sendFacetEvent(refinementsEl, refinements, newRefinements);
    refinements = [...newRefinements];
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
