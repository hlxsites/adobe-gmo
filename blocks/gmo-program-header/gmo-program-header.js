import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlProgramByName } from '../../scripts/graphql.js';
import { 
    statusMapping, productList, getMappingArray, 
    retrieveSearchFilters, div, img, span, input,
    a
} from '../../scripts/shared-program.js';

export default async function decorate(block) {
    const replaceBlock = div(
        div(
            { class: 'inputs-wrapper'},
            div(
                { class: 'search-wrapper '},
                span({ class: 'icon icon-search' }),
                input(
                    { id: 'campaign-search', maxlength: 512, type: 'search', 
                      class: 'campaign-search', placeholder: 'Search by Program Name...' 
                    }),
                div({ id: 'autocomplete-list', class: 'autocomplete-items' }),
            ),
            div(
                { class: 'filter-wrapper' },
                div({ class: 'label'}, 'Business Line'),
                div(
                    { class: 'filter-dropdown', id: 'campaign-business-line'},
                    div(
                        { class: 'dropdown-button' },
                        div({ class: 'dropdown-label' }, 'All Business Lines'),
                        span({ class: 'icon icon-chevronDown' }),
                        span({ class: 'icon icon-chevronUp inactive' })
                    ),
                    div({ class: 'dropdown-content', id: 'dropdownBusinessOptions' }),
                ),
            ),
            div(
                { class: 'filter-wrapper' },
                div({ class: 'label' }, 'Status'),
                div({ class: 'filter-dropdown', id: 'campaign-status' },
                    div(
                        { class: 'dropdown-button' },
                        div({ class: 'dropdown-label' }, 'All Statuses'),
                        span({ class: 'icon icon-chevronDown' }),
                        span({ class: 'icon icon-chevronUp inactive' }),
                    ),
                    div({ class: 'dropdown-content', id: 'dropdownStatusOptions' }),
                ),
            ),
            div(
                { class: 'filter-wrapper' },
                div({ class: 'label' }, 'Products'),
                div({ class: 'filter-dropdown', id: 'campaign-products' },
                    div(
                        { class: 'dropdown-button' },
                        div({ class: 'dropdown-label' }, 'All Products'),
                        span({ class: 'icon icon-chevronDown' }),
                        span({ class: 'icon icon-chevronUp inactive' }),
                    ),
                    div({ class: 'dropdown-content', id: 'dropdownProductOptions' }),
                ),
            ),
            div(
                { class: 'filter-wrapper' },
                div({ class: 'label' }, 'Geo'),
                div({ class: 'filter-dropdown', id: 'campaign-geo' },
                    div(
                        { class: 'dropdown-button' },
                        div({ class: 'dropdown-label' }, 'All Geo'),
                        span({ class: 'icon icon-chevronDown' }),
                        span({ class: 'icon icon-chevronUp inactive' }),
                    ),
                    div({ class: 'dropdown-content', id: 'dropdownGeoOptions' }),
                ),
            ),
        ),
        div(
            { class: 'selections-wrapper' },
            div({ class: 'selected-filters-list' }),
            div(
                { class: 'right-controls-wrapper' },
                div({ class: 'share-search inactive' }, 'Share search'),
                div({ class: 'reset-filters inactive' }, 'Reset filters'),
            )
        ),
        span({ class: 'icon icon-close inactive'}),
    );
    block.innerHTML = replaceBlock.innerHTML;

    // autocomplete feature
    const autocompleteList = document.getElementById('autocomplete-list');
    // Get the input element by its ID
    const searchInput = document.getElementById('campaign-search');
    searchInput.addEventListener('input', async function() {
        const value = this.value;
        if (value)
        {
          const graphqlData = await graphqlProgramByName(value);
          //Get unique values
          const searchItems = Array.from(new Set(graphqlData.data.programList.items.map(item => item.programName)));
          autocomplete(value, searchItems);
        }
        else
        {
          //The value has been cleard so trigger the gmo-campaign-list block from the gmo-campaign-header
          sendGmoCampaignListBlockEvent();
        }
    });

    function autocomplete(value, items) {
        clearAutocomplete();
        if (!value) return;
        const filteredItems = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
        filteredItems.forEach(item => {
            const entry = document.createElement('div');
            entry.innerHTML = item;
            entry.addEventListener('click', function() {
                searchInput.value = this.innerText;
                clearAutocomplete();
            });
            autocompleteList.appendChild(entry);
        });
    }

    function clearAutocomplete() {
        while (autocompleteList.firstChild) {
            autocompleteList.removeChild(autocompleteList.firstChild);
        }
    }

    // Listen for click events on the autocomplete list
    autocompleteList.addEventListener('click', function(event) {
        //Trigger the gmo-campaign-list block from the gmo-campaign-header
        sendGmoCampaignListBlockEvent();
    });

    // Listen for change events on the autocomplete list
    autocompleteList.addEventListener('change', function(event) {
        //Trigger the gmo-campaign-list block from the gmo-campaign-header
        sendGmoCampaignListBlockEvent();
    });

    initializeDropdowns();
    // Attach event listeners for the dropdowns and reset filters
    attachEventListeners();
    decorateIcons(block);
    document.addEventListener('click', handleClickOutside);
}

async function initializeDropdowns() {
    // Business Line List
    getMappingArray('businessLine').then((response) => {
        populateDropdown(response, 'dropdownBusinessOptions', 'businessLine');
    });

    // Geo List
    getMappingArray('geoList').then((response) => {
        populateDropdown(response, 'dropdownGeoOptions', 'p0TargetGeo');
    });

    // Status List
    const statusResponse = await statusMapping;
    populateDropdown(statusResponse, 'dropdownStatusOptions', 'status');

    // Product List
    const productResponse = await productList;
    populateDropdown(productResponse, 'dropdownProductOptions', 'productOffering');
}

// Function to attach event listeners
function attachEventListeners() {
    // First remove existing listeners to prevent duplicates
    removeEventListeners();

    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', dropdownButtonClickHandler);
    });

    document.querySelectorAll('.dropoption').forEach(option => {
        option.addEventListener('click', dropOptionClickHandler);
    });

    const resetFiltersBtn = document.querySelector('.reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFiltersClickHandler);
    }
    const shareSearchBtn = document.querySelector('.share-search');
    if (shareSearchBtn) {
        shareSearchBtn.addEventListener('click', shareSearchClickHandler);
    }
}

function populateDropdown(response, dropdownId, type) {
    const options = response.data?.jsonByPath ? response.data.jsonByPath.item.json.options : response;
    //Sort the options alphabetically
    options.sort((a, b) => {
        if (a.text < b.text) {
            return -1;
        }
        if (a.text > b.text) {
            return 1;
        }
        return 0;
    });

    let dropdownContent = document.getElementById(dropdownId);
    dropdownContent.innerHTML = '';
    options.forEach((option, index) => {
        let anchor = a(
            { class: 'dropoption', 'data-type': type, 'data-value': option.value,
              id: `option${index + 1}`, href: '#', onclick: dropOptionClickHandler },
              option.text
        );
        dropdownContent.appendChild(anchor);
    });
    // add event listener to button
    const button = dropdownContent.parentElement.querySelector(".dropdown-button");
    button.addEventListener('click', dropdownButtonClickHandler);
}

// Function to filter products based on selected business line
function filterProductsByBusinessLine(businessLine) {
    const filteredProducts = productList.filter(product =>
        product['business-line'].includes(businessLine)
    );
    populateDropdown(filteredProducts, 'dropdownProductOptions', 'productOffering');
}

// Function to remove productOffering filters
function removeSelectedProductOfferingFilters() {
    // Select all div elements with class 'selected-filter' and data-type 'productOffering'
    const filters = document.querySelectorAll('.selected-filter[data-type="productOffering"]');
    // Loop through the NodeList and remove each element
    filters.forEach(filter => {
        filter.parentNode.removeChild(filter);
    });
}


// Function to close all dropdowns
function closeAllDropdowns() {
    document.querySelectorAll('.filter-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.querySelector('.icon-chevronDown').classList.remove('inactive');
        dropdown.querySelector('.icon-chevronUp').classList.add('inactive');
    });
}

// Function to handle clicks outside of dropdowns
function handleClickOutside(event) {
    const isClickInsideDropdown = event.target.closest('.filter-dropdown');
    if (!isClickInsideDropdown) {
        closeAllDropdowns();
    }
}

function toggleDropdown(element) {
    const dropdown = element.closest('.filter-dropdown');
    const iconChevronDown = dropdown.querySelector('.icon-chevronDown');
    const iconChevronUp = dropdown.querySelector('.icon-chevronUp');

    iconChevronDown.classList.toggle('inactive');
    iconChevronUp.classList.toggle('inactive');
    dropdown.classList.toggle('active');
}

export function toggleOption(optionValue, optionType) {
    const currentlySelected = document.querySelector(`.dropoption.selected[data-type='${optionType}']`);
    if (currentlySelected && currentlySelected.dataset.value !== optionValue) {
        currentlySelected.classList.remove('selected'); // Remove the 'selected' class from the previously selected option
        handleSelectedFilter(currentlySelected); // Update the UI to reflect this change
    }

    const dropdownOption = document.querySelector(`[data-value='${optionValue}'][data-type='${optionType}']`);
    const isSelected = dropdownOption.classList.contains('selected');
    if (!isSelected) {
        dropdownOption.classList.add('selected');
        if (optionType === 'businessLine') {
            // Filter products based on the selected business line
            filterProductsByBusinessLine(optionValue);
            // Reset product offering filters
            removeSelectedProductOfferingFilters();
            attachEventListeners();
        }
    } else {
        dropdownOption.classList.remove('selected');
        if (optionType === 'businessLine') {
          //Reset Products Dropdown
          resetProductsDropDown();
        }
    }

    handleSelectedFilter(dropdownOption); // Update the UI for the new selection
    checkResetBtn(); // Check if the reset button should be active
}

function handleSelectedFilter(option) {
    const filterTagRoot = document.querySelector('.selected-filters-list');
    const filterValue = option.dataset.value;
    const filterType = option.dataset.type;
    if (option.classList.contains('selected')) {
        const closeOrig = document.querySelector('.icon.icon-close.inactive');
        const filterTag = div(
            { class: 'selected-filter', 'data-type': filterType, 'data-value': filterValue },
            span({ class: 'label' }, option.textContent),
            closeOrig.cloneNode(true),
        )
        const closeIcon = filterTag.querySelector('.icon.icon-close.inactive');
        closeIcon.classList.toggle('inactive');
        closeIcon.addEventListener('click', (event) => {
            const filterTag = event.target.closest('.selected-filter');
            const optionValue = filterTag.dataset.value;
            const optionType = filterTag.dataset.type;
            toggleOption(optionValue, optionType);
        })
        filterTagRoot.appendChild(filterTag);
    } else {
        filterTagRoot.removeChild(document.querySelector(`.selected-filter[data-value='${filterValue}'][data-type='${filterType}']`));
    }

    //Trigger the gmo-campaign-list block from the gmo-campaign-header
    sendGmoCampaignListBlockEvent();
}

function resetAllFilters() {
    //Clear the campaignName search field
    const searchInput = document.getElementById('campaign-search');
    searchInput.value = '';

    const selectedFilters = document.querySelectorAll('.dropoption.selected');
    selectedFilters.forEach((element) => {
        element.classList.toggle('selected');
    })
    const filterTagRoot = document.querySelector('.selected-filters-list');
    filterTagRoot.replaceChildren();
    checkResetBtn();

    //Reset Products Dropdown
    resetProductsDropDown();

    //Trigger the gmo-campaign-list block from the gmo-campaign-header
    sendGmoCampaignListBlockEvent();
}

function resetProductsDropDown(){
    // Populate all products into Products dropdown
    populateDropdown(productList, 'dropdownProductOptions', 'productOffering');
    // Reset product offering filters
    removeSelectedProductOfferingFilters();
    attachEventListeners();
}

function checkResetBtn() {
    const selectedOptions = document.querySelectorAll('.dropoption.selected');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const shareSearchBtn = document.querySelector('.share-search');
    if (selectedOptions.length > 0) {
        if (resetFiltersBtn.classList.contains('inactive')) resetFiltersBtn.classList.remove('inactive');
        if (shareSearchBtn.classList.contains('inactive')) shareSearchBtn.classList.remove('inactive');
    } else {
        resetFiltersBtn.classList.add('inactive');
        shareSearchBtn.classList.add('inactive');
    }
}

// Define handlers as named functions to easily add and remove them
function dropdownButtonClickHandler(event) {
    toggleDropdown(event.target);
}

function dropOptionClickHandler(event) {
    toggleOption(event.target.dataset.value, event.target.dataset.type);
    toggleDropdown(event.target); // Closes the dropdown list
}

// Function to remove event listeners
function removeEventListeners() {
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.removeEventListener('click', dropdownButtonClickHandler);
    });

    document.querySelectorAll('.dropoption').forEach(option => {
        option.removeEventListener('click', dropOptionClickHandler);
    });

    const resetFiltersBtn = document.querySelector('.reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.removeEventListener('click', resetFiltersClickHandler);
    }
}

function resetFiltersClickHandler() {
    resetAllFilters();
}

function shareSearchClickHandler() {
    shareSearch();
}

function closeShareSearchClickHandler(event) {
    closeShareSearch();
}

function shareSearch() {
    const filterValue = encodeURIComponent(retrieveSearchFilters());
    const url = window.location.href.replace(/#$/, '');
    const shareUrl = url + '?isShare=true&searchFilter=' + filterValue;
    const shareMessage = `Your share URL is:`;

    const modalElements = div(
        { class: 'share-modal-overlay' },
        div({ class: 'share-modal' },
            div(
                { class: 'share-modal-close' },
                img({ src: '../icons/close.svg'})
            ),
            div({ class: 'share-modal-message' }, shareMessage),
            div({ class: 'share-modal-url' }, shareUrl),
            div({ class: 'share-modal-copy', 'data-share': shareUrl}, 'Copy to Clipboard'),
        ),
    );
    modalElements.querySelector('.share-modal-close').addEventListener('click', function(event) { closeShareSearchClickHandler(event) });
    modalElements.querySelector('.share-modal-copy').addEventListener('click', function(event) { copyToClipboard(event) });
    document.body.appendChild(modalElements);
}

function closeShareSearch() {
    document.querySelector('.share-modal-overlay').remove();
}

function copyToClipboard(event) {
    if (event.target.classList.contains('share-modal-copy')) {
        const shareUrl = event.target.dataset.share;
        navigator.clipboard.writeText(shareUrl).then(() => {
            console.debug('Copied to clipboard:', shareUrl);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

}

function sendGmoCampaignListBlockEvent() {
    const blockEvent = new CustomEvent('gmoCampaignListBlock');
    document.dispatchEvent(blockEvent);
}