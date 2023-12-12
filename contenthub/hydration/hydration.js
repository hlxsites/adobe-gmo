import { createDialogHtml, addDialogEventListeners } from '../../scripts/dialog-html-builder.js';
import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getBearerToken } from '../../scripts/security.js';

export async function openUploadDialog() {
  await loadScript('https://experience-qa.adobe.com/solutions/CQ-assets-upload/static-assets/resources/assets-upload.js');
  // API: https://git.corp.adobe.com/CQ/assets-upload/blob/main/packages/%40assets/upload/src/components/AllInOneUpload.tsx#L22-L30
  loadCSS('/contenthub/hydration/hydration.css');

  const { dialog, dialogBody } = createDialogHtml('hydration-upload-dialog', {
    dialogHeaderLeftContent: 'Upload',
  });
  document.body.append(dialog);
  dialog.showModal();

  const container = dialogBody;
  // eslint-disable-next-line no-undef
  UploadCoordinator.renderAllInOneUpload(
    container,
    // TODO: Configure the MFE with proper metadata
    { env: 'QA', apiToken: await getBearerToken() },
    // eslint-disable-next-line no-console
    () => { console.log('rendered MFE!'); },
  );

  addDialogEventListeners(dialog, {
    removeDialogElementOnClose: true,
    closeModalOnEscape: true,
    closeModalOnOutsideClick: true,
  });
}
