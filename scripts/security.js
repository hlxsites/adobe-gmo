import { fetchCached } from './fetch-util.js';

/**
 * @return {Promise<{imsOrgWithoutDomain: {string}, imsEnvironment: {string}, imsOrgID: {string}}>}
 */
async function getIMSConfig() {
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
  const securityIMSLIB = await import('./security-imslib.js');
  const token = await securityIMSLIB.getIMSBearerToken();
  return `Bearer ${token}`;
}

export async function getUserProfile() {
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
  const ccProfile = await getCCCollabProfile();
  return ccProfile?.user?.avatar;
}

export function isPublicPage() {
  return document.querySelector('head meta[name="public-access"]')?.getAttribute('content').toLowerCase() === 'true';
}

export async function checkUserAccess() {
  if (isPublicPage()) {
    return true;
  }
  await getBearerToken();
  const { imsUserGroup } = await getIMSConfig();
  if (imsUserGroup) {
    const imsLibSecurityModule = await import('./security-imslib.js');
    return await imsLibSecurityModule.isUserInSecurityGroup(imsUserGroup, await getBearerToken());
  }
  return true;
}
