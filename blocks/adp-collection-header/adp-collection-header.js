import { getCollection, getCollectionIdFromURL, deleteCollection } from '../../scripts/collections.js';
import createConfirmDialog from '../../scripts/confirm-dialog.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { createLinkHref, navigateTo } from '../../scripts/scripts.js';

import {
  selectAllAssets,deselectAllAssets,
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
          <button class="adp-action adp-danger action-collection-delete">
            <span class="icon icon-delete"></span>Delete Collection
          </a>
        </div>
    `;
  collectionInfoHeader.querySelector('.adp-collection-title').innerText = collection.title;
  collectionInfoHeader.querySelector('.adp-collection-stats').innerText = `${collection.items.length} items`;
  const backButton = collectionInfoHeader.querySelector('.back-button a');
  backButton.href = createLinkHref(backButton.href);

  document.getElementById('select-all-checkbox').addEventListener('click', function(event) {
      // Get the checked state of the select all checkbox
      var isChecked = event.target.checked;

      // Get all the checkboxes within the cards
      var checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"], .filetype-video .checkbox-container input[type="checkbox"]');
      // isChecked then selectAllAssets() else deselectAllAssets
      isChecked ? selectAllAssets() : deselectAllAssets();
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
