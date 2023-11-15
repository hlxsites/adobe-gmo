import { getAdminConfig } from './site-config.js';
import { getBearerToken, getUserProfile } from './security.js';
import { getDownloadUrl } from './polaris.js';
import { closeModal } from './shared.js';
import { waitForDependency, logError } from './scripts.js';

let ccEverywhere;
const adminConfig = await getAdminConfig();

function buildHostInfo(clientId, appName) {
  const hostInfo = {
    clientId,
    appName,
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
    locale: 'en_US',
  };

  return configParams;
}

async function buildAuthInfo() {
  const authInfo = {
    accessToken: await getJumpToken(),
    useJumpUrl: false,
  };

  return authInfo;
}

async function buildUserInfo() {
  const profileObject = await getUserProfile();
  const userId = await profileObject.userId;

  const userInfo = {
    profile: {
      userId,
      serviceCode: null,
      serviceLevel: null,
    },
    piipStatus: 2,
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
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onloadend = () => { resolve(fr.result); };
    fr.readAsDataURL(blob);
  });
}

export async function getJumpToken() {
  const bearerToken = await getBearerToken();

  const tokenValue = bearerToken.replace('Bearer ', '');
  const jumpScope = 'AdobeID,openid,creative_cloud,creative_sdk,additional_info.projectedProductContext';
  const clientId = 'projectx_webapp';

  const jumpParams = ({
    bearer_token: tokenValue,
    target_client_id: clientId,
    target_scope: jumpScope,
  });

  const jumpResponse = await window.adobeIMS?.jumpToken(jumpParams);
  const jumpUrl = jumpResponse.jump;
  const jumpToken = jumpUrl.substring((jumpUrl.lastIndexOf('/')) + 1);

  return jumpToken;
}

function createFromAEMCallback() {
  // https://developer.adobe.com/express/embed-sdk/docs/reference/types/#callbacks
  const callback = {
    onCancel: () => {
    },
    onLoadStart: () => {
      // take action once iframe starts loading
      const host = Array.from(document.body.childNodes)
        .filter((node) => node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase().startsWith('cc-everywhere'));
      const style = document.createElement('style');
      style.innerHTML = '.cc-everywhere-root { z-index: 3; }';
      host.forEach((childElem) => { childElem.shadowRoot.appendChild(style); });
    },
    onPublish: (/* publishParams */) => {
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
      logError('createFromAEMCallback', err);
    },
  };
  return callback;
}

export function fileValidity(fileFormat) {
  // const validTypes = ['image','video','pdf'];
  const validTypes = ['image'];
  const validity = { isValid: false, fileType: 'unknown' };
  validTypes.some((type) => {
    const validFile = (fileFormat.includes(type) && !(fileFormat.includes('photoshop')));
    if (validFile) {
      validity.isValid = true;
      validity.fileType = type;
      return true;
    }
    return false;
  });
  return validity;
}

function isCCESupported() {
  const { userAgent } = navigator;
  const isSupported = /chrome|safari|edge/i.test(userAgent);
  return isSupported;
}

export function isCCEConfigured() {
  return isCCESupported() && (adminConfig.adobeExpressClientId !== undefined) && (adminConfig.adobeExpressAppName !== undefined);
}

export function isCCEInitialized() {
  return (ccEverywhere !== undefined);
}

export async function startCCE() {
  if (isCCESupported()) {
    // create static config objects
    // todo check if clientid and appname values are null/missing
    const clientId = adminConfig.adobeExpressClientId;
    const appName = adminConfig.adobeExpressAppName;

    if (clientId && appName) {
      await waitForDependency('CCEverywhere');

      const hostInfo = buildHostInfo(clientId, appName);
      const configParams = buildConfigParams();
      const userInfo = await buildUserInfo();
      const authInfo = await buildAuthInfo();

      ccEverywhere = await window.CCEverywhere.initialize(hostInfo, configParams, userInfo, authInfo);

      // eslint-disable-next-line no-console
      console.log('CCE Initialized');
    } else {
      // eslint-disable-next-line no-console
      console.log('Missing CCE parameters.');
    }
  }
}

export async function addExpressEditorHandler(editorElement, assetId, repoName, assetHeight, assetWidth, assetType, detailsModal) {
  editorElement.addEventListener('click', async () => {
    if (detailsModal) {
      closeModal(detailsModal);
    }

    const assetUrl = await getDownloadUrl(assetId, repoName);
    const bearerToken = await getBearerToken();
    const rawAsset = await getAssetData(assetUrl, bearerToken);
    const assetData = await base64Encode(rawAsset);
    await openInExpress(assetData, assetHeight, assetWidth, assetType);
  });
}

export async function openInExpress(base64Blob, assetHeight, assetWidth, assetType) {
  if (!isCCEInitialized()) {
    // refresh token on-demand to resolve an issue where token is not used by CCE
    await window.adobeIMS?.refreshToken();
    await startCCE();
  }
  // todo fix video
  const userInfo = await buildUserInfo();
  const authInfo = await buildAuthInfo();
  ccEverywhere.createDesign({
    callbacks: createFromAEMCallback(),
    inputParams: {
      asset: {
        data: await base64Blob,
        dataType: 'base64',
        type: assetType,
      },
      canvasSize: {
        height: assetHeight,
        width: assetWidth,
        unit: 'px',
      },
    },
    outputParams: {
      outputType: 'url',
    },
  }, userInfo, authInfo);
}
