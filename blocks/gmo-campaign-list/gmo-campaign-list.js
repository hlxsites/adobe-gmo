import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlAllCampaignsFilter, graphqlCampaignCount, generateFilterJSON } from '../../scripts/graphql.js';
import { productMappings, statusMappings } from '../../scripts/shared-campaigns.js'
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

//Global variables used by helper functions
let currentPageInfo = {};
let cursorArray = [];
let currentPage = 1;
let currentNumberPerPage = 4;
//Get Campaign Count for pagination
let campaignCount = await graphqlCampaignCount();
let blockConfig;

//Custom event gmoCampaignListBlock to allow the gmo-campaign-header to trigger the gmo-campaign-list to update
document.addEventListener('gmoCampaignListBlock', async function() {
    //Build graphq filter that is passed to the graphql persisted queries
    const graphQLFilterArray = getFilterValues();
    const searchInputValue = document.getElementById('campaign-search').value;
    if (searchInputValue!=='')
    {
      graphQLFilterArray.push({type:'campaignName', value:searchInputValue, operator:'='})
    }
    const graphqlFilter = generateFilterJSON(graphQLFilterArray);
    const block = document.querySelector('.gmo-campaign-list.block');
    //Get Campaign Count for pagination
    campaignCount = await graphqlCampaignCount(graphqlFilter);
    //Trigger loading the gmo-campaign-block
    //Reset page variables
    currentPageInfo = {};
    cursorArray = [];
    currentPage = 1;
    currentNumberPerPage = 4;
    decorate( block, currentNumberPerPage, '', false, false, graphqlFilter);
});


export default async function decorate(block, numPerPage = currentNumberPerPage, cursor = '', previousPage = false, nextPage = false, graphQLFilter = {}) {
    if (blockConfig == undefined) blockConfig = readBlockConfig(block);
    const campaignPaginatedResponse = await graphqlAllCampaignsFilter(numPerPage, cursor,graphQLFilter);
    const campaigns = campaignPaginatedResponse.data.programPaginated.edges;
    currentPageInfo = campaignPaginatedResponse.data.programPaginated.pageInfo;
    //Current cursor used in previous page logic
    currentPageInfo.currentCursor = cursor;
    //Next Page
    if (currentPageInfo.hasNextPage){
      currentPageInfo.nextCursor = campaigns[campaigns.length - 1].cursor;
    }

    if (!previousPage && !nextPage)
    {
      cursorArray = campaigns.map(item => item.cursor);
    }
    else if (nextPage){

      campaigns.forEach(item => {
          cursorArray.push(item.cursor);
      });
    }
    currentPageInfo.itemCount = campaigns.length;

    const listHeaders = buildListHeaders(headerConfig);
    const listItems = await buildCampaignList(campaigns, numPerPage);
    const listFooter = buildListFooter(campaignCount, numPerPage);

    block.innerHTML = `
        <div class="refresh-notification">Last refreshed date: TBD</div>
        <div class="list-container">
        </div>`;
    const listContainer = block.querySelector('.list-container');
    listContainer.appendChild(listHeaders);
    listContainer.appendChild(listItems);
    listContainer.appendChild(listFooter);
    //Show Hide Previous and Next Page buttons
    const footerNext = document.querySelector('.footer-pagination-button.next');
    const footerPrev = document.querySelector('.footer-pagination-button.prev');
    if (currentPageInfo.hasPreviousPage){
      footerPrev.classList.add('active');
    } else {
      footerPrev.classList.remove('active');
    }

    if (currentPageInfo.hasNextPage){
      footerNext.classList.add('active');
    } else {
      footerNext.classList.remove('active');
    }
    decorateIcons(block);
    
    //Debug Global Variables
    //debug_console();
}

function debug_console(){
  console.log('currentPageInfo',currentPageInfo);
  console.log('cursorArray',cursorArray);
  console.log('currentPage',currentPage);
  console.log('campaignCount',campaignCount);

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
        campaignIconLink.href = host + `/${detailsPage}?programName=${campaign.node.programName}`;

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
            console.error("No campaign image found:", error);
        }
        // Append the image to the campaignIcon div
        campaignIcon.appendChild(iconImage);
        campaignIconLink.appendChild(campaignIcon);
        const campaignName = document.createElement('div');
        campaignName.classList.add('campaign-name-wrapper', 'vertical-center');
        campaignName.innerHTML = `
            <div class='campaign-name-label'>${checkBlankString(campaign.node.programName)}</div>
            <div class='campaign-name' data-property='campaign'>${checkBlankString(campaign.node.campaignName)}</div>
        `
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

        const campaignProducts = buildProductsList(checkBlankString(campaign.node.productOffering));
        campaignProducts.classList.add('column-4', 'vertical-center');

        const campaignStatusWrapper = document.createElement('div');
        campaignStatusWrapper.classList.add('status-wrapper', 'column-6', 'vertical-center');

        const campaignStatus = document.createElement('div');
        const statusStr = checkBlankString(campaign.node.status);
        const statusString = statusMappings[statusStr].label;
        campaignStatus.textContent = statusString;
        campaignStatus.classList.add(statusMappings[statusStr].color);
        campaignStatus.classList.add('status');
        campaignStatus.dataset.property = 'status';
        campaignStatusWrapper.appendChild(campaignStatus);

        campaignRow.appendChild(campaignInfoWrapper);
        campaignRow.appendChild(campaignOverviewWrapper);
        campaignRow.appendChild(campaignLaunch);
        campaignRow.appendChild(campaignProducts);
        campaignRow.appendChild(campaignStatusWrapper);

        listWrapper.appendChild(campaignRow);
    }
    return listWrapper;
}

function buildProductsList(productList) {
    const campaignProducts = document.createElement('div');
    const productEl = buildProduct(productList);
    campaignProducts.appendChild(productEl);
    return campaignProducts;
}

function buildProduct(product) {
    const productEl = document.createElement('div');
    productEl.classList.add('product-entry');

    // Ensure the product exists in the productMappings, otherwise use 'Not Available'
    if (!productMappings[product]) {
        product = 'Not Available';
    }

    const productLabel = productMappings[product].name;
    const productIcon = productMappings[product].icon;

    productEl.innerHTML = `
        <span class='icon icon-${productIcon}'></span>
        <span class='product-label'>${productLabel}</span>
    `;

    return productEl;
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
            const columnSortAsc = document.createElement('span');
            columnSortAsc.classList.add('column-sort-asc', 'icon', 'icon-chevronUp');
            columnSortAsc.addEventListener('click', () => {
                sortColumn('asc', column.attribute);
            })
            const columnSortDesc = document.createElement('span');
            columnSortDesc.classList.add('column-sort-desc', 'icon', 'icon-chevronDown');
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
    footerPrev.addEventListener('click', (event) => {
        prevPage(event.target);
    })

    const footerPageBtnsWrapper = document.createElement('div');
    footerPageBtnsWrapper.classList.add('footer-pages-wrapper');
    const footerNext = document.createElement('div');
    footerNext.classList.add('footer-pagination-button', 'next');
    //Show current page
    buildCurrentPageDivElement(currentPage, footerPageBtnsWrapper);

    footerNext.addEventListener('click', (event) => { 
        nextPage(event.target);
    })
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
        <option value="4">4</option>
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
    const block = document.querySelector('.gmo-campaign-list.block');
    //Reset cursor to ''
    decorate(block, currentNumberPerPage, '', false, false);
}

function nextPage(nextBtn) {
    if (currentPageInfo.hasNextPage) {
      //Calculate Next Page
      currentPage++;

      const block = document.querySelector('.gmo-campaign-list.block');

      decorate( block, currentNumberPerPage, currentPageInfo.nextCursor, false, true);

      if (!(nextBtn.classList.contains('active'))) {
          return;
      }
      const prevBtn = document.querySelector('.footer-pagination-button.prev');
      prevBtn.classList.add('active');

    }
}

function prevPage(prevBtn) {
    if (currentPageInfo.hasPreviousPage) {
      currentPage--;
      const block = document.querySelector('.gmo-campaign-list.block');
      const currentCursor = currentPageInfo.currentCursor;

      //Calculate cursor for previous page
      const indexCursor = cursorArray.indexOf(currentCursor) - currentNumberPerPage;
      decorate(block, currentNumberPerPage, cursorArray[indexCursor], true, false);
      if (!(prevBtn.classList.contains('active'))) {
          return;
      }
      const nextBtn = document.querySelector('.footer-pagination-button.next');
      const currentPageBtn = document.querySelector('#current-page');
      const currentPageValue = parseInt(currentPageBtn.dataset.pagenumber);
      const targetPage = (currentPageValue - 1);

      nextBtn.classList.add('active');
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

// supply dummy data if none present
export function checkBlankString(string) {
    if (string == undefined || string == '' ) {
        return 'Not Available';
    } else {
        return string;
    }
}
