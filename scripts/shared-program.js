import { executeQuery } from "./graphql.js";
import { getProductIconMapping, getBaseConfigPath, getQueryPaths } from './site-config.js';

let iconMapping;
const cfMapping = getQueryPaths();
export let statusMapping = getMappingArray('status');
export let productList = await getMappingArray('products');

/**
 * Filter provided array based on provided key/value pair
 */
export function filterArray(array, key, value) {
    const arrayMatch = array.filter(match => match[key] === value);
    return arrayMatch.length > 0 ? arrayMatch : null;
}

export async function getProductMapping(product) {
    let iconMatch;
    const configPath = getBaseConfigPath();
    const defaultIcon = configPath + '/logo/products/default-app-icon.svg';
    if (iconMapping == undefined) iconMapping = await getProductIconMapping();
    if (iconMapping) {
        iconMatch = filterArray(iconMapping, 'Product-offering', product);
    } 
    const icon = iconMatch ? configPath + iconMatch[0]['Icon-path'] : defaultIcon;

    if (productList == undefined) productList = await getMappingArray('products');
    const productsMatch = filterArray(productList, 'value', product);
    const productsText = productsMatch ? productsMatch[0].text : product;

    return {
        label: productsText,
        icon: icon
    }
}

/*
*   Check for undefined/blank property and supply 'Not Available' if no data
*/
export function checkBlankString(string, notAvailableText = 'Not Available') {
    if (string == undefined || string == '') {
        return notAvailableText;
    } else {
        return string;
    }
}

export function dateFormat(dateString) {
    const formattedDate = dateString ? dateString.split('T')[0] : 'Not Available';
    return formattedDate;
}

function getCFPath(cfArray, type) {
    const cfMatch = cfArray.filter(item => item['type'] === type);
    const cfPath =  cfMatch.length > 0 ? cfMatch[0].path : null;
    return cfPath;
}

export async function getMappingArray(type) {
    const mappingCf = getCFPath(await cfMapping, type);
    const mappings = executeQuery(`getMappings${encodeURIComponent(';')}path=${encodeURIComponent(mappingCf)}`).then((response) => {
        return response.data.jsonByPath.item.json.options;
    })
    return mappings;
}

export function showLoadingOverlay(targetDiv) {
    const overlayEl = document.createElement('div');
    overlayEl.className = 'loading-overlay';

    // Create the spinner and loading message
    const spinnerEl = document.createElement('div');
    spinnerEl.className = 'loading-content';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';

    const loadingMessage = document.createElement('span');
    loadingMessage.className = 'loading-message';
    loadingMessage.innerText = 'Loading...';

    // Append spinner and message to content container
    spinnerEl.appendChild(spinner);
    spinnerEl.appendChild(loadingMessage);
    overlayEl.appendChild(spinnerEl);

    // Append overlay to the target div
    targetDiv.appendChild(overlayEl);
}

export function hideLoadingOverlay(targetDiv) {
    const overlay = targetDiv.querySelector('.loading-overlay');
    if (overlay) {
        targetDiv.removeChild(overlay);
    }
}