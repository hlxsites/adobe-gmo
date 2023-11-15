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
    // eslint-disable-next-line func-names
    videoElem.onerror = function () {
      this.classList.add('adp-failed-placeholder-img');
      this.src = getFailedPlaceholderImgSrc(fileFormat);
    };
    container.appendChild(videoElem);
    // When the iframe's "load" event occurs, send the bearer token
    // wrapped in a message to the iframe content window
    videoElem.addEventListener('load', async () => {
      const iframeContentWindow = videoElem.contentWindow;
      const token = await getBearerToken();
      const message = {
        isIMSToken: true,
        token,
      };
      iframeContentWindow.postMessage(message, '*');
    });
  } else {
    const imgElem = document.createElement('img');
    imgElem.style.visibility = 'hidden';
    getOptimizedDeliveryUrl(assetId, assetName, 1024).then((url) => {
      imgElem.src = url;
      imgElem.style.visibility = '';
      // eslint-disable-next-line func-names
      imgElem.onerror = function () {
        this.classList.add('adp-failed-placeholder-img');
        this.src = getFailedPlaceholderImgSrc(fileFormat);
      };
    }).catch(() => {
      imgElem.classList.add('adp-failed-placeholder-img');
      imgElem.src = getFailedPlaceholderImgSrc(fileFormat);
      imgElem.style.visibility = '';
    });
    imgElem.alt = altAttrib;

    container.appendChild(imgElem);
  }
}
