//import { executeQuery, graphqlQueryNameList } from "./graphql.js";
import { executeQuery } from "./graphql.js";
import { getProductIconMapping, getBaseConfigPath } from './site-config.js';

let iconMapping;
//export let statusMapping = await graphqlQueryNameList('getStatusList');
const statusCf = '/content/dam/gmo-cf/en/wf-picklist-data-source/status';
const productCf = '/content/dam/gmo-cf/en/wf-picklist-data-source/product'
export let statusMapping = await executeQuery(`getMappings${encodeURIComponent(';')}path=${encodeURIComponent(statusCf)}`)
export let productList = await executeQuery(`getMappings${encodeURIComponent(';')}path=${encodeURIComponent(productCf)}`)

/*
*   Executes graphql query for 'friendly' labels and returns array of the results
*/
/*
export async function resolveMappings(mappingType) {
    const response = await graphqlQueryNameList(mappingType);
    const mappingArray = response.data.jsonByPath.item.json.options;
    return mappingArray;
}
*/

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

    //if (productList == undefined) productList = await graphqlQueryNameList('getProductList');
    if (productList == undefined) productList = await executeQuery(`getMappings${encodeURIComponent(';')}path=${encodeURIComponent(productCf)}`)
    const productsArray = productList.data.jsonByPath.item.json.options;
    const productsMatch = filterArray(productsArray, 'value', product);
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