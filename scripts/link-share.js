import { fetchWithRetryAndBackoffOnErrors } from './fetch-util.js';
import { getAssetMetadata, getBackendApiKey, getDeliveryEnvironment } from './polaris.js';
import { getBearerToken } from './security.js';

const retryErrorCodes = [429, 503];
const retryOptions = { retryErrorCodes };

export function getLinkShareID(share) {
  return share.id;
}

export function getLinkShareTitle(share) {
  return share.title;
}

export async function getAssetsFromLinkShare(share) {
  return await Promise.all(share?.assets.map(async (asset) => await getAssetMetadata(asset.assetId)));
}

function getLinkShareEndpoint() {
  return `${getDeliveryEnvironment()}/adobe/asset-linkshares`;
}

/**
 * Gives link details: metadata and assets/collections shared via it
 * @param {string} linkId - Id of link to fetch
 * @returns {Object} response as JSON of link details
 */
export async function getLinkShare(linkId) {
  const url = `${getLinkShareEndpoint()}/${linkId}`;
  const bearerToken = await getBearerToken();
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
      'x-api-key': getBackendApiKey(),
      'x-adobe-accept-experimental': 1,
    },
  };
  return await fetchWithRetryAndBackoffOnErrors(url, options, retryOptions);
}

/**
 * Create shareable link for assets/collections
 * @param {Object} linkData - request body having link details
 * @returns {Object} response as JSON of created link metadata
 */
export async function createLinkShare(linkData) {
  const url = `${getLinkShareEndpoint()}`;
  const bearerToken = await getBearerToken();
  const options = {
    method: 'POST',
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
      'x-api-key': getBackendApiKey(),
      'x-adobe-accept-experimental': 1,
    },
    body: JSON.stringify(linkData),
  };
  return await fetchWithRetryAndBackoffOnErrors(url, options, retryOptions);
}

/**
 * List all non-expired links
 * @returns {Object} response as JSON of all links alogn with their metadata
 */
export async function listLinkShares() {
  const url = `${getLinkShareEndpoint()}`;
  const bearerToken = await getBearerToken();
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
      'x-api-key': getBackendApiKey(),
      'x-adobe-accept-experimental': 1,
    },
  };
  return await fetchWithRetryAndBackoffOnErrors(url, options, retryOptions);
}
