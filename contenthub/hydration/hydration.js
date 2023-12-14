import { createDialogHtml, addDialogEventListeners } from '../../scripts/dialog-html-builder.js';
import { loadCSS, loadScript } from '../../scripts/lib-franklin.js';
import { getImsToken } from '../../scripts/security.js';
import { getFederatedDiscoveryLinks } from '../discovery-service.js';
import { getAdminConfig } from '../../scripts/site-config.js';

export async function openUploadDialog() {
  await loadScript(
    'https://experience-qa.adobe.com/solutions/CQ-assets-upload/static-assets/resources/assets-upload.js'
  );
  // API: https://git.corp.adobe.com/CQ/assets-upload/blob/main/packages/%40assets/upload/src/components/AllInOneUpload.tsx#L22-L30
  loadCSS('/contenthub/hydration/hydration.css');

  const { dialog, dialogBody } = createDialogHtml('hydration-upload-dialog', {
    dialogHeaderLeftContent: 'Upload',
  });
  document.body.append(dialog);
  dialog.showModal();

  const container = dialogBody;

  const adminConfig = await getAdminConfig();
  const repositoryId = adminConfig.aemDeliveryEndpoint.replace('https://delivery', 'author');
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

      metadataSchema: [
        {
          name: 'gmo:lineofBusiness',
          label: 'Line of Business',
          placeholder: 'Select one',
          required: true,
          element: 'dropdown',
          dropdownItems: [
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
        {
          name: 'gmo:productFamily',
          label: 'Product Family',
          placeholder: 'Select one',
          required: true,
          element: 'dropdown',
          dropdownItems: [
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
        },
        {
          name: 'gmo:productOffering',
          label: 'Product',
          placeholder: 'Select one or more',
          required: true,
          element: 'multiselect_dropdown',
          dropdownItems: [
            { name: 'N/A', id: 'na' },
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
            { name: 'Creative Cloud All Apps', id: 'creative-cloud-all-apps' },
            { name: 'Digital Editions', id: 'digital-editions' },
            { name: 'Dreamweaver', id: 'dreamweaver' },
            { name: 'Frame.io', id: 'frame-io' },
            { name: 'Fresco', id: 'fresco' },
            { name: 'Illustrator', id: 'illustrator' },
            { name: 'InCopy', id: 'incopy' },
            { name: 'InDesign', id: 'indesign' },
            { name: 'InDesign Server', id: 'indesign-server' },
            { name: 'Lightroom', id: 'lightroom' },
            { name: 'Lightroom Classic', id: 'lightroom-classic' },
            { name: 'Media Encoder', id: 'media-encoder' },
            { name: 'Media Server 5 Extended', id: 'media-server-5-extended' },
            { name: 'Media Server 5 on Amazon Web Services', id: 'media-server-5-on-amazon-web-services' },
            { name: 'Media Server 5 Professional', id: 'media-server-5-professional' },
            { name: 'Media Server 5 Standard', id: 'media-server-5-standard' },
            { name: 'Mixamo', id: 'mixamo' },
            { name: 'Photoshop', id: 'photoshop' },
            { name: 'Photoshop Express', id: 'photoshop-express' },
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
            { name: 'Cloud Service', id: 'cloud-service' },
            { name: 'Content Server', id: 'content-server' },
            { name: 'Http Dynamic Streaming', id: 'http-dynamic-streaming' },
            { name: 'Fill Sign', id: 'fill-sign' },
            { name: 'Acrobat Export PDF', id: 'acrobat-export-pdf' },
            { name: 'Acrobat PDF Pack', id: 'acrobat-pdf-pack' },
            { name: 'Acrobat Pro', id: 'acrobat-pro' },
            { name: 'Acrobat Reader', id: 'acrobat-reader' },
            { name: 'Acrobat Sign', id: 'acrobat-sign' },
            { name: 'Acrobat Sign Mobile', id: 'acrobat-sign-mobile' },
            { name: 'Acrobat standard', id: 'acrobat-standard' },
          ],
        },
        {
          name: 'gmo:fiscalYear',
          label: 'Year',
          placeholder: 'Select one',
          required: true,
          element: 'dropdown',
          dropdownItems: [
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
          name: 'gmo:campaignName',
          label: 'Campaign',
          placeholder: 'Enter campaign name',
          element: 'text',
        },
        {
          name: 'gmo:programName',
          label: 'Program',
          placeholder: 'Enter program name',
          element: 'text',
        },
        {
          name: 'gmo:licensedContent',
          label: 'Licensed?',
          placeholder: 'Select one',
          required: true,
          element: 'dropdown',
          dropdownItems: [
            {
              id: 'yes',
              name: 'Yes',
            },
            {
              id: 'no',
              name: 'No',
            },
          ],
        },
        {
          name: 'gmo:licenseDateXXX',
          label: 'Expiration Date',
          placeholder: 'Select date',
          element: 'date',
        },
        {
          name: 'gmo:usageTerms',
          label: 'Licensed usage terms',
          placeholder: 'Enter terms of usage',
          element: 'textarea',
        },
        {
          name: 'gmo:keywords',
          label: 'Keywords',
          placeholder: 'Enter comma-separated list',
          element: 'text',
        },
        {
          name: 'gmo:contentType',
          label: 'Content Type',
          placeholder: 'Select one',
          element: 'dropdown',
          dropdownItems: [
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
          name: 'gmo:ddomStage',
          label: 'DDOM Stage',
          placeholder: 'Select multiple',
          element: 'multiselect_dropdown',
          dropdownItems: [
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
          name: 'gmo:p0TargetMarketGeo',
          label: 'Target Market',
          placeholder: 'Select One',
          element: 'dropdown',
          dropdownItems: [
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
          name: 'dam:roles',
          value: 'asset-distribution-portal-b71f9f7b599c3c58a69fa396f8a0030c',
          element: 'hidden',
        },
        {
          name: 'dam:assetStatus',
          value: 'approved',
          element: 'hidden',
        },
      ],
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
}
