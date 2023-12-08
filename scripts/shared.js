import { removeParamFromWindowURL } from './scripts.js';

export function closeModal(block) {
  document.body.classList.remove('no-scroll');
  const modal = block.querySelector('.modal-container');
  modal.querySelector('#asset-details-next')?.classList.remove('hidden');
  modal.querySelector('#asset-details-previous')?.classList.remove('hidden');
  modal.querySelector('.divider.first')?.classList.remove('hidden');
  modal.querySelector('iframe')?.remove();
  removeParamFromWindowURL('assetId');
  modal.close();
}

export function getCSSVar(cssVariableName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariableName);
}

export function setCSSVar(cssVariableName, configValue, shouldPrependToCommaSeparatedList = false) {
  if (configValue) {
    const currentFontFamily = getCSSVar(cssVariableName);
    let newValue = configValue;
    if (shouldPrependToCommaSeparatedList) {
      newValue = `${configValue}, ${currentFontFamily}`;
    }
    document.documentElement.style.setProperty(cssVariableName, newValue);
  }
}
