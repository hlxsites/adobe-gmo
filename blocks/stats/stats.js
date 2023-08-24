import { formatNumber } from '../../scripts/format-utils.js';

// Define algolia search client globals
/* global instantsearch */

export default function decorate(block) {
  const stats = document.createElement('div');
  stats.id = 'stats';
  stats.classList.add('stats');
  block.appendChild(stats);

  window.search.addWidgets([
    instantsearch.widgets.stats(
      {
        container: '#stats',
        templates: {
          text(data, { html }) {
            let count = '';
            if (data.hasManyResults) {
              count += `${data.nbHits} results`;
            } else if (data.hasOneResult) {
              count += '1 result';
            } else {
              count += '0 result';
            }
            return html`<span><strong>${formatNumber(count)}</strong> Assets</span>`;
          },
        },
      },
    ),
  ]);
}
