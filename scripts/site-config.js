import { fetchCached } from './fetch-util.js';
import { toCamelCase } from './lib-franklin.js';
import { checkGroupAccess } from './security.js';

const QA_BASE_PATH = 'qa';
const DRAFTS_BASE_PATH = 'drafts';

function parseValue(value) {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  } if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}

/**
 * @typedef {Object} AdminConfig
 * @property {string} aemDeliveryEndpoint
 * @property {string} imsOrg
 * @property {string} imsUserGroup
 * @property {string} apiKey
 * @property {string} adobeExpressClientId
 * @property {string} adobeExpressAppName
 * @property {'prod'|'stage'|undefined} imsEnvironment (Optional)
 */

/**
 * @returns {Promise<AdminConfig>}
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
 * @property {string} portalTheme
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

export async function isContentHub() {
  const brandingConfig = await getBrandingConfig();
  if (brandingConfig.portalTheme === 'contenthub') {
    return true;
  }
  return false;
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
    const metadataGroup = row.Category;

    return ({
      label: row.Label,
      metadataField: dashedName,
      metadataGroup,
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
 * @property {string} filterType
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
      type: row.Type,
    };
  });
  return result;
}

export async function getFilterSettings() {
  const response = await getConfig('site-config.json');
  const result = {
    expandFilterCategoryByDefault: false,
  };
  response['filter-settings']?.data.forEach((row) => {
    if (row.Value) {
      result[toCamelCase(row.Configuration)] = parseValue(row.Value);
    }
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
  const result = [];
  response['download-renditions']?.data.forEach((row) => {
    const { Description, ...rest } = row;
    result.push({
      description: Description,
      ...rest,
    });
  });
  return result;
}

/**
 * NOTE: property names are converted from kebab-case in Excel to camelCase here.
 * e.g. enable-search-suggestions -> enableSearchSuggestions
 *
 * @typedef {Object} SearchFieldConfig
 * @property {boolean} enableSearchSuggestions
 * @property {number} searchMinChars
 */

/**
 * @returns {SearchFieldConfig}
 */
export async function getSearchFieldConfig() {
  const response = await getConfig('site-config.json');
  const configId = 'search-field';
  const result = {
    enableSearchSuggestions: false,
    searchMinChars: 3,
    hideExpiredAssets: true,
    placeholderText: 'Search all assets',
  };
  response[configId]?.data.forEach((row) => {
    if (row.Value) {
      result[toCamelCase(row.ID)] = parseValue(row.Value);
    }
  });
  return result;
}

export async function getCardViewSettings() {
  const result = {
    hideEmptyMetadataProperty: true,
  };
  return await mapUserSettingsForId('cardview-settings', result);
}

export async function getQuickViewSettings() {
  const result = {
    hideEmptyMetadataProperty: true,
  };
  return await mapUserSettingsForId('quickview-settings', result);
}

export async function getDetailViewSettings() {
  const result = {
    hideEmptyMetadataProperty: true,
  };
  return await mapUserSettingsForId('detailview-settings', result);
}

export async function getMetadataConfigs() {
  const response = await getConfig('site-config.json');
  const configId = 'metadata-configs';

  return response?.[configId]?.data?.map((row) => ({
    metadataField: row['Metadata-field'],
    metadataConfigFile: row['Metadata-config-file'],
  })) || [];
}

async function mapUserSettingsForId(configId, result) {
  const response = await getConfig('site-config.json');
  response[configId]?.data.forEach((row) => {
    if (row.Value) {
      result[toCamelCase(row.Configuration)] = parseValue(row.Value);
    }
  });
  return result;
}

/**
 *
 * @returns {Array<QuickLinkConfig>}
 */
export async function getQuickLinkConfig() {
  const result = [];
  const response = await getConfig('site-config.json');

  for (const row of response.quicklinks?.data || []) {
    if (row.Title && row.Page && row.Group == '') {
      result.push({
        title: row.Title,
        page: row.Page,
      });
    } else if (row.Title && row.Page && row.Group) {
      if (await checkGroupAccess(row.Group))
      {
        result.push({
          title: row.Title,
          page: row.Page,
        });
      }
    }
  }

  return result;
}

/**
 * Gets base path for config files
 * If it is a /drafts/{branch} path, it will return /drafts/{branch}
 * Otherwise, it will return the code base path.
 * @returns {string} Base path for config files
 */
export function getBaseConfigPath() {
  if (window.location.pathname.startsWith(`/${QA_BASE_PATH}/${DRAFTS_BASE_PATH}/`)) {
    const contentBranch = window.location.pathname.split('/')[3];
    return `/${QA_BASE_PATH}/${DRAFTS_BASE_PATH}/${contentBranch}`;
  }
  if (window.location.pathname.startsWith(`/${QA_BASE_PATH}/`)) {
    return `/${QA_BASE_PATH}`;
  }
  if (window.location.pathname.startsWith(`/${DRAFTS_BASE_PATH}/`)) {
    const contentBranch = window.location.pathname.split('/')[2];
    return `/${DRAFTS_BASE_PATH}/${contentBranch}`;
  }
  return '';
}

export function isUrlPathNonRoot() {
  return window.location.pathname.startsWith(`/${QA_BASE_PATH}/`)
    || window.location.pathname.startsWith(`/${QA_BASE_PATH}/${DRAFTS_BASE_PATH}/`)
    || window.location.pathname.startsWith(`/${DRAFTS_BASE_PATH}/`);
}

async function getConfig(filename) {
  if (!filename) throw new Error('filename is required');
  try {
    return await fetchCached(`${getBaseConfigPath()}/${filename}`, {}, `/${filename}`);
  } catch (error) {
    throw new Error(`Error fetching ${filename}: ${error}`, error);
  }
}

/**
 * @return {Promise<String[]>} e.g. ['xmpRights:WebStatement', 'adobe_dam:restrictions']
 */
export async function getLicenseAgreementFlags() {
  let flags = [];
  const response = await getConfig('site-config.json');
  response['license-agreement']?.data.forEach((row) => {
    if (row.Description === 'Flag' && row.Value) {
      flags = row.Value.split(',').map((item) => item.trim());
    }
  });
  return flags;
}

/**
 * @return {Promise<Object>} e.g. { header: 'License Agreement', text: 'This is the license agreement text'}
 */
export async function getLicenseAgreementText() {
  const licenseAgreement = {};
  const response = await getConfig('site-config.json');
  response['license-agreement']?.data.forEach((row) => {
    if (row.Description === 'Header' && row.Value) {
      licenseAgreement.header = row.Value;
    } else if (row.Description === 'Text' && row.Value) {
      licenseAgreement.text = row.Value;
    }
  });
  return licenseAgreement;
}
