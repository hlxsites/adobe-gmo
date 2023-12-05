import InsightsContainer from '../../scripts/reporting/InsightsContainer.js';

export default async function decorate(block) {
  const insightsContainer = new InsightsContainer(block);
  insightsContainer.render();
}
