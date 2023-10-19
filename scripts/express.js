import { getAdminConfig } from './site-config.js';
import { getBearerToken, getUserProfile } from './security.js';
import { getDownloadUrl } from './polaris.js';

let ccEverywhere;

function buildHostInfo(clientId, appName) {
    //todo make this config-based
    const hostInfo = {
      clientId: clientId,
      appName: appName,
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
        serviceCode: null,
        serviceLevel: null
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

export async function getJumpToken() {
  const bearerToken = await getBearerToken();

  const tokenValue = bearerToken.replace('Bearer ', '');
  const jumpScope = 'AdobeID,openid,creative_cloud,creative_sdk,additional_info.projectedProductContext';
  const clientId = 'projectx_webapp';

  const jumpParams = ({
    bearer_token: tokenValue,
    target_client_id: clientId,
    target_scope: jumpScope
  });

  const jumpResponse = await window.adobeIMS?.jumpToken(jumpParams);
  const jumpUrl = jumpResponse['jump'];
  const jumpToken = jumpUrl.substring((jumpUrl.lastIndexOf('/')) + 1);
  
  return jumpToken;
}

function adjustZIndex(isOpening) {
  const headerWrapper = document.getElementsByTagName('header')[0].getElementsByClassName("nav-wrapper")[0];
  const refinementWrapper = document.getElementsByClassName("refinement-wrapper open")[0];

  if (isOpening) {
    headerWrapper.style.zIndex = "unset";
    if (refinementWrapper) {
      refinementWrapper.style.zIndex = "unset";
    }
  } else {
    headerWrapper.style.zIndex = "2";
    if (refinementWrapper) {
      refinementWrapper.style.zIndex = "1";
    }
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

export async function startCCE() {
  // create static config objects
  // todo check if clientid and appname values are null/missing
  const adminInfo = await getAdminConfig();
  const hostInfo = buildHostInfo(adminInfo.expClientId, adminInfo.expAppName);
  const configParams = buildConfigParams();
  const userInfo = await buildUserInfo();
  const authInfo = await buildAuthInfo();

  ccEverywhere = await window.CCEverywhere.initialize(
      hostInfo, configParams, userInfo, authInfo
  );
  console.log("CCE Initialized");
}

export async function addExpressEditorHandler(editorElement, assetId, repoName, assetHeight, assetWidth) {
  editorElement.addEventListener('click', async (e) => {
    const assetUrl = await getDownloadUrl(assetId, repoName);
    const bearerToken = await getBearerToken();
    const rawAsset = await getAssetData(assetUrl, bearerToken);
    const assetData = await base64Encode(rawAsset);
    adjustZIndex(true);
    await openInExpress(assetData, assetHeight, assetWidth);
  });
}

export async function openInExpress(base64Blob, assetHeight, assetWidth) {
  // todo make asset type dynamic
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
        height: assetHeight,
        width: assetWidth,
        unit: 'px'
      }
    },
    outputParams: {
      outputType: 'url'
    },
  }, userInfo, authInfo)
}
