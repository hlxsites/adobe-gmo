import { getCollection, getCollectionIdFromURL, deleteCollection } from '../../scripts/collections.js';
import createConfirmDialog from '../../scripts/confirm-dialog.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { createLinkHref, navigateTo } from '../../scripts/scripts.js';

import {
  selectAllAssets, deselectAllAssets,
} from '../adp-infinite-results-collection/adp-infinite-results-collection.js';


function createCollectionInfoHeader(collectionInfoHeader, collection) {
  // include back to collections listing similar to hide filters button
  collectionInfoHeader.innerHTML = `
        <div class="adp-collection-header-left">
          <div class="back-button">
              <a href="/collections"><span class="icon icon-back"></span></a>
          </div>
          <div class="adp-collection-header-collection-info">
            <div class="adp-collection-title"></div>
            <div class="adp-collection-subinfo">
              <div class="adp-collection-stats"></div>
              <div class="adp-collection-select-all">
                <input type="checkbox" id="select-all-checkbox"/>
                <label for="select-all-checkbox">Select All</label>
              </div>
            </div>
          </div>
        </div>
        <div class="adp-collection-header-right actions">
          <div class="actions actions-share" role="button" id="shareButton">
            <span class="icon icon-share"></span>Share
          </div>
          <button class="adp-action adp-danger action-collection-delete">
            <span class="icon icon-delete"></span>Delete Collection
          </a>
        </div>

        <div id="toast" class="toast">
          <span class="toast-icon">&#10003;</span>
          <span class="toast-message">Collection link copied to clipboard</span>
          <button class="toast-close" onclick="closeToast()">×</button>
        </div>
    `;
  collectionInfoHeader.querySelector('.adp-collection-title').innerText = collection.title;
  collectionInfoHeader.querySelector('.adp-collection-stats').innerText = `${collection.items.length} items`;
  const backButton = collectionInfoHeader.querySelector('.back-button a');
  backButton.href = createLinkHref(backButton.href);

  document.getElementById('select-all-checkbox').addEventListener('click', (event) => {
      event.target.checked ? selectAllAssets() : deselectAllAssets();
  });

  document.getElementById('shareButton').addEventListener('click', (event) => {
      copyCurrentUrlToClipboard();
  });

  collectionInfoHeader.querySelector('.action-collection-delete').addEventListener('click', async (e) => {
    e.preventDefault();
    const collectionId = getCollectionIdFromURL();
    if (collectionId) {
      createConfirmDialog(
        'Delete collection',
        `Are you sure you want to delete the collection "${collection.title}"?`,
        async () => {
          await deleteCollection(collectionId, collection.title);
          navigateTo(createLinkHref('/collections'));
        },
        'Proceed',
      );
    }
  });
  decorateIcons(collectionInfoHeader);
  return collectionInfoHeader;
}

export default async function decorate(block) {
  block.innerHTML = '';
  // if the url is a collection url, then we need to show the collection info header
  const collectionId = getCollectionIdFromURL();
  if (collectionId) {
    const collection = await getCollection(collectionId);
    createCollectionInfoHeader(block, collection);
  }
}

// This function is called when the "Share" button is clicked
function copyCurrentUrlToClipboard() {
  // Create a dummy input to copy the string
  const dummy = document.createElement('input'),
        text = window.location.href; // Get the current URL
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy'); // Copy the text inside the input
  document.body.removeChild(dummy);

  // Here you can also trigger any feedback to the user, like a tooltip or toast
  //alert('URL copied to clipboard!'); // For demonstration purposes, using an alert
  showToast();
}

function closeToast() {
    var toast = document.getElementById("toast");
    // Reset the toast visibility and opacity
    toast.style.visibility = "hidden";
    toast.style.opacity = "0";
}

function showToast() {
    var toast = document.getElementById("toast");
    // Ensure the toast is visible and fully opaque
    toast.style.visibility = "visible";
    toast.style.opacity = "1";
    // Add "show" class again in case it was removed
    toast.className = "toast show";
    // Set a timeout to hide the toast after 3 seconds
    setTimeout(function() { closeToast(); }, 3000);
}
