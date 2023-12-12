import { decorateIcons } from '../../scripts/lib-franklin.js';
import { createLinkHref, logError, populateAssetViewLeftDialog } from '../../scripts/scripts.js';
import { getOptimizedPreviewUrl } from '../../scripts/polaris.js';
import { logError } from '../../scripts/scripts.js';
import { createLinkHref, addModalEventListeners } from '../../scripts/shared.js';
import { createDateInput } from '../../scripts/date-input.js';
import createMultiSelectedAssetsTable from '../../scripts/multi-selected-assets-table.js';
import { createLinkShare } from '../../scripts/link-share.js';
import { emitEvent, EventNames } from '../../scripts/events.js';

const SHARE_LINK_ACCESS = {
  PUBLIC: 'public',
  RESTRICTED: 'restricted',
};

const defaultExpiryDate = new Date();
defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 30);
const COPY_SHARE_LINK_TEXT = 'Copy share link';
let shareLinkExpiryDate = null;
let shareLinkUrl = '';

function generateLinkShareUrl(linkId) {
  return createLinkHref(`/share/${linkId}`, {}, {}, { absolute: true });
}

/**
 * Call the backend to create a share link
 * @param {Array<string>} assetIds
 * @param {string} title
 * @param {string} access
 * @param {Date} expiryTime
 */
async function createShareLinkUrl(assetIds, title, access, expiryTime) {
  const assets = assetIds.map((assetId) => ({ assetId }));
  const payload = {
    assets,
    // collections: [],
    title,
    access,
    expiryTime,
  };

  try {
    const json = await createLinkShare(payload);
    return generateLinkShareUrl(json?.id);
  } catch (ex) {
    logError('createShareLinkUrl', ex);
  }
  return null;
}

function closeDialog(dialog) {
  // Clean up calendar dialog
  document.querySelector('#share-link-expiry-date-calendar-dialog')?.remove();
  dialog.close();
}

function populateExpiryDate(parentElement) {
  // Reset copy share link button
  shareLinkUrl = '';
  const copyShareButton = parentElement.querySelector('.action-copy-share-link');
  copyShareButton.textContent = COPY_SHARE_LINK_TEXT;

  const checkedValue = parentElement.querySelector(':checked').value;
  const expiryCalendar = parentElement.querySelector('.share-link-expiry-date-calendar');
  const expirationDateTitle = parentElement.querySelector('.share-link-actual-expiration-date-title');
  shareLinkExpiryDate = new Date();
  if (checkedValue === 'custom') {
    expiryCalendar.classList.remove('hidden');
    expirationDateTitle.classList.add('hidden');
    const expiryDateInput = parentElement.querySelector('.share-link-expiry-calendar.flatpickr-input');
    shareLinkExpiryDate = new Date(expiryDateInput.value);
  } else {
    expiryCalendar.classList.add('hidden');
    expirationDateTitle.classList.remove('hidden');
    shareLinkExpiryDate.setDate(shareLinkExpiryDate.getDate() + parseInt(checkedValue, 10));
  }
  const actualExpiryDate = parentElement.querySelector('.share-link-actual-expiration-date-title .expiration-date-time');
  actualExpiryDate.textContent = formatDate(shareLinkExpiryDate);
}

function formatDate(date) {
  return date.toLocaleDateString(
    'en-US',
    {
      year: 'numeric', month: 'short', day: 'numeric',
    },
  );
}

function populateSingleAssetView(dialog, assetId, assetName, title, format) {
  populateAssetViewLeftDialog(dialog, '.dialog-header-left', '.share-link-body-left', 'Share asset', assetId, assetName, title, format);

  const shareLinkExpiryContainer = dialog.querySelector('.share-link-body-right .share-link-expiry-container');
  shareLinkExpiryContainer.classList.remove('multi-select');
}

async function populateMultiAssetView(dialog) {
  const dialogBodyLeft = dialog.querySelector('.share-link-body-left');
  const newDialogBodyLeft = dialogBodyLeft.cloneNode(false);
  dialogBodyLeft.parentElement.replaceChild(newDialogBodyLeft, dialogBodyLeft);
  const multiAssetsTable = await createMultiSelectedAssetsTable();
  newDialogBodyLeft.appendChild(multiAssetsTable);

  const shareLinkExpiryContainer = dialog.querySelector('.share-link-body-right .share-link-expiry-container');
  shareLinkExpiryContainer.classList.add('multi-select');

  // Populate the dialog title
  let rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
  dialog.querySelector('.dialog-header-left').textContent = `Share ${rowCount} asset${rowCount > 1 ? 's' : ''}`;
  const assetTable = dialog.querySelector('.multi-selected-assets-table');
  const handleChanges = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        rowCount = multiAssetsTable.querySelectorAll('.asset-row').length;
        dialog.querySelector('.dialog-header-left').textContent = `Share ${rowCount} asset${rowCount > 1 ? 's' : ''}`;
      }
    });
  };
  const observer = new MutationObserver(handleChanges);
  const config = { childList: true };
  observer.observe(assetTable, config);
}

/**
 * Open the share modal for multiple assets
 * @returns {Promise<void>}
 */
export async function openShareModalMultiSelectedAssets() {
  const dialog = document.querySelector('.adp-share-modal.block dialog');
  await populateMultiAssetView(dialog);
  await openModalHelper(dialog, null, 'Multiple assets');
}

/**
 * Open the share modal for a single asset
 * @param assetId
 * @param assetName
 * @param title
 * @param format
 * @returns {Promise<void>}
 */
export async function openModal(assetId, assetName, title, format) {
  const dialog = document.querySelector('.adp-share-modal.block dialog');
  populateSingleAssetView(dialog, assetId, assetName, title, format);
  await openModalHelper(dialog, [assetId], title);
}

async function openModalHelper(dialog, assetIds, title) {
  await populateShareModalInfo(dialog, assetIds, title);

  dialog.showModal();
  document.querySelector('.adp-share-modal.block .action-close').blur();
}

export async function populateShareModalInfo(containerElement, assetIds, title) {
  // Create expiry date calendar dialog
  const calendarDialog = document.createElement('dialog');
  calendarDialog.dataset.testid = 'popover';
  calendarDialog.id = 'share-link-expiry-date-calendar-dialog';
  containerElement.appendChild(calendarDialog);

  // Populate expiry date calendar
  const expiryCalendar = containerElement.querySelector('.share-link-expiry-date-calendar');
  const newExpiryCalendar = expiryCalendar.cloneNode(false);
  expiryCalendar.parentElement.replaceChild(newExpiryCalendar, expiryCalendar);
  await createDateInput(
    newExpiryCalendar,
    'share-link-expiry-date-input',
    '',
    false,
    calendarDialog,
    'share-link-expiry-calendar',
    defaultExpiryDate,
  );
  await decorateIcons(newExpiryCalendar);

  // Handle change for expiry date calendar
  const expiryDateInput = containerElement.querySelector('.share-link-expiry-calendar.flatpickr-input');
  expiryDateInput.addEventListener('change', () => {
    populateExpiryDate(containerElement);
  });

  // Handle click for copy share link button
  const actionsContainer = containerElement.querySelector('.actions-container');
  const newActionsContainer = containerElement.querySelector('.actions-container');
  newActionsContainer.innerHTML = `
    <button class='action action-copy-share-link' aria-label='${COPY_SHARE_LINK_TEXT}'>${COPY_SHARE_LINK_TEXT}</button>
  `;
  actionsContainer.parentElement.replaceChild(newActionsContainer, actionsContainer);
  const copyShareButton = containerElement.querySelector('.action-copy-share-link');
  copyShareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    // Array of assets
    const sharedAssetsArr = [];

    if (!shareLinkUrl) {
      copyShareButton.classList.add('share-link-in-progress');
      copyShareButton.textContent = '';
      const requireLoginCheckbox = containerElement.querySelector('#require-login-checkbox');
      const access = requireLoginCheckbox.checked ? SHARE_LINK_ACCESS.RESTRICTED : SHARE_LINK_ACCESS.PUBLIC;
      let assetIdsArr = assetIds;
      if (assetIdsArr === null) {
        // Multiple assets
        assetIdsArr = [];
        containerElement.querySelectorAll('.multi-selected-assets-table .asset-row').forEach((row) => {
          assetIdsArr.push(row.dataset.assetId);
          sharedAssetsArr.push({ assetId: row.dataset.assetId, assetName: row.dataset.assetName });
        });
      } else { // Single Asset
        sharedAssetsArr.push({ assetId: assetIds[0], assetName: title });
      }
      shareLinkUrl = await createShareLinkUrl(assetIdsArr, title, access, shareLinkExpiryDate);
      copyShareButton.classList.remove('share-link-in-progress');
    }
    if (shareLinkUrl) {
      copyShareButton.textContent = 'Link copied';
      await navigator.clipboard.writeText(shareLinkUrl);
      // Emit SHARE_LINK event
      emitEvent(containerElement, EventNames.SHARE_LINK, {
        shared: sharedAssetsArr,
      });
    } else {
      copyShareButton.textContent = COPY_SHARE_LINK_TEXT;
    }
  });

  const selectElement = containerElement.querySelector('.share-link-expiry-select-container select');
  selectElement.addEventListener('change', () => {
    populateExpiryDate(containerElement);
  });
  selectElement.value = containerElement.querySelector('#share-link-expiry-option-30').value;

  // Initialize the expiry date
  populateExpiryDate(containerElement);
}

/**
 * Handler to share an asset
 * @param {HTMLElement} shareElement
 * @param {string} assetId
 * @param assetName
 * @param title
 * @param format
 */
export function addShareModalHandler(shareElement, assetId, assetName, title, format) {
  shareElement.addEventListener('click', async (e) => {
    e.preventDefault();
    await openModal(assetId, assetName, title, format);
  });
}

export default async function decorate(block) {
  block.innerHTML = `<dialog>
    <div class='adp-share-modal-block'>
      <div class='dialog-header'>
        <div class='dialog-header-left'></div>
        <div class='dialog-header-right'>
          <button class='action action-close' aria-label='Close'>
            <span class='icon icon-close'></span>
          </button>
        </div>
      </div>

      <div class='dialog-body'>
        <div class='share-link-body-left'></div>
        <div class='share-link-body-right'>
          <div class='share-link-expiry-container'>
            <div class='expiry-periods'>
              <div class='label-title'>Expiration</div>
              <div class="share-link-expiry-select-container">
                <select name="share-link-expiry-select">
                  <option class='share-link-expiry-option' value="1">24 hours</option>
                  <option class='share-link-expiry-option' value="7">1 week</option>
                  <option class='share-link-expiry-option' id='share-link-expiry-option-30' value="30">30 days</option>
                  <option class='share-link-expiry-option' value="90">90 days</option>
                  <option class='share-link-expiry-option' value="365">1 year</option>
                  <option class='share-link-expiry-option custom-calendar' value="custom">Custom</option>
                </select>
              </div>
            </div>
            <span class='share-link-expiry-date-calendar'></span>
            <div class='share-link-actual-expiration-date-title'>The link expires on <span class='expiration-date-time'></span></div>
            <div class='share-login-checkbox'>
              <input type='checkbox' id='require-login-checkbox' checked/>
              <label for='require-login-checkbox'>Requires log-in to access</label>
            </div>
          </div>
          <div class='actions-container'></div>
        </div>
      </div>
    </div>

  </dialog>`;

  await decorateIcons(block);
  const dialog = block.querySelector('dialog');
  addModalEventListeners(dialog);
  dialog.querySelector('.action-close').addEventListener('click', () => {
    closeDialog(dialog);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      closeDialog(dialog);
    }
  });

  dialog.addEventListener('click', (event) => {
    // only react to clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
    const dialogDimensions = dialog.getBoundingClientRect();
    // Need to expand 50px right & bottom to accommodate for calendar popup
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right + 50
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom + 50) {
      closeDialog(dialog);
    }
  });
}
