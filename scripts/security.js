import { fetchCached } from './fetch-util.js';
import { isUnifiedShellRuntimeAvailable, shell, user } from '../contenthub/unified-shell.js';

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
async function getIMSConfig() {
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

export async function checkUserAccess() {
  if (isPublicPage()) {
    return true;
  }
  if (isUnifiedShellRuntimeAvailable()) {
    return !!user.get('imsProfile');
  } else {
    await getBearerToken();
    const { imsUserGroup } = await getIMSConfig();
    if (imsUserGroup) {
      const imsLibSecurityModule = await import('./security-imslib.js');
      return await imsLibSecurityModule.isUserInSecurityGroup(imsUserGroup, await getBearerToken());
    } else {
      return true;
    }
  }
}
