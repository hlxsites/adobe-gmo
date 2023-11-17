import { decorateIcons } from './lib-franklin.js';

function closeToast(toastElement, duration = 0) {
  setTimeout(() => {
    toastElement.classList.add('adp-toast-fadeout');
    setTimeout(() => {
      toastElement.remove();
    }, 500);
  }, duration);
}

function createCloseButton(toastElement) {
  const closeButton = document.createElement('button');
  closeButton.className = 'action action-close';
  closeButton.innerHTML = '<span class="icon icon-closeToast"></span>';
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeToast(toastElement);
  });
  decorateIcons(closeButton);
  return closeButton;
}

/**
 * Show a toast message at the top of the page.
 * @param {*} message - The message to display.
 * @param {*} duration - The duration to display the message in milliseconds.
 * @param {*} messageType - The type of message to display. Can be 'success', 'info', 'warning', or 'error'.
 * @param {*} showOnNextPageLoad - If true, the message will be shown again on the next page load,
 * for example, if the user is redirected to another page.
 */
export default function showToast(message, duration, messageType, showOnNextPageLoad = false) {
  if (showOnNextPageLoad) {
    sessionStorage.setItem('adp-toast-message', message);
    sessionStorage.setItem('adp-toast-duration', duration);
    sessionStorage.setItem('adp-toast-type', messageType);
  }
  const toast = document.createElement('div');
  toast.classList.add('adp-toast', 'show', messageType);
  const toastMessage = document.createElement('div');
  toastMessage.className = 'adp-toast-message';
  const closeButton = document.createElement('div');
  closeButton.className = 'adp-close-button';
  closeButton.appendChild(createCloseButton(toast));
  const divider = document.createElement('div');
  divider.className = 'adp-divider';
  const dividerIcon = document.createElement('span');
  dividerIcon.className = 'icon icon-divider';
  divider.appendChild(dividerIcon);
  toastMessage.innerHTML = message;
  toast.appendChild(toastMessage);
  toast.appendChild(divider);
  toast.appendChild(closeButton);
  decorateIcons(toast);
  document.body.appendChild(toast);
  closeToast(toast, duration);
}

export function showNextPageToast() {
  const message = sessionStorage.getItem('adp-toast-message');
  const duration = sessionStorage.getItem('adp-toast-duration');
  const type = sessionStorage.getItem('adp-toast-type');
  if (message) {
    showToast(message, duration, type);
    sessionStorage.removeItem('adp-toast-message');
    sessionStorage.removeItem('adp-toast-duration');
    sessionStorage.removeItem('adp-toast-type');
  }
}
