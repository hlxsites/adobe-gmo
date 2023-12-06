import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getBearerToken } from '../../scripts/security.js';

export async function openUploadDialog() {
  await loadScript('https://experience-qa.adobe.com/solutions/CQ-assets-upload/static-assets/resources/assets-upload.js');
  // API: https://git.corp.adobe.com/CQ/assets-upload/blob/main/packages/%40assets/upload/src/components/AllInOneUpload.tsx#L22-L30
  loadCSS('/contenthub/hydration/hydration.css');

  const uploadDialog = document.createElement('dialog');
  uploadDialog.id = 'upload-dialog';
  uploadDialog.innerHTML = `
    <h4>Upload</h4>
    <div id="assets-upload-container"></div>
  `;

  document.body.append(uploadDialog);
  uploadDialog.showModal();

  const container = uploadDialog.querySelector('#assets-upload-container');
  // eslint-disable-next-line no-undef
  UploadCoordinator.renderAllInOneUpload(container, { env: 'QA', apiToken: await getBearerToken() }, () => { console.log('rendered MFE!'); });
}
