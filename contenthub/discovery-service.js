import { PlatformConnector, getRepoList } from '../scripts/libs/platform-connector/platform-connector.js';
import { getBearerToken, getImsToken } from '../scripts/security.js';
import { user } from './unified-shell.js';
import { fetchCached } from '../scripts/fetch-util.js';
import { getAdminConfig, isContentHub } from '../scripts/site-config.js'

const EMBEDDED = '_embedded';
const REL_REPOSITORY = 'http://ns.adobe.com/adobecloud/rel/repository';
async function getDiscoveryJson() {
  PlatformConnector.init({
    accessToken: await getImsToken(),
    apiKey: 'aem-assets-frontend-1',
    platformUrl: 'https://aem-discovery.adobe.io',
  });

  return await PlatformConnector.getDiscovery();
}

export async function getFederatedDiscoveryLinks(repositoryId) {
  try {
    const discovery = await getDiscoveryJson();
    const { _links } = await PlatformConnector.getFederatedDiscovery(discovery, repositoryId);
    return _links;
  } catch (e) {
    throw new Error('Unable to get federated discovery links');
  }
}

export async function getRepositoryList() {
  const discoverObj = await getDiscoveryJson();
  let imsOrg;
  if (await isContentHub()) {
    imsOrg = await user.get('imsOrg');
  } else {
    const adminCfg = await getAdminConfig();
    imsOrg = adminCfg.imsOrg;
  }
  return getRepoList(discoverObj, imsOrg);
}

/**
 *
 * @param filter {Object}: for example: {env: 'prod', 'aem-tier': 'author'}
 * @returns repositoryID {String}
 */
export async function getRepositoryIDWithFilter(filter) {
  const discoverObj = await getDiscoveryJson();
  const rList = getRepoList(discoverObj, await user.get('imsOrg'));
  const repo = rList.find((embeddedObj) => {
    const repoObj = embeddedObj[EMBEDDED]?.[REL_REPOSITORY];
    return repoObj?.['repo:environment'] === filter.env && repoObj?.['aem:tier'] === filter['aem-tier'];
  });
  return repo[EMBEDDED]?.[REL_REPOSITORY]?.['repo:repositoryId'] ?? '';
}

/* eslint-disable no-underscore-dangle */
export async function getAEMDiscoveryInfo() {
  const token = await getBearerToken();
  const value = await fetchCached(
    'https://aem-discovery.adobe.io/index',
    {
      method: 'GET',
      headers: {
        Authorization: token,
        'x-api-key': 'aem-assets-content-hub-1',
        'Content-Type': 'application/json',
      },
    },
  );
  return JSON.parse(value);
}

export async function getCurrentRepositoryId() {
  let repositoryEnv = await findContentHubRepostiory();
  repositoryEnv = repositoryEnv?._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['repo:repositoryId'];
  return repositoryEnv?.replace('delivery-', 'author-');
}

async function findContentHubRepostiory() {
  function isContentHubEnvironment(env) {
    const aemSolutions = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['aem:solutions'];
    return aemSolutions?.includes?.('contenthub');
  }

  function isServiceCodeForContentHub(env) {
    const aemSolutions = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['aem:serviceCode'];
    return aemSolutions === 'dma_aem_contenthub';
  }

  const aemDiscoveryInfo = await getAEMDiscoveryInfo();
  const environments = aemDiscoveryInfo?.children;
  if (!environments) {
    return null;
  }

  let result = environments.find((env) => isServiceCodeForContentHub(env) && isContentHubEnvironment(env));
  if (result) {
    return result;
  }

  // fallback until aem:solutions is available.
  result = environments.find((env) => isServiceCodeForContentHub(env));
  if (result) {
    return result;
  }

  // fallback until aem:serviceCode and aem:solutions are available. TODO: remove this case when ready.
  return environments.find((env) => {
    const repoId = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['repo:repositoryId'];
    return repoId === 'delivery-p103362-e974988.adobeaemcloud.com';
  });
}

function getDeliveryServiceUrl(repository) {
  if (!repository) {
    return null;
  }

  const deliveryDomain = repository._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['repo:repositoryId'];
  return `https://${deliveryDomain}`;
}

export async function getDeliveryServiceEndpoint() {
  const repository = await findContentHubRepostiory();
  return getDeliveryServiceUrl(repository);
}
