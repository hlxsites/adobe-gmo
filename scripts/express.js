import { getAdminConfig } from './site-config.js';
import { getBearerToken, getUserProfile } from './security.js';
import { getDownloadUrl } from './polaris.js';
import { closeModal } from './shared.js';
import { waitForDependency, logError } from './scripts.js';

let ccEverywhere;
export function getCCEverywhere() {
  return ccEverywhere;
}

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

function adjustZIndex(isOpening) {
  const headerWrapper = document.getElementsByTagName('header')[0].getElementsByClassName('nav-wrapper')[0];
  const refinementWrapper = document.getElementsByClassName('refinement-wrapper open')[0];

  if (isOpening) {
    headerWrapper.style.zIndex = 'unset';
    if (refinementWrapper) {
      refinementWrapper.style.zIndex = 'unset';
    }
  } else {
    headerWrapper.style.zIndex = '2';
    if (refinementWrapper) {
      refinementWrapper.style.zIndex = '1';
    }
  }
}

function createFromAEMCallback() {
  // https://developer.adobe.com/express/embed-sdk/docs/reference/types/#callbacks
  const callback = {
    onCancel: () => {
      adjustZIndex(false);
    },
    onLoadStart: () => {
      // take action once iframe starts loading
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

export async function startCCE() {
  await waitForDependency('CCEverywhere');
  // create static config objects
  // todo check if clientid and appname values are null/missing
  const adminInfo = await getAdminConfig();
  const clientId = adminInfo.adobeExpressClientId;
  const appName = adminInfo.adobeExpressAppName;

  if (clientId && appName) {
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

export async function addExpressEditorHandler(editorElement, assetId, repoName, assetHeight, assetWidth, assetType, detailsModal) {
  editorElement.addEventListener('click', async () => {
    adjustZIndex(true);
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
