import { decorateIcons } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    block.innerHTML = `
    <div class="inputs-wrapper">
        <div class="search-wrapper">
            <span class="icon icon-search"></span>
            <input id="campaign-search" maxlength="512" type="search" class="campaign-search" placeholder="Search Marketing Moments...">
        </div>
        <div class="filter-wrapper">
            <div class="label">Categories</div>
            <div class="filter-dropdown" id="campaign-categories">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Categories</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownOptions">
                    <a href="#" id="option1" data-value="option1" data-type="category" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="category" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="category" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="category" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="category" class="dropoption">Option 5</a>
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
                <div class="dropdown-content" id="dropdownOptions">
                    <a href="#" id="option1" data-value="option1" data-type="status" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="status" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="status" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="status" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="status" class="dropoption">Option 5</a>
                </div>
            </div>
        </div>
        <div class="filter-wrapper">
            <div class="label">Cloud Business</div>
            <div class="filter-dropdown" id="campaign-business">
                <div class="dropdown-button">
                    <div class="dropdown-label">All Cloud Businesses</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownOptions">
                    <a href="#" id="option1" data-value="option1" data-type="business" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="business" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="business" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="business" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="business" class="dropoption">Option 5</a>
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
                <div class="dropdown-content" id="dropdownOptions">
                    <a href="#" id="option1" data-value="option1" data-type="product" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="product" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="product" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="product" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="product" class="dropoption">Option 5</a>
                </div>
            </div>
        </div>
        <div class="filter-wrapper">
            <div class="label">Other (TBD)</div>
            <div class="filter-dropdown" id="campaign-other">
                <div class="dropdown-button">
                    <div class="dropdown-label">Other</div>
                    <span class="icon icon-chevronDown"></span>
                    <span class="icon icon-chevronUp inactive"></span>
                </div>
                <div class="dropdown-content" id="dropdownOptions">
                    <a href="#" id="option1" data-value="option1" data-type="other" class="dropoption">Option 1</a>
                    <a href="#" id="option2" data-value="option2" data-type="other" class="dropoption">Option 2</a>
                    <a href="#" id="option3" data-value="option3" data-type="other" class="dropoption">Option 3</a>
                    <a href="#" id="option4" data-value="option4" data-type="other" class="dropoption">Option 4</a>
                    <a href="#" id="option5" data-value="option5" data-type="other" class="dropoption">Option 5</a>
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
