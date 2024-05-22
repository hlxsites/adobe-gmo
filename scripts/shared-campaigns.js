import { getMappingInfo } from "./graphql.js";

/*
export const productMappings = {
    "acrobat-pro": {
        "name": "Acrobat Pro",
        "icon": "acro-icon"
    },
    "acrobat-export-pdf": {
        "name": "Acrobat Export PDF",
        "icon": "acro-icon"
    },
    "lightroom": {
        "name": "Lightroom",
        "icon": "lr-icon",
    },
    "adobe-express": {
        "name": "Adobe Express",
        "icon": "express-icon"
    },
    "photoshop": {
        "name": "Photoshop",
        "icon": "ps-icon"
    },
    "Not Available": {
        "name": "Not Available",
        "icon": "gear"
    }
}
*/

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