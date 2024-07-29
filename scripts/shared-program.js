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
        'deliverableName': 'Content A',
        'taskStatus': 'Complete',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2024-02-01',
        'deliverableProjectEndDate': '2024-04-30'
    },
    {
        'deliverableName': 'Content B',
        'taskStatus': 'Complete',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2024-02-01',
        'deliverableProjectEndDate': '2024-04-30'
    },
    {
        'deliverableName': 'Test End Before Group',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2024-03-05',
        'deliverableProjectEndDate': '2024-06-10'
    },
    {
        'deliverableName': 'Bryan',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2024-03-15',
        'deliverableProjectEndDate': '2024-06-30'
    },
    {
        'deliverableName': 'Meagan',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2024-03-15',
        'deliverableProjectEndDate': '2024-06-30'
    },
    {
        'deliverableName': 'Content C',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Education',
        'deliverableProjectStartDate': '2024-03-10',
        'deliverableProjectEndDate': '2024-08-10'
    },
    {
        'deliverableName': 'Content D',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Education',
        'deliverableProjectStartDate': '2024-03-10',
        'deliverableProjectEndDate': '2024-08-10'
    },
    {
        'deliverableName': 'Content E',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Education',
        'deliverableProjectStartDate': '2024-03-10',
        'deliverableProjectEndDate': '2024-08-10'
    },
    {
        'deliverableName': 'Richard',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Conversion',
        'deliverableProjectStartDate': '2024-06-01',
        'deliverableProjectEndDate': '2024-10-31'
    },
    {
        'deliverableName': 'Kristine',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Other',
        'deliverableProjectStartDate': '2024-08-01',
        'deliverableProjectEndDate': '2024-12-31'
    },
    {
        'deliverableName': 'Elwood',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Other',
        'deliverableProjectStartDate': '2024-10-01',
        'deliverableProjectEndDate': '2024-12-21'
    },
    {
        'deliverableName': '2023 Item',
        'taskStatus': 'On Track',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Awareness',
        'deliverableProjectStartDate': '2023-04-27',
        'deliverableProjectEndDate': '2023-11-11'
    },
    {
        'deliverableName': '2022 Item',
        'taskStatus': 'Complete',
        'reviewLink': 'https://www.google.com',
        'deliverableType': 'Education',
        'deliverableProjectStartDate': '2022-05-05',
        'deliverableProjectEndDate': '2022-09-02'
    }
]