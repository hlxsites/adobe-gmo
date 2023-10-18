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
import { getBrandingConfig } from './site-config.js';
// eslint-disable-next-line import/no-cycle
import { getBearerToken, checkUserAccess } from './security.js';
import {
  getSearchIndex,
  getBackendApiKey,
  getDeliveryEnvironment,
  getDownloadUrl,
} from './polaris.js';
import { isPDF } from './filetypes.js';
import { getUserProfile, getJumpToken } from './security.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
let ccEverywhere;

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
    // This is a dev only service worker that caches the algolia JS SDK
    // check if we are on localhost
    await initializeServiceWorkers();
    await initSearch();
  }
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
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

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

function downloadAsset(url, name, options) {
  fetch(url, options)
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

function openPDF(url, options) {
  fetch(url, options)
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
export async function addDownloadHandlers(downloadElement, assetId, repoName, format) {
  downloadElement.addEventListener('click', async (e) => {
    e.preventDefault();
    const bearerToken = await getBearerToken();
    const options = {
      method: 'GET',
      headers: {
        Authorization: bearerToken,
      },
    };
    const href = await getDownloadUrl(assetId, repoName);
    if (isPDF(format)) {
      await openPDF(href, options);
    } else {
      await downloadAsset(href, repoName, options);
    }
  });
}


export async function addExpressEditorHandler(editorElement, assetId, repoName, format) {
  editorElement.addEventListener('click', async (e) => {
    const assetUrl = await getDownloadUrl(assetId, repoName);
    console.log("asset url: " + assetUrl);
    const bearerToken = await getBearerToken();
    const rawAsset = await getAssetData(assetUrl, bearerToken);
    const assetData = await base64Encode(rawAsset);
    adjustZIndex(true);
    await openInExpress(assetData, format);
  });
}

function buildHostInfo() {
  const hostInfo = {
    clientId: '05d5980c9fe1440baa898857d410e614',
    appName: 'gmo_asset_portal',
    appVersion: {
        major: 3,
        minor: 8,
        patch: 12,
    },
    platformCategory: 'web',
  };

  return hostInfo;
}

function buildConfigParams() {
  const configParams = {
    env: 'prod',
    locale: 'en_US'
  };

  return configParams;
}

async function buildAuthInfo() {
  const authInfo = {
    accessToken: await getJumpToken(),
    useJumpUrl: false
  };

  return authInfo;
}

async function buildUserInfo() {
  let profileObject = await getUserProfile();
  let userId = await profileObject['userId'];

  const userInfo = {
    profile: {
      userId: userId,
      serviceCode: 'serviceCode',
      serviceLevel: 'serviceLevel'
    },
    piipStatus: 2
  };
  return userInfo;
}

async function getAssetData(url, bearerToken) {
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  };

  const response = await fetch(url, options);
  const blob = await response.blob();
  return blob;
}

async function base64Encode(blob) {
  return new Promise((resolve, _) => {
    const fr = new FileReader();
    fr.onloadend = () => { resolve(fr.result); }
    fr.readAsDataURL(blob);
  })
}

export async function startCCE() {
  // create static config objects
  const hostInfo = buildHostInfo();
  const configParams = buildConfigParams();
  const userInfo = await buildUserInfo();
  const authInfo = await buildAuthInfo();

  ccEverywhere = await window.CCEverywhere.initialize(
    hostInfo, configParams, userInfo, authInfo
  );
  console.log("CCE Initialized");
}


function adjustZIndex(isOpening) {
  const headerWrapper = document.getElementsByTagName('header')[0].getElementsByClassName("nav-wrapper")[0];
  const refinementWrapper = document.getElementsByClassName("refinement-wrapper open")[0];

  if (isOpening) {
    headerWrapper.style.zIndex = "unset";
    refinementWrapper.style.zIndex = "unset";
  } else {
    headerWrapper.style.zIndex = "2";
    refinementWrapper.style.zIndex = "1";
  }
}


function createFromAEMCallback() {
  // https://developer.adobe.com/express/embed-sdk/docs/reference/types/#callbacks
  const callback = {
    onCancel: () => {
      console.log("User cancelled edit.");
      adjustZIndex(false);
    },
    onLoadStart: () => {
      // take action once iframe starts loading
    },
    onPublish: (publishParams) => {
      /*
      *   the below can be used to retrieve the results of the save action from express
      *
      *
      *   const localData = {project: publishParams.asset[0].projectId, image: publishParams.asset[0].data};
      *   image_data.src = localData.image;
      *   project_id = localData.project;
      *   let img = document.getElementById('savedDesign');
      *   let blob = new Blob(localData.image, {type: 'text/plain'});
      *   img.src = URL.createObjectURL(blob);
      *   console.log("Created from asset", localData, img);
      */
    },
    onError: (err) => {
      console.error('Error received is: ', err.toString());
    }
  }
  return callback;
}

export async function openInExpress(base64Blob, format) {
  // todo make canvas size dynamic
  const userInfo = await buildUserInfo();
  const authInfo = await buildAuthInfo();
  ccEverywhere.createDesign({
    callbacks: createFromAEMCallback(),
    inputParams: {
      asset: {
        data: await base64Blob,
        dataType: 'base64',
        type: 'image'
      },
      canvasSize: {
        height: 1000,
        width: 1000,
        unit: 'px'
      }
    },
    outputParams: {
      outputType: 'url'
    },
  }, userInfo, authInfo)
}

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

export function removeParamFromWindowURL(paramName) {
  const newURL = removeParamFromUrl(window.location.href, paramName);
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

export function closeDialogEvent(dialog){
  dialog.addEventListener('click', (event) => {
    // only react to clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
    const dialogDimensions = dialog.getBoundingClientRect();
    if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
      || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
        dialog.close();
        document.body.classList.remove('no-scroll');
    }
  });
}

