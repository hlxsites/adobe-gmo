import { getMappingInfo } from "./graphql.js";
import { getProductIconMapping, getBaseConfigPath } from './site-config.js';

export async function resolveMappings(mappingType) {
    const response = await getMappingInfo(mappingType);
    const mappingArray = response.data.jsonByPath.item.json.options;
    return mappingArray;
}

/**
 * Filter provided array based on provided key/value pair
 */
export function filterArray(array, key, value) {
    const arrayMatch = array.filter(match => match[key] === value);
    return arrayMatch.length > 0 ? arrayMatch : null;
}

export async function getProductMapping(product) {
    const configPath = getBaseConfigPath();
    const defaultIcon = configPath + '/logo/products/default-app-icon.svg';
    const iconMapping = await getProductIconMapping();
    const iconMatch = filterArray(iconMapping, 'Product-offering', product);
    const icon = iconMatch ? configPath + iconMatch[0]['Icon-path'] : defaultIcon;

    const productsMatch = filterArray(await resolveMappings("getProductList"), 'value', product);
    const productsText = productsMatch ? productsMatch[0].text : product;

    return {
        label: productsText,
        icon: icon
    }
}