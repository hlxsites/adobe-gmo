import { executeQuery } from "./graphql.js";
import { getProductIconMapping, getBaseConfigPath, getQueryPaths } from './site-config.js';

let iconMapping;
const cfMapping = getQueryPaths();
export let statusMapping = await getMappingArray('status');
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

export const testCalendar = [
    {
        'name': 'Content A',
        'status': 'Complete',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2024-02-01',
        'endDate': '2024-04-30'
    },
    {
        'name': 'Content B',
        'status': 'Complete',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2024-02-01',
        'endDate': '2024-04-30'
    },
    {
        'name': 'Test End Before Group',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2024-03-05',
        'endDate': '2024-06-10'
    },
    {
        'name': 'Bryan',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2024-03-15',
        'endDate': '2024-06-30'
    },
    {
        'name': 'Meagan',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2024-03-15',
        'endDate': '2024-06-30'
    },
    {
        'name': 'Content C',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Education',
        'startDate': '2024-03-10',
        'endDate': '2024-08-10'
    },
    {
        'name': 'Content D',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Education',
        'startDate': '2024-03-10',
        'endDate': '2024-08-10'
    },
    {
        'name': 'Content E',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Education',
        'startDate': '2024-03-10',
        'endDate': '2024-08-10'
    },
    {
        'name': 'Richard',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Conversion',
        'startDate': '2024-06-01',
        'endDate': '2024-10-31'
    },
    {
        'name': 'Kristine',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Other',
        'startDate': '2024-08-01',
        'endDate': '2024-12-31'
    },
    {
        'name': 'Elwood',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Other',
        'startDate': '2024-10-01',
        'endDate': '2024-12-21'
    },
    {
        'name': '2023 Item',
        'status': 'On Track',
        'link': 'https://www.google.com',
        'type': 'Awareness',
        'startDate': '2023-04-27',
        'endDate': '2023-11-11'
    },
    {
        'name': '2022 Item',
        'status': 'Complete',
        'link': 'https://www.google.com',
        'type': 'Education',
        'startDate': '2022-05-05',
        'endDate': '2022-09-02'
    }
]