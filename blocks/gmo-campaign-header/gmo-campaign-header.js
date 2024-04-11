import { decorateIcons } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    block.innerHTML = `
    <div class="search-wrapper">
        <span class="icon icon-search"></span>
        <input id="campaign-search" maxlength="512" type="search" class="campaign-search" placeholder="Search Marketing Moments...">
    </div>
    <div class="filter-wrapper">
        <div class="label">Categories</div>
        <div class="filter-dropdown" id="campaign-categories">
            <div class="dropdown-button">
                <div>All Categories</div>
                <span class="icon icon-chevronDown"></span>
                <span class="icon icon-chevronUp inactive"></span>
            </div>
            <div class="dropdown-content" id="dropdownOptions">
                <a href="#" id="option1" data-value="option1" class="dropoption">Option 1</a>
                <a href="#" id="option2" data-value="option2" class="dropoption">Option 2</a>
                <a href="#" id="option3" data-value="option3" class="dropoption">Option 3</a>
                <a href="#" id="option4" data-value="option4" class="dropoption">Option 4</a>
                <a href="#" id="option5" data-value="option5" class="dropoption">Option 5</a>
            </div>
        </div>
    </div>
    <div class="filter-wrapper">
        <div class="label">Status</div>
        <div class="filter-dropdown" id="campaign-status">
            <div class="dropdown-button">
                <div>All Statuses</div>
                <span class="icon icon-chevronDown"></span>
                <span class="icon icon-chevronUp inactive"></span>
            </div>
            <div class="dropdown-content" id="dropdownOptions">
                <a href="#" id="option1" data-value="option1" class="dropoption">Option 1</a>
                <a href="#" id="option2" data-value="option2" class="dropoption">Option 2</a>
                <a href="#" id="option3" data-value="option3" class="dropoption">Option 3</a>
                <a href="#" id="option4" data-value="option4" class="dropoption">Option 4</a>
                <a href="#" id="option5" data-value="option5" class="dropoption">Option 5</a>
            </div>
        </div>
    </div>
    <div class="filter-wrapper">
        <div class="label">Cloud Business</div>
        <div class="filter-dropdown" id="campaign-business">
            <div class="dropdown-button">
                <div>All Cloud Businesses</div>
                <span class="icon icon-chevronDown"></span>
                <span class="icon icon-chevronUp inactive"></span>
            </div>
            <div class="dropdown-content" id="dropdownOptions">
                <a href="#" id="option1" data-value="option1" class="dropoption">Option 1</a>
                <a href="#" id="option2" data-value="option2" class="dropoption">Option 2</a>
                <a href="#" id="option3" data-value="option3" class="dropoption">Option 3</a>
                <a href="#" id="option4" data-value="option4" class="dropoption">Option 4</a>
                <a href="#" id="option5" data-value="option5" class="dropoption">Option 5</a>
            </div>
        </div>
    </div>
    <div class="filter-wrapper">
        <div class="label">Products</div>
        <div class="filter-dropdown" id="campaign-products">
            <div class="dropdown-button">
                <div>All Products</div>
                <span class="icon icon-chevronDown"></span>
                <span class="icon icon-chevronUp inactive"></span>
            </div>
            <div class="dropdown-content" id="dropdownOptions">
                <a href="#" id="option1" data-value="option1" class="dropoption">Option 1</a>
                <a href="#" id="option2" data-value="option2" class="dropoption">Option 2</a>
                <a href="#" id="option3" data-value="option3" class="dropoption">Option 3</a>
                <a href="#" id="option4" data-value="option4" class="dropoption">Option 4</a>
                <a href="#" id="option5" data-value="option5" class="dropoption">Option 5</a>
            </div>
        </div>
    </div>
    <div class="filter-wrapper">
        <div class="label">Other (TBD)</div>
        <div class="filter-dropdown" id="campaign-other">
            <div class="dropdown-button">
                <div>Other</div>
                <span class="icon icon-chevronDown"></span>
                <span class="icon icon-chevronUp inactive"></span>
            </div>
            <div class="dropdown-content" id="dropdownOptions">
                <a href="#" id="option1" data-value="option1" class="dropoption">Option 1</a>
                <a href="#" id="option2" data-value="option2" class="dropoption">Option 2</a>
                <a href="#" id="option3" data-value="option3" class="dropoption">Option 3</a>
                <a href="#" id="option4" data-value="option4" class="dropoption">Option 4</a>
                <a href="#" id="option5" data-value="option5" class="dropoption">Option 5</a>
            </div>
        </div>
    </div>
    `;
    document.querySelectorAll('.dropdown-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            toggleDropdown(event.target);
        });
    });
    document.querySelector('.dropoption').addEventListener('click', (event) => {
        toggleOption(event.target.dataset.value);
    })
    decorateIcons(block);
}

function toggleDropdown(element) {
    //console.log(element);
    //dropdown.parentElement.parentElement.classList.toggle('active');
    
    const dropdown = element.closest('.filter-dropdown');
    const icons = dropdown.querySelectorAll('.icon');
    icons.forEach((icon) => {
        icon.classList.toggle('inactive');
    })
    dropdown.classList.toggle('active');

    //document.getElementById("myDropdown").classList.toggle("active");
}

function toggleOption(option) {
    var dropdownOption = document.getElementById(option);
    dropdownOption.classList.toggle("selected");
}