import { getSearchFieldConfig } from '../../scripts/site-config.js';
import {
  getSearchClient, getInstantSearchRouting, setCSSVar, waitForDependency,
} from '../../scripts/scripts.js';
import { getSearchIndex } from '../../scripts/polaris.js';

const searchFieldConfig = await getSearchFieldConfig();
const { searchMinChars, enableSearchSuggestions } = searchFieldConfig;
const MAX_ITEMS_IN_AUTOCOMPLETE_MENU = 10;
const INSTANT_SEARCH_INDEX_NAME = getSearchIndex();
const instantSearchRouter = getInstantSearchRouting();

// Build URLs that InstantSearch understands.
function getInstantSearchUrl(indexUiState) {
  return window.search.createURL({ [INSTANT_SEARCH_INDEX_NAME]: indexUiState });
}

// Detect when an event is modified with a special key to let the browser
// trigger its default behavior.
function isModifierEvent(event) {
  const isMiddleClick = event.button === 1;

  return (
    isMiddleClick
    || event.altKey
    || event.ctrlKey
    || event.metaKey
    || event.shiftKey
  );
}

// Set the InstantSearch index UI state from external events.
function setInstantSearchUiState(indexUiState) {
  window.search.setUiState((uiState) => ({
    ...uiState,
    [INSTANT_SEARCH_INDEX_NAME]: {
      ...uiState[INSTANT_SEARCH_INDEX_NAME],
      // We reset the page when the search state changes.
      page: 1,
      ...indexUiState,
    },
  }));
}

function onSelect({
  setIsOpen, setQuery, event, query,
}) {
  // You want to trigger the default browser behavior if the event is modified.
  if (isModifierEvent(event)) {
    return;
  }

  setQuery(query);
  setIsOpen(false);
  debouncedSetInstantSearchUiStateNoDelay({ query });
}

function getItemUrl({ query }) {
  return getInstantSearchUrl({ query });
}

function createItemWrapperTemplate({ children, query, html }) {
  const uiState = { query };

  return html`<a
    class="aa-ItemLink"
    href="${getInstantSearchUrl(uiState)}"
    onClick="${(event) => {
    if (!isModifierEvent(event)) {
      // Bypass the original link behavior if there's no event modifier
      // to set the InstantSearch UI state without reloading the page.
      event.preventDefault();
    }
  }}"
  >
    ${children}
  </a>`;
}

function createSuggestionsPlugin(recentSearchesPlugin) {
  const { createQuerySuggestionsPlugin } = window[
    '@algolia/autocomplete-plugin-query-suggestions'
  ];
  let querySuggestionsPlugin;
  if (enableSearchSuggestions) {
    querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient: getSearchClient(),
      indexName: 'query_suggestions',
      getSearchParams({ state }) {
        // This creates a shared `hitsPerPage` value once the duplicates
        // between recent searches and Query Suggestions are removed.
        return recentSearchesPlugin.data.getAlgoliaSearchParams({
          hitsPerPage: MAX_ITEMS_IN_AUTOCOMPLETE_MENU,
          query: state.query,
        });
      },
      transformSource({ source }) {
        return {
          ...source,
          sourceId: 'querySuggestionsPlugin',
          getItemUrl({ item }) {
            return getItemUrl({
              query: item.query,
            });
          },
          onSelect({
            setIsOpen, setQuery, event, item,
          }) {
            onSelect({
              setQuery,
              setIsOpen,
              event,
              query: item.query,
            });
          },
          getItems(params) {
            // We don't display Query Suggestions when there's no query.
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            item(params) {
              const { children } = source.templates.item(params).props;

              return createItemWrapperTemplate({
                query: params.item.label,
                children,
                html: params.html,
              });
            },
          },
        };
      },
    });
  }
  return querySuggestionsPlugin;
}

function createRecentSearchesPlugin() {
  const { createLocalStorageRecentSearchesPlugin } = window[
    '@algolia/autocomplete-plugin-recent-searches'
  ];
  return createLocalStorageRecentSearchesPlugin({
    key: 'instantsearch',
    limit: 10,
    transformSource({ source }) {
      return {
        ...source,
        getItemUrl({ item }) {
          return getItemUrl({
            query: item.label,
          });
        },
        onRemove({ setIsOpen, setQuery, item }) {
          setQuery(item.label);
          setIsOpen(false);
        },
        onSelect({
          setIsOpen, setQuery, item, event,
        }) {
          onSelect({
            setQuery,
            setIsOpen,
            event,
            query: item.label,
          });
        },
        // Update the default `item` template to wrap it with a link
        // and plug it to the InstantSearch router.
        templates: {
          ...source.templates,
          item(params) {
            const { children } = source.templates.item(params).props;

            return createItemWrapperTemplate({
              query: params.item.label,
              children,
              html: params.html,
            });
          },
        },
      };
    },
  });
}

// Return the InstantSearch index UI state.
function getInstantSearchUiState() {
  const uiState = instantSearchRouter.read();

  return (uiState && uiState[INSTANT_SEARCH_INDEX_NAME]) || {};
}

function debounce(fn) {
  let timerId;

  const debouncedFn = function debouncedFn(time, ...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    if (time === 0 || time === undefined) {
      fn(...args);
    } else {
      timerId = setTimeout(() => fn(...args), time);
    }
  };
  return debouncedFn;
}

const debounceSetInstantSearchUiState = debounce(setInstantSearchUiState);
const debouncedSetInstantSearchUiState = (indexUiState) => debounceSetInstantSearchUiState(500, indexUiState);
const debouncedSetInstantSearchUiStateNoDelay = (indexUiState) => debounceSetInstantSearchUiState(0, indexUiState);

export default async function decorate(block) {
  block.textContent = '';
  const recentSearchesPlugin = createRecentSearchesPlugin();
  const querySuggestionsPlugin = createSuggestionsPlugin(recentSearchesPlugin);
  await waitForDependency('search-autocomplete');
  const { autocomplete } = window['@algolia/autocomplete-js'];
  const isRoot = (!window.location.pathname) || (window.location.pathname === '/');
  if (window.search && autocomplete && isRoot) {
    const searchField = document.createElement('div');
    block.appendChild(searchField);
    const virtualSearchBox = window.instantsearch.connectors.connectSearchBox(() => {});
    window.search.addWidgets([
      virtualSearchBox({ container: searchField }),
    ]);
    block.appendChild(searchField);

    const searchPageState = getInstantSearchUiState();

    let plugins = [recentSearchesPlugin];
    if (enableSearchSuggestions) {
      plugins = [...plugins, querySuggestionsPlugin];
    }

    const autocompleteSearch = autocomplete({
      container: searchField,
      placeholder: 'Search all assets',
      detachedMediaQuery: 'none',
      openOnFocus: true,
      plugins,
      initialState: {
        query: searchPageState.query || '',
      },
      onSubmit({ state }) {
        debouncedSetInstantSearchUiStateNoDelay({ query: state.query });
      },
      onReset() {
        debouncedSetInstantSearchUiStateNoDelay({ query: '' });
      },
      /**
       * This is the main function that keeps the InstantSearch UI state.
       * In this function we update the InstantSearch UI state when there
       * are greater than or equal to searchMinChars characters in the search query.
       */
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          if (state.query.length < searchMinChars
            && state.query.length > 0) {
            return;
          } if (state.query.length === 0) {
            debouncedSetInstantSearchUiStateNoDelay({ query: '' });
          } else {
            // If the query changed then we update the InstantSearch UI state.
            debouncedSetInstantSearchUiState({ query: state.query });
          }
        }

        // When the last recent search is removed and
        // the autocomplete menu is empty, we close it.
        if (state.collections.length === 0 && prevState.collections.length > 0) {
          autocompleteSearch.setIsOpen(false);
          autocompleteSearch.refresh();
        }
      },
    });
    const { setQuery } = autocompleteSearch;
    // This keeps Autocomplete aware of state changes coming from routing
    // and updates its query accordingly
    window.addEventListener('popstate', () => {
      setQuery(window.search.helper?.state.query || '');
    });

    // On blur of the search field update the recent searches plugin
    // with the current query.
    searchField.querySelector('input').addEventListener('blur', (e) => {
      // Only save queries with searchMinChars+ characters.
      if (e.target.value.length >= searchMinChars) {
        recentSearchesPlugin.data.addItem({ id: e.target.value, label: e.target.value });
      }
    });

    /**
     * fixPosition code is a workaround for Algolia Autocomplete fixed positioning issue:
     * https://github.com/algolia/autocomplete/issues/1199
     */
    const fixPosition = () => {
      const rect = document.querySelector('.adp-search-field').getBoundingClientRect();
      // Set css variable
      setCSSVar('--position-autocomplete-panel-top', `${rect.bottom}px`);
    };

    document.querySelector('.aa-Input').addEventListener('focus', fixPosition);
    document.querySelector('.aa-Input').addEventListener('blur', fixPosition);
    window.addEventListener('resize', () => { fixPosition(); });
  }
}
