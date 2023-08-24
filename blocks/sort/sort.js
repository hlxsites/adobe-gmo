export default function decorate(block) {
  const sortby = document.createElement('div');
  sortby.id = 'sortby';
  block.appendChild(sortby);
  window.search.addWidgets([
    instantsearch.widgets.sortBy({
      container: '#sortby',
      items: [
        { label: 'Size', value: 'test_Polaris-size-desc' },
      ],
    }),
  ]);
}
