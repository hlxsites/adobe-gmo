import { EventNames, addEventListener } from '../../scripts/events.js';
import { selectAllAssets, deselectAllAssets, hasAllAssetsSelected, selectedAssetsCount, allAssetsCount } from '../adp-infinite-results-instantsearch/adp-infinite-results-instantsearch.js';

export default function decorate(block) {
  block.innerHTML = '';
  const checkbox = document.createElement('input');
  checkbox.classList.add('selection-checkbox');
  checkbox.type = 'checkbox';
  checkbox.id = 'select-all';
  checkbox.title = 'Deselect all';
  checkbox.dataset.isChecked = checkbox.checked;
  block.appendChild(checkbox);

  const textLabel = document.createElement('label');
  textLabel.classList.add('selection-text-label');
  textLabel.innerText = 'Select All';
  textLabel.title = 'Deselect all';
  textLabel.setAttribute('for', 'select-all')
  block.appendChild(textLabel);

  const counterContainer = document.createElement('div');
  counterContainer.classList.add('selection-counter-text');
  counterContainer.innerText = '';
  block.appendChild(counterContainer);

  // hide selection items on page load; only load when multi-select is initiated
  hideSelectionItems(checkbox, textLabel, counterContainer);

  checkbox.addEventListener('click', (e) => {
    if (e.target.checked) {
      selectAllAssets();
    } else {
      deselectAllAssets();
    }
    e.target.indeterminate = false;
  });

  addEventListener(EventNames.ADD_ITEM_MULTISELECT, () => {
    if (selectedAssetsCount()){
      checkbox.style.display = 'inline-block';
      textLabel.style.display = 'inline-flex';
      counterContainer.style.display = 'inline-flex';
    }
    updateCheckbox(checkbox);
    renderCounterText(counterContainer);
  });
  addEventListener(EventNames.REMOVE_ITEM_MULTISELECT, () => {
    updateCheckbox(checkbox);
    if(selectedAssetsCount()) {
      renderCounterText(counterContainer);
    } else { //once no assets are selected
      hideSelectionItems(checkbox, textLabel, counterContainer);
    }
  });
  addEventListener(EventNames.SEARCH_RESULTS_CHANGED, () => {
    updateCheckbox(checkbox);
    hideSelectionItems(checkbox, textLabel, counterContainer);
  });
  addEventListener(EventNames.SEARCH_PAGED, () => {
    updateCheckbox(checkbox);
    renderCounterText(counterContainer);
  });
  addEventListener(EventNames.FACET, () => {
    hideSelectionItems(checkbox, textLabel, counterContainer);
  })
}

function updateCheckbox(checkbox) {
  if (hasAllAssetsSelected()) {
    checkbox.checked = true;
    checkbox.indeterminate = false;
  } else if (!hasAllAssetsSelected() && selectedAssetsCount()){ //if some assets are selected
    checkbox.checked = false;
    checkbox.indeterminate = true;
  } else { //if no assets are selected
    checkbox.checked = false;
    checkbox.indeterminate = false;
  }
}

function hideSelectionItems(checkbox, textLabel, counterContainer){
  checkbox.style.display = 'none';
  textLabel.style.display = 'none';
  counterContainer.style.display = 'none';
  counterContainer.innerText = ''; 
}

function renderCounterText(counterContainer){
  counterContainer.innerText = `Selected ${selectedAssetsCount().toString()} out of ${allAssetsCount().toString()} assets`;
}