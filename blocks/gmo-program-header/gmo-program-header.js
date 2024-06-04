import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlQueryNameList, graphqlCampaignByName } from '../../scripts/graphql.js';
import { statusMapping, productList } from '../../scripts/shared-program.js';

// Declared at the top of the file, making it accessible to all functions within this file.
let allProducts = [];

export default async function decorate(block) {
    block.innerHTML = `
    <div class="inputs-wrapper">
        <div class="search-wrapper">
            <span class="icon icon-search"></span>
            <input id="campaign-search" maxlength="512" type="search" class="campaign-search" placeholder="Search Marketing Moments...">
            <!-- autocomplete feature-->
            <div id="autocomplete-list" class="autocomplete-items"></div>
        </div>
        <div class="filter-wrapper">
            <div class="label">Business Line</div>
            <div class="filter-dropdown" id="campaign-business-line">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Business Lines</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownBusinessOptions">
                </div>
            </div>
        </div>
        <div class="filter-wrapper">
            <div class="label">Status</div>
            <div class="filter-dropdown" id="campaign-status">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Statuses</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownStatusOptions">
                </div>
            </div>
        </div>

        <div class="filter-wrapper">
            <div class="label">Products</div>
            <div class="filter-dropdown" id="campaign-products">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Products</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownProductOptions">
                </div>
            </div>
        </div>

        <div class="filter-wrapper">
            <div class="label">Geo</div>
            <div class="filter-dropdown" id="campaign-products">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Geo</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownGeoOptions">
                </div>
            </div>
        </div>

    </div>

    <div class="selections-wrapper">
        <div class="selected-filters-list">
        </div>
        <div class="reset-filters inactive">Reset filters</div>
    </div>
    <span class="icon icon-close inactive"></span>
    `;

    // autocomplete feature
    const autocompleteList = document.getElementById('autocomplete-list');
    // Get the input element by its ID
    const searchInput = document.getElementById('campaign-search');
    searchInput.addEventListener('input', async function() {
        const value = this.value;
        if (value)
        {
          const graphqlData = await graphqlCampaignByName(value);
          //Get unique values
          const searchItems = Array.from(new Set(graphqlData.data.programList.items.map(item => item.campaignName)));
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
    //attachEventListeners();
    decorateIcons(block);
}

async function initializeDropdowns() {
    // Business Line List
    graphqlQueryNameList('getBusinessLine').then((response) => {
        populateDropdown(response, 'dropdownBusinessOptions', 'businessLine');
    });

    // Geo List
    graphqlQueryNameList('getGeoList').then((response) => {
        populateDropdown(response, 'dropdownGeoOptions', 'p0TargetGeo');
    })

    // Status List
    const statusResponse = await statusMapping;
    populateDropdown(statusResponse, 'dropdownStatusOptions', 'status');

    // Product List
    const productResponse = await productList;
    populateDropdown(productResponse, 'dropdownProductOptions', 'productOffering');

    attachEventListeners();
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

    // Add event listener for clicks outside of dropdowns
    document.addEventListener('click', handleClickOutside);
}

function populateDropdown(response, dropdownId, type) {
    const options = response.data?.jsonByPath ? response.data.jsonByPath.item.json.options : response;
    let dropdownContent = document.getElementById(dropdownId);
    dropdownContent.innerHTML = '';
    options.forEach((option, index) => {
        let anchor = document.createElement('a');
        anchor.href = "#";
        anchor.id = `option${index + 1}`;
        anchor.dataset.value = option.value;
        anchor.dataset.type = type;
        anchor.className = "dropoption";
        anchor.textContent = option.text;
        dropdownContent.appendChild(anchor);
    });
}

// Function to filter products based on selected business line
function filterProductsByBusinessLine(businessLine) {
    const filteredProducts = allProducts.filter(product =>
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

function toggleOption(optionValue, optionType) {
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
        const filterName = option.textContent;
        const filterTag = document.createElement('div');
        filterTag.classList.add('selected-filter');
        const filterLabel = document.createElement('span');
        filterLabel.textContent = filterName;
        filterLabel.classList.add('label');
        const closeOrig = document.querySelector('.icon.icon-close.inactive');
        const closeIcon = closeOrig.cloneNode(true);
        closeIcon.classList.toggle('inactive');
        closeIcon.addEventListener('click', (event) => {
            const filterTag = event.target.closest('.selected-filter');
            const optionValue = filterTag.dataset.value;
            const optionType = filterTag.dataset.type;
            toggleOption(optionValue, optionType);
        })
        filterTag.appendChild(filterLabel);
        filterTag.appendChild(closeIcon);
        filterTag.dataset.type = filterType;
        filterTag.dataset.value = filterValue;
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
    populateDropdown(allProducts, 'dropdownProductOptions', 'productOffering');
    // Reset product offering filters
    removeSelectedProductOfferingFilters();
    attachEventListeners();
}

function checkResetBtn() {
    const selectedOptions = document.querySelectorAll('.dropoption.selected');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    if (selectedOptions.length > 0) {
        if (resetFiltersBtn.classList.contains('inactive')) resetFiltersBtn.classList.remove('inactive');
    } else {
        resetFiltersBtn.classList.add('inactive');
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

function sendGmoCampaignListBlockEvent() {
    const blockEvent = new CustomEvent('gmoCampaignListBlock');
    document.dispatchEvent(blockEvent);
}
