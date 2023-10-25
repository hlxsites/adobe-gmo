import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getBackendApiKey, getDeliveryEnvironment, getOptimizedPreviewUrl } from '../../scripts/polaris.js';
import { getBearerToken } from '../../scripts/security.js';
import { createDateInput } from '../../scripts/date-input.js';

const SHARE_LINK_ACCESS = {
  PUBLIC: 'public',
  RESTRICTED: 'restricted',
};

const ASSET_LINK_SHARE_PATH = `${getDeliveryEnvironment()}/adobe/asset-linkshares`;
const defaultExpiryDate = new Date();
defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 30);
const COPY_SHARE_LINK_TEXT = 'Copy share link';
let shareLinkExpiryDate = null;
let shareLinkCopied = '';

function generateLinkShareUrl(linkId) {
  return `${window.location.protocol}//${window.location.host}/share/${linkId}`;
}

/**
 * Call the backend to create a share link
 * @param shareLinkElement
 * @param assetId
 * @param assetName
 * @param title
 * @param access
 * @param expiryTime e.g. 2023-12-31
 */
async function createShareLink(shareLinkElement, assetId, assetName, title, access, expiryTime) {
  const payload = {
    assets: [
      {
        assetId,
      },
    ],
    // collections: [],
    title,
    access,
    expiryTime,
  };

  const bearerToken = await getBearerToken();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getBackendApiKey(),
      Authorization: bearerToken,
    },
    body: JSON.stringify(payload),
  };
  fetch(ASSET_LINK_SHARE_PATH, options).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    throw new Error(`${resp.status}: ${resp.statusText}`);
  }).then(async (json) => {
    shareLinkCopied = generateLinkShareUrl(json?.id);
    await navigator.clipboard.writeText(shareLinkCopied);
  }).catch((ex) => {
    console.error('Unable to create share link', ex);
  });
}

function closeDialog(dialog) {
  // Clean up calendar dialog
  document.querySelector('#share-link-expiry-date-calendar-dialog')?.remove();
  dialog.close();
}

function populateExpiryDate(dialog) {
  // Reset copy share link button
  shareLinkCopied = '';
  const copyShareButton = dialog.querySelector('.action-copy-share-link');
  copyShareButton.textContent = COPY_SHARE_LINK_TEXT;

  const checkedValue = dialog.querySelector('input[name=share-link-expiry-group]:checked').value;
  const actualExpiryDate = dialog.querySelector('.share-link-actual-expiration-date-title .expiration-date-time');
  const expiryCalendar = dialog.querySelector('#share-link-expiry-date-calendar');
  shareLinkExpiryDate = new Date();
  if (checkedValue === 'custom') {
    expiryCalendar.style.visibility = '';
    const expiryDateInput = dialog.querySelector('.share-link-expiry-calendar.flatpickr-input');
    shareLinkExpiryDate = new Date(expiryDateInput.value);
  } else {
    expiryCalendar.style.visibility = 'hidden';
    shareLinkExpiryDate.setDate(shareLinkExpiryDate.getDate() + parseInt(checkedValue, 10));
  }
  actualExpiryDate.textContent = formatDate(shareLinkExpiryDate);
}

function formatDate(date) {
  return date.toLocaleDateString(
    'en-US',
    {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
    },
  );
}

export async function openModal(assetId, assetName, title, format) {
  const dialog = document.querySelector('.adp-share-modal.block dialog');

  // Populate the asset image
  const assetImg = dialog.querySelector('.asset-image img');
  assetImg.dataset.fileformat = format;
  assetImg.style.visibility = 'hidden';
  getOptimizedPreviewUrl(assetId, assetName, 350).then((url) => {
    assetImg.src = url;
    assetImg.style.visibility = '';
  });
  assetImg.alt = title;

  // Populate the asset name
  const assetImgName = dialog.querySelector('.asset-name');
  assetImgName.textContent = title;

  // Create expiry date calendar dialog
  const calendarDialog = document.createElement('dialog');
  calendarDialog.id = 'share-link-expiry-date-calendar-dialog';
  document.body.appendChild(calendarDialog);

  // Populate expiry date calendar
  const expiryCalendar = dialog.querySelector('#share-link-expiry-date-calendar');
  const newExpiryCalendar = expiryCalendar.cloneNode(false);
  expiryCalendar.parentElement.replaceChild(newExpiryCalendar, expiryCalendar);
  createDateInput(
    newExpiryCalendar,
    'share-link-expiry-date-input',
    '',
    true,
    calendarDialog,
    'share-link-expiry-calendar',
    defaultExpiryDate,
  );
  await decorateIcons(newExpiryCalendar);

  // Check the 30 days radio button as default
  dialog.querySelector('#share-link-expiry-30days').checked = true;

  // Handle change for expiry date calendar
  const expiryDateInput = dialog.querySelector('.share-link-expiry-calendar.flatpickr-input');
  expiryDateInput.addEventListener('change', () => {
    populateExpiryDate(dialog);
  });

  // Handle click for copy share link button
  const actionsContainer = dialog.querySelector('.actions-container');
  const newActionsContainer = dialog.querySelector('.actions-container');
  newActionsContainer.innerHTML = `
    <button class='action action-copy-share-link' aria-label='${COPY_SHARE_LINK_TEXT}'>${COPY_SHARE_LINK_TEXT}</button>
  `;
  actionsContainer.parentElement.replaceChild(newActionsContainer, actionsContainer);
  const copyShareButton = dialog.querySelector('.action-copy-share-link');
  copyShareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!shareLinkCopied) {
      const requireLoginCheckbox = dialog.querySelector('#require-login-checkbox');
      const access = requireLoginCheckbox.checked ? SHARE_LINK_ACCESS.RESTRICTED : SHARE_LINK_ACCESS.PUBLIC;
      await createShareLink(copyShareButton, assetId, assetName, title, access, shareLinkExpiryDate);
      copyShareButton.textContent = 'Link copied';
    } else {
      await navigator.clipboard.writeText(shareLinkCopied);
    }
  });

  dialog.showModal();
  document.querySelector('.adp-share-modal.block .action-close').blur();
  populateExpiryDate(dialog);
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
  block.innerHTML = `<dialog autofocus>
    <div class='adp-share-modal-block'>
      <div class='dialog-header'>
        <div class='dialog-header-left'>Share asset</div>
        <div class='dialog-header-right'>
          <button class='action action-close' aria-label='Close'>
            <span class='icon icon-close'></span>
          </button>
        </div>
      </div>

      <div class='dialog-body'>
        <div class='dialog-body-left'>
          <div class='asset-image'>
            <img/>
          </div>
          <div class='asset-name'></div>
        </div>
        <div class='dialog-body-right'>
          <div class='share-link-expiry-container'>
            <div class='label-title'>Period of expiration<span class='icon icon-asterisk'></span></div>
            <div>
              <input type="radio" name="share-link-expiry-group" id="share-link-expiry-24h" value='1' />
              <label class='share-link-expiry-group' for="share-link-expiry-24h">24 hours</label>
            </div>
            <div>
              <input type="radio" name="share-link-expiry-group" id="share-link-expiry-1week" value='7' />
              <label class='share-link-expiry-group' for="share-link-expiry-1week">1 week</label>
            </div>
            <div>
              <input type="radio" name="share-link-expiry-group" id="share-link-expiry-30days" value='30'/>
              <label class='share-link-expiry-group' for="share-link-expiry-30days">30 days</label>
            </div>
            <div>
              <input type="radio" name="share-link-expiry-group" id="share-link-expiry-custom" value='custom' />
              <label class='share-link-expiry-group' for="share-link-expiry-custom">Custom</label>
              <span id='share-link-expiry-date-calendar'></span>
            </div>
          </div>
          <div class='share-link-actual-expiration-date-title'>The link expires on <span class='expiration-date-time'></span></div>
          <div class='share-login-checkbox'>
            <input type='checkbox' id='require-login-checkbox' checked/>
            <label for='require-login-checkbox'>Requires log-in to access</label>
          </div>
          <div class='actions-container'></div>
        </div>
      </div>
    </div>

  </dialog>`;

  await decorateIcons(block);
  const dialog = block.querySelector('dialog');
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
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
      closeDialog(dialog);
    }
  });

  const shareLinkExpiryRadioButtons = dialog.querySelectorAll('input[name=share-link-expiry-group]');
  shareLinkExpiryRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', () => {
      populateExpiryDate(dialog);
    });
  });
}
