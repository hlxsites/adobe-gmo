import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';
import { fetchSiteConfig, fetchUserDefinedConfig } from './site-config.js';
// eslint-disable-next-line import/no-cycle
import { getBearerToken, checkUserAccess } from './security.js';
import {
  getSearchIndex,
  getBackendApiKey,
  getDeliveryEnvironment,
  getDownloadUrl,
} from './polaris.js';
import {
  isPDF,
} from './filetypes.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

const algoliaCSS = [
  { href: '/scripts/libs/instantsearch.js/themes/reset-min.css', integrity: 'sha256-2AeJLzExpZvqLUxMfcs+4DWcMwNfpnjUeAAvEtPr0wU=', crossOrigin: 'anonymous' },
  { href: '/scripts/libs/instantsearch.js/themes/satellite-min.css', integrity: 'sha256-p/rGN4RGy6EDumyxF9t7LKxWGg6/MZfGhJM/asKkqvA=', crossOrigin: 'anonymous' },
];

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
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
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

function setCSSVar(cssVariableName, configValue, shouldPrependToCommaSeparatedList = false) {
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
  const config = await fetchUserDefinedConfig();

  setCSSVar('--header-background-color', config.primaryColor);
  setCSSVar('--header-text-color', config.secondaryColor);
  setCSSVar('--body-font-family', config.fontFamily, true);

  // eslint-disable-next-line no-use-before-define
  addFavIcon(config.favIcon);
}

export async function loadScript(url, attrs) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    if (attrs) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
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
      .catch((e) => console.error('Unable to fetch results', e));
  },
};

async function initSearch() {
  window.search = window.instantsearch({
    indexName: getSearchIndex(),
    searchClient: backendSearchClient,
  });
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  await getBearerToken();
  if (!window.location.pathname.includes('/no-access')) {
    const hasAccess = await checkUserAccess();
    if (!hasAccess) {
      window.location.href = '/no-access';
      return;
    }
    await initSearch();
  }
  const siteConfig = await fetchSiteConfig('main');
  const fontCSSURL = siteConfig.find((elem) => elem.configProperty === 'fontCSSURL')?.value;
  if (fontCSSURL) {
    loadCSS(fontCSSURL);
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
 * Load the Algolia CSS libs.
 *
 * @param {*} callback
 */
function loadAlgoliaCSS(callback) {
  algoliaCSS.forEach((cssLib) => {
    if (!document.querySelector(`head > link[href="${cssLib.href}"]`)) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', cssLib.href);
      link.setAttribute('integrity', cssLib.integrity);
      link.setAttribute('crossorigin', cssLib.crossOrigin);
      if (typeof callback === 'function') {
        link.onload = (e) => callback(e.type);
        link.onerror = (e) => callback(e.type);
      }
      document.head.appendChild(link);
    } else if (typeof callback === 'function') {
      callback('noop');
    }
  });
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  // load algolia styles
  loadAlgoliaCSS();

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
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
  console.log('Query variable %s not found', variable);
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

function downloadAsset(url, name) {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const imgUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = imgUrl;
      // the filename you want
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(imgUrl);
    })
    .catch((e) => console.log('Unable to download file', e));
}

function openPDF(url) {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const pdfUrl = window.URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
      window.URL.revokeObjectURL(pdfUrl);
    })
    .catch((e) => console.log('Unable to open pdf file', e));
}

/**
 * Add download handling code to the download button
 * @param {HTMLElement} downloadElement - download element
 */
export function addDownloadHandlers(downloadElement, assetId, repoName, format) {
  downloadElement.addEventListener('click', (e) => {
    e.preventDefault();
    const href = getDownloadUrl(assetId, repoName);
    if (isPDF(format)) {
      openPDF(href);
    } else {
      downloadAsset(href, repoName);
    }
  });
}
