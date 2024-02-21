import { createDialogHtml, addDialogEventListeners } from '../../scripts/dialog-html-builder.js';
import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getImsToken } from '../../scripts/security.js';
import { getFederatedDiscoveryLinks } from '../discovery-service.js';
import { getAdminConfig } from '../../scripts/site-config.js';

export async function openUploadDialog() {
  await loadScript(
    'https://experience.adobe.com/solutions/CQ-assets-upload/static-assets/resources/assets-upload.js',
  );
  // API: https://git.corp.adobe.com/CQ/assets-upload/blob/main/packages/%40assets/upload/src/components/AllInOneUpload.tsx#L22-L30
  loadCSS('/contenthub/hydration/hydration.css');

  const {results:[{ facets }]} = await window.search.client.search([{
    "indexName": window.search.indexName,
    "params": {
      "facets": [
        "gmo-campaignName",
        "gmo-programName"
      ],
    "hitsPerPage": 0,
    "maxValuesPerFacet": 50,
    "page": 0,
    "query": "*"
  }}]);

  let facetOptions = {};
  for(const [facet, counts] of Object.entries(facets)){
    facetOptions[facet] = Object.keys(counts).sort().map((name) => ({id: name, name}));
  }

  //Working on a solution so the form can tell us if it is finished.
  //Until that logic is built, we're making a quick solution to validate this form.
  const renderForm = async () => {
    let formValues = {};
    let filesExist = false;
    const formIsComplete = () => {
      //find a basic required field that isn't filled.
      const incomplete = metadataSchema.find((schema) => {
        if(!schema.required) return;
        if(schema.requires) return;
        return Array.isArray(formValues[schema.mapToProperty]) ? formValues[schema.mapToProperty].length === 0 : formValues[schema.mapToProperty] === '';
      });
      
      if(incomplete) return false;

      if(formValues['gmo:campaignName']){
        if(!formValues['gmo:programName']) return false;
        if(!formValues['gmo:deliverableType']) return false;
      }

      if(formValues['gmo:licensedContent'] !== 'no'){
        if(!formValues['gmo:usageTerms']) return false;
        if(formValues['gmo:licensedContent'] === 'yes-expire' && !formValues['gmo:licenseDateXXX']) return false;
      }
      return true;
    };

    const metadataSchema = [
      {
        mapToProperty: 'gmo:lineofBusiness',
        label: 'Line of Business',
        placeholder: 'Select one',
        required: true,
        element: 'dropdown',
        dropdownOptions: [
          {
            id: 'corporate',
            name: 'Corporate',
          },
          {
            id: 'digital-media-dme',
            name: 'Digital Media (DMe)',
          },
          {
            id: 'digital-experience-dx',
            name: 'Digital Experience (DX)',
          },
          {
            id: 'business-solutions',
            name: 'Business Solutions',
          },
        ],
      },
      /*{
        mapToProperty: 'gmo:productFamily',
        label: 'Product Family',
        placeholder: 'Select one',
        required: true,
        element: 'dropdown',
        dropdownOptions: [
          {
            id: 'na',
            name: 'N/A',
          },
          {
            id: 'creative-cloud',
            name: 'Creative Cloud',
          },
          {
            id: 'experience-cloud',
            name: 'Experience Cloud',
          },
          {
            id: 'document-cloud',
            name: 'Document Cloud',
          },
        ],
      },*/
      {
        mapToProperty: 'gmo:productsOffering',
        label: 'Product',
        placeholder: 'Select one or more',
        required: true,
        element: 'tags',
        dropdownOptions: [
          { name: 'N/A', id: 'na' },
          { name: 'Acrobat Export PDF', id: 'acrobat-export-pdf' },
          { name: 'Acrobat PDF Pack', id: 'acrobat-pdf-pack' },
          { name: 'Acrobat Pro', id: 'acrobat-pro' },
          { name: 'Acrobat Reader', id: 'acrobat-reader' },
          { name: 'Acrobat Sign Mobile', id: 'acrobat-sign-mobile' },
          { name: 'Acrobat Sign', id: 'acrobat-sign' },
          { name: 'Acrobat standard', id: 'acrobat-standard' },
          { name: 'Adobe Color', id: 'adobe-color' },
          { name: 'Adobe Express', id: 'adobe-express' },
          { name: 'Adobe Fonts', id: 'adobe-fonts' },
          { name: 'Adobe Scan', id: 'adobe-scan' },
          { name: 'Aero', id: 'aero' },
          { name: 'After Effects', id: 'after-effects' },
          { name: 'Animate', id: 'animate' },
          { name: 'Audition', id: 'audition' },
          { name: 'Behance', id: 'behance' },
          { name: 'Bridge', id: 'bridge' },
          { name: 'Capture', id: 'capture' },
          { name: 'Character Animator', id: 'character-animator' },
          { name: 'Cloud Service', id: 'cloud-service' },
          { name: 'Content Server', id: 'content-server' },
          { name: 'Creative Cloud All Apps', id: 'creative-cloud-all-apps' },
          { name: 'Digital Editions', id: 'digital-editions' },
          { name: 'Dreamweaver', id: 'dreamweaver' },
          { name: 'Fill Sign', id: 'fill-sign' },
          { name: 'Frame.io', id: 'frame-io' },
          { name: 'Fresco', id: 'fresco' },
          { name: 'Http Dynamic Streaming', id: 'http-dynamic-streaming' },
          { name: 'Illustrator', id: 'illustrator' },
          { name: 'InCopy', id: 'incopy' },
          { name: 'InDesign Server', id: 'indesign-server' },
          { name: 'InDesign', id: 'indesign' },
          { name: 'Lightroom Classic', id: 'lightroom-classic' },
          { name: 'Lightroom', id: 'lightroom' },
          { name: 'Media Encoder', id: 'media-encoder' },
          { name: 'Media Server 5 Extended', id: 'media-server-5-extended' },
          { name: 'Media Server 5 on Amazon Web Services', id: 'media-server-5-on-amazon-web-services' },
          { name: 'Media Server 5 Professional', id: 'media-server-5-professional' },
          { name: 'Media Server 5 Standard', id: 'media-server-5-standard' },
          { name: 'Mixamo', id: 'mixamo' },
          { name: 'Photoshop Express', id: 'photoshop-express' },
          { name: 'Photoshop', id: 'photoshop' },
          { name: 'Portfolio', id: 'portfolio' },
          { name: 'Premiere Elements', id: 'premiere-elements' },
          { name: 'Premiere Pro', id: 'premiere-pro' },
          { name: 'Premiere Rush', id: 'premiere-rush' },
          { name: 'Stock', id: 'stock' },
          { name: 'Substance 3D Designer', id: 'substance-3d-designer' },
          { name: 'Substance 3D Modeler', id: 'substance-3d-modeler' },
          { name: 'Substance 3D Painter', id: 'substance-3d-painter' },
          { name: 'Substance 3D Sampler', id: 'substance-3d-sampler' },
          { name: 'Substance 3D Stager', id: 'substance-3d-stager' },
        ],
      },
      {
        mapToProperty: 'gmo:fiscalYear',
        label: 'Year',
        placeholder: 'Select one',
        required: true,
        element: 'dropdown',
        dropdownOptions: [
          {
            id: '2023',
            name: '2023',
          },
          {
            id: '2024',
            name: '2024',
          },
        ],
      },
      {
        mapToProperty: 'gmo:campaignName',
        label: 'Campaign',
        placeholder: 'Select campaign',
        element: 'dropdown',
        dropdownOptions: [{id: '', name: 'N/A'}, ...facetOptions['gmo-campaignName']],
      },
      {
        mapToProperty: 'gmo:programName',
        label: 'Program',
        placeholder: 'Select program name',
        element: 'dropdown',
        dropdownOptions: facetOptions['gmo-programName'],
        required: true,
        requires: [{
          property: 'gmo:campaignName',
          expectedValue: '',
          operator: '!=='
        }]
      },
      {
        mapToProperty: 'gmo:deliverableType',
        label: 'Select deliverable type',
        element: 'dropdown',
        required: true,
        dropdownOptions: [
          {
            id: 'adobe-com',
            name: 'Adobe.com',
          },
          {
            id: 'discover',
            name: 'Discover',
          },
          {
            id: 'email',
            name: 'Email',
          },
          {
            id: 'in-app',
            name: 'In-App (Growth)',
          },
          {
            id: 'other',
            name: 'Other',
          },
          {
            id: 'owned-social',
            name: 'Owned Social',
          },
          {
            id: 'paid-media-static',
            name: 'Paid Media - Static',
          },
          {
            id: 'paid-media-video',
            name: 'Paid Media - Video',
          },
          {
            id: 'tutorial',
            name: 'Tutorial',
          },
        ],
        requires: [{
          property: 'gmo:campaignName',
          expectedValue: '',
          operator: '!=='
        }]
      },
      {
        mapToProperty: 'gmo:licensedContent',
        label: 'Licensed?',
        placeholder: 'Select one',
        required: true,
        element: 'dropdown',
        dropdownOptions: [
          {
            id: 'no',
            name: 'No',
          },
          {
            id: 'yes-expire',
            name: 'Yes (Expires)',
          },
          {
            id: 'yes-perpetutity',
            name: 'Yes (in Perpetutity)',
          },
        ],
      },
      {
        mapToProperty: 'gmo:licenseDateXXX',
        label: 'Expiration Date',
        placeholder: 'Select date',
        required: true,
        element: 'datepicker',
        requires: [{ property: 'gmo:licensedContent', expectedValue: 'yes-expire' }],
      },
      {
        mapToProperty: 'gmo:usageTerms',
        label: 'Licensed usage terms',
        placeholder: 'Enter terms of usage',
        required: true,
        element: 'textarea',
        requires: [
          { property: 'gmo:licensedContent', expectedValue: 'no', operator: '!==' },
          { property: 'gmo:licensedContent', expectedValue: '', operator: '!==' }
        ],
      },
      {
        mapToProperty: 'dc:subject',
        label: 'Keywords',
        placeholder: 'Enter comma-separated list',
        element: 'text',
      },
      {
        mapToProperty: 'gmo:contentType',
        label: 'Content Type',
        placeholder: 'Select one',
        element: 'dropdown',
        dropdownOptions: [
          { name: 'Art - Boxshot/Cardshot', id: 'art-boxshot-cardshot' },
          { name: 'Art - Imagery', id: 'art-imagery' },
          { name: 'Art - Icon/Logo', id: 'art-icon-logo' },
          { name: 'Art - Lock-up', id: 'art-lock-up' },
          { name: 'Art - Identity', id: 'art-identity' },
          { name: 'Audio Story', id: 'audiostory' },
          { name: 'Collateral - Datasheet', id: 'collateral-datasheet' },
          { name: 'Collateral - E-Book', id: 'collateral-e-book' },
          { name: 'Collateral - Print Asset', id: 'collateral-printasset' },
          { name: 'Collateral - Report', id: 'collateral-report' },
          { name: 'Email - Consideration', id: 'email-consideration' },
          { name: 'Email - Engagement ', id: 'email-engagement' },
          { name: 'Email - How to Buy', id: 'email-howtobuy' },
          { name: 'Email - Operational', id: 'email-operational' },
          { name: 'Email - Retention', id: 'email-retention' },
          { name: 'Email - Signature', id: 'email-signature' },
          { name: 'Endoresement Signatures', id: 'endoresementsignatures' },
          { name: 'Event - Graphics', id: 'event-graphics' },
          { name: 'Event - Signage', id: 'event-signage' },
          { name: 'Corporate Fonts', id: 'corporatefonts' },
          { name: 'Corporate Guidelines', id: 'corporateguidelines' },
          { name: 'Infographic', id: 'infographic' },
          { name: 'Media Banner', id: 'mediabanner' },
          { name: 'Messaging/Copy', id: 'messaging-copy' },
          { name: 'Presentation - Customer Facing', id: 'presentation-customerfacing' },
          { name: 'Presentation - Template', id: 'presentation-template' },
          { name: 'Reseller Partnership', id: 'resellerpartnership' },
          { name: 'Screensavers', id: 'screensavers' },
          { name: 'Social Media', id: 'socialmedia' },
          { name: 'Stationary', id: 'stationary' },
          { name: 'Video - Bumper', id: 'video-bumper' },
          { name: 'Video - Corporate', id: 'video-corporate' },
          { name: 'Video - Customer', id: 'video-customer' },
          { name: 'Video - Explainer', id: 'video-explainer' },
          { name: 'Video - Tutorial', id: 'video-tutorial' },
          { name: 'Video - Events', id: 'video-events' },
          { name: 'Wallpaper', id: 'wallpaper' },
          { name: 'Web - Banner', id: 'web-banner' },
          { name: 'Web - Marquee', id: 'web-marquee' },
        ],
      },
      {
        mapToProperty: 'gmo:ddomStage',
        label: 'DDOM Stage',
        placeholder: 'Select multiple',
        element: 'tags',
        dropdownOptions: [
          {
            id: 'discover',
            name: 'Discover',
          },
          {
            id: 'try',
            name: 'Try',
          },
          {
            id: 'buy',
            name: 'Buy',
          },
          {
            id: 'use',
            name: 'Use',
          },
          {
            id: 'renew',
            name: 'Renew',
          },
        ],
      },
      {
        mapToProperty: 'gmo:p0TargetMarketGeo',
        label: 'Target Market',
        placeholder: 'Select One',
        element: 'dropdown',
        dropdownOptions: [
          {
            id: 'apac',
            name: 'APAC',
          },
          {
            id: 'emea',
            name: 'EMEA',
          },
          {
            id: 'jpn',
            name: 'JPN',
          },
          {
            id: 'latam',
            name: 'LATAM',
          },
          {
            id: 'na',
            name: 'NA',
          },
        ],
      },
      {
        mapToProperty: 'dam:assetStatus',
        value: 'approved',
        element: 'hidden',
      },
    ];

    //These buttons can be remade in React Spectrum if we move to that library
    const doneText = document.createTextNode('Done');
    const cancelText = document.createTextNode('Cancel');
    const uploadText = document.createTextNode('Upload');
    const moreText = document.createTextNode('Upload More');
    const navDiv = document.createElement('div');
    navDiv.classList.add('quick-links');
    navDiv.classList.add('upload-actions');
    const addUploadButton = document.createElement('button');
    navDiv.appendChild(addUploadButton);
    addUploadButton.classList.add('action', 'upload-assets', 'disabled');
    addUploadButton.appendChild(uploadText);

    const uploadClickEvent = () => {
      if(addUploadButton.classList.contains('disabled')) return;
      addUploadButton.removeEventListener('click', uploadClickEvent);
      UploadCoordinator.initiateUpload();
      setTimeout(() => {
        cancelButton.removeChild(cancelText);
        addUploadButton.removeChild(uploadText);
        cancelButton.appendChild(doneText);
        addUploadButton.appendChild(moreText);
        addUploadButton.addEventListener('click', renderForm);
      }, 1000);
    };

    addUploadButton.addEventListener('click', uploadClickEvent);

    const cancelButton = document.createElement('button');
    navDiv.appendChild(cancelButton);
    cancelButton.classList.add('action','close-upload-assets');
    cancelButton.appendChild(cancelText);
    cancelButton.addEventListener('click', () => {
      dialog.close();
    });

    const formChanged = () => {
      if(filesExist && formIsComplete()){
        addUploadButton.classList.remove('disabled');
      }else{
        addUploadButton.classList.add('disabled');
      }
    };
    
    const { dialog, dialogBody } = createDialogHtml('hydration-upload-dialog', {
      dialogHeaderLeftContent: 'Upload your approved assets',
      dialogFooterContent: navDiv
    });

    document.body.append(dialog);
    dialog.showModal();

    const subHeader = document.createElement('h4');
    subHeader.appendChild(document.createTextNode('You may upload multiple assets in one step if the details provided apply to all.'));
    const container = document.createElement('div');
    container.setAttribute('id', 'hydration-container');
    dialogBody.appendChild(subHeader);
    dialogBody.appendChild(container);

    const adminConfig = await getAdminConfig();
    const repositoryId = adminConfig.aemDeliveryEndpoint.replace('https://delivery', 'author');
    const discoveryLinks = await getFederatedDiscoveryLinks(repositoryId);
    const folderUUID = crypto.randomUUID();
    const targetUploadPath = `/content/dam/hydrated-assets/${folderUUID.substring(0, 2)}/${folderUUID.substring(
      2,
      4,
    )}/${folderUUID}`;
    const apiToken = await getImsToken();
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
          formValues[e.property] = e.value;
          formChanged();
        },
        metadataSchema,
      },
      // eslint-disable-next-line no-console
      () => {
        console.log('rendered MFE!');
      },
    );

    addDialogEventListeners(dialog, {
      removeDialogElementOnClose: true,
      closeModalOnEscape: true,
      closeModalOnOutsideClick: true,
    });
  };

  renderForm();

}
