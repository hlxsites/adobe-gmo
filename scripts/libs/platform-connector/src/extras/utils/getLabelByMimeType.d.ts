export declare const _mimeTypeToLabelMap: {
    '*/*': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/pdf': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/postscript': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/msword': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.oasis.opendocument.graphics': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'text/csv': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'text/html': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'text/rtf': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'text/plain': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.oasis.opendocument.spreadsheet': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.ms-excel': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.ms-powerpoint': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.oasis.opendocument.presentation': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/x-indesign': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.quark.quarkxpress': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/*': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/aac': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/midi': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/mp3': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/mp4': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/mpeg': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/wav': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'audio/wma': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/*': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/bmp': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/gif': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/jpeg': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/pjpeg': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/png': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/svg+xml': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/tiff': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/vnd.adobe.photoshop': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/vnd.microsoft.icon': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-adobe-dng': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-bmp': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-dcraw': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-pbm': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-ppm': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-raw-nikon': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'image/x-xcf': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'video/*': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'video/mp4': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'video/mpeg': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'video/quicktime': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/java-archive': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/x-rar-compressed': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/x-tar': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/x-tar-gz': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/zip': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.adobe.air-application-installer-package+zip': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.adobe.element+dcx': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.adobe.library+dcx': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.adobeaemcloud.collection+json': {
        id: string;
        defaultMessage: string;
        description: string;
    };
    'application/vnd.adobecloud.directory+json': {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
/**
 * Utils function to return user-friendly label from asset MIME type.
 * This function is meant to be a temporary solution until new package can be created in react super components, repo.
 * @private
 * @param {string} mimetype file MIME type
 * @param {('en-US'|'de-DE'|'es-ES'|'it-IT'|'ja-JP'|'ko-Kr'|'pt-BR'|'zh-CN'|'zh-TW')} [locale = en-US] i18n locale string
 * @returns {string} localized asset format
 */
export declare const getLabelByMimeType: (mimetype: any, locale?: string) => any;
