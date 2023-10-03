import { getBrandingConfig } from './site-config.js';

const brandingConfig = await getBrandingConfig();
const dateFormatRaw = brandingConfig.dateFormat;

/**
 * Get a formatted human-readable file size string
 * scaled to the appropriate unit.
 * @param {number} size file size in bytes
 * @returns {string} formatted file size string
 */
export function formatFileSize(size) {
  if (size === 0) {
    return '0B';
  }
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return `${parseFloat((size / k ** i).toFixed(1))} ${sizes[i]}`;
}

/**
   * Gets a percentage string from a smart tag confidence value.
   * @param {*} confidence the confidence value, e.g. 0.9 for 90%
   * @returns {string} the percentage string, e.g. '90%'
   */
export function formatConfidence(confidence) {
  return `${Math.round(confidence * 100)}%`;
}

/**
   * Gets the formatted resolution string from width and height.
   * @param {number} width the width of the image
   * @param {number} height the height of the image
   * @returns {string} the formatted resolution string, e.g. '1920 x 1080'
   */
export function formatResolution(width, height) {
  if (!width || !height) return '';
  return `${width} x ${height}`;
}

export function formatNumber(str) {
  if (Number.isNaN(str)) {
    return str;
  }
  const num = parseFloat(str);
  if (Number.isInteger(num)) {
    return num.toLocaleString();
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Formats a date in the best format for the locale of the user's browser.
 * @param {Date|string|number} date - The date to format, as a Date object or a string.
 * @param {boolean} isInSeconds - Set to false if you are passing in a number Epoch in milliseconds.
 * @returns {string} The formatted date string.
 */
export function formatDate(date, isInSeconds = true) {
  let d;
  // check if date is a number and is in seconds
  if (typeof date === 'number' && isInSeconds) {
    d = new Date(date * 1000);
  } else {
    d = date instanceof Date ? date : new Date(date);
  }
  const dd = String(d.getDate()).padStart(2, '0');
  let mm = d.getMonth() + 1;
  const mmStr = String(mm).padStart(2, '0');
  const yyyy = d.getFullYear();
  const dateFormat = dateFormatRaw?.split('e')[0].trim();
  if (dateFormat === 'DD-MM-YYYY') {
    return `${dd}-${mmStr}-${yyyy}`;
  // eslint-disable-next-line no-else-return
  } else if (dateFormat === 'MM-DD-YYYY') {
    return `${mmStr}-${dd}-${yyyy}`;
  } else if (dateFormat === 'YYYY-MM-DD') {
    return `${yyyy}-${mmStr}-${dd}`;
  } else {
    mm -= 1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[mm]} ${dd}, ${yyyy}`;
  }
}

/**
 * Returns second half of mime type, e.g. 'image/jpeg' -> 'jpeg'
 * @param {string} str - mime type string e.e. 'image/jpeg'
 * @returns {string} file format string
 */
export function formatMimeType(str) {
  if (str && str.includes('/')) {
    return str.split('/')[1];
  }
  return str;
}

export function formatTextWithoutNamespace(str) {
  if (str && str.includes(':')) {
    const name = str.split(':').pop();
    if (name) {
      return name.replaceAll('-', ' ');
    }
    return name;
  }
  return str;
}
