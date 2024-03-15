import { getBearerToken, getIMSConfig } from '../security.js';
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
    const imsConfig = await getIMSConfig();
    const imsEnv = imsConfig?.imsEnvironment;
    const bearerToken = await getBearerToken();
    const imsOrg = await user.get('imsOrg');
    const repoID = await getRepositoryIDWithFilter({ env: imsEnv, 'aem-tier': 'author' });
    const apiKey = 'content-at-adobe';
    const insightsProps = {
      imsOrg,
      repoID,
      apiKey,
      apiToken: bearerToken.split(' ')[1],
      reportDescriptors: [
        {
          reportType: 'upload',
          graphType: ['line'],
        },
        {
          reportType: 'assetCountInsightsByFormat',
          graphType: ['donut'],
        },
        // {Total Count of assets}
        // {Total Count of assets uploaded daily/monthly/yearly}
        // {Total Count of assets by mimeType}
      ],
      env: imsEnv.toUpperCase(),
      layout: { style: 'singleColumn' },
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
