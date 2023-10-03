import { getDownloadRenditionConfig } from './site-config.js';
import { isImage } from './filetypes.js';
import { getDownloadUrl, getBaseDeliveryUrl } from './polaris.js';

const imageTransformations = [
  'format', 'quality', 'height', 'width', 'size', 'rotation', 'flip', 'crop',
];

export async function getAvailableRenditions(assetId, assetName, mimeType) {
  let availableRenditions = [{
    name: 'Original',
    url: new URL(getDownloadUrl(assetId, assetName)),
  }];
  if (isImage(mimeType)) {
    const additionalRenditions = await getAvailableImageRenditions(assetId, assetName, mimeType);
    availableRenditions = availableRenditions.concat(additionalRenditions);
  }
  return availableRenditions;
}

/**
 * Get the available image rendition configurations available for the asset.
 */
async function getAvailableImageRenditions(assetId, assetName, mimeType) {
  const renditionConfig = await getDownloadRenditionConfig();
  return renditionConfig.renditions
    .filter((rendition) => isRenditionApplicable(rendition, mimeType))
    .map((rendition) => ({
      name: rendition.description,
      url: buildImageRenditionUrl(assetId, assetName, renditionConfig),
    }));
}

/**
 * Checks if the rendition configuration is applicable for the asset mime type.
 * @param {DownloadRendition} renditionConfig
 * @param {string} mimeType
 */
function isRenditionApplicable(renditionConfig, mimeType) {
  let applicable = true;
  if (renditionConfig.include) {
    applicable = false;
    renditionConfig.include.split(',').forEach((include) => {
      if (mimeType.match(include)) {
        applicable = true;
      }
    });
  }
  if (renditionConfig.exclude) {
    renditionConfig.exclude.split(',').forEach((exclude) => {
      if (mimeType.match(exclude)) {
        applicable = false;
      }
    });
  }
  return applicable;
}

/**
 * Builds the URL for an image rendition.
 * @param {string} assetId
 * @param {string} assetName
 * @param {DownloadRendition} renditionConfig
 */
function buildImageRenditionUrl(assetId, assetName, renditionConfig) {
  const renditionFileName = buildRenditionFileName(assetName, renditionConfig.description, renditionConfig.format);
  const baseDeliveryUrl = new URL(getBaseDeliveryUrl(assetId, renditionFileName));
  imageTransformations.forEach((transformation) => {
    if (renditionConfig[transformation]) {
      baseDeliveryUrl.searchParams.append(transformation, renditionConfig[transformation]);
    }
  });
  return baseDeliveryUrl;
}

/**
 * Builds the filename based on asset name, rendition name and format.
 */
function buildRenditionFileName(assetName, renditionName, format) {
  const fileName = assetName.split('.');
  if (format) {
    // swap extension if format is specified
    fileName.splice(fileName.length - 1, 1, format);
  }
  // insert rendition name before extension
  if (renditionName) {
    fileName.splice(fileName.length - 1, 0, encodeURIComponent(renditionName));
  }
  return fileName.join('.');
}
