import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlStatusList, graphqlProductList } from '../../scripts/graphql.js';


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
                    <div class="dropdown-label">All Business Line</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownBusinessOptions">
                    <a href="#" id="option1" data-value="digital-media-dme" data-type="category" class="dropoption">Digital Media (DMe)</a>
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
                    <a href="#" id="option1" data-value="option1" data-type="status" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="status" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="status" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="status" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="status" class="dropoption">Option 5</a>
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
                    <a href="#" id="option1" data-value="option1" data-type="product" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="product" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="product" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="product" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="product" class="dropoption">Option 5</a>
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


    // Get the input element by its ID
    var searchInput = document.getElementById('campaign-search');

    // autocomplete feature
    const autocompleteList = document.getElementById('autocomplete-list');

    // Sample data - replace with actual data fetching logic
    const searchItems = ["Marketing Plan 2021", "Sales Report Q1", "Email Campaigns", "Social Media Outreach"];

    searchInput.addEventListener('input', function() {
        const value = this.value;
        autocomplete(value, searchItems);
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

    // autocomplete feature end


    // Add an event listener for 'input' event

    /* Previous without autocomplete
    searchInput.addEventListener('input', function() {
        // Check if the input length is 3 or more characters
        if (searchInput.value.length >= 3) {
            //Trigger the gmo-campaign-list block from the gmo-campaign-header
            sendGmoCampaignListBlockEvent();
        }
    });
    */

    //Status List
    const statusResponse = await graphqlStatusList();
    const statuses = statusResponse.data.campaignList.items;

    // Extract unique statuses
    const uniqueStatuses = Array.from(new Set(statuses.map(item => item.status)));
    let dropdownContent = document.getElementById('dropdownStatusOptions');
    // Clear existing options
    dropdownContent.innerHTML = '';
    // Append new options
    uniqueStatuses.forEach((status, index) => {
        // Create a new anchor element for each status
        var anchor = document.createElement('a');
        anchor.href = "#";
        anchor.id = "option" + (index + 1); // increment index for 1-based id
        //anchor.dataset.value = "option" + (index + 1);
        anchor.dataset.value = status;
        anchor.dataset.type = "status";
        anchor.className = "dropoption";
        anchor.textContent = status; // using the status as the text
        // Append to the dropdown
        dropdownContent.appendChild(anchor);
    });

    //Product List
    const productResponse = await graphqlProductList();
    const products = productResponse.data.campaignList.items;

    // Extract unique statuses
    const uniqueProducts = Array.from(new Set(products.map(item => item.productOffering)));
    let dropdownProductContent = document.getElementById('dropdownProductOptions');
    // Clear existing options
    dropdownProductContent.innerHTML = '';
    // Append new options
    uniqueProducts.forEach((product, index) => {
        // Create a new anchor element for each status
        var anchor = document.createElement('a');
        anchor.href = "#";
        anchor.id = "option" + (index + 1); // increment index for 1-based id
        //anchor.dataset.value = "option" + (index + 1);
        anchor.dataset.value = product;
        anchor.dataset.type = "product";
        anchor.className = "dropoption";
        anchor.textContent = product; // using the status as the text
        // Append to the dropdown
        dropdownProductContent.appendChild(anchor);
    });

    //End product dropdown


    document.querySelectorAll('.dropdown-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            toggleDropdown(event.target);
        });
    });
    document.querySelectorAll('.dropoption').forEach((button) => {
        button.addEventListener('click', (event) => {
        toggleOption(event.target.dataset.value, event.target.dataset.type);
        });
    });
    document.querySelector('.reset-filters').addEventListener('click', () => {
        resetAllFilters();
    })
    decorateIcons(block);
}

function toggleDropdown(element) {
    const dropdown = element.closest('.filter-dropdown');
    const icons = dropdown.querySelectorAll('.icon');
    icons.forEach((icon) => {
        icon.classList.toggle('inactive');
    })
    dropdown.classList.toggle('active');
}

function toggleOption(optionValue, optionType) {
    const dropdownOption = document.querySelector(`[data-value='${optionValue}'][data-type='${optionType}']`);
    dropdownOption.classList.toggle("selected");
    handleSelectedFilter(dropdownOption)
    checkResetBtn();
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
    const selectedFilters = document.querySelectorAll('.dropoption.selected');
    selectedFilters.forEach((element) => {
        element.classList.toggle('selected');
    })
    const filterTagRoot = document.querySelector('.selected-filters-list');
    filterTagRoot.replaceChildren();
    checkResetBtn();
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

function sendGmoCampaignListBlockEvent() {
    const blockEvent = new CustomEvent('gmoCampaignListBlock');
    document.dispatchEvent(blockEvent);
}
