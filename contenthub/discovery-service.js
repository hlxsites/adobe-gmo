import { getBearerToken } from '../scripts/security.js';
import { fetchCached } from '../scripts/fetch-util.js';

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
    // eslint-disable-next-line no-underscore-dangle
    const aemSolutions = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['aem:solutions'];
    return aemSolutions?.includes?.('contenthub');
  }

  function isAssetsEssentialsEnvironment(env) {
    // eslint-disable-next-line no-underscore-dangle
    const aemSolutions = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['aem:serviceCode'];
    return aemSolutions === 'dma_media_library';
  }

  const aemDiscoveryInfo = await getAEMDiscoveryInfo();
  const environments = aemDiscoveryInfo?.children;
  if (!environments) {
    return null;
  }

  let result = environments.find((env) => isAssetsEssentialsEnvironment(env) && isContentHubEnvironment(env));
  if (result) {
    return result;
  }

  // fallback until aem:solutions is available.
  result = environments.find((env) => isAssetsEssentialsEnvironment(env));
  if (result) {
    return result;
  }

  // fallback until aem:serviceCode and aem:solutions are available. TODO: remove this case when ready.
  return environments.find((env) => {
    // eslint-disable-next-line no-underscore-dangle
    const repoId = env._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['repo:repositoryId'];
    return repoId === 'author-p103362-e974988.adobeaemcloud.com';
  });
}

function getDeliveryServiceUrl(repository) {
  if (!repository) {
    return null;
  }

  // TODO: when discovery service provides it, use a link specifically for the delivery service.

  // eslint-disable-next-line no-underscore-dangle
  const authorDomain = repository._embedded?.['http://ns.adobe.com/adobecloud/rel/repository']?.['repo:repositoryId'];
  const deliveryDomain = authorDomain.replace('author-', 'delivery-');
  return `https://${deliveryDomain}`;
}

export async function getDeliveryServiceEndpoint() {
  const repository = await findContentHubRepostiory();
  return getDeliveryServiceUrl(repository);
}
