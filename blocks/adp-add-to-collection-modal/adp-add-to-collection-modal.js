import { decorateIcons } from '../../scripts/lib-franklin.js';
import {
  searchListCollection, createCollection, patchCollection, getCollection,
} from '../../scripts/collections.js';
import { getSelectedAssetsFromInfiniteResultsBlock, populateAssetViewLeftDialog } from '../../scripts/scripts.js';
import createMultiSelectedAssetsTable from '../../scripts/multi-selected-assets-table.js';

function closeDialog(dialog) {
  dialog.close();
}

// Function to create the new collection input
function createNewCollectionInput(newCollectionRadioInputContainer) {
  // Check if the input has already been added
  if (!newCollectionRadioInputContainer.querySelector('.new-collection-input')) {
    // Create a container for the newCollectionInput and label
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('new-collection-input-container');

    // Create the newCollectionInput
    const newCollectionInput = document.createElement('input');
    newCollectionInput.type = 'text';
    newCollectionInput.classList.add('new-collection-input');
    newCollectionInput.placeholder = 'Enter Collection name';

    inputContainer.appendChild(newCollectionInput);

    // Insert the inputContainer below the first radio button
    newCollectionRadioInputContainer.parentElement.appendChild(inputContainer);
  }
}

// Function to create the dropdown
async function createDropdown(addToExistingRadioDropboxContainer) {
  // Check if the input has already been added
  if (!addToExistingRadioDropboxContainer.querySelector('.add-to-existing-dropdown')) {
    // Create a container for the dropdown
    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('add-to-existing-dropdown-container'); // Add a new class for styling

    // Create the dropdown select element
    const dropdownSelect = document.createElement('select');
    dropdownSelect.classList.add('add-to-existing-dropdown'); // Add the new class

    // Function to load more data when reaching the end of the dropdown
    const loadMoreData = async (page) => {
      //Call to get the nbHits for the total number of Collections
      const collectionMax = await searchListCollection(0,0);
      //Get all the collections
      const collectionData = await searchListCollection(collectionMax.nbHits,page);
      return collectionData;
    };

    const page = 0;
    // Initial data loading
    const initialData = await loadMoreData(page);
    if (initialData.items.length > 0) {

      // Populate the options in the dropdown with the initial data
      initialData.items.forEach((collection) => {
        const option = document.createElement('option');
        option.value = collection.id;
        option.textContent = collection.title;
        dropdownSelect.appendChild(option);
      });
    }

    // Append the select element to the container
    dropdownContainer.appendChild(dropdownSelect);

    // Insert the dropdownContainer below the second radio button
    addToExistingRadioDropboxContainer.parentElement.appendChild(dropdownContainer);
  }
}

// Function to reset dialog state
function resetDialogState() {
  const inputContainers = document.querySelectorAll('.new-collection-input-container, .add-to-existing-dropdown-container');
  inputContainers.forEach((container) => {
    container.parentElement.removeChild(container);
  });
}

export async function openModal(items) {
  const dialog = document.querySelector('.adp-add-to-collection-modal.block dialog');
  const newCollectionRadio = dialog.querySelector('#collection-selector-new-collection');
  const addToExistingRadio = dialog.querySelector('#collection-selector-add-to-existing');

  // handle actions container buttons
  const actionsContainer = dialog.querySelector('.actions-container');
  const newActionsContainer = dialog.querySelector('.actions-container');
  newActionsContainer.innerHTML = `
    <button class='action action-cancel' aria-label='Cancel'>Cancel</button>
    <button class='action action-submit' aria-label='Submit'>Submit</button>`;
  actionsContainer.parentElement.replaceChild(newActionsContainer, actionsContainer);

  // Create an empty array to store the selected items
  const selectedItems = [];
  // Store the selected items in the array
  items.forEach((item) => {
    selectedItems.push(item);
  });

  // Event listener for the "Submit" button click
  const submitButton = dialog.querySelector('.action-submit');
  submitButton.addEventListener('click', async () => {
    // Get the title from the newCollectionInput
    if (newCollectionRadio.checked) {
      const titleInput = dialog.querySelector('.new-collection-input');
      const title = titleInput.value;

      // Add input validation
      if (!title.trim()) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Collection name cannot be empty.';
        errorMessage.classList.add('error-message');
        titleInput.parentElement.appendChild(errorMessage);
        return;
      }

      // only close the dialog if the operation did not throw an exception
      await createCollection(title, title, selectedItems);

      resetDialogState();
    }
    // If "Add to Existing Collection" is selected, get the title from the dropdown
    if (addToExistingRadio.checked) {
      const dropdownSelect = dialog.querySelector('.add-to-existing-dropdown');
      const collectionId = dropdownSelect.value;

      const payload = [];
      for (const item of selectedItems) {
        payload.push({
          value: item,
          path: '/items/-',
        });
      }

      getCollection(collectionId)
        .then((collection) => {
          const { etag } = collection;
          patchCollection(collectionId, etag, payload);
        });

      resetDialogState();
    }

    // Close the dialog
    closeDialog(dialog);
  });

  dialog.querySelector('.action-cancel').addEventListener('click', () => {
    resetDialogState();
    closeDialog(dialog);
  });

  dialog.showModal();
  // Set the "Create New Collection" radio button as checked and trigger its change event
  newCollectionRadio.checked = true;
  newCollectionRadio.dispatchEvent(new Event('change'));
  document.querySelector('.adp-add-to-collection-modal.block .action-close').blur();
}

/**
 * Handler to share an asset
 * @param {HTMLElement} shareElement
 * @param {string} assetId
 * @param assetName
 * @param title
 * @param format
 */
export async function addAddToCollectionModalHandler() {
  const dialog = document.querySelector('.adp-add-to-collection-modal.block dialog');
  await populateMultiAssetView(dialog);
  const selectedAssets = getSelectedAssetsFromInfiniteResultsBlock();
  const items = [];
  selectedAssets.forEach((asset) => {
    const assetId = asset.getAttribute('data-item-id');
    const assetName = asset.getAttribute('data-item-name');
    items.push(
      {
        id: assetId,
        name: assetName,
        type: 'asset',
      },
    );
  });
  await openModal(items);
}

/**
 * Handler to open the modal to add an asset card to a collection
 * @param {string} assetId
 * @param {string} repoName
 * @param {string} title
 * @param {string} format
 * @returns {Promise<void>}
 */
export async function openAddToCollectionModalHandler(assetId, repoName, title, format) {
  const dialog = document.querySelector('.adp-add-to-collection-modal.block dialog');
  populateAssetViewLeftDialog(
    dialog,
    '.dialog-header-left',
    '.dialog-body-left',
    'Add asset to collection',
    assetId,
    repoName,
    title,
    format,
  );
  const items = [{
    id: assetId,
    name: repoName,
    type: 'asset',
  }];
  await openModal(items);
}

async function populateMultiAssetView(dialog) {
  const dialogBodyLeft = dialog.querySelector('.dialog-body-left');
  const newDialogBodyLeft = dialogBodyLeft.cloneNode(false);
  dialogBodyLeft.parentElement.replaceChild(newDialogBodyLeft, dialogBodyLeft);
  const multiAssetsTable = await createMultiSelectedAssetsTable();
  newDialogBodyLeft.appendChild(multiAssetsTable);

  // Populate the dialog title
  let rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
  dialog.querySelector('.dialog-header-left').textContent = `Add ${rowCount} asset${rowCount > 1 ? 's' : ''} to Collection`;
  const assetTable = dialog.querySelector('.multi-selected-assets-table');
  const handleChanges = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
        dialog.querySelector('.dialog-header-left').textContent = `Add ${rowCount} asset${rowCount > 1 ? 's' : ''} to Collection`;
      }
    });
  };
  const observer = new MutationObserver(handleChanges);
  const config = { childList: true };
  observer.observe(assetTable, config);
}

export default async function decorate(block) {
  block.innerHTML = `<dialog autofocus aria-label="Add To Collection">
    <div class='adp-add-to-collection-modal-container'>
      <div class='dialog-header'>
        <div class='dialog-header-left'>Add To Collection</div>
        <div class='dialog-header-right'>
          <button class='action action-close' aria-label='Close'>
            <span class='icon icon-close'></span>
          </button>
        </div>
      </div>

      <div class='dialog-body'>
        <div class='dialog-body-left'></div>
        <div class='dialog-body-right'>
          <div class='collection-selector-container'>
            <div>
              <div class="new-collection-radio-button-group">
                <input type="radio" name="collection-selector-group" id="collection-selector-new-collection"/>
                <label class='collection-selector-group' for="collection-selector-new-collection">Create New Collection</label>
              </div>
              <div class="new-collection-input-container"></div>
            </div>
            <div>
              <div class="add-to-existing-dropdown-radio-button-group">
                <input type="radio" name="collection-selector-group" id="collection-selector-add-to-existing"/>
                <label class='collection-selector-group' for="collection-selector-add-to-existing">Add to Existing Collection</label>
              </div>
              <div class="add-to-existing-dropdown-container"></div>
            </div>
          </div>
          <div class='actions-container'></div>
        </div>

      </div>
    </div>
  </dialog>`;

  await decorateIcons(block);
  const dialog = block.querySelector('dialog');
  dialog.querySelector('.action-close').addEventListener('click', () => {
    resetDialogState();
    closeDialog(dialog);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      closeDialog(dialog);
    }
  });

  const newCollectionRadio = dialog.querySelector('#collection-selector-new-collection');
  const addToExistingRadio = dialog.querySelector('#collection-selector-add-to-existing');
  const newCollectionRadioInputContainer = dialog.querySelector('.new-collection-radio-button-group');
  const addToExistingRadioDropboxContainer = dialog.querySelector('.add-to-existing-dropdown-radio-button-group');
  // Event listener for the radio buttons
  newCollectionRadio.addEventListener('change', () => {
    if (newCollectionRadio.checked) {
      resetDialogState();
      createNewCollectionInput(newCollectionRadioInputContainer);
    }
  });

  addToExistingRadio.addEventListener('click', () => {
    if (addToExistingRadio.checked) {
      resetDialogState();
      createDropdown(addToExistingRadioDropboxContainer);
    }
  });

  dialog.addEventListener('click', (event) => {
    // only react to clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
    const dialogDimensions = dialog.getBoundingClientRect();
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
      closeDialog(dialog);
    }
  });
}
