import { unifiedShellNavigateTo } from '../contenthub/unified-shell.js';

export function closeAssetDetailsModal(block) {
  document.body.classList.remove('no-scroll');
  const modal = block.querySelector('.modal-container');
  modal.querySelector('#asset-details-next')?.classList.remove('hidden');
  modal.querySelector('#asset-details-previous')?.classList.remove('hidden');
  modal.querySelector('.divider.first')?.classList.remove('hidden');
  modal.querySelector('iframe')?.remove();
  removeParamFromWindowURL('assetId');
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

/**
 * Removes a given parameter from the current URL's query string and hash parameter string.
 * The window's history will be modified in place.
 * @param {string} paramName The name of the parameter to remove.
 */

export function removeParamFromWindowURL(paramName) {
  const newURL = removeParamFromUrl(window.location.href, paramName);
  window.history.replaceState({}, '', newURL.toString().replace(newURL.origin, ''));
}

/**
 * Removes a given parameter from a URL's query string and hash parameter string.
 * @param {string} url URL to be modified.
 * @param {string} paramName Name of the parameter to remove.
 * @returns {URL} Modified URL
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
    urlObject.hash = decodeURIComponent(hashParams.toString());
  }

  return urlObject;
}
export function isElement(element) {
  return element instanceof Element || element instanceof Document;
}

/**
 * Get the value of a query string parameter from the URL
 * e.g. http://localhost:3000?assetId=1234
 * @param {*} variable The name of the parameter to get the value of
 * @returns The value of the parameter
 */
export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  if (!query) return null;
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}

export function getAnchorVariable(variable) {
  return new URLSearchParams(window.location.hash.substring(1)).get(variable);
}

export function safeCSSId(str) {
  return encodeURIComponent(str)
    .toLowerCase()
    .replace(/\.|%[0-9a-z]{2}/gi, '');
}

export function getPathParams() {
  return window.location.pathname
    .split('/')
    .filter((p) => p)
    // restore the character "_"  back to ":", as ":" isn't valid in a Franklin folder URL
    .map((p) => p.replaceAll('_', ':'));
}

function setParamInHashParams(url, paramName, paramValue) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.hash.replace('#', ''));
  params.set(paramName, paramValue);
  urlObject.hash = decodeURIComponent(params.toString());
  return urlObject;
}

export function setHashParamInWindowURL(paramName, paramValue) {
  const newURL = setParamInHashParams(window.location.href, paramName, paramValue);
  window.history.replaceState({}, '', newURL.toString().replace(newURL.origin, ''));
}

/**
 * @param url current url
 * @param paramName new param name
 * @param paramValue new param value
 * @return {URL}
 */
function addParamToHashParams(url, paramName, paramValue) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.hash.replace('#', ''));
  params.append(paramName, paramValue);
  urlObject.hash = decodeURIComponent(params.toString());
  return urlObject;
}

export function addHashParamToWindowURL(paramName, paramValue) {
  const newURL = addParamToHashParams(window.location.href, paramName, paramValue);
  window.history.replaceState({}, '', newURL.toString().replace(newURL.origin, ''));
}

export function createTag(tag, attributes) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      element.setAttribute(key, val);
    });
  }
  return element;
}

export function getSelectedAssetsFromInfiniteResultsBlock() {
  return [...document.querySelectorAll('.adp-infinite-results.block .adp-result-item.checked')];
}

export function closeDialogEvent(dialog) {
  dialog.addEventListener('click', (event) => {
    // only react to clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
    const dialogDimensions = dialog.getBoundingClientRect();
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
      dialog.close();
    }
  });
}

export function sortMetadata(metadataElement) {
  const metadataGroups = {};
  const metadataElem = metadataElement;
  const metadataParent = metadataElem.querySelector('.metadata-fields');
  const metadataItems = metadataParent.querySelectorAll('[data-metagroup]');
  const metadataFragment = document.createDocumentFragment();

  // get unique values for metadata group/category
  const metadataCategories = [];
  metadataItems.forEach((elem) => {
    metadataCategories.push(elem.getAttribute('data-metagroup'));
  });
  const uniqueCategories = [...new Set(metadataCategories)];

  uniqueCategories.forEach((category) => {
    metadataGroups[category] = createMetadataGroup(category);
  });

  metadataItems.forEach((elem) => {
    const metadataType = elem.getAttribute('data-metagroup');
    metadataGroups[metadataType].appendChild(elem);
  });

  Object.keys(metadataGroups).forEach((key) => {
    metadataFragment.appendChild(metadataGroups[key]);
  });

  metadataParent.appendChild(metadataFragment);
  return metadataElem;
}
function createMetadataGroup(headingText) {
  const metadataGroup = document.createElement('div');
  metadataGroup.classList.add('metadata-group');
  metadataGroup.innerHTML = `<span>${headingText}</span>`;
  return metadataGroup;
}

/**
 * returns a relative URL if possible, otherwise an absolute URL with origin
 * @param path
 * @param queryParams
 * @param hashParams
 * @param options {{absolute: boolean}}
 * @return {string} URL
 */
export function createLinkHref(path, queryParams = {}, hashParams = {}, options = { absolute: false }) {
  const url = new URL(path, window.location.href);
  url.search = '';
  url.hash = '';
  // replace the character ":" with "_" because  as ":" isn't valid in a Franklin folder URL
  url.pathname = url.pathname.replaceAll(':', '_');

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, val]) => {
      url.searchParams.set(key, val);
    });
  }
  if (hashParams) {
    const params = new URLSearchParams();
    // eslint-disable-next-line guard-for-in
    for (const key in hashParams) {
      params.set(key, hashParams[key]);
    }
    url.hash = decodeURIComponent(params.toString());
  }
  // remove domain for relative urls
  const urlWithoutOrigin = url.toString().replace(url.origin, '');
  if (window.unifiedShellRuntime) {
    return window.unifiedShellRuntime.generateShellUrl({ path: urlWithoutOrigin });
  } else if (options.absolute) {
    return url.toString();
  } else {
    return urlWithoutOrigin;
  }
}

/**
 * call this instead of changing window.location directly
 * @param url {string} to navigate to
 */
export function navigateTo(url) {
  if (window.unifiedShellRuntime) {
    unifiedShellNavigateTo(url);
  } else {
    window.location.href = url;
  }
}
