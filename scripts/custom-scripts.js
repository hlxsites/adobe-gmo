import { getBrandingConfig } from "./site-config.js";
import { EventNames } from "./events.js";
import showToast from "./toast-message.js";

initLegalNotice();

async function initLegalNotice() {
  const config = await getBrandingConfig();
  if (config?.legalMessage) {
    document.addEventListener(EventNames.SESSION_STARTED, function() {
      showLegalNotice(config);
    });
  }
}
  
function showLegalNotice(config) {
  const legalToast = config?.legalMessage;
  const legalDuration = 10000;
  const toastType = "info";

  showToast(legalToast, legalDuration, toastType, false);
}