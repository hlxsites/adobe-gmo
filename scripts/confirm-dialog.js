import { decorateIcons } from './lib-franklin.js';
import { addModalEventListeners } from './shared.js';

export default async function createConfirmDialog(title, text, onConfirm, confirmButtonText, onCancel, cancelButtonText) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('adp-confirm-dialog');
  dialog.innerHTML = `
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
    </div>`;
  addContent(dialog.querySelector('.dialog-header-left'), title);
  addContent(dialog.querySelector('.dialog-body-content'), text);
  addContent(dialog.querySelector('.action-cancel'), cancelButtonText || 'Cancel');
  addContent(dialog.querySelector('.action-confirm'), confirmButtonText || 'Confirm');

  dialog.querySelector('.action-cancel').addEventListener('click', () => {
    if (onCancel) onCancel();
    dialog.close();
  });
  dialog.querySelector('.action-confirm').addEventListener('click', () => {
    onConfirm();
    dialog.close();
  });
  document.body.appendChild(dialog);
  dialog.showModal();
  decorateIcons(dialog);

  dialog.querySelector('.action-close').addEventListener('click', () => {
    if (onCancel) onCancel();
    dialog.close();
  });

  addModalEventListeners(dialog.querySelector('dialog'), {
    removeDialogElementOnClose: true,
    closeModalOnEscape: true,
  });
}

function addContent(containerElem, content) {
  if (typeof content === 'string') {
    containerElem.innerText = content;
  } else if (content instanceof HTMLElement) {
    containerElem.appendChild(content);
  }
}
