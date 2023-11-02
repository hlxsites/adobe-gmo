import { safeCSSId } from './scripts.js';
import {
  formatConfidence,
  formatDate,
  formatFileSize,
  formatMimeType,
  formatNumber,
  formatResolution,
  formatTextWithoutNamespace,
} from './format-utils.js';

const SEARCH_FIELD_TO_POLARIS_API_MAP = {
  'dc-format': 'repositoryMetadata.dc:format',
  'repo-name': 'repositoryMetadata.repo:name',
  'repo-createDate': 'repositoryMetadata.repo:createDate',
  'repo-modifyDate': 'repositoryMetadata.repo:modifyDate',
  access: 'repositoryMetadata.repo:access',
  size: 'repositoryMetadata.repo:size',
  'xcm-keywords': 'assetMetadata.xcm:keywords',
  'xcm-machineKeywords': 'assetMetadata.xcm:machineKeywords',
  'dc-title': 'assetMetadata.dc:title',
  'dc-description': 'assetMetadata.dc:description',
  'dc-creator': 'assetMetadata.dc:creator',
  'xmp-CreateDate': 'assetMetadata.xmp:CreateDate',
  'xmpDM-audioCompressor': 'assetMetadata.xmpDM:audioCompressor',
  'xmpDM-audioSampleType': 'assetMetadata.xmpDM:audioSampleType',
  'xmp-ModifyDate': 'assetMetadata.xmp:ModifyDate',
  'xmpDM-videoFrameRate': 'assetMetadata.xmpDM:videoFrameRate',
  'xmpDM-videoCompressor': 'assetMetadata.xmpDM:videoCompressor',
  'tiff-ImageWidth': 'assetMetadata.tiff:ImageWidth',
  'tiff-ImageLength': 'assetMetadata.tiff:ImageLength',
};

const DATE_FIELDS = [
  'xmp-CreateDate',
  'xmp-ModifyDate',
  'xmp-MetadataDate',
  'repo-createDate',
  'repo-modifyDate',
  'pur-expirationDate',
];

/**
 * Does a breadth-first search of the object for the property name
 *
 * Example:
 *  findProperty({"metadata": {"assetMetadata": {"dc:title": "My title"}}}, "dc:title")
 * returns "My title"
 *
 * @param {*} obj - the object tree structure to search
 * @param {*} propName - the property name to search for
 * @param recurse
 * @returns the value of the first matching property found in the object tree.
 *          Found using a breadth-first search.
 */
function findProperty(obj, propName, recurse) {
  if (Object.prototype.hasOwnProperty.call(obj, propName)) {
    return obj[propName];
  }
  if (Object.prototype.hasOwnProperty.call(obj, propName.replace(':', '-'))) {
    return obj[propName.replace(':', '-')];
  }

  let result;
  if (recurse) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (typeof obj[key] === 'object') {
        const child = findProperty(obj[key], propName, true);
        if (child) {
          result = child;
          break;
        }
      }
    }
  }
  return result;
}

function isPolarisJSON(json) {
  if (Object.prototype.hasOwnProperty.call(json, 'assetMetadata') || Object.prototype.hasOwnProperty.call(json, 'assetMetadata')) {
    return true;
  }
  return false;
}

/**
 * Get the metadata property value from the asset JSON
 * @param {string} key - the key to substitute, e.g. "metadata.assetMetadata.dc:title"
 * @param {object} json - the json object to substitute from,
 *                   e.g. {"metadata": {"assetMetadata": {"dc:title": "My title"}}}
 * @param {boolean} allowRecursiveSearch
 * @returns {*} the substituted value, e.g. "My title"
 */
function substituteVariableFromJSON(key, json, allowRecursiveSearch) {
  let out = json;
  const keyProcessed = key.trim().replace(/'/g, '"').replace(/\[["“”'’‘](.*?)["“”'’‘]\]/g, '.$1');
  const skipKeys = ['metadata'];
  let firstItemProcessed = false;
  // try to skip "metadata" node if it's not in the provided json object
  // e.g. if json is {"dc:title": "My title", "description": "My description"}
  // and key is "metadata.dc:title" we still retrieve "My title"
  keyProcessed.split('.').forEach((k) => {
    if (!firstItemProcessed && !out[k] && skipKeys.includes(k)) {
      return;
    }
    if (out) {
      out = findProperty(out, k, !firstItemProcessed && allowRecursiveSearch);
    }
    firstItemProcessed = true;
  });
  return out;
}

function getFormattedValue(key, json, allowRecursiveSearch) {
  let value;
  if (PREDEFINED_METADATA_FIELDS[key]?.value) {
    value = PREDEFINED_METADATA_FIELDS[key].value(json);
  } else {
    value = getMetadataValue(key, json, allowRecursiveSearch);
  }
  value = formatAssetMetadata(key, value);
  return value;
}

export function getAssetID(assetJSON) {
  return getFormattedValue('assetId', assetJSON);
}

export function getAssetName(assetJSON) {
  return getFormattedValue('repo-name', assetJSON);
}

export function getAssetTitle(assetJSON) {
  return getFormattedValue('title', assetJSON);
}

/**
 * Get the asset description
 */
export function getAssetDescription(assetJSON) {
  return getFormattedValue('description', assetJSON);
}

/**
 * Get the author(s) of the asset
 */
export function getAssetCreator(assetJSON) {
  return getFormattedValue('creator', assetJSON);
}

/**
 * Get the mimetype of the asset e.g. "image/jpeg"
 */
export function getAssetMimeType(assetJSON) {
  return getMetadataValue('dc-format', assetJSON);
}

/**
 * Get the width of the asset
 */
export function getAssetWidth(assetJSON) {
  return getMetadataValue('tiff-ImageWidth', assetJSON, true);
}

/**
 * Get the height of the asset
 */
export function getAssetHeight(assetJSON) {
  return getMetadataValue('tiff-ImageLength', assetJSON, true);
}

/**
 * Get the size of the asset in bytes
 */
export function getAssetSize(assetJSON) {
  return getMetadataValue('size', assetJSON);
}

/**
 * Predefined metadata fields that have special handling, can have compound values and a
 * special formatter.
 *
 * @type {Object<string,
 *   {label: string,
 *    value: function(assetJSON: Object): *,
 *    format: function(value: *): string
 *    }>}
 */
const PREDEFINED_METADATA_FIELDS = {
  title: {
    label: 'Title',
    value: (assetJSON) => {
      // eslint-disable-next-line no-use-before-define
      let title = getMetadataValue('dc-title', assetJSON, true);
      if (!title) {
        // eslint-disable-next-line no-use-before-define
        title = getMetadataValue('repo-name', assetJSON, true);
      }
      return title;
    },
    format: (value) => DATA_TYPES.text(value),
  },
  description: {
    label: 'Description',
    value: (assetJSON) => getMetadataValue('dc-description', assetJSON, true),
    format: (value) => DATA_TYPES.text(value),
  },
  creator: {
    label: 'Creator',
    value: (assetJSON) => getMetadataValue('dc-creator', assetJSON, true),
    format: (value) => DATA_TYPES.textList(value),
  },
  resolution: {
    label: 'Resolution',
    value: (assetJSON) => {
      // if video asset, return video resolutio
      // eslint-disable-next-line no-use-before-define
      const width = getMetadataValue('tiff-ImageWidth', assetJSON, true);
      // eslint-disable-next-line no-use-before-define
      const height = getMetadataValue('tiff-ImageLength', assetJSON, true);
      return [width, height];
    },
    format: (value) => DATA_TYPES.resolution(value),
  },
  format: {
    label: 'Format',
    value: (assetJSON) => getMetadataValue('dc-format', assetJSON, true),
    format: (value) => DATA_TYPES.format(value),
  },
  size: {
    label: 'Size',
    value: (assetJSON) => getMetadataValue('size', assetJSON, true),
    format: (value) => DATA_TYPES.size(value),
  },
};

/**
 * Get the metadata property value from the asset JSON
 *
 * @param {string} key - the key to substitute, e.g. "assetMetadata.dc:title"
 * @param {object} json - the json object to substitute from,
 *                  e.g. {"metadata": {"assetMetadata": {"dc:title": "My title"}}}
 * @param {boolean} allowRecursiveSearch - whether to allow recursive search for the property name
 * @returns {*} the substituted value, e.g. ["My title", "My title 2"]
 */
function getMetadataValues(key, json, allowRecursiveSearch = true) {
  /* There are multiple JSON formats that can be passed in, Polaris API metadata response
      and Search API responses (e.g. Algolia).  Algolia property names have '-'
      instead of ':' in the metadata field names. */
  if (isPolarisJSON(json)) {
    if (SEARCH_FIELD_TO_POLARIS_API_MAP[key]) {
      return substituteVariableFromJSON(SEARCH_FIELD_TO_POLARIS_API_MAP[key], json, allowRecursiveSearch);
    }
    if (key.includes('-')) {
      return substituteVariableFromJSON(key.replace('-', ':'), json, allowRecursiveSearch);
    }
    return substituteVariableFromJSON(key, json, allowRecursiveSearch);
  }
  if (json[key]) {
    return substituteVariableFromJSON(key, json, allowRecursiveSearch);
  }
  return substituteVariableFromJSON(key.replace(':', '-'), json, allowRecursiveSearch);
}

/**
 * alias for getMetadataValues
 */
export function getMetadataValue(key, json, allowRecursiveSearch = true) {
  return getMetadataValues(key, json, allowRecursiveSearch);
}

/**
 * Predefined metadata field types with a formatter function
 * @type {Object<string, function(value: *): string|HTMLElement>}
 */
const DATA_TYPES = {
  /* Get the first element if it's an array */
  text: (o) => {
    if (Array.isArray(o)) {
      return o[0];
    }
    return o;
  },
  /* Join the array elements with a comma if it's an array */
  textList: (o) => {
    if (Array.isArray(o)) {
      return o.join(', ');
    }
    return o;
  },
  number: (o) => formatNumber(o),
  date: (o) => formatDate(o),
  boolean: (o) => (o && o.trim().test('^true|yes|1') ? 'Yes' : 'No'),
  size: (o) => formatFileSize(o),
  format: (o) => formatMimeType(o),
  resolution: (o) => {
    if (Array.isArray(o) && o.length === 2) {
      return formatResolution(o[0], o[1]);
    }
    return undefined;
  },
  /**
   * Need to output elements here as
   * tags are a special case needing structure.
   */
  tags: (o) => {
    if (Array.isArray(o)) {
      const output = document.createElement('div');
      output.classList.add('tags');
      o.forEach((tag) => {
        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tag');
        tagDiv.textContent = tag.value;
        if (tag.confidence) {
          tagDiv.title = `${tag.value} (${formatConfidence(tag.confidence)})`;
        } else {
          tagDiv.title = tag.value;
        }
        output.appendChild(tagDiv);
      });
      return output;
    }
    return o;
  },
  textWithoutNamespace: (o) => formatTextWithoutNamespace(o),
};

function isDateValue(value) {
  if (typeof value === 'object' && value instanceof Date) {
    return true;
  } if (typeof value === 'string') {
    return !Number.isNaN(Date.parse(value)) || false;
  } if (typeof value === 'number') {
    try {
      const date = new Date(value);
      return !Number.isNaN(date.getTime());
    } catch (e) {
      return false;
    }
  }
  return false;
}

export function isDate(propertyName, propertyValue) {
  return DATE_FIELDS.includes(propertyName)
    || (propertyValue !== undefined && isDateValue(propertyValue));
}

/**
 * Format asset metadata - formats dates and arrays
 * @param {string} propertyName
 * @param {string} metadataValue - the metadata value to format
 * @returns {string|HTMLElement} the formatted metadata value, array values are joined with a comma
 * and dates are formatted using toLocaleDateString().
 */
export function formatAssetMetadata(propertyName, metadataValue) {
  if (metadataValue === undefined) {
    return undefined;
  }
  if (PREDEFINED_METADATA_FIELDS[propertyName]?.format) {
    return PREDEFINED_METADATA_FIELDS[propertyName].format(metadataValue);
  }

  // tags
  if (['xcm-machineKeywords', 'xcm-keywords'].includes(propertyName)) {
    return DATA_TYPES.tags(metadataValue);
  }

  // file types
  if (['dc-format'].includes(propertyName)) {
    return PREDEFINED_METADATA_FIELDS.format.format(metadataValue);
  }

  // dates
  if (isDate(propertyName, metadataValue)) {
    return formatDate(metadataValue);
  }

  // try to detect the data type
  // eslint-disable-next-line no-restricted-globals
  if (!(isNaN(metadataValue))) {
    return formatNumber(metadataValue);
  }

  // check if value is an array
  if (Array.isArray(metadataValue)) {
    return metadataValue.join(', ');
  }

  // check if string is a date
  if (Date.parse(metadataValue)) {
    return formatDate(metadataValue);
  }

  return metadataValue;
}

/**
 * Adds custom metadata fields to the asset metadata.
 * @param {Array<MetadataViewConfig>} metadataConfigs
 * @param {Object} assetJSON - the asset JSON
 * @param {function(metadataInfo:Object)} addMetadataFieldCallback - callback to add metadata field
 */
export function addMetadataFields(metadataConfigs, assetJSON, addMetadataFieldCallback) {
  if (!metadataConfigs || metadataConfigs.length === 0) {
    return;
  }
  for (const metadataInfo of metadataConfigs) {
    const fieldTitle = metadataInfo.label;
    const metadataProp = metadataInfo.metadataField;

    let metadataPropSubstitutedValue;

    if (PREDEFINED_METADATA_FIELDS[metadataProp]
          && PREDEFINED_METADATA_FIELDS[metadataProp].value !== undefined) {
      metadataPropSubstitutedValue = PREDEFINED_METADATA_FIELDS[metadataProp].value(assetJSON);
    }
    if (metadataPropSubstitutedValue === undefined) {
      metadataPropSubstitutedValue = getMetadataValue(
        metadataProp,
        assetJSON,
        true,
      );
    }
    addMetadataFieldCallback(
      {
        field: metadataProp,
        title: fieldTitle,
        value: metadataPropSubstitutedValue,
        cssClass: safeCSSId(fieldTitle),
        ...metadataInfo,
      },
    );
  }
}
