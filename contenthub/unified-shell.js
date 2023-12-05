import excApp, {
  init, page, user, shell, topbar,
} from '../scripts/libs/exc-app/exc-app.js';
import { loadScript } from '../scripts/lib-franklin.js';

export {
  page, user, shell, topbar,
};

let initialImsOrg;

export function isUnifiedShellRuntimeAvailable() {
  return window.unifiedShellRuntime;
}

async function loadUnifiedShellRuntime() {
  // This avoids the React Spectrum Provider loading typekit js by default.
  // We load fonts (from Typekit) in the application's css file instead.
  // This avoids a few extra requests.
  window.Typekit = 1;

  // store the runtime script url in the session storage.
  // see https://git.corp.adobe.com/pages/exc/unified-shell-docs/docs/common-problems/integration-problems/#module-runtime-missing-script
  window.EXC_US_HMR = true;

  // eslint-disable-next-line no-async-promise-executor
  return await new Promise(async (resolve, reject) => {
    // catch typical error and show in the UI
    const onError = (e) => {
      // eslint-disable-next-line no-console
      console.warn('error loading UnifiedShell: ', e);

      document.body.append(e.message);
      reject(e);
    };
    window.addEventListener('error', onError);
    // eslint-disable-next-line max-len
    // see docs: https://git.corp.adobe.com/pages/exc/unified-shell-docs/docs/integration-basics/module-runtime/intro/#load-module-runtime-script
    await loadScript(`${window.hlx.codeBasePath}/scripts/libs/unifiedshell-runtime-loader.min.js`);
    window.removeEventListener('error', onError);

    init(resolve);
  });
}

export async function bootstrapUnifiedShell() {
  await loadUnifiedShellRuntime();
  // eslint-disable-next-line no-console
  window.unifiedShellRuntime = excApp();

  console.debug('UnifiedShell runtime loaded');
  await page.done();
  console.debug('sent "done" to UnifiedShell');

  topbar.onHeroClick(() => {
    window.location.pathname = '/';
  });

  window.unifiedShellRuntime.on('history', ({ type, path }) => {
    const cleanedPath = path[0] === '/' ? path : `/${path}`;
    console.log('history', { type, path });
    if (type === 'external' && window.location.pathname !== cleanedPath) {
      window.location.pathname = cleanedPath;
    }
  });

  window.unifiedShellRuntime.on('ready', (config) => {
    initialImsOrg = config.imsOrg;

    // for debugging:
    // eslint-disable-next-line no-console
    console.debug('UnifiedShell: received "ready" event', config);
  });

  user.on('change:imsOrg', (config) => {
    // eslint-disable-next-line no-console
    console.debug('UnifiedShell: received "change:imsOrg" event', config);
    if (!initialImsOrg) {
      // Sometimes this event is sent before the 'ready' event, and we can ignore it.
    } else if (config.imsOrg !== initialImsOrg) {
      // eslint-disable-next-line no-console
      console.debug('UnifiedShell: imsOrg changed, reloading page');
      page.spinner = true;
      page.iframeReload(false);
    }
  });
}
