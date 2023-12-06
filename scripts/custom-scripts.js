import { getBrandingConfig } from "./site-config.js";
import { EventNames } from "./events.js";
import showToast from "./toast-message.js";

initLegalNotice();

async function initLegalNotice() {
    const config = await getBrandingConfig();
    document.addEventListener(EventNames.SESSION_STARTED, function() {
      showLegalNotice(config);
    });
}
  
function showLegalNotice(config) {
    const legalDefault = `NOTICE: Adobe records and uses your e-mail address for tracking purposes.`;
    const legalToast = config?.legalMessage || legalDefault;
    const legalDuration = 10000;
    const toastType = "info";

    showToast(legalToast, legalDuration, toastType, false);
}