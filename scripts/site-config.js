import { fetchCached } from './fetch-util.js';
import { toCamelCase } from './lib-franklin.js';

/* eslint-disable no-use-before-define */

/**
 * @typedef {Object} AdminConfig
 * @property {string} aemDeliveryEndpoint
 * @property {string} imsOrg
 * @property {string} imsUserGroup
 * @property {string} apiKey
 * @property {'prod'|'stage'|undefined} imsEnvironment (Optional)
 */

/**
 * @returns {AdminConfig}
 */
export async function getAdminConfig() {
  const response = await getConfig('admin-config.json');
  const result = {};
  response.data.forEach((row) => {
    result[row.ID] = row.Value;
  });
  return result;
}

/**
 * NOTE: property names are converted from kebab-case in Excel to camelCase here.
 * e.g. font-css-url -> fontCssUrl
 *
 * @typedef {Object} BrandingConfig
 * @property {string} fontCssUrl
 * @property {string} logo
 * @property {string} favicon
 * @property {string} menubarColor
 * @property {string} brandText
 * @property {string} brandTextColor
 * @property {string} font
 * @property {string} dateFormat
 * @property {string} defaultSort
 * @property {string} fontCSSURL
 */

/**
 * @returns {BrandingConfig}
 */
export async function getBrandingConfig() {
  const response = await getConfig('site-config.json');
  const result = {};
  response.branding.data.forEach((row) => {
    result[toCamelCase(row.ID)] = row.Value;
  });
  return result;
}

/**
 * @typedef {Object} MetadataViewConfig
 * @property {string} label
 * @property {string} metadataField
 */

/**
 * @returns {Array<MetadataViewConfig>}
 */
export async function getCardViewConfig() {
  const response = await getConfig('site-config.json');
  return response.cardview.data.map((row) => {
    const aemMetadataField = row['Metadata-field'];
    const dashedName = aemMetadataField.replaceAll(':', '-');
    return ({
      label: row.Label,
      aemMetadataField,
      metadataField: dashedName,
    });
  });
}

/**
 * @returns {Array<MetadataViewConfig>}
 */
export async function getQuickViewConfig() {
  const response = await getConfig('site-config.json');
  return response.quickview.data.map((row) => {
    const aemMetadataField = row['Metadata-field'];
    const dashedName = aemMetadataField.replaceAll(':', '-');

    return ({
      label: row.Label,
      metadataField: dashedName,
      aemMetadataField,
    });
  });
}
/**
 * @returns {Array<MetadataViewConfig>}
 */
export async function getDetailViewConfig() {
  const response = await getConfig('site-config.json');
  return response.detailview.data.map((row) => {
    const aemMetadataField = row['Metadata-field'];
    const dashedName = aemMetadataField.replaceAll(':', '-');

    return ({
      label: row.Label,
      metadataField: dashedName,
      aemMetadataField,
    });
  });
}

/**
 * @typedef {Object} FilterConfig
 * @property {string} label
 * @property {string} metadataField (e.g. 'dc-format')
 * @property {string} aemMetadataField (e.g. 'dc:format')
 * @property {"and"|"or"} operator
 */

/**
 * @returns {Object<String, FilterConfig>}
 */
export async function getFilterConfig() {
  const response = await getConfig('site-config.json');
  const result = {};
  response.filter.data.forEach((row) => {
    const aemMetadataField = row['Metadata-field'];
    const dashedName = aemMetadataField.replaceAll(':', '-');
    result[dashedName] = {
      label: row.Label,
      aemMetadataField,
      metadataField: dashedName,
      operator: row.Operator,
    };
  });
  return result;
}

/**
 * @typedef {Object} DownloadRenditionConfig
 * @property {Array<DownloadRendition>} renditions
 */

/**
 * @typedef {Object} DownloadRendition
 * @property {string} description
 * @property {string} format
 * @property {string} include
 * @property {string} exclude
 * @property {string} quality
 * @property {string} crop
 * @property {string} height
 * @property {string} width
 * @property {'90'|'180'|'270'} rotation
 * @property {"horizontally"|"vertically"} flip
 */

/**
 * @returns {DownloadRenditionConfig}
 */
export async function getDownloadRenditionConfig() {
  const response = await getConfig('site-config.json');
  const result = {};
  result.renditions = {};
  return response['download-renditions'].data.map((row) => {
    const { Description, ...rest } = row;
    return ({
      description: Description,
      ...rest,
    });
  });
}

/**
 * Gets base path for config files
 * If it is a /drafts/{branch} path, it will return /drafts/{branch}
 * Otherwise, it will return the code base path.
 * @returns {string} Base path for config files
 */
function getBaseConfigPath() {
  if (window.location.pathname.startsWith('/drafts/')) {
    const contentBranch = window.location.pathname.split('/')[2];
    return `/drafts/${contentBranch}`;
  }

  return window.hlx.codeBasePath;
}

async function getConfig(filename) {
  if (!filename) throw new Error('filename is required');
  try {
    return await fetchCached(`${getBaseConfigPath()}/${filename}`, {}, `${window.hlx.codeBasePath}/${filename}`);
  } catch (error) {
    throw new Error(`Error fetching ${filename}: ${error}`, error);
  }
}

// Pre-emptively load the configs in parallel
getAdminConfig();
getBrandingConfig();
