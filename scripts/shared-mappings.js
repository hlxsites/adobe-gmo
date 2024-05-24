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
/*
async function buildProduct(product) {
    const configPath = getBaseConfigPath();
    const defaultIcon = configPath + '/logo/products/default-app-icon.svg';
    const iconMapping = await getProductIconMapping();
    const iconMatch = filterArray(iconMapping, 'Product-offering', product);
    const icon = iconMatch ? configPath + iconMatch[0]['Icon-path'] : defaultIcon;

    const nameMapping = await resolveMappings("getProductList");
    const nameMatch = filterArray(nameMapping, 'value', product);
    const productName = nameMatch ? nameMatch[0].text : product;

    const productEl = document.createElement('div');
    productEl.classList.add('product-entry');
    productEl.innerHTML = `
        <img class='icon' src=${icon}></img>
        <span class='product-label'>${productName}</span>
    `;

    return productEl;
}
async function buildProductList(program) {
    const configPath = getBaseConfigPath();
    const defaultIcon = configPath + '/logo/products/default-app-icon.svg';
    const iconMapping = await getProductIconMapping();
    const iconMatch = filterArray(iconMapping, 'Product-offering', product);
    const icon = iconMatch ? configPath + iconMatch[0]['Icon-path'] : defaultIcon;

    const productsMatch = filterArray(await resolveMappings("getProductList"), 'value', product);
    const productsText = productsMatch ? productsMatch[0].text : product;

    const productList = document.createElement('div');
    productList.classList.add('product', 'card-content');
    productList.innerHTML = `
        <img class="icon" src=${icon}></img>
        ${productsText}
    `
    document.querySelector('.card.products').appendChild(productList);
}
*/

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