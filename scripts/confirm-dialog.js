import { decorateIcons } from './lib-franklin.js';

export default async function createConfirmDialog(title, text, onCancel, onConfirm, cancelButtonText, confirmButtonText) {
  const dialogContainer = document.createElement('div');
  dialogContainer.classList.add('confirm-dialog-wrapper');
  dialogContainer.innerHTML = `<dialog autofocus>
    <div class='dialog-container'>
      <div class='dialog-header'>
        <div class='dialog-header-left'>${title}</div>
        <div class='dialog-header-right'>
          <button class='action action-close' aria-label='Close'>
            <span class='icon icon-close'></span>
          </button>
        </div>
      </div>
      <div class='dialog-body'>
        <div class='dialog-body-content'>${text}</div>
      </div>
      <div class='dialog-footer'>
        <div class='actions-container'>
          <button class='confirm-dialog-button cancel'>${cancelButtonText}</button>
          <button class='confirm-dialog-button confirm'>${confirmButtonText}</button>
        </div>
      </div>
    </div>
  </dialog>`;

  dialogContainer.querySelector('.cancel').addEventListener('click', () => {
    onCancel();
    dialogContainer.remove();
  });
  dialogContainer.querySelector('.confirm').addEventListener('click', () => {
    onConfirm();
    dialogContainer.remove();
  });
  document.body.appendChild(dialogContainer);
  dialogContainer.querySelector('dialog').showModal();
  decorateIcons(dialogContainer);

  dialogContainer.querySelector('.action-close').addEventListener('click', () => {
    dialogContainer.remove();
  });
}
