import { loadScript } from './lib-franklin.js';
import { getAdminConfig } from './site-config.js';
import { fetchCached } from './fetch-util.js';
import { isPublicPage } from './security.js';

let isIMSInitialized = false;

const IMSLIB_ENV_CONFIG = {
  clientId: 'content-at-adobe',
  scope: 'openid,AdobeID,additional_info.projectedProductContext,read_organizations',
  urls: {
    stage: 'https://auth-stg1.services.adobe.com/imslib/imslib.js',
    prod: 'https://auth.services.adobe.com/imslib/imslib.min.js',
  },
};

async function getBearerTokenFromIMS(callWithToken) {
  const imsLibConfig = await getIMSLIBConfig();
  if (window.adobeIMS?.getAccessToken() && window.adobeIMS.getAccessToken().token) {
    callWithToken(window.adobeIMS.getAccessToken().token);
    return;
  }
  if (window.adobeIMS?.getReauthAccessToken() && window.adobeIMS.getReauthAccessToken().token) {
    callWithToken(window.adobeIMS.getReauthAccessToken().token);
    return;
  }
  if (!isIMSInitialized) {
    window.adobeid = {
      client_id: imsLibConfig.clientId,
      scope: IMSLIB_ENV_CONFIG.scope,
      locale: 'en_US',
      autoValidateToken: true,
      uses_redirect_mode: true,
      environment: imsLibConfig.imsEnvironment,
      onReady() {
        if (window.adobeIMS.isSignedInUser()) {
          let tokenDetails = window.adobeIMS?.getAccessToken();
          if (!tokenDetails) {
            tokenDetails = window.adobeIMS?.getReauthAccessToken();
          }
          const token = tokenDetails && tokenDetails.token;
          callWithToken(token);
          return;
        } 
        if (!isPublicPage()) {
              window.adobeIMS.reAuthenticate();
        }
      },
    };

    // load ims.min.js
    await loadScript(IMSLIB_ENV_CONFIG.urls[imsLibConfig.imsEnvironment]);
    isIMSInitialized = true;
    return;
  }
    window.adobeIMS.reAuthenticate();
}

/**
 * @return {Promise<{clientId: string, imsUserGroup: string, imsOrgWithoutDomain: string, imsEnvironment: string, imsOrgID: string}>}
 */
export async function getIMSLIBConfig() {
  const adminConfig = await getAdminConfig();
  const clientId = adminConfig.clientId || IMSLIB_ENV_CONFIG.clientId;
  const imsEnvironment = adminConfig.imsEnvironment || 'prod';
  const imsOrgID = adminConfig.imsOrg;
  const imsOrgWithoutDomain = imsOrgID?.replace('@AdobeOrg', '');
  const imsUserGroup = adminConfig.imsUserGroup || 'assets-distribution-portal-users';
  return {
    clientId, imsEnvironment, imsOrgID, imsOrgWithoutDomain, imsUserGroup,
  };
}

export async function getIMSBearerToken() {
  return await new Promise((resolve) => {
    getBearerTokenFromIMS((bearerToken) => {
      resolve(bearerToken);
    });
  });
}

export async function getIMSUserProfile() {
  await getIMSBearerToken();
  return await window.adobeIMS?.getProfile();
}

export async function getIMSOrgData(bearerToken) {
  const imsCfg = await getIMSLIBConfig();
  return await fetchCached(
    `${await getIMSApiUrl()}/ims/organizations/v6?client_id=${imsCfg.clientId}`,
    {
      method: 'GET',
      headers: {
        Authorization: bearerToken,
      },
    },
  );
}

export async function getSecurityGroupMemberships(bearerToken) {
  let imsOrgData = await getIMSOrgData(bearerToken);
  const { imsOrgWithoutDomain } = await getIMSLIBConfig();
  if (imsOrgData && Array.isArray(imsOrgData) && imsOrgData.length > 0) {
    imsOrgData = imsOrgData.find((elem) => elem.orgRef.ident === imsOrgWithoutDomain);
    if (imsOrgData && imsOrgData.groups) {
      return imsOrgData.groups;
    }
  }
  return [];
}

async function getIMSApiUrl() {
  const IMS_API_URLS = {
    stage: 'https://ims-na1-stg1.adobelogin.com',
    prod: 'https://ims-na1.adobelogin.com',
  };
  const { imsEnvironment } = await getIMSLIBConfig();
  return IMS_API_URLS[imsEnvironment];
}

export async function isUserInSecurityGroup(securityGroup, bearerToken) {
  const securityGroupMemberships = await getSecurityGroupMemberships(bearerToken);
  return securityGroupMemberships.find((elem) => elem.groupName === securityGroup) !== undefined;
}
