import { isVideo } from './filetypes.js';
import { getAdminConfig } from './site-config.js';
import { getBearerToken } from './security.js';

let deliveryEndpointURL = null;
let backendApiKey = null;
let assetHandlerApiKey = null;

const regex = /p(\d+)-e(\d+)/;

const metadataCache = {};

export async function initDeliveryEnvironment() {
  if (!deliveryEndpointURL) {
    // Pull the delivery environment URL from /site-config.json
    const adminConfig = await getAdminConfig();
    deliveryEndpointURL = adminConfig.aemDeliveryEndpoint;
    backendApiKey = adminConfig.imsEnvironment === 'stage' ? 'polaris-asset-search-api-key' : 'asset_search_service';
    assetHandlerApiKey = adminConfig.imsEnvironment === 'stage' ? 'activation_service_test1' : 'activation_service';
  }
  return deliveryEndpointURL;
}

export function getDeliveryEnvironment() {
  return deliveryEndpointURL;
}

export function getBackendApiKey() {
  return backendApiKey;
}

export function getAssetHandlerApiKey() {
  return assetHandlerApiKey;
}

export function getSearchIndex() {
  const indexSrcStr = deliveryEndpointURL;
  const match = indexSrcStr.match(regex);
  let index = '';
  if (match) {
    const program = match[1];
    const environment = match[2];
    index = `${program}-${environment}`;
  }
  return index;
}

/**
 * Base URL for the asset image delivery service.  Used to construct URLs for image renditions.
 * @param {*} assetId the asset ID (repo:assetId)
 * @param {*} assetName the SEO friendly name for the asset
 * @returns the base URL to the image delivery service for the asset
 */
export function getBaseDeliveryUrl(assetId, assetName) {
  return `${getDeliveryEnvironment()}/adobe/dynamicmedia/deliver/${assetId}/${assetName}`;
}

export function getVideoDeliveryUrl(assetId) {
  return `${getDeliveryEnvironment()}/adobe/assets/${assetId}/play?secureDelivery=true`;
}

/**
 * Get a URL for an image rendtion of an asset.
 * @param {*} assetId the asset ID (repo:assetId)
 * @param {*} assetName the SEO friendly name for the asset
 * @param {*} width the width to constrain the image to
 * @returns the URL to the image rendition
 */
export async function getOptimizedDeliveryUrl(assetId, assetName, width, format) {
  let fileName = assetName;
  if (!assetName.includes('.') || isVideo(format)) {
    fileName = `${assetName}.jpg`;
  }
  let path = `${getBaseDeliveryUrl(assetId, fileName)}`;
  if (!width) {
    path += '?preferwebp=true';
  } else {
    path += `?width=${width}&preferwebp=true`;
  }
  const url = `${path}`.replace(/\.(png)/, '.webp').replace(/\.(mov|m3u8|mp4|mpeg|avi|asf|flv|m4v)/, '.jpg');
  return authorizeURL(url);
}

export async function authorizeURL(url) {
  const bearerToken = await getBearerToken();
  const options = {
    method: 'GET',
    headers: {
      Authorization: bearerToken,
    },
  };
  const response = await fetch(url, options);
  const imageBlob = await response.blob();
  return URL.createObjectURL(imageBlob);
}

export async function getOptimizedPreviewUrl(assetId, assetName, width, format) {
  return await getOptimizedDeliveryUrl(assetId, `preview-${assetName}`, width, format);
}

/**
 * Get the URL to download an asset original binary
 */
export async function getDownloadUrl(repoAssetID, filename) {
  return `${getDeliveryEnvironment()}/adobe/assets/deliver/${repoAssetID}/${filename}`;
}

/**
 * Get the metadata for an asset from Polaris
 * @param {*} assetId - the asset id to get metadata for (repo:assetId)
 * @returns json response from polaris with metadata of the asset
 */
export async function fetchMetadataValueFromPolaris(assetId) {
  const bearerToken = await getBearerToken();
  const options = {
    method: 'GET',
    headers: {
      'x-adobe-accept-experimental': 1,
      Authorization: bearerToken,
    },
  };

  const response = await fetch(`${getDeliveryEnvironment()}/adobe/assets/${assetId}/metadata`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const metadataResponse = await response.json();
  return metadataResponse;
}

/**
 * Get the metadata for an asset
 * @param {*} assetId the asset id to get metadata for (repo:assetId)
 * e.g. urn:aaid:aem:2f2a2d7a-e85e-4cfb-ba50-c030df17a95c
 * @returns json response from polaris with metadata of the asset
 */
export async function getAssetMetadata(assetId) {
  const cached = metadataCache[assetId];
  if (cached) {
    return cached;
  }
  metadataCache[assetId] = await fetchMetadataValueFromPolaris(assetId);
  return metadataCache[assetId];
}
