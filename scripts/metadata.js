import { safeCSSId } from './scripts.js';
import {
  formatConfidence, formatFileSize, formatNumber, formatDate, formatResolution, formatMimeType,
  formatTextWithoutNamespace,
} from './format-utils.js';

const SEARCH_FIELD_TO_POLARIS_API_MAP = {
  assetId: 'repo:assetId',
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

/**
 * Does a breadth-first search of the object for the property name
 *
 * Example:
 *  findProperty({"metadata": {"assetMetadata": {"dc:title": "My title"}}}, "dc:title")
 * returns "My title"
 *
 * @param {*} obj - the object tree structure to search
 * @param {*} propName - the property name to search for
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
 * @param {*} key - the key to substitute, e.g. "metadata.assetMetadata.dc:title"
 * @param {*} json - the json object to substitute from,
 *                   e.g. {"metadata": {"assetMetadata": {"dc:title": "My title"}}}
 * @returns - the substituted value, e.g. "My title"
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
    format: (value) => value,
  },
  description: {
    label: 'Description',
    value: (assetJSON) => {
      // eslint-disable-next-line no-use-before-define
      const description = getMetadataValue('dc-description', assetJSON, true);
      return description;
    },
    format: (value) => value,
  },
  creator: {
    label: 'Creator',
    value: (assetJSON) => {
      // eslint-disable-next-line no-use-before-define
      const creator = getMetadataValue('dc-creator', assetJSON, true);
      return creator;
    },
    format: (value) => value,
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
    format: (value) => value.join(' x '),
  },
  format: {
    label: 'Format',
    value: (assetJSON) => {
      // if video asset, return video format
      // eslint-disable-next-line no-use-before-define
      const format = getMetadataValue('dc-format', assetJSON, true);
      return format;
    },
    format: (value) => formatMimeType(value),
  },
  size: {
    label: 'Size',
    value: (assetJSON) => {
      // eslint-disable-next-line no-use-before-define
      const size = getMetadataValue('size', assetJSON, true);
      return size;
    },
    // eslint-disable-next-line no-use-before-define
    format: (value) => formatFileSize(value),
  },
};

/**
 * Get the metadata property value from the asset JSON
 * There are multiple JSON formats that can be passed in, Polaris API metadata response
 * and Search API responses (e.g. Algolia).  Algolia property names have
 * '-' instead of ':' in the metadata field names.
 *
 * @param {*} key - the key to substitute, e.g. "assetMetadata.dc:title"
 * @param {*} json - the json object to substitute from,
 *                  e.g. {"metadata": {"assetMetadata": {"dc:title": "My title"}}}
 * @param {*} dataType - the data type of the metadata field - see DATA_TYPES
 * @param {*} allowRecursiveSearch - whether to allow recursive search for the property name
 * @returns - the substituted value, e.g. ["My title", "My title 2"]
 */
export function getMetadataValues(key, json, allowRecursiveSearch = true) {
  if (isPolarisJSON(json)) {
    if (SEARCH_FIELD_TO_POLARIS_API_MAP[key]) {
      // eslint-disable-next-line max-len
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
 * Same as getMetadataValues but returns the first element if the value is an array
 * @param {*} key - the key to substitute, e.g. "assetMetadata.dc:title"
 * @param {*} json - the json object to substitute from,
 *                  e.g. {"metadata": {"assetMetadata": {"dc:title": "My title"}}}
 * @param {*} dataType - the data type of the metadata field - see DATA_TYPES
 * @param {*} allowRecursiveSearch - whether to allow recursive search for the property name
 * @returns - the substituted value, e.g. "My title"
 */
export function getMetadataValue(key, json, allowRecursiveSearch = true) {
  const out = getMetadataValues(key, json, allowRecursiveSearch);
  return out;
}

export const DATA_TYPES = {
  text: (o) => {
    if (Array.isArray(o)) {
      return o[0];
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

/**
 * Format asset metadata - formats dates and arrays
 * @param {*} metadataValue - the metadata value to format
 * @returns the formatted metadata value, array values are joined with a comma
 * and dates are formatted using toLocaleDateString().
 */
export function formatAssetMetadata(propertyName, metadataValue, dataType) {
  // If no dataType is set and it is predefined field then use its format function
  if (!dataType) {
    if (PREDEFINED_METADATA_FIELDS[propertyName]
      && PREDEFINED_METADATA_FIELDS[propertyName].format) {
      return PREDEFINED_METADATA_FIELDS[propertyName].format(metadataValue);
    }
  }

  // if dataType is provided, use the corresponding format function
  if (dataType) {
    if (DATA_TYPES[dataType]) {
      return DATA_TYPES[dataType](metadataValue);
    }
  }

  // if no dataType is provided, try to detect it

  // if no dataType is provided, try to detect it
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

  if (dataType === 'number') {
    return Number(metadataValue).toLocaleString();
  }

  return metadataValue;
}

/**
 * Adds custom metadata fields to the asset metadata.
 * @param {Array} metadataConfig - array of metadata config objects
 * @param {Object} assetJSON - the asset JSON
 * @param {Function} addMetadataFieldCallback - callback function to add metadata field
 */
export function addMetadataFields(metadataConfig, assetJSON, addMetadataFieldCallback) {
  for (let i = 0; i < metadataConfig.length; i += 1) {
    const fieldTitle = metadataConfig[i].title;
    const metadataPropDataType = metadataConfig[i]['data-type'];
    const metadataProp = metadataConfig[i]['metadata-field'];
    const metadataDisplayFormat = metadataConfig[i].display;

    let metadataPropSubstitutedValue;

    if (!metadataPropDataType) {
      if (PREDEFINED_METADATA_FIELDS[metadataProp]) {
        metadataPropSubstitutedValue = PREDEFINED_METADATA_FIELDS[metadataProp].value(assetJSON);
      }
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
        dataType: metadataPropDataType,
        cssClass: safeCSSId(fieldTitle),
        display: metadataDisplayFormat,
      },
    );
  }
}
