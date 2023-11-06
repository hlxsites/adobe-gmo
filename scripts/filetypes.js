/** File Type filter handling */
/** For reference, see https://main--assets-distribution-portal--adobe.hlx.live/filetypes.json */

export const DOC_MIME_TYPES = {
  'application/epub+zip': true,
  'application/pdf': true,
  'application/rtf': true,
  'application/vnd.google-apps.script+json': true,
  'application/vnd.oasis.opendocument.presentation': true,
  'application/vnd.oasis.opendocument.text': true,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': true,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
  'application/x-vnd.oasis.opendocument.spreadsheet': true,
  'application/x‑abiword': true,
  'text/csv': true,
  'text/plain': true,
  'text/tab-separated-values': true,
  'application/xml': true,
};

export const VIDEO_MIME_TYPES = {
  'video/3gpp': true,
  'video/3gpp2': true,
  'video/h261': true,
  'video/h263': true,
  'video/h264': true,
  'video/jpeg': true,
  'video/jpm': true,
  'video/mj2': true,
  'video/mp2t': true,
  'video/mp4': true,
  'video/mpeg': true,
  'video/ogg': true,
  'video/quicktime': true,
  'video/vnd.dece.hd': true,
  'video/vnd.dece.mobile': true,
  'video/vnd.dece.pd': true,
  'video/vnd.dece.sd': true,
  'video/vnd.dece.video': true,
  'video/vnd.fvt': true,
  'video/vnd.mpegurl': true,
  'video/vnd.ms-playready.media.pyv': true,
  'video/vnd.uvvu.mp4': true,
  'video/vnd.vivo': true,
  'video/webm': true,
  'video/x-f4v': true,
  'video/x-fli': true,
  'video/x-flv': true,
  'video/x-m4v': true,
  'video/x-ms-asf': true,
  'video/x-ms-wm': true,
  'video/x-ms-wmv': true,
  'video/x-ms-wmx': true,
  'video/x-ms-wvx': true,
  'video/x-msvideo': true,
  'video/x-sgi-movie': true,
  'application/mp4': true,
  'application/ogg': true,
  'application/vnd.apple.mpegurl': true,
  'application/x-mpegurl': true,
  'application/xspf+xml': true,
  'application/x-troff-msvideo': true,
  'application/x-m4v': true,
  'application/x-ms-wmv': true,
  'application/x-ms-wmx': true,
  'application/x-ms-wvx': true,
  'application/x-msvideo': true,
  'application/x-sgi-movie': true,
};

export const IMAGE_MIME_TYPES = {
  'application/photoshop': true,
  'application/psd': true,
  'application/x-photoshop': true,
  'application/x-psd': true,
  'image/avif': true,
  'image/bmp': true,
  'image/cgm': true,
  'image/g3fax': true,
  'image/gif': true,
  'image/ief': true,
  'image/jpeg': true,
  'image/ktx': true,
  'image/pjpeg': true,
  'image/png': true,
  'image/prs.btif': true,
  'image/psd': true,
  'image/tiff': true,
  'image/vnd.adobe.photoshop': true,
  'image/vnd.dece.graphic': true,
  'image/vnd.djvu': true,
  'image/vnd.dvb.subtitle': true,
  'image/vnd.dwg': true,
  'image/vnd.dxf': true,
  'image/vnd.fastbidsheet': true,
  'image/vnd.fpx': true,
  'image/vnd.fst': true,
  'image/vnd.fujixerox.edmics-mmr': true,
  'image/vnd.fujixerox.edmics-rlc': true,
  'image/vnd.ms-modi': true,
  'image/vnd.net-fpx': true,
  'image/vnd.wap.wbmp': true,
  'image/vnd.xiff': true,
  'image/webp': true,
  'image/x-citrix-jpeg': true,
  'image/x-citrix-png': true,
  'image/x-cmu-raster': true,
  'image/x-cmx': true,
  'image/x-freehand': true,
  'image/x-icon': true,
  'image/x-pcx': true,
  'image/x-pict': true,
  'image/x-png': true,
  'image/x-portable-anymap': true,
  'image/x-portable-bitmap': true,
  'image/x-portable-graymap': true,
  'image/x-portable-pixmap': true,
  'image/x-rgb': true,
  'image/x-xbitmap': true,
  'image/x-xpixmap': true,
  'image/x-xwindowdump': true,
};

const VECTOR_MIME_TYPES = {
  'application/illustrator': true,
  'application/postscript': true,
  'application/vnd.adobe.indesign-idml-package': true,
  'application/x-illustrator': true,
  'application/x-illustrator-template': true,
  'application/x-indesign': true,
  'application/x-indesign-template': true,
  'image/svg': true,
  'image/svg+xml': true,
};

const ICON_BASE_PATH = '/icons/';

const FILE_TYPE_TO_CARD_ICON_MAP = {
  document: 'cardDocument',
  video: 'cardVideo',
  image: 'cardImage',
  vector: 'cardDocument',
  audio: 'cardAudio',
  '3dModel': 'card3DModel',
  collection: 'cardCollection',
};

const FILE_TYPE_TO_FILE_TYPE_TEXT = {
  document: 'Document',
  text: 'Text',
  video: 'Video',
  image: 'Image',
  audio: 'Audio',
  vector: 'Vector',
  asset: 'Asset',
  '3dModel': '3D Model',
  collection: 'Collection',
};

export function isDocument(mimetype) {
  return DOC_MIME_TYPES[mimetype];
}

export function isVideo(mimetype) {
  return mimetype?.includes('video/') || VIDEO_MIME_TYPES[mimetype];
}

export function isImage(mimetype) {
  return mimetype?.includes('image/') || IMAGE_MIME_TYPES[mimetype];
}

export function isVectorGraphic(mimetype) {
  return mimetype?.includes('image/svg+xml') || VECTOR_MIME_TYPES[mimetype];
}

export function is3DModel(mimetype) {
  return mimetype?.includes('model/');
}

export function isAudio(mimetype) {
  return mimetype?.includes('audio/');
}

export function isText(mimetype) {
  return mimetype?.includes('text/');
}

export function isPDF(mimetype) {
  return mimetype?.includes('application/pdf');
}

export function getFileType(mimetype) {
  if (!mimetype) return 'asset';
  if (isImage(mimetype)) return 'image';
  if (isVectorGraphic(mimetype)) return 'vector';
  if (isVideo(mimetype)) return 'video';
  if (isText(mimetype)) return 'document';
  if (isDocument(mimetype)) return 'document';
  if (is3DModel(mimetype)) return '3dModel';
  if (isAudio(mimetype)) return 'audio';
  if (mimetype === 'collection') return 'collection';
  return 'asset';
}

/**
 * Get the file type category given a mime type.
 * @param {string} mimeType the mime type of the file, e.g. 'image/jpeg' or 'video/mp4'
 * @returns {string} the file type category, e.g. 'Document', 'Image', 'Video', 'Audio', 'File'
 */
export function getFileTypeText(mimetype) {
  let fileType = getFileType(mimetype);
  if (!FILE_TYPE_TO_FILE_TYPE_TEXT[fileType]) {
    // eslint-disable-next-line prefer-destructuring
    fileType = mimetype.split('/')[0];
    return fileType.charAt(0).toUpperCase() + fileType.slice(1);
  }
  return FILE_TYPE_TO_FILE_TYPE_TEXT[fileType];
}

function mimeTypeToCardIconName(mimetype) {
  return FILE_TYPE_TO_CARD_ICON_MAP[getFileType(mimetype)] || FILE_TYPE_TO_CARD_ICON_MAP.image;
}

export function getFailedPlaceholderImgSrc(mimetype) {
  return `${ICON_BASE_PATH}${getFileType(mimetype)}.svg`;
}

export function getFileTypeCSSClass(mimetype) {
  return mimeTypeToCardIconName(mimetype);
}

export function getFileTypeIcon(mimetype) {
  return `${ICON_BASE_PATH}card${mimeTypeToCardIconName(mimetype)}.svg`;
}
