import { emitEvent, EventNames } from './events.js';
import { decorateIcons } from './lib-franklin.js';

function addContent(element, content) {
  if (typeof content === 'string' && content.trim().length > 0) {
    element.innerText = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (Array.isArray(content)) {
    content.forEach((item) => {
      addContent(element, item);
    });
  }
}

export function createDialogHtml(
  dialogId,
  {
    dialogHeaderLeftContent,
    dialogHeaderRightContent,
    dialogBodyContent,
    dialogFooterContent,
    showCloseButton,
    addEventListeners,
  },
) {
  // eslint-disable-next-line no-param-reassign
  if (showCloseButton === undefined) showCloseButton = true;
  // eslint-disable-next-line no-param-reassign
  if (addEventListeners === undefined) addEventListeners = true;
  const dialog = document.createElement('dialog');
  dialog.id = dialogId;
  dialog.classList.add('dialog-container');
  dialog.innerHTML = `
    <div class="dialog-header">
          <div class="dialog-header-left">
          </div>
          <div class="dialog-header-right">
          </div>
        </div>
    </div>
    <div class="dialog-body">
    </div>
    <div class="dialog-footer">
    </div>`;
  const dialogHeaderLeft = dialog.querySelector('.dialog-header-left');
  const dialogHeaderRight = dialog.querySelector('.dialog-header-right');
  const dialogBody = dialog.querySelector('.dialog-body');
  const dialogFooter = dialog.querySelector('.dialog-footer');
  addContent(dialogHeaderLeft, dialogHeaderLeftContent);
  addContent(dialogHeaderRight, dialogHeaderRightContent);
  if (showCloseButton) {
    // create <button class="action action-close" aria-label="Close">
    const buttonElem = document.createElement('button');
    buttonElem.classList.add('action', 'action-close');
    buttonElem.setAttribute('aria-label', 'Close');
    const closeButtonHtml = '<span class="icon icon-close"></span>';
    buttonElem.innerHTML = closeButtonHtml;
    buttonElem.addEventListener('click', () => {
      dialog.close();
    });
    decorateIcons(buttonElem);
    dialogHeaderRight.appendChild(buttonElem);
  }
  addContent(dialogBody, dialogBodyContent);
  addContent(dialogFooter, dialogFooterContent);
  if (addEventListeners) {
    addDialogEventListeners(dialog, {
      closedialogOnEscape: true,
      closedialogOnOutsideClick: true,
    });
  }
  return {
    dialog,
    dialogHeaderLeft,
    dialogHeaderRight,
    dialogBody,
    dialogFooter,
  };
}

let numModalsOpen = 0;

export function addDialogEventListeners(dialogElement, options = {}) {
  const observer = new MutationObserver((event) => {
    if (event[0].attributeName === 'open') { // dialog is opening
      document.body.classList.add('no-scroll');
      if (dialogElement.open) {
        numModalsOpen += 1;
        if (numModalsOpen === 1) {
          emitEvent(dialogElement, EventNames.A_MODAL_IS_OPEN);
        }
      } else { // dialog is closing
        document.body.classList.remove('no-scroll');
        if (numModalsOpen > 0) {
          numModalsOpen -= 1;
        }
        if (numModalsOpen === 0) {
          emitEvent(dialogElement, EventNames.ALL_MODALS_CLOSED);
        }
        if (options.onClose) {
          options.onClose();
        }
        if (options.removeDialogElementOnClose && dialogElement.isConnected) {
          dialogElement.remove();
        }
      }
    }
  });
  observer.observe(dialogElement, { attributes: true });
  if (options.closeModalOnOutsideClick) {
    dialogElement.addEventListener('click', (event) => {
      if (event.target === dialogElement) {
        dialogElement.close();
      }
    });
  }
}
