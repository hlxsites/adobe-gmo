import { createDialogHtml, addDialogEventListeners } from '../../scripts/dialog-html-builder.js';
import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getImsToken } from '../../scripts/security.js';
import { getCurrentRepositoryId, getFederatedDiscoveryLinks } from '../discovery-service.js';

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
  const repositoryId = await getCurrentRepositoryId();
  const discoveryLinks = await getFederatedDiscoveryLinks(repositoryId);
  const folderUUID = crypto.randomUUID();
  const targetUploadPath = `/content/dam/hydrated-assets/${folderUUID.substring(0, 2)}/${folderUUID.substring(2, 4)}/${folderUUID}`;
  const apiToken = await getImsToken();
  // eslint-disable-next-line no-undef
  UploadCoordinator.renderAllInOneUpload(
    container,
    {
      env: 'QA',
      apiToken,
      discoveryLinks,
      targetUploadPath,
      rootPath: targetUploadPath,
    },
    // eslint-disable-next-line no-console
    () => { console.log('rendered MFE!'); },
  );

  addDialogEventListeners(dialog, {
    removeDialogElementOnClose: true,
    closeModalOnEscape: true,
    closeModalOnOutsideClick: true,
  });
}
