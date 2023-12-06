/**
 * Removes a given parameter from a URL's query string and hash parameter string.
 * @param {string} url URL to be modified.
 * @param {string} paramName Name of the parameter to remove.
 * @returns {string} Modified version of the parameter.
 */
export function removeParamFromUrl(url, paramName) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);
  const hashParams = new URLSearchParams(urlObject.hash.replace('#', ''));

  // Remove paramName from query parameters
  if (params.has(paramName)) {
    params.delete(paramName);
    urlObject.search = params.toString();
  }

  // Remove paramName from hash parameters
  if (hashParams.has(paramName)) {
    hashParams.delete(paramName);
    urlObject.hash = hashParams.toString();
  }

  return urlObject.toString();
}

/**
 * Removes a given parameter from the current URL's query string and hash parameter string.
 * The window's history will be modified in place.
 * @param {string} paramName The name of the parameter to remove.
 */
export function removeParamFromWindowURL(paramName) {
  const newURL = removeParamFromUrl(window.location.href, paramName);
  window.history.replaceState({}, '', newURL);
}

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
