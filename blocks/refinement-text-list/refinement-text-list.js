import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

function addTextListRefinement(refinement, refinementContainer) {
  // Splits a string into an array of values
  const splitValues = (str) => str.split(/[\s\n,]+/).filter(Boolean);

  // Create a custom widget using the connectRefinementList connector
  const customRefinementList = window.instantsearch.connectors.connectRefinementList(
    (renderOptions, isFirstRendering) => {
      const {
        refine, widgetParams,
      } = renderOptions;
      const { container, attribute } = widgetParams;
      // If this is the first rendering, create the input element and bind the event listener
      if (isFirstRendering) {
        window.addEventListener('clear-all-refinements', () => {
          const textarea = container.querySelector('textarea');
          if (textarea) {
            textarea.value = '';
          }
        });

        // Create textarea
        const input = document.createElement('textarea');
        input.rows = 3;
        const placeholder = 'Enter comma, space or line separated values';
        input.placeholder = placeholder;
        input.title = placeholder;
        // Add button to submit
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('input-button');
        const icon = document.createElement('span');
        icon.classList.add('icon', 'icon-search');
        button.appendChild(icon);
        decorateIcons(button);
        button.onclick = () => {
          splitValues(input.value).forEach((value) => {
            const refinementValues = window.search.helper?.state?.disjunctiveFacetsRefinements[attribute] || [];
            if (!refinementValues.includes(value)) {
              refine(value);
            }
          });
        };
        container.appendChild(input);
        container.appendChild(button);
      }
    },
  );

  // Add the custom widget to the search instance
  window.search.addWidgets([
    customRefinementList({
      attribute: refinement.metadataField, // Replace this with your attribute name
      container: refinementContainer,
    }),
  ]);
}

export function renderCurrentRefinements() {

}

export default function decorate(block) {
  const cfg = readBlockConfig(block);
  const { refinement } = JSON.parse(cfg.blockdata);
  block.textContent = '';
  addTextListRefinement(
    refinement,
    block,
  );
}
