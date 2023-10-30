import { getDownloadRenditionConfig } from './site-config.js';
import { isImage } from './filetypes.js';
import { getDownloadUrl, getBaseDeliveryUrl, getAssetMetadata } from './polaris.js';

const imageTransformations = [
  'format', 'quality', 'height', 'width', 'size', 'rotation', 'flip', 'crop',
];

function insertOriginalBeforeExtension(filename) {
  const regex = /(\.[^.]+)$/;
  return filename.replace(regex, '_Original$1');
}

// eslint-disable-next-line import/prefer-default-export
export async function getAvailableRenditions(assetId, assetName, mimeType) {
  const assetJSON = await getAssetMetadata(assetId);
  const downloadURL = await getDownloadUrl(assetId, assetName);
  let availableRenditions = [{
    assetId,
    assetName,
    name: 'Original',
    fileName: insertOriginalBeforeExtension(assetName),
    url: new URL(downloadURL),
    width: assetJSON.assetMetadata['exif:PixelXDimension'],
    height: assetJSON.assetMetadata['exif:PixelYDimension'],
    format: mimeType,
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
  return renditionConfig
    .filter((rendition) => isRenditionApplicable(rendition, mimeType))
    .map((rendition) => ({
      assetId,
      assetName,
      name: rendition.description,
      fileName: decodeURIComponent(buildRenditionFileName(assetName, rendition.description, rendition.format)),
      url: buildImageRenditionUrl(assetId, assetName, rendition),
      width: rendition.width,
      height: rendition.height,
      format: rendition.format,
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
function buildImageRenditionUrl(assetId, assetName, rendition) {
  const renditionFileName = buildRenditionFileName(assetName, rendition.description, rendition.format);
  const baseDeliveryUrl = new URL(getBaseDeliveryUrl(assetId, renditionFileName));
  imageTransformations.forEach((transformation) => {
    if (rendition[transformation]) {
      baseDeliveryUrl.searchParams.append(transformation, rendition[transformation]);
    }
  });
  return baseDeliveryUrl.toString();
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

  return `${fileName.slice(0, -1).join('_')}.${fileName[fileName.length - 1]}`;
}
