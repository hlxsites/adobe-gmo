
import createConfirmDialog from '../../scripts/confirm-dialog.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { createLinkHref, navigateTo } from '../../scripts/scripts.js';


function createShareInfoHeader(shareInfoHeader) {

  shareInfoHeader.innerHTML = `
        <div class="adp-share-header-left">

          <div class="adp-share-header-share-info">
            <div class="adp-share-title"></div>
            <div class="adp-share-subinfo">
              <div class="adp-share-stats"></div>
              <div class="adp-share-select-all">
                <input type="checkbox" id="select-all-checkbox"/>
                <label for="select-all-checkbox">Select All</label>
              </div>
            </div>
          </div>
        </div>
        </div>
    `;
  //shareInfoHeader.querySelector('.adp-share-title').innerText = 'title';
  shareInfoHeader.querySelector('.adp-share-stats').innerText = '5 items';

  document.getElementById('select-all-checkbox').addEventListener('click', function(event) {
      // Get the checked state of the select all checkbox
      var isChecked = event.target.checked;

      // Get all the checkboxes within the cards
      var checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"], .filetype-video .checkbox-container input[type="checkbox"]');

      // Set the checked state of each card's checkbox to match the select all checkbox
      checkboxes.forEach(function(checkbox) {
          checkbox.checked = isChecked;
      });
  });

  decorateIcons(shareInfoHeader);
  return shareInfoHeader;
}

export default async function decorate(block) {
  block.innerHTML = '';
  createShareInfoHeader(block);
}
