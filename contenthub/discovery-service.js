import { PlatformConnector, getDefaultSelectedRepo } from '../scripts/libs/platform-connector/platform-connector.js';
import { getBearerToken, getImsToken } from '../scripts/security.js';
import { user } from './unified-shell.js';
import { fetchCached } from '../scripts/fetch-util.js';

/* eslint-disable no-underscore-dangle */
export async function getPlatformConnector() {
  PlatformConnector.init({
    accessToken: await getImsToken(),
    apiKey: 'aem-assets-content-hub-1',
    platformUrl: 'https://aem-discovery.adobe.io',
  });

  const discovery = await PlatformConnector.getDiscovery();
  console.log('discovery', discovery);

  const repo = getDefaultSelectedRepo(discovery, await user.get('imsOrg'));
  console.log('repo', repo);
  return discovery;
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
