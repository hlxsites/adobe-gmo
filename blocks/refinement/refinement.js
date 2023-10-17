import {
  buildBlock, decorateBlock, loadBlock, decorateIcons,
} from '../../scripts/lib-franklin.js';
import { getFilterConfig, getFilterSettings } from '../../scripts/site-config.js';
import { isDate } from '../../scripts/metadata.js';

const TEXT_HIDE_FILTERS = 'Hide filters';
const TEXT_SHOW_FILTERS = 'Filters';

function addFilterButton(block) {
  const toggleFilterPanelButton = document.createElement('div');
  toggleFilterPanelButton.classList.add('refinements-toggle');
  toggleFilterPanelButton.innerHTML = `<button id="filter-button">
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
      toggleFilterPanelButton.querySelector('#filter-button > span.icon.icon-filter-closed').classList.remove('hidden');
      toggleFilterPanelButton.querySelector('#filter-button > span.icon.icon-filter-open').classList.add('hidden');
      toggleFilterPanelButton.querySelector('.filter-divider').classList.remove('hidden');
      toggleFilterPanelButton.classList.add('closed');
    } else {
      span.textContent = TEXT_HIDE_FILTERS;
      document.querySelector('.refinement-wrapper').classList.add('open');
      document.querySelector('.section.infinite-results-container').classList.remove('left-closed');
      toggleFilterPanelButton.querySelector('#filter-button > span.icon.icon-filter-open').classList.remove('hidden');
      toggleFilterPanelButton.querySelector('#filter-button > span.icon.icon-filter-closed').classList.add('hidden');
      toggleFilterPanelButton.querySelector('.filter-divider').classList.add('hidden');
      toggleFilterPanelButton.classList.remove('closed');
    }
  };
  document.createElement('span');
  block.appendChild(toggleFilterPanelButton);
}

async function addRefinementBlock(containerElement, refinementBlockName, refinement, config) {
  const content = [['blockdata', JSON.stringify({ refinement, config })]];
  const block = buildBlock(refinementBlockName, content);
  containerElement.appendChild(block);
  decorateBlock(block);
  await loadBlock(block);
}

function addRefinement(refinement, refinementContainer) {
  let refinementType = refinement.type;
  if (!refinementType) {
    if (isDate(refinement.metadataField)) {
      refinementType = 'date-range';
    } else {
      refinementType = 'facet-list';
    }
  }
  const refinementBlockName = `refinement-${refinementType}`;
  // Check if the refinement block exists so we can handle failures
  return import(`../${refinementBlockName}/${refinementBlockName}.js`).then(async () => {
    await addRefinementBlock(refinementContainer, refinementBlockName, refinement);
  });
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
  const refinementPromises = [];
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
    const refinementContainer = document.createElement('div');
    refinementContainer.id = `${refinement.metadataField}-options`;
    refinementContainer.classList.add('refinement-options');
    refinementDiv.appendChild(refinementContainer);
    // Add the refinement to the page before
    // we load it so it is in the right order
    refinements.appendChild(refinementDiv);

    // Add the refinement promise to the array so we can wait for all of them to finish
    refinementPromises.push(addRefinement(refinement, refinementContainer).catch((e) => {
      console.log('Unable to add refinement', refinement, e);
      // Remove the refinement if it fails to load
      refinementDiv.remove();
    }));
  });
  // Wait for all the refinement promises to finish loading
  await Promise.all(refinementPromises);
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
}
