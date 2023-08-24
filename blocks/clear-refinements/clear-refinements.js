// Define algolia search client globals
/* global instantsearch */

export default function decorate(block) {
  const clearRefinements = document.createElement('div');
  clearRefinements.id = 'clear-refinements';
  clearRefinements.classList.add('stats');
  block.appendChild(clearRefinements);

  window.search.addWidgets([
    instantsearch.widgets.clearRefinements(
      {
        container: '#clear-refinements',
      },
    ),
  ]);
}
