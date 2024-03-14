import { createDialogHtml, addDialogEventListeners } from '../../scripts/dialog-html-builder.js';
import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getImsToken } from '../../scripts/security.js';
import { getFederatedDiscoveryLinks } from '../discovery-service.js';
import { getAdminConfig } from '../../scripts/site-config.js';
import { 
  formIsComplete, 
  getFacetOptions, 
  getMetadataSchema, 
  licenseDateFieldHidden, 
  licenseDateFieldShow 
} from './hydration-utils.js';

export async function openUploadDialog() {
  await loadScript(
    'https://experience.adobe.com/solutions/CQ-assets-upload/static-assets/resources/assets-upload.js',
  );
  // API: https://git.corp.adobe.com/CQ/assets-upload/blob/main/packages/%40assets/upload/src/components/AllInOneUpload.tsx#L22-L30
  loadCSS('/contenthub/hydration/hydration.css');

  const adminConfig = await getAdminConfig();
  const repositoryId = adminConfig.aemDeliveryEndpoint.replace('https://delivery', 'author');
  const discoveryLinks = await getFederatedDiscoveryLinks(repositoryId);
  const apiToken = await getImsToken();
  const facetOpions = await getFacetOptions(["gmo-campaignName", "gmo-programName"]);
  let formValues = {};
  let filesExist = false;
  let metadataSchema = [];
  let reloadForm = null;

  const doneText = document.createTextNode('Done');
  const cancelText = document.createTextNode('Cancel');
  const uploadText = document.createTextNode('Upload');
  const moreText = document.createTextNode('Upload More');
  const cancelButton = document.createElement('button');
  const addUploadButton = document.createElement('button');
  addUploadButton.classList.add('action', 'upload-assets');

  const formChanged = () => {
    if(filesExist && formIsComplete(metadataSchema, formValues)){
      addUploadButton.classList.remove('disabled');
    }else{
      addUploadButton.classList.add('disabled');
    }
  };

  const uploadClickEvent = () => {
    if(addUploadButton.classList.contains('disabled')) return;
    addUploadButton.removeEventListener('click', uploadClickEvent);
    UploadCoordinator.initiateUpload();
  };

  const reloadModal = async () => {
    formValues = {};
    filesExist = false;
    metadataSchema = getMetadataSchema(facetOpions);

    const navDiv = document.createElement('div');
    navDiv.classList.add('quick-links');
    navDiv.classList.add('upload-actions');
    navDiv.appendChild(addUploadButton);
    navDiv.appendChild(cancelButton);
    
    const { dialog, dialogBody } = createDialogHtml('hydration-upload-dialog', {
      dialogHeaderLeftContent: 'Upload your approved assets',
      dialogFooterContent: navDiv
    });

    //These buttons can be remade in React Spectrum if we move to that library
    addUploadButton.innerHTML = '';
    addUploadButton.appendChild(uploadText);
    if(!addUploadButton.classList.contains('disabled')) addUploadButton.classList.add('disabled');
    addUploadButton.addEventListener('click', uploadClickEvent);

    cancelButton.classList.add('action','close-upload-assets');
    cancelButton.innerHTML = '';
    cancelButton.appendChild(cancelText);
    cancelButton.addEventListener('click', () => {
      dialog.close()
    });

    document.body.append(dialog);
    dialog.showModal();

    const subHeader = document.createElement('h4');
    subHeader.appendChild(document.createTextNode('You may upload multiple assets in one step if the details provided apply to all.'));
    const container = document.createElement('div');
    container.setAttribute('id', 'hydration-container');
    dialogBody.appendChild(subHeader);
    dialogBody.appendChild(container);

    const folderUUID = crypto.randomUUID();
    const targetUploadPath = `/content/dam/hydrated-assets/${folderUUID.substring(0, 2)}/${folderUUID.substring(
      2,
      4,
    )}/${folderUUID}`;
    reloadForm = renderUploadCoordinator(container, apiToken, discoveryLinks, targetUploadPath, dialog);
    reloadForm(metadataSchema);

    addDialogEventListeners(dialog, {
      removeDialogElementOnClose: true,
      closeModalOnEscape: true,
      closeModalOnOutsideClick: true,
    });
  };

  const renderUploadCoordinator = (container, apiToken, discoveryLinks, targetUploadPath, dialog) => {
    return (mdschema) => {
      // eslint-disable-next-line no-undef
      UploadCoordinator.renderAllInOneUpload(
        container,
        {
          env: 'PROD',
          apiToken,
          discoveryLinks,
          targetUploadPath,
          rootPath: targetUploadPath,
          hideUploadButton: true, //this button cannot be controlled
          uploadingPlaceholder: {
            href: 'https://1000logos.net/wp-content/uploads/2016/10/Adobe-Logo-1993.jpg',
            alt: 'Adobe Logo'
          },
          onFilesChange: (files) => {
            filesExist = files?.length;
            formChanged();
          },
          onMetadataFormChange: (e) => {
            if (e.property === 'gmo:licensedContent') {
              const licenseExpirationIndex = metadataSchema.findIndex((field) => field.mapToProperty === 'gmo:licenseExpiryDate');
              if (e.value === 'yes-perpetuity') {
                metadataSchema[licenseExpirationIndex] = licenseDateFieldHidden;
              }else{
                metadataSchema[licenseExpirationIndex] = licenseDateFieldShow;
              }
              reloadForm(metadataSchema);
            }

            formValues[e.property] = e.value;
            formChanged();
          },
          onUploadComplete: () => {
            cancelButton.removeChild(cancelText);
            addUploadButton.removeChild(uploadText);
            cancelButton.appendChild(doneText);
            addUploadButton.appendChild(moreText);
            const resetFormClickEvent = () => {
              addUploadButton.removeEventListener('click', resetFormClickEvent);
              dialog.close();
              reloadModal();
            };
            addUploadButton.addEventListener('click', resetFormClickEvent);
          },
          metadataSchema: mdschema,
        },
        // eslint-disable-next-line no-console
        () => {
          console.log('rendered MFE!');
        },
      );
    }
  }

  reloadModal();
}
