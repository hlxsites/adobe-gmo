import { isVideo, getFailedPlaceholderImgSrc } from './filetypes.js';
import { getOptimizedDeliveryUrl, getVideoDeliveryUrl } from './polaris.js';
import { getBearerToken } from './security.js';

/**
 * Create a image tag or a video tag and add it to the container
 * @param {String} assetId
 * @param {String} assetName
 * @param {String} assetTitle
 * @param {String} fileFormat
 * @param {HTMLElement} container
 */
// eslint-disable-next-line import/prefer-default-export
export async function addAssetToContainer(
  assetId,
  assetName,
  assetTitle,
  fileFormat,
  container,
) {
  container.querySelector('img')?.remove();
  container.querySelector('iframe')?.remove();
  container.classList.remove('video-container');
  const altAttrib = assetTitle
    ? assetTitle.trim().replace(/"/, '"')
    : assetName.trim().replace(/"/, '"');
  if (isVideo(fileFormat)) {
    container.classList.add('video-container');
    const videoUrl = getVideoDeliveryUrl(assetId);
    const videoElem = document.createElement('iframe');
    videoElem.setAttribute('allow', 'fullscreen');
    videoElem.src = videoUrl;
    videoElem.alt = altAttrib;
    videoElem.frameborder = '0';
    videoElem.onerror = function () {
      this.src = getFailedPlaceholderImgSrc(fileFormat);
    };
    container.appendChild(videoElem);
    videoElem.addEventListener('load', async function () {
      const iframeContentWindow = videoElem.contentWindow;
      iframeContentWindow.postMessage(await getBearerToken(), "*");
    });
  } else {
    const imgElem = document.createElement('img');
    imgElem.style.visibility = 'hidden';
    getOptimizedDeliveryUrl(assetId, assetName, 1024).then((url) => {
      imgElem.src = url;
      imgElem.style.visibility = '';
    });
    imgElem.alt = altAttrib;
    imgElem.onerror = function () {
      this.src = getFailedPlaceholderImgSrc(fileFormat);
    };
    container.appendChild(imgElem);
  }
}
