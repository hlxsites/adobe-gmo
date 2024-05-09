import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlQueryNameList, graphqlCampaignByName } from '../../scripts/graphql.js';

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
                    <a href="#" id="option1" data-value="digital-media-dme" data-type="businessLine" class="dropoption">Digital Media (DMe)</a>
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
                    <a href="#" id="option1" data-value="option1" data-type="productOffering" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="productOffering" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="productOffering" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="productOffering" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="productOffering" class="dropoption">Option 5</a>
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
                    <a href="#" id="option1" data-value="na" data-type="p0TargetGeo" class="dropoption">NA</a>
                    <a href="#" id="option2" data-value="dme" data-type="p0TargetGeo" class="dropoption">DME</a>
                    <a href="#" id="option3" data-value="latam" data-type="p0TargetGeo" class="dropoption">LATAM</a>
                    <a href="#" id="option4" data-value="apac" data-type="p0TargetGeo" class="dropoption">APAC</a>
                    <a href="#" id="option5" data-value="emea" data-type="p0TargetGeo" class="dropoption">EMEA</a>
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


    //Business Line List
    const businessLineResponse = await graphqlQueryNameList('getBusinessLine');
    const businessLines = businessLineResponse.data.jsonByPath.item.json.options;
    populateDropdown(businessLines, 'dropdownBusinessOptions', 'status');

    //Status List
    const statusResponse = await graphqlQueryNameList('getStatusList');
    const statuses = statusResponse.data.jsonByPath.item.json.options;
    populateDropdown(statuses, 'dropdownStatusOptions', 'status');

    //Product List
    const productResponse = await graphqlQueryNameList('getProductList');
    const products = productResponse.data.jsonByPath.item.json.options;
    populateDropdown(products, 'dropdownProductOptions', 'productOffering');

    //Geo List
    const geoResponse = await graphqlQueryNameList('getGeoList');
    const geos = geoResponse.data.jsonByPath.item.json.options;
    populateDropdown(geos, 'dropdownGeoOptions', 'p0TargetGeo');

    document.querySelectorAll('.dropdown-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            toggleDropdown(event.target);
        });
    });
    document.querySelectorAll('.dropoption').forEach((button) => {
        button.addEventListener('click', (event) => {
        toggleOption(event.target.dataset.value, event.target.dataset.type);
        //Closes the dropdown list
        toggleDropdown(event.target);
        });
    });
    document.querySelector('.reset-filters').addEventListener('click', () => {
        resetAllFilters();
    })
    decorateIcons(block);
}

function populateDropdown(options, dropdownId, type) {
    let dropdownContent = document.getElementById(dropdownId);
    // Clear existing options
    dropdownContent.innerHTML = '';

    // Append new options
    options.forEach((option, index) => {
        // Create a new anchor element for each option
        var anchor = document.createElement('a');
        anchor.href = "#";
        anchor.id = "option" + (index + 1); // increment index for 1-based id
        anchor.dataset.value = option.value;
        anchor.dataset.type = type;
        anchor.className = "dropoption";
        anchor.textContent = option.text; // using the option text
        // Append to the dropdown
        dropdownContent.appendChild(anchor);
    });
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
    // Find the currently active option within the same type and deselect it if it's not the clicked one
    const currentlySelected = document.querySelector(`.dropoption.selected[data-type='${optionType}']`);
    if (currentlySelected && currentlySelected.dataset.value !== optionValue) {
        currentlySelected.classList.remove('selected'); // Remove the 'selected' class from the previously selected option
        handleSelectedFilter(currentlySelected); // Update the UI to reflect this change
    }

    // Toggle the 'selected' class on the clicked option
    const dropdownOption = document.querySelector(`[data-value='${optionValue}'][data-type='${optionType}']`);
    if (!dropdownOption.classList.contains('selected')) {
        dropdownOption.classList.add('selected');
    } else {
        dropdownOption.classList.remove('selected');
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
    //Trigger the gmo-campaign-list block from the gmo-campaign-header
    sendGmoCampaignListBlockEvent();
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
