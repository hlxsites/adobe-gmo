import {IMS_CONFIG, getBearerToken} from '../security.js';

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
    const token = bearerToken.split(' ')[1];
    const insightsProps = {
      imsOrg: '11A63DB860D35B1D0A49411A@AdobeOrg',
      apiKey: IMS_CONFIG.xApiKey,
      apiToken: token,
      reportDescriptors: [
        {
          reportType: 'download',
          graphType: ['line', 'bar'],
        },
        {
          reportType: 'upload',
          graphType: ['line', 'bar'],
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
      ],
      repoID: 'author-p42602-e144932-cmstg.adobeaemcloud.com',
      env: 'STAGE',
    };

    // eslint-disable-next-line no-undef
    ReportingJSBundle.renderInsights(this.#getInsights(), insightsProps);
  }

  #loadInsightsScript(url, cb, type) {
    const $head = document.querySelector('head');
    const $script = document.createElement('script');
    $script.src = url;
    if (type) {
      $script.setAttribute('type', type);
    }
    $head.append($script);
    $script.onload = cb;
    return $script;
  }

  async render() {
    const insightsContainer = document.createElement('div');
    insightsContainer.id = 'assets-reporting';
    this.#block.appendChild(insightsContainer);
    // eslint-disable-next-line max-len
    this.#loadInsightsScript('https://experience-stage.adobe.com/solutions/cq-assets-reporting/static-assets/resources/assets-reporting.js', async () => {
      await this.#renderInsights();
    });
  }
}
