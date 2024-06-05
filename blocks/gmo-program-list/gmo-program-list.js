import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlAllCampaignsFilter, graphqlCampaignCount, generateFilterJSON } from '../../scripts/graphql.js';
import { getProductMapping, checkBlankString, statusMapping } from '../../scripts/shared-program.js'
import { getBaseConfigPath } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';

const headerConfig = [
    {
        'name': 'Marketing Moments',
        'attribute': 'campaign',
        'sortable': true
    },
    {
        'name': 'Overview',
        'attribute': 'description',
        'sortable': false
    },
    {
        'name': 'Launch Date',
        'attribute': 'launch',
        'sortable': true,
        'type': 'date'
    },
    {
        'name': 'Products',
        'attribute': 'products'
    },
    {
        'name': 'Status',
        'attribute': 'status',
        'sortable': false
    }
]

const DEFAULT_ITEMS_PER_PAGE = 8;
//Global variables used by helper functions
let currentPageInfo = {};
let currentPage = 1;
let currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;
let currentGraphqlFilter = {};
let totalPages = 0;
//Get Campaign Count for pagination
let campaignCount = await graphqlCampaignCount();
let blockConfig;

//Custom event gmoCampaignListBlock to allow the gmo-campaign-header to trigger the gmo-program-list to update
document.addEventListener('gmoCampaignListBlock', async function() {
    //Build graphq filter that is passed to the graphql persisted queries
    const graphQLFilterArray = getFilterValues();
    const searchInputValue = document.getElementById('campaign-search').value;
    if (searchInputValue!=='')
    {
      graphQLFilterArray.push({type:'campaignName', value:searchInputValue, operator:'='})
    }

    currentGraphqlFilter= generateFilterJSON(graphQLFilterArray);
    const block = document.querySelector('.gmo-program-list.block');
    //Get Campaign Count for pagination
    campaignCount = await graphqlCampaignCount(currentGraphqlFilter);
    //Trigger loading the gmo-campaign-block
    //Reset page variables
    currentPageInfo = {};
    currentPage = 1;
    currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;

    decorate( block, currentNumberPerPage, '', false, false, currentGraphqlFilter);

});


export default async function decorate(block, numPerPage = currentNumberPerPage, cursor = '', previousPage = false, nextPage = false, graphQLFilter = {}) {
    if (blockConfig == undefined) blockConfig = readBlockConfig(block);
    const campaignPaginatedResponse = await graphqlAllCampaignsFilter(numPerPage, cursor,graphQLFilter);
    const campaigns = campaignPaginatedResponse.data.programPaginated.edges;

    //Set previous cursor to currentCursor
    currentPageInfo.previousCursor =  currentPageInfo.currentCursor;

    currentPageInfo = campaignPaginatedResponse.data.programPaginated.pageInfo;
    //Current cursor used in previous page logic
    currentPageInfo.currentCursor = cursor;
    //Next Page
    if (currentPageInfo.hasNextPage){
      currentPageInfo.nextCursor = currentPageInfo.endCursor === undefined ? campaigns[campaigns.length - 1].cursor : currentPageInfo.endCursor;
    }

    currentPageInfo.itemCount = campaigns.length;

    // Calculate total number of pages
    totalPages = Math.ceil(campaignCount / currentNumberPerPage);

    const listHeaders = buildListHeaders(headerConfig);
    const listItems = await buildCampaignList(campaigns, numPerPage);
    const listFooter = buildListFooter(campaignCount, numPerPage);

    block.innerHTML = `
        <div class="refresh-notification"></div>
        <div class="list-container">
        </div>`;
    const listContainer = block.querySelector('.list-container');
    listContainer.appendChild(listHeaders);
    listContainer.appendChild(listItems);
    listContainer.appendChild(listFooter);
    // Show Hide Previous and Next Page buttons
    const footerNext = document.querySelector('.footer-pagination-button.next');
    const footerPrev = document.querySelector('.footer-pagination-button.prev');
    if (currentPage > 1) {
        footerPrev.classList.add('active');
    } else {
        footerPrev.classList.remove('active');
    }

    if (currentPage < totalPages) {
        footerNext.classList.add('active');
    } else {
        footerNext.classList.remove('active');
    }

    decorateIcons(block);

}

function getFilterValues(){
  // Select all elements with the class 'selected-filter'
  const filters = document.querySelectorAll('.selected-filter');
  // Create an array to hold the data-type and data-value attributes
  const filterAttributes = [];
  // Loop through each filter element and extract both 'data-type' and 'data-value' attributes
  filters.forEach(filter => {
      const dataType = filter.getAttribute('data-type');
      const dataValue = filter.getAttribute('data-value');
      filterAttributes.push({ type: dataType, value: dataValue, operator : "=" });
  });

  return filterAttributes;
}

async function buildCampaignList(campaigns, numPerPage) {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-items');
    listWrapper.dataset.totalresults = campaigns.length;
    const host = location.origin + getBaseConfigPath();
    const detailsPage = blockConfig.detailspage;

    for (const campaign of campaigns) {
        const index = campaigns.indexOf(campaign);
        const campaignRow = document.createElement('div');
        campaignRow.classList.add('campaign-row');
        if ((index + 1) > numPerPage) campaignRow.classList.add('hidden');

        const campaignInfoWrapper = document.createElement('div');
        campaignInfoWrapper.classList.add('campaign-info-wrapper', 'column-1');

        const campaignIconLink = document.createElement('a');
        let campaignDetailsLink = host + `/${detailsPage}?programName=${campaign.node.programName}&`;
        campaignDetailsLink += `programReferenceNumber=${campaign.node.programReferenceNumber ? campaign.node.programReferenceNumber : ""}`
        campaignIconLink.href = campaignDetailsLink;

        const campaignIcon = document.createElement('div');
        campaignIcon.classList.add('campaign-icon');
        campaignIcon.dataset.programname = campaign.node.programName;
        campaignIcon.dataset.campaignname = campaign.node.campaignName;
        //Add Icon Image
        const iconImage = document.createElement('img');
        try {
            const imageObject = await searchAsset(campaign.node.programName, campaign.node.campaignName);
            iconImage.src = imageObject.imageUrl;
            iconImage.alt = imageObject.imageAltText;
        } catch (error) {
        }
        // Append the image to the campaignIcon div
        campaignIcon.appendChild(iconImage);
        campaignIconLink.appendChild(campaignIcon);
        const campaignName = document.createElement('div');
        campaignName.classList.add('campaign-name-wrapper', 'vertical-center');

        campaignName.innerHTML = `
            <div class='campaign-name-label' data-property='campaign'>
                ${checkBlankString(campaign.node.programName)}
                <span class="tooltip">Program Name</span>
            </div>
            <div class='campaign-name'>
                ${checkBlankString(campaign.node.campaignName,'Marketing Moment Not Available')}
                <span class="tooltip">Marketing Moment</span>
            </div>
        `;
        
        campaignInfoWrapper.appendChild(campaignIconLink);
        campaignInfoWrapper.appendChild(campaignName);

        const campaignOverviewWrapper = document.createElement('div');
        campaignOverviewWrapper.classList.add('column-2', 'campaign-description-wrapper', 'vertical-center');

        const campaignOverview = document.createElement('div');
        campaignOverview.textContent = checkBlankString(campaign.node.marketingGoal.plaintext);
        campaignOverview.classList.add('campaign-description');
        campaignOverview.dataset.property = 'description';
        campaignOverviewWrapper.appendChild(campaignOverview);

        const campaignLaunch = document.createElement('div');
        campaignLaunch.textContent = checkBlankString(campaign.node.launchDate);
        campaignLaunch.classList.add('column-3', 'campaign-launch-date', 'vertical-center');
        campaignLaunch.dataset.property = 'launch';

        const campaignProducts = await buildProduct(checkBlankString(campaign.node.productOffering));
        campaignProducts.classList.add('column-4', 'vertical-center');

        var campaignStatusWrapper = document.createElement('div');
        campaignStatusWrapper.classList.add('status-wrapper', 'column-6', 'vertical-center');
        campaignStatusWrapper = buildStatus(campaignStatusWrapper, campaign);
        campaignRow.appendChild(campaignInfoWrapper);
        campaignRow.appendChild(campaignOverviewWrapper);
        campaignRow.appendChild(campaignLaunch);
        campaignRow.appendChild(campaignProducts);
        campaignRow.appendChild(campaignStatusWrapper);

        listWrapper.appendChild(campaignRow);
    }
    return listWrapper;
}

function buildStatus(statusWrapper, campaign) {
    const campaignStatus = document.createElement('div');
    const statusStr = checkBlankString(campaign.node.status);
    const statusArray = statusMapping.data.jsonByPath.item.json.options;
    const statusMatch = statusArray.filter(item => item.value === statusStr);
    const statusText = statusMatch.length > 0 ? statusMatch[0].text : statusStr;
    campaignStatus.textContent = statusText;
    campaignStatus.style.backgroundColor = "#" + statusMatch[0]["color-code"];
    campaignStatus.classList.add('status');
    campaignStatus.dataset.property = 'status';
    statusWrapper.appendChild(campaignStatus);
    return statusWrapper;
}

async function buildProduct(product) {
    const productParent = document.createElement('div');
    const productMapping = await getProductMapping(product);
    const productEl = document.createElement('div');
    productEl.classList.add('product-entry');
    productEl.innerHTML = `
        <img class='icon' src=${productMapping.icon}></img>
        <span class='product-label'>${productMapping.label}</span>
    `;
    productParent.appendChild(productEl);
    return productParent;
}

function buildListHeaders(headerConfig) {
    const config = headerConfig;
    const listHeaders = document.createElement('div');
    listHeaders.classList.add('list-header');
    let columnCounter = 1;
    config.forEach((column)  => {
        const columnWrapper = document.createElement('div');
        columnWrapper.classList.add('column-header-wrapper');
        columnWrapper.classList.add(`column-${columnCounter}`);
        const columnEl = document.createElement('div');
        columnEl.classList.add('column-label');
        columnEl.dataset.sortable = column.sortable;
        columnEl.dataset.attribute = column.attribute;
        columnEl.dataset.name = column.name;
        columnEl.textContent = column.name;

        columnCounter++;
        columnWrapper.appendChild(columnEl);
        //sorting
        if (column.sortable) {
            const columnSort = document.createElement('div');
            columnSort.classList.add('column-sort-wrapper');
            const columnSortAsc = document.createElement('img');
            columnSortAsc.classList.add('column-sort-asc', 'icon');
            columnSortAsc.src = '/icons/chevronUp.svg';
            columnSortAsc.title = 'Sort (Ascending)'
            columnSortAsc.addEventListener('click', () => {
                sortColumn('asc', column.attribute);
            })
            const columnSortDesc = document.createElement('img');
            columnSortDesc.classList.add('column-sort-desc', 'icon');
            columnSortDesc.src = '/icons/chevronDown.svg';
            columnSortDesc.title = 'Sort (Descending)';
            columnSortDesc.addEventListener('click', () => {
                sortColumn('desc', column.attribute);
            })
            columnSort.appendChild(columnSortAsc);
            columnSort.appendChild(columnSortDesc);
            columnWrapper.appendChild(columnSort);
        }
        //end sorting
        listHeaders.appendChild(columnWrapper);
    })
    return listHeaders;
}

function buildListFooter(rows, rowsPerPage) {
    const pages = Math.ceil(rows / rowsPerPage);
    totalPages = pages;
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('list-footer', 'footer-wrapper');
    footerWrapper.dataset.pages = pages;
    const footerTotal = document.createElement('div');

    footerTotal.textContent = `Page ${currentPage} of ${pages} -- ${rows} total results`;
    footerTotal.classList.add('footer-total');

    // pagination
    const footerPagination = document.createElement('div');
    footerPagination.classList.add('footer-pagination');
    const footerPrev = document.createElement('div');
    footerPrev.classList.add('footer-pagination-button', 'prev');
    footerPrev.textContent = 'Prev';
    footerPrev.addEventListener('click', debounce((event) => {
        prevPage(event.target);
    }, 200));

    const footerPageBtnsWrapper = document.createElement('div');
    footerPageBtnsWrapper.classList.add('footer-pages-wrapper');
    const footerNext = document.createElement('div');
    footerNext.classList.add('footer-pagination-button', 'next');
    //Show current page
    buildCurrentPageDivElement(currentPage, footerPageBtnsWrapper);

    footerNext.addEventListener('click', debounce((event) => {
        nextPage(event.target);
    }, 200));

    footerNext.textContent = 'Next';
    footerPagination.appendChild(footerPrev);
    footerPagination.appendChild(footerPageBtnsWrapper);
    footerPagination.appendChild(footerNext);
    // end pagination

    // per-page controls
    const footerPerPage = document.createElement('div');
    footerPerPage.classList.add('footer-perPage');
    const footerPerPageLabel = document.createElement('div');
    footerPerPageLabel.textContent = 'Per Page';
    footerPerPageLabel.classList.add('footer-perPage-label');
    const footerPerPageDropdownWrapper = document.createElement('div');
    const footerPerPageDropdown = document.createElement('select');
    footerPerPageDropdown.id = 'per-page';
    footerPerPageDropdown.innerHTML = `
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="48">48</option>
        <option value="64">64</option>
        <option value="80">80</option>
    `;

    // Selecting the item based on the value of currentNumberPerPage
    var options = footerPerPageDropdown.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === currentNumberPerPage.toString()) {
            option.selected = true;
        }
    });

    footerPerPageDropdown.addEventListener('change', (event) => {
        repaginate(event.target);
    });
    footerPerPageDropdownWrapper.appendChild(footerPerPageDropdown);
    footerPerPageDropdownWrapper.classList.add('footer-perPage-dropdown');
    footerPerPage.appendChild(footerPerPageLabel);
    footerPerPage.appendChild(footerPerPageDropdownWrapper);
    // end per-page controls

    footerWrapper.appendChild(footerTotal);
    footerWrapper.appendChild(footerPagination);
    footerWrapper.appendChild(footerPerPage);
    return footerWrapper;
}

//Show current page
function buildCurrentPageDivElement(pageNumber,footerPageBtnsWrapper)
{
     const footerPageBtn = document.createElement('div');
     footerPageBtn.classList.add('footer-pagination-pages', 'currentpage');
     footerPageBtn.id = "current-page";
     footerPageBtn.textContent = pageNumber;
     footerPageBtn.dataset.pagenumber = pageNumber;
     footerPageBtnsWrapper.appendChild(footerPageBtn);
}

function repaginate(dropdown) {
    currentNumberPerPage = dropdown.value;
    //Reset current page to 1
    currentPage = 1;
    const block = document.querySelector('.gmo-program-list.block');
    //Reset cursor to ''
    decorate(block, currentNumberPerPage, '', false, false);
}

/**
 * Limits the rate at which a function can be executed by ensuring it is only called after a specified delay since the last invocation.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function nextPage(nextBtn) {
    if (currentPage < totalPages) {
        currentPage++;
        const block = document.querySelector('.gmo-program-list.block');
        decorate(block, currentNumberPerPage, currentPageInfo.nextCursor, false, true, currentGraphqlFilter);

        const prevBtn = document.querySelector('.footer-pagination-button.prev');
        prevBtn.classList.add('active');

        if (currentPage === totalPages) {
            nextBtn.classList.remove('active');
        } else {
            nextBtn.classList.add('active');
        }
    }
}

function prevPage(prevBtn) {
    if (currentPage > 1) {
        currentPage--;
        const block = document.querySelector('.gmo-program-list.block');
        decorate(block, currentNumberPerPage, currentPage.previousCursor, true, false, currentGraphqlFilter);
        const nextBtn = document.querySelector('.footer-pagination-button.next');
        nextBtn.classList.add('active');
        if (currentPage === 1) {
            prevBtn.classList.remove('active');
        } else {
            prevBtn.classList.add('active');
        }
    }
}

function sortColumn(dir, property) {
    const container = document.querySelector('.list-items');
    if (!container) {
        console.error("Could not locate list container.");
        return;
    }

    const selector = '[data-property="' + property + '"]';
    const divs = document.querySelectorAll(selector);
    const sortArray = [];

    divs.forEach(div => {
        const textContent = div.textContent.trim();
        const row = div.closest('.campaign-row');
        sortArray.push({ textContent, row });
    });

    if (property == 'launch') {
        if (dir == 'asc') {
            sortArray.sort((a,b) => {
                a = a.textContent.split('/').reverse().join('');
                b = b.textContent.split('/').reverse().join('');
                return a.localeCompare(b);            
            });
        } else {
            sortArray.sort((a,b) => {
                a = a.textContent.split('/').reverse().join('');
                b = b.textContent.split('/').reverse().join('');
                return b.localeCompare(a);            
            });
        }
    } else {
        if (dir == 'asc') {
            sortArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
        } else {
            sortArray.sort((a, b) => b.textContent.localeCompare(a.textContent));
        }
    }

    sortArray.forEach(({ row }, index) => {
        container.appendChild(row);
    });
}
