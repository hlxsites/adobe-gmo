import { decorateIcons } from './lib-franklin.js';

export default async function createConfirmDialog(title, text, onConfirm, confirmButtonText, onCancel, cancelButtonText) {
  const dialogContainer = document.createElement('div');
  dialogContainer.classList.add('confirm-dialog-wrapper');
  dialogContainer.innerHTML = `<dialog autofocus>
    <div class='dialog-container'>
      <div class='dialog-header'>
        <div class='dialog-header-left'></div>
        <div class='dialog-header-right'>
          <button class='action action-close' aria-label='Close'>
            <span class='icon icon-close'></span>
          </button>
        </div>
      </div>
      <div class='dialog-body'>
        <div class='dialog-body-content'></div>
      </div>
      <div class='dialog-footer'>
        <div class='actions-container'>
        <button class="adp-action adp-cancel action-cancel"></button>
        <button class="adp-action adp-danger action-confirm"></button>
        </div>
      </div>
    </div>
  </dialog>`;
  addContent(dialogContainer.querySelector('.dialog-header-left'), title);
  addContent(dialogContainer.querySelector('.dialog-body-content'), text);
  addContent(dialogContainer.querySelector('.action-cancel'), cancelButtonText || 'Cancel');
  addContent(dialogContainer.querySelector('.action-confirm'), confirmButtonText || 'Confirm');

  dialogContainer.querySelector('.action-cancel').addEventListener('click', () => {
    if (onCancel) onCancel();
    closeConfirmationDialog(dialogContainer);
  });
  dialogContainer.querySelector('.action-confirm').addEventListener('click', () => {
    onConfirm();
    closeConfirmationDialog(dialogContainer);
  });
  document.body.appendChild(dialogContainer);
  dialogContainer.querySelector('dialog').showModal();
  decorateIcons(dialogContainer);

  dialogContainer.querySelector('.action-close').addEventListener('click', () => {
    if (onCancel) onCancel();
    closeConfirmationDialog(dialogContainer);
  });
}

function closeConfirmationDialog(dialog) {
  // remove dialog from DOM
  dialog.remove();
}

function addContent(containerElem, content) {
  if (typeof content === 'string') {
    containerElem.innerText = content;
  } else if (content instanceof HTMLElement) {
    containerElem.appendChild(content);
  }
}
