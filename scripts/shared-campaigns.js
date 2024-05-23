import { getMappingInfo } from "./graphql.js";

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