import { isVideo } from './filetypes.js';
import { fetchSiteConfig } from './site-config.js';

let deliveryEndpointURL = null;
let backendApiKey = null;
const regex = /p(\d+)-e(\d+)/;

const metadataCache = {};

export async function initDeliveryEnvironment() {
  if (!deliveryEndpointURL) {
    // Pull the delivery environment URL from /site-config.json
    const config = await fetchSiteConfig('main');
    deliveryEndpointURL = config.find((elem) => elem.configProperty === 'deliveryEndpoint')?.value;
    backendApiKey = config.find((elem) => elem.configProperty === 'apiKey')?.value;
  }
  return deliveryEndpointURL;
}

export function getDeliveryEnvironment() {
  return deliveryEndpointURL;
}

export function getBackendApiKey() {
  return backendApiKey;
}

export function getSearchIndex() {
  const match = deliveryEndpointURL.match(regex);
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
function getBaseDeliveryUrl(assetId, assetName) {
  return `${getDeliveryEnvironment()}/adobe/dynamicmedia/deliver/${assetId}/${assetName}`;
}

/**
 * Get a URL for an image rendtion of an asset.
 * @param {*} assetId the asset ID (repo:assetId)
 * @param {*} assetName the SEO friendly name for the asset
 * @param {*} width the width to constrain the image to
 * @returns the URL to the image rendition
 */
export function getOptimizedDeliveryUrl(assetId, assetName, width, format) {
  let fileName = assetName;
  if (!assetName.includes('.') || isVideo(format)) {
    fileName = `${assetName}.jpg`;
  }
  return `${getBaseDeliveryUrl(assetId, fileName)}?width=${width}&preferwebp=true`.replace(/\.(png)/, '.webp').replace(/\.(mov|m3u8|mp4|mpeg|avi|asf|flv|m4v)/, '.jpg');
}

export function getOptimizedPreviewUrl(assetId, assetName, width, format) {
  return getOptimizedDeliveryUrl(assetId, `preview-${assetName}`, width, format);
}

/**
 * Get the URL to download an asset original binary
 */
export function getDownloadUrl(repoAssetID, filename) {
  return `${getDeliveryEnvironment()}/adobe/assets/deliver/${repoAssetID}/${filename}`;
}

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 */
export function createDeliveryServicePicture(
  assetId,
  assetName,
  alt = '',
  eager = false,
  breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }],
) {
  // const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const pathname = getBaseDeliveryUrl(assetId, assetName);
  // const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${getOptimizedDeliveryUrl(assetId, assetName, br.width)}&format=webply&quality=80`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&quality=80`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&quality=80`);
    }
  });

  return picture;
}

export async function fetchMetadataValueFromPolaris(assetId) {
  const options = {
    method: 'GET',
    headers: {
      'x-adobe-accept-experimental': 1,
    },
  };

  let response = await fetch(`${getDeliveryEnvironment()}/adobe/assets/${assetId}/metadata`, options);
  response = await response.json();
  return response;
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
  metadataCache[assetId] = fetchMetadataValueFromPolaris(assetId);
  metadataCache[assetId] = await metadataCache[assetId];
  return metadataCache[assetId];
}

// Retrieve the delivery environment from configuration
// other modules will wait until this await resolves before using this module
await initDeliveryEnvironment();
