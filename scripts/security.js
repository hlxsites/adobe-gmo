import { fetchCached } from './fetch-util.js';
import { isUnifiedShellRuntimeAvailable, shell, user } from '../contenthub/unified-shell.js';
import { getAdminConfig } from './site-config.js';
import { getSecurityGroupMemberships } from './security-imslib.js';

/**
 * @return {Promise<{imsOrgWithoutDomain: {string}, imsEnvironment: {string}, imsOrgID: {string}}|null>}
 */
async function getIMSUnfiedShellConfig() {
  if (isUnifiedShellRuntimeAvailable()) {
    const imsOrg = await user.get('imsOrg');
    return {
      imsEnvironment: await shell.get('imsEnvironment'),
      imsOrgID: imsOrg,
      imsOrgWithoutDomain: imsOrg?.replace('@AdobeOrg', ''),
      // no group in unifiedShellRuntime - assuming user is in the group
    };
  }
  return null;
}

async function getUnifiedShellIMSToken() {
  return await user.get('imsToken');
}

/**
 * @return {Promise<{imsOrgWithoutDomain: {string}, imsEnvironment: {string}, imsOrgID: {string}}>}
 */
export async function getIMSConfig() {
  const imsConfig = await getIMSUnfiedShellConfig();
  if (imsConfig) {
    return imsConfig;
  }
  const imsLibSecurityModule = await import('./security-imslib.js');
  return await imsLibSecurityModule.getIMSLIBConfig();
}

async function getCcCollabUrl() {
  const { imsEnvironment } = await getIMSConfig();
  return imsEnvironment === 'stage' ? 'cc-collab-stage.adobe.io/profile' : 'cc-collab.adobe.io/profile';
}

/**
 * Get the bearer token from local storage or prompt for it.
 * @returns {string} the bearer token
 */
export async function getBearerToken() {
  return `Bearer ${await getImsToken()}`;
}

/**
 * Get the bearer token from local storage or prompt for it.
 * @returns {string} the bearer token
 */
export async function getImsToken() {
  if (isUnifiedShellRuntimeAvailable()) {
    return await getUnifiedShellIMSToken();
  }
  const securityIMSLIB = await import('./security-imslib.js');
  return await securityIMSLIB.getIMSBearerToken();
}

export async function getUserProfile() {
  if (isUnifiedShellRuntimeAvailable()) {
    return await user.get('imsProfile');
  }
  const securityIMSLIB = await import('./security-imslib.js');
  return await securityIMSLIB.getIMSUserProfile();
}

async function getCCCollabProfile() {
  const bearerToken = await getBearerToken();
  const url = await getCcCollabUrl();
  return await fetchCached(
    `https://${url}`,
    {
      method: 'GET',
      headers: {
        Authorization: bearerToken,
      },
    },
  );
}

export async function getAvatarUrl() {
  if (isUnifiedShellRuntimeAvailable()) {
    // noinspection ES6RedundantAwait
    return (await user.get('imsProfile')).avatar;
  } else {
    const ccProfile = await getCCCollabProfile();
    return ccProfile?.user?.avatar;
  }
}

export function isPublicPage() {
  return document.querySelector('head meta[name="public-access"]')?.getAttribute('content').toLowerCase() === 'true';
}

export function isReportingAccessPage() {
  return document.querySelector('head meta[name="reporting-access"]')?.getAttribute('content').toLowerCase() === 'true';
}
export async function checkUserAccess() {
  if (isUnifiedShellRuntimeAvailable()) return !!user.get('imsProfile');
  await getBearerToken();
  const { imsUserGroup } = await getIMSConfig();
  if (imsUserGroup) {
    const imsLibSecurityModule = await import('./security-imslib.js');
    if (isPublicPage()) {
      return true;
    }

    const isIMSUser = await imsLibSecurityModule.isUserInSecurityGroup(imsUserGroup, await getBearerToken());
    //Check if IMS Users have access to Reporting Page
    if (isReportingAccessPage() && isIMSUser) {
      const adminConfig = await getAdminConfig();
      //The name of the group is in property imsReportingGroup in admin-config.xslx
      return await checkGroupAccess('imsReportingGroup');
    } else {
      return isIMSUser;
    }
  }
}

export async function checkAddAssetsAccess() {
  const adminConfig = await getAdminConfig();
  const securityGroupMemberships = await getSecurityGroupMemberships(await getBearerToken());
  return securityGroupMemberships.some((grp) => grp.groupName === adminConfig.imsAuthorGroup);
}

/**
 * Checks Group Access for the group that is stored in the admin-config.xslx for
 * for the property name in parameter adminConfigGroupPropertyName
 * @returns {boolean} for access to the group
 */
export async function checkGroupAccess(adminConfigGroupPropertyName) {
  const adminConfig = await getAdminConfig();
  const securityGroupMemberships = await getSecurityGroupMemberships(await getBearerToken());
  return securityGroupMemberships.some((grp) => grp.groupName === adminConfig[adminConfigGroupPropertyName]);
}
