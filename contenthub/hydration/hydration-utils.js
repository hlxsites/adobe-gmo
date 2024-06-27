export async function getFacetOptions(facetTypes){
  const {results:[{ facets }]} = await window.search.client.search([{
    "indexName": window.search.indexName,
    "params": {
      "facets": facetTypes,
    "hitsPerPage": 0,
    "maxValuesPerFacet": 100, //100 is the maximum
    "page": 0,
    "query": "*"
  }}]);

  let facetOptions = {};
  for(const [facet, counts] of Object.entries(facets)){
    facetOptions[facet] = Object.keys(counts).sort().map((name) => ({id: name, name}));
  }

  return facetOptions;
}

//Working on a solution so the form can tell us if it is finished.
//Until that logic is built, we're making a quick solution to validate this form.
export function formIsComplete(metadataSchema, formValues) {
  //find a basic required field that isn't filled.
  const incomplete = metadataSchema.find((schema) => {
    if(!schema.required) return;
    if(schema.requires) return;
    return !(schema.mapToProperty in formValues) || Array.isArray(formValues[schema.mapToProperty]) ? formValues[schema.mapToProperty].length === 0 : formValues[schema.mapToProperty] === '';
  });
    
  if(incomplete) return false;

  if(formValues['gmo:licensedContent'] !== 'no'){
    if(!formValues['gmo:usageTerms']) return false;
    if(formValues['gmo:licensedContent'] === 'yes-expires' && !formValues['gmo:licenseExpiryDate']) return false;
  }
  return true;
};

export const licenseDateFieldShow  = {
  mapToProperty: 'gmo:licenseExpiryDate',
  label: 'Expiration Date',
  placeholder: 'Select date',
  required: true,
  element: 'datepicker',
  requires: [{ property: 'gmo:licensedContent', expectedValue: 'yes-expires' }],
};

const licenseExpirePerpitytity = new Date();
licenseExpirePerpitytity.setFullYear(licenseExpirePerpitytity.getFullYear() + 200);
licenseExpirePerpitytity.setHours(23,59,59,999);

export const licenseDateFieldHidden = {
  mapToProperty: 'gmo:licenseExpiryDate',
  element: 'hidden',
  value: licenseExpirePerpitytity.toISOString()
};

export function getMetadataSchema(facetOptions){
    return [
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
          element: 'dropdown',
          multipleSelection: true,
          dropdownOptions: [
            { name: 'N/A', id: 'N/A' },            
            { name: 'Acrobat', id: 'Acrobat' },
            { name: 'Acrobat Export PDF', id: 'Acrobat Export PDF' },
            { name: 'Acrobat PDF Pack', id: 'Acrobat PDF Pack' },
            { name: 'Acrobat Pro', id: 'Acrobat Pro' },
            { name: 'Acrobat Reader', id: 'Acrobat Reader' },
            { name: 'Acrobat Sign', id: 'Acrobat Sign' },
            { name: 'Acrobat Sign (Mobile)', id: 'Acrobat Sign (Mobile)' },
            { name: 'Acrobat Standard', id: 'Acrobat Standard' },
            { name: 'Adobe Color', id: 'Adobe Color' },
            { name: 'Adobe Express', id: 'Adobe Express' },
            { name: 'Adobe Fonts', id: 'Adobe Fonts' },
            { name: 'Adobe Fresco', id: 'Adobe Fresco' },
            { name: 'Adobe Scan', id: 'Adobe Scan' },
            { name: 'Adobe Stock', id: 'Adobe Stock' },
            { name: 'Advertising', id: 'Advertising' },
            { name: 'AEC', id: 'AEC' },
            { name: 'AEM Assets', id: 'AEM Assets' },
            { name: 'AEM Forms', id: 'AEM Forms' },
            { name: 'AEM Other (retired)', id: 'AEM Other (retired)' },
            { name: 'AEM Sites', id: 'AEM Sites' },
            { name: 'AEP', id: 'AEP' },
            { name: 'Aero', id: 'Aero' },
            { name: 'After Effects', id: 'After Effects' },
            { name: 'Analytics', id: 'Analytics' },
            { name: 'Animate', id: 'Animate' },
            { name: 'Audience Manager', id: 'Audience Manager' },
            { name: 'Audition', id: 'Audition' },
            { name: 'Behance', id: 'Behance' },
            { name: 'Bizible', id: 'Bizible' },
            { name: 'Bridge', id: 'Bridge' },
            { name: 'Campaign', id: 'Campaign' },
            { name: 'Capture', id: 'Capture' },
            { name: 'Character Animator', id: 'Character Animator' },
            { name: 'Cloud Service', id: 'Cloud Service' },
            { name: 'Commerce', id: 'Commerce' },
            { name: 'Connect', id: 'Connect' },
            { name: 'Content Server', id: 'Content Server' },
            { name: 'Creative', id: 'Creative' },
            { name: 'Creative Cloud All Apps', id: 'Creative Cloud All Apps' },
            { name: 'Digital Editions', id: 'Digital Editions' },
            { name: 'Dreamweaver', id: 'Dreamweaver' },
            { name: 'DX General', id: 'DX General' },
            { name: 'DX Video', id: 'DX Video' },
            { name: 'Fill & Sign', id: 'Fill & Sign' },
            { name: 'Firefly', id: 'Firefly' },
            { name: 'Frame.io', id: 'Frame.io' },
            { name: 'HTTP Dynamic Streaming', id: 'HTTP Dynamic Streaming' },
            { name: 'Illustrator', id: 'Illustrator' },
            { name: 'InCopy', id: 'InCopy' },
            { name: 'InDesign', id: 'InDesign' },
            { name: 'InDesign Server', id: 'InDesign Server' },
            { name: 'Journey Analytics', id: 'Journey Analytics' },
            { name: 'Journey Optimizer', id: 'Journey Optimizer' },
            { name: 'Lightroom', id: 'Lightroom' },
            { name: 'Lightroom Classic', id: 'Lightroom Classic' },
            { name: 'Magento OpenSource', id: 'Magento OpenSource' },
            { name: 'Marketo', id: 'Marketo' },
            { name: 'Media Encoder', id: 'Media Encoder' },
            { name: 'Media Server 5 Extended', id: 'Media Server 5 Extended' },
            { name: 'Media Server 5 on Amazon Web Services', id: 'Media Server 5 on Amazon Web Services' },
            { name: 'Media Server 5 Professional', id: 'Media Server 5 Professional' },
            { name: 'Media Server 5 Standard', id: 'Media Server 5 Standard' },
            { name: 'Mixamo', id: 'Mixamo' },
            { name: 'Multi-product', id: 'Multi-product' },
            { name: 'Photoshop', id: 'Photoshop' },
            { name: 'Photoshop Express', id: 'Photoshop Express' },
            { name: 'Portfolio', id: 'Portfolio' },
            { name: 'PPBU', id: 'PPBU' },
            { name: 'PPBU (Primetime)', id: 'PPBU (Primetime)' },
            { name: 'Premiere Elements', id: 'Premiere Elements' },
            { name: 'Premiere Pro', id: 'Premiere Pro' },
            { name: 'Premier Support', id: 'Premier Support' },
            { name: 'RT CDP', id: 'RT CDP' },
            { name: 'Sensei (retired)', id: 'Sensei (retired)' },
            { name: 'Services - Digital Performance (retired)', id: 'Services - Digital Performance (retired)' },
            { name: 'Services - Other Consulting Services (retired)', id: 'Services - Other Consulting Services (retired)' },
            { name: 'Sign', id: 'Sign' },
            { name: 'Stock', id: 'Stock' },
            { name: 'Substance 3D Designer', id: 'Substance 3D Designer' },
            { name: 'Substance 3D Modeler', id: 'Substance 3D Modeler' },
            { name: 'Substance 3D Painter', id: 'Substance 3D Painter' },
            { name: 'Substance 3D Sampler', id: 'Substance 3D Sampler' },
            { name: 'Substance 3D Stager', id: 'Substance 3D Stager' },
            { name: 'Target', id: 'Target' },
            { name: 'Workfront', id: 'Workfront' },
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
          placeholder: 'Select one',
          element: 'text',
          getSuggestions: async (value) => {
            return facetOptions['gmo-campaignName'].filter(
              (option) => {
                const name = option.name.toLowerCase();
                return value.toLowerCase().split(' ').every((val) => name.includes(val));
              }
            )
          },
        },
        {
          mapToProperty: 'gmo:programName',
          label: 'Program',
          placeholder: 'Select one',
          element: 'text',
          getSuggestions: async (value) => {
            return  facetOptions['gmo-programName'].filter(
              (option) => {
                const name = option.name.toLowerCase();
                return value.toLowerCase().split(' ').every((val) => name.includes(val));
              }
            )
          }
        },
        {
          mapToProperty: 'gmo:deliverableType',
          label: 'Select deliverable type',
          placeholder: 'Select one',
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
              id: 'yes-expires',
              name: 'Yes (Expires)',
            },
            {
              id: 'yes-in-perpetuity',
              name: 'Yes (in Perpetuity)',
            },
          ],
        },
        licenseDateFieldShow,
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
          mapToProperty: 'gmo:owner',
          label:'Campaign/Asset Owner',
          element: 'textarea',
          required: true,
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
          placeholder: 'Select one or more',
          element: 'dropdown',
          multipleSelection: true,
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
          placeholder: 'Select one  or more',
          element: 'dropdown',
          multipleSelection: true,
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
}