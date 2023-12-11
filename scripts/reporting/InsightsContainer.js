import { getBearerToken } from '../security.js';
import { getRepositoryIDWithFilter } from '../../contenthub/discovery-service.js';
import { user } from '../../contenthub/unified-shell.js';
import { loadScript } from '../lib-franklin.js';

const ASSETS_REPORTING_ID = 'assets-reporting';

export default class InsightsContainer {
  #block;

  constructor(block) {
    this.#block = block;
  }

  /**
   * Retrieves the insight's containing element.
   * @returns {HTMLElement} The insights page.
   */
  #getInsights() {
    return document.getElementById(ASSETS_REPORTING_ID);
  }

  /**
   * Renders Insights UI
   */
  async #renderInsights() {
    const bearerToken = await getBearerToken();
    // const imsConfig = await user.get('imsOrg');
    const imsOrg = await user.get('imsOrg');
    // const imsEnv = imsConfig?.imsEnvironment;
    const imsEnv = 'prod';
    const repoID = await getRepositoryIDWithFilter({ env: imsEnv, 'aem-tier': 'author' });
    const insightsProps = {
      imsOrg,
      repoID,
      apiKey: 'assets-distribution-portal',
      apiToken: bearerToken.split(' ')[1],
      reportDescriptors: [
        {
          reportType: 'download',
          graphType: ['line'],
        },
        {
          reportType: 'upload',
          graphType: ['line'],
        },
        {
          reportType: 'assetCountInsightsBySize',
          graphType: ['donut'],
        },
        {
          reportType: 'assetCountInsightsByFormat',
          graphType: ['donut'],
        },
        { reportType: 'searchTerms' },
        { reportType: 'storageUsage', graphType: ['bar'] },
        { reportType: 'deliveryCount' },
      ],
      env: imsEnv.toUpperCase(),
    };

    // eslint-disable-next-line no-undef
    ReportingJSBundle.renderInsights(this.#getInsights(), insightsProps);
  }

  async render() {
    const insightsContainer = document.createElement('div');
    insightsContainer.id = 'assets-reporting';
    this.#block.appendChild(insightsContainer);
    // eslint-disable-next-line max-len
    loadScript('https://experience-stage.adobe.com/solutions/cq-assets-reporting/static-assets/resources/assets-reporting.js')
      .then(async () => await this.#renderInsights());
  }
}
