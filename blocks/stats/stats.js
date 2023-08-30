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
              count += `${data.nbHits}`;
            } else if (data.hasOneResult) {
              count += '1';
            } else {
              count += '0';
            }
            let statsWord = 'Assets';
            if (!document.querySelector('.current-refinements .ais-CurrentRefinements--noRefinement')) {
              statsWord = 'Results';
            }
            return html`
              <span class="stats-count-label">${count}</span>
              <span class="stats-text-label"> ${statsWord}</span>
            `;
          },
        },
      },
    ),
  ]);
}
