import {
  sampleRUM,
  buildBlock,
  loadHeader,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';
import { getAdminConfig, getBrandingConfig } from './site-config.js';
// eslint-disable-next-line import/no-cycle
import { getBearerToken, checkUserAccess } from './security.js';
import {
  getSearchIndex,
  getBackendApiKey,
  getDeliveryEnvironment,
  initDeliveryEnvironment,
} from './polaris.js';
import { EventNames, emitEvent } from './events.js';

// Load a list of dependencies the site needs
const loadDependenciesPromise = fetch(`${window.hlx.codeBasePath}/scripts/dependencies.json`)
  .then((res) => res.json())
  .then(loadDependencies);
getBearerToken();
// Pre-emptively load the configs in parallel
getAdminConfig();
getBrandingConfig();

const dependencyScripts = [];

const NO_ACCESS_PATH = '/no-access';

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Logs the details of an error that was encountered by the portal.
 * @param {string} source Description of where the error occurred.
 * @param {Error} error Error whose details should be captured.
 */
export function logError(source, error) {
  // eslint-disable-next-line no-console
  console.error(source, error);
  sampleRUM('error', { source, target: error.message });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    logError('buildAutoBlocks', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

export function setCSSVar(cssVariableName, configValue, shouldPrependToCommaSeparatedList = false) {
  if (configValue) {
    const currentFontFamily = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVariableName);
    let newValue = configValue;
    if (shouldPrependToCommaSeparatedList) {
      newValue = `${configValue}, ${currentFontFamily}`;
    }
    document.documentElement.style.setProperty(cssVariableName, newValue);
  }
}

async function applySiteBranding() {
  const brandingConfig = await getBrandingConfig();
  setCSSVar('--header-background-color', brandingConfig.menubarColor);
  setCSSVar('--header-text-color', brandingConfig.brandTextColor);
  setCSSVar('--body-font-family', brandingConfig.font, true);

  addFavIcon(brandingConfig.favicon);
}

export async function loadScript(url, attrs) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    if (attrs) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      attrs.forEach((attr) => {
        script.setAttribute(attr, '');
      });
    }

    script.onload = () => resolve(script);
    script.onerror = reject;

    const head = document.querySelector('head');
    head.append(script);
  });
}

function createSearchEndpoint() {
  return `${getDeliveryEnvironment()}/adobe/assets/search`;
}

const backendSearchClient = {
  async search(requests) {
    const token = await getBearerToken();
    return fetch(createSearchEndpoint(), {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getBackendApiKey(),
        Authorization: token,
        'x-adobe-accept-experimental': 1,
        'x-adp-request': (Array.isArray(requests) && requests.length > 0
          && requests[0].type === 'facet') ? 'facet' : 'search',
      },
      body: JSON.stringify({ requests }),
    })
      .then((res) => res.json())
      .catch((e) => logError('backendSearchClient', e));
  },
};

export function getSearchClient() {
  return backendSearchClient;
}

export function getInstantSearchRouting() {
  if (window.instantSearchRouter) {
    return window.instantSearchRouter;
  }
  const instantSearchRouter = window.instantsearch.routers.history();
  window.instantSearchRouter = instantSearchRouter;
  return instantSearchRouter;
}

async function initSearch() {
  window.search = window.instantsearch({
    indexName: getSearchIndex(),
    searchClient: backendSearchClient,
  });
}

/**
 * Removes any sensitive information from one of the portal's URLs.
 * @param {URL} url URL to be cleaned.
 * @returns {string} String version of the URL.
 */
function cleanUrl(url) {
  const cleaned = new URL(url);
  // remove ims information
  if (String(cleaned.hash).startsWith('#old_hash')) {
    cleaned.hash = '';
  }
  return cleaned.toString();
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  const brandingConfig = await getBrandingConfig();
  if (brandingConfig.fontCssUrl) {
    loadCSS(brandingConfig.fontCssUrl);
  }
  applySiteBranding();
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }
}

async function initializeServiceWorkers() {
  if (window.location.hostname.includes('localhost')) {
    const sw = await navigator.serviceWorker.register('/localdata.js');
    // eslint-disable-next-line no-console
    console.log('ServiceWorker registered', sw);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  emitEvent(document.documentElement, EventNames.PAGE_VIEW, {
    url: cleanUrl(window.location),
  });
  const main = doc.querySelector('main');
  if (!window.location.pathname.includes(NO_ACCESS_PATH)) {
    if (!await checkUserAccess()) {
      window.location.href = NO_ACCESS_PATH;
      return;
    }
    // This is a dev only service worker that caches the algolia JS SDK
    // check if we are on localhost
    await initializeServiceWorkers();
    // Make sure all dependencies are loaded before initializing search
    // - we load them in parallel by leveraging the promise
  }
  await waitForDependency('search');
  await initDeliveryEnvironment();
  await initSearch();
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  if (!(document.querySelector('head meta[name="hide-header"]')?.getAttribute('content') === 'true')) {
    loadHeader(doc.querySelector('header'), 'adp-header');
  }

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads all dependencies in an async way so we can leverage
 * the browser's ability to load multiple resources in parallel.
 */
async function loadDependencies(dependenciesJSON) {
  dependenciesJSON.forEach((dependency) => {
    if (dependency.type === 'js') {
      if (!dependency.attrs || !dependency.attrs.find((attr) => attr === 'async')) {
        dependencyScripts.push(loadScript(dependency.src, dependency.attrs));
      } else {
        dependencyScripts.push({
          category: dependency.category || dependency.src,
          script: loadScript(dependency.src, dependency.attrs),
        });
      }
    } else if (dependency.type === 'css') {
      loadCSS(dependency.href);
    }
  });
  await Promise.all(dependencyScripts);
}

export async function waitForDependency(dependencyCategory) {
  // make sure dependencies have been initialized
  await loadDependenciesPromise;
  const dependencies = dependencyScripts.filter((d) => d.category === dependencyCategory);
  if (dependencies && dependencies.length > 0) {
    return await Promise.all(dependencies.map((d) => d.script));
  }
  return Promise.resolve();
}
/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
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
  const hash = window.location.hash.substring(1);
  const vars = hash.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair && pair[0] === variable) {
      return pair[1];
    }
  }
  return undefined;
}

loadPage();

export function safeCSSId(str) {
  return encodeURIComponent(str)
    .toLowerCase()
    .replace(/\.|%[0-9a-z]{2}/gi, '');
}

export function getLastPartFromURL() {
  const url = new URL(document.location);
  const path = url.pathname;
  const parts = path.split('/');
  const id = parts[parts.length - 1];
  return id;
}

export function setLastPartofURL(newLastPart, redirect = false) {
  const url = new URL(document.location);
  const path = url.pathname;
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  if (lastPart) {
    // replace :'s with _'s as : isn't valid in a Franklin folder URL
    parts[parts.length - 1] = newLastPart.replaceAll(':', '_');
    url.pathname = parts.join('/');
    if (redirect) {
      window.location.href = url.toString();
    } else {
      window.history.replaceState({}, '', url.toString());
    }
  }
}

function setParamInHashParams(url, paramName, paramValue) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.hash.replace('#', ''));
  params.set(paramName, paramValue);
  urlObject.hash = params.toString();
  return urlObject.toString();
}

export function setHashParamInWindowURL(paramName, paramValue) {
  const newURL = setParamInHashParams(window.location.href, paramName, paramValue);
  window.history.replaceState({}, '', newURL);
}

function addParamToHashParams(url, paramName, paramValue) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.hash.replace('#', ''));
  params.append(paramName, paramValue);
  urlObject.hash = params.toString();
  return urlObject.toString();
}

export function addHashParamToWindowURL(paramName, paramValue) {
  const newURL = addParamToHashParams(window.location.href, paramName, paramValue);
  window.history.replaceState({}, '', newURL);
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
      // document.body.classList.remove('no-scroll');
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
