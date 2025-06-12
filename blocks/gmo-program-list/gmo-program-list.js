import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlAllCampaignsFilter, graphqlCampaignCount, generateFilterJSON } from '../../scripts/graphql.js';
import { getBaseConfigPath } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';
import { toggleOption } from '../gmo-program-header/gmo-program-header.js';
import { 
    getProductMapping, checkBlankString, statusMapping,
    dateFormat, showLoadingOverlay, hideLoadingOverlay,
    retrieveSearchFilters, div, span, img, select, option
} from '../../scripts/shared-program.js'

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
        'name': 'Proposed Launch Date',
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
    },
    {
        'name': 'Geo',
        'attribute': 'geo',
        'sortable': false
    }
]

const DEFAULT_ITEMS_PER_PAGE = 8;
//Global variables used by helper functions
let currentPageInfo = {};
let cursorArray = [];
let currentPage = 1;
let currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;
let currentGraphqlFilter = {};
let totalPages = 0;
//Get Campaign Count for pagination
let baseFilterArray = addProjectUseFilter({}); 
let campaignCount = graphqlCampaignCount(baseFilterArray);
let blockConfig;

document.addEventListener('gmoCampaignListBlock', async function() {
    //Build graphq filter that is passed to the graphql persisted queries
    const graphQLFilterArray = getFilterValues();
    const searchInputValue = document.getElementById('campaign-search').value;
    if (searchInputValue!=='')
    {
      graphQLFilterArray.push({type:'programName', value:searchInputValue, operator:'='})
    }

    currentGraphqlFilter= generateFilterJSON(graphQLFilterArray);

    // add projectUse filter to filter non-prod projects
    currentGraphqlFilter = addProjectUseFilter(currentGraphqlFilter);

    const block = document.querySelector('.gmo-program-list.block');
    //Get Campaign Count for pagination
    campaignCount = graphqlCampaignCount(currentGraphqlFilter);

    //Reset page variables
    currentPageInfo = {};
    cursorArray = [];
    currentPage = 1;
    currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;

    // save the filter in session storage
    recordSearchFilters(currentGraphqlFilter);

    //Trigger loading the gmo-campaign-block
    decorate( block, currentNumberPerPage, '', false, false, currentGraphqlFilter);
});

export default async function decorate(block, numPerPage = currentNumberPerPage, cursor = '', previousPage = false, nextPage = false, graphQLFilter = {}) {
    showLoadingOverlay(block);
    if (blockConfig == undefined) blockConfig = readBlockConfig(block);

    // check if this was a 'back' from details. if so, retrieve search params from cookie
    const params = new URLSearchParams(window.location.search);
    const isBack = params.get('isBack');
    const isShared = params.get('isShare');

    // clear the params from the url
    clearURLParams();

    // Handle saved or shared search params
    if (isBack || isShared) {
        const filterParams = retrieveSearchFilters();
        let filterSource = isBack ? filterParams : params.get('searchFilter');

        if (filterSource) {
            try {
                graphQLFilter = JSON.parse(decodeURIComponent(filterSource));
            } catch (error) {
                console.error("Failed to parse search filter:", error);
            }
        }

        clearStoredSearch(); // Clear stored search after processing
    } else {
        if (Object.keys(graphQLFilter).length === 0) {
            // add 'projectUse' param to filter test projects
            graphQLFilter['projectUse'] = { _logOp: 'OR', _expressions: [] }
            graphQLFilter['projectUse']._expressions.push({ value: null, _operator: 'EQUALS', _ignoreCase: true });
            graphQLFilter['projectUse']._expressions.push({ value: 'Prod', _operator: 'EQUALS', _ignoreCase: true });
        }
    }

    const campaignPaginatedResponse = await graphqlAllCampaignsFilter(numPerPage, cursor, graphQLFilter);
    const campaigns = campaignPaginatedResponse.data.programPaginated.edges;
    currentPageInfo = campaignPaginatedResponse.data.programPaginated.pageInfo;
    //Current cursor used in previous page logic
    currentPageInfo.currentCursor = cursor;
    //Next Page
    if (currentPageInfo.hasNextPage){
      currentPageInfo.nextCursor = currentPageInfo.endCursor === undefined ? campaigns[campaigns.length - 1].cursor : currentPageInfo.endCursor;
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

    // Calculate total number of pages
    totalPages = Math.ceil(await campaignCount / currentNumberPerPage);

    // refactor
    const listHeaders = buildListHeaders(headerConfig);
    // refactor
    const listItems = buildCampaignList(campaigns, numPerPage);
    // refactor
    const listFooter = buildListFooter(await campaignCount, numPerPage);

    const blockHTML = div(
        div({ class: 'refresh-notification' }),
        div({ class: 'list-container' }),
    );
    block.innerHTML = blockHTML.innerHTML;
    const listContainer = block.querySelector('.list-container');
    listContainer.appendChild(listHeaders);
    listContainer.appendChild(await listItems);
    listContainer.appendChild(listFooter);
    // Show Hide Previous and Next Page buttons
    togglePaginationButtons();

    decorateIcons(block);

    // defer filters processing until nearly everything else is done
    if (isBack || isShared) displayFilterSelections(graphQLFilter);

    hideLoadingOverlay(block);

    // Lazy loading for images
    document.addEventListener('DOMContentLoaded', function() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('.lazy');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            lazyImages.forEach(img => observer.observe(img));
        }
    });
}

function togglePaginationButtons() {
    waitForElements('.footer-pagination-button', (footerPrev, footerNext) => {
        if (!footerPrev || !footerNext) return;

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
    });
}

function waitForElements(selector, callback) {
    const observer = new MutationObserver(() => {
        const footerPrev = document.querySelector('.footer-pagination-button.prev');
        const footerNext = document.querySelector('.footer-pagination-button.next');

        if (footerPrev && footerNext) {
            observer.disconnect(); // Stop observing once elements are found
            callback(footerPrev, footerNext);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also check immediately in case elements already exist
    const footerPrev = document.querySelector('.footer-pagination-button.prev');
    const footerNext = document.querySelector('.footer-pagination-button.next');
    if (footerPrev && footerNext) {
        observer.disconnect();
        callback(footerPrev, footerNext);
    }
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
        const programName = campaign.node.programName;
        const campaignName = campaign.node.campaignName;
        const programID = campaign.node.programID ? campaign.node.programID : "";
        const path = campaign.node._path;

        campaignRow.classList.add('campaign-row');
        if ((index + 1) > numPerPage) campaignRow.classList.add('hidden');

        const campaignInfoWrapper = document.createElement('div');
        campaignInfoWrapper.classList.add('campaign-info-wrapper', 'column-1');

        const campaignIconLink = document.createElement('a');
        let campaignDetailsLink = host + `/${detailsPage}?programName=${programName}&`;
        campaignDetailsLink += `programID=${programID}`;
        campaignDetailsLink += `&path=${path}`;
        campaignIconLink.href = campaignDetailsLink;
        const campaignIcon = document.createElement('div');
        campaignIcon.classList.add('campaign-icon');
        campaignIcon.dataset.programname = programName;
        campaignIcon.dataset.campaignname = campaignName;
        campaignIcon.dataset.programid = programID;
        addThumbnail(campaignIcon, programName, campaignName);
        campaignIconLink.appendChild(campaignIcon);
        const campaignNameWrapper = document.createElement('div');
        campaignNameWrapper.classList.add('campaign-name-wrapper', 'vertical-center');

        campaignNameWrapper.innerHTML = `
            <div class='campaign-name-label' data-property='campaign'>
                ${checkBlankString(programName)}
                <span class="tooltip">Program Name</span>
            </div>
            <div class='campaign-name'>
                ${checkBlankString(campaignName,'Marketing Moment Not Available')}
                <span class="tooltip">Marketing Moment</span>
            </div>
        `;

        // Add click event to the campaign name label and text
        const campaignNameLabel = campaignNameWrapper.querySelector('.campaign-name-label');
        const campaignNameText = campaignNameWrapper.querySelector('.campaign-name');
        campaignNameLabel.addEventListener('click', () => {
            window.location.href = campaignDetailsLink;
        });
        campaignNameText.addEventListener('click', () => {
            window.location.href = campaignDetailsLink;
        });

        campaignInfoWrapper.appendChild(campaignIconLink);
        campaignInfoWrapper.appendChild(campaignNameWrapper);

        const campaignOverviewWrapper = document.createElement('div');
        campaignOverviewWrapper.classList.add('column-2', 'campaign-description-wrapper', 'vertical-center');

        const campaignOverview = document.createElement('div');
        campaignOverview.textContent = checkBlankString(campaign.node.marketingGoal.plaintext);
        campaignOverview.classList.add('campaign-description');
        campaignOverview.dataset.property = 'description';
        campaignOverviewWrapper.appendChild(campaignOverview);

        const campaignLaunch = document.createElement('div');
        campaignLaunch.textContent = dateFormat(campaign.node.launchDate);
        campaignLaunch.classList.add('column-3', 'campaign-launch-date', 'vertical-center');
        campaignLaunch.dataset.property = 'launch';

        const campaignProducts = await buildProduct(checkBlankString(campaign.node.productOffering));
        campaignProducts.classList.add('column-4', 'vertical-center');

        var campaignStatusWrapper = document.createElement('div');
        campaignStatusWrapper.classList.add('status-wrapper', 'column-6', 'vertical-center');
        campaignStatusWrapper = await buildStatus(campaignStatusWrapper, campaign);

        const campaignGeo = document.createElement('div');
        campaignGeo.textContent = formatGeos(campaign.node.p0TargetGeo);
        campaignGeo.classList.add('column-7', 'vertical-center');
        campaignGeo.dataset.property = 'geo';

        campaignRow.appendChild(campaignInfoWrapper);
        campaignRow.appendChild(campaignOverviewWrapper);
        campaignRow.appendChild(campaignLaunch);
        campaignRow.appendChild(campaignProducts);
        campaignRow.appendChild(campaignStatusWrapper);
        campaignRow.appendChild(campaignGeo);

        listWrapper.appendChild(campaignRow);
    }
    return listWrapper;
}

function formatGeos(geoArray) {
    return geoArray.map(geo => geo.toUpperCase()).join(', ');
}

async function buildStatus(statusWrapper, campaign) {
    const campaignStatus = document.createElement('div');
    const statusStr = checkBlankString(campaign.node.status);
    const programStatusMapping = await statusMapping;
    const statusMatch = programStatusMapping.filter(item => item.value === statusStr);

    let statusText, statusColor;
    if (statusMatch.length > 0) {
        statusText = statusMatch[0].text;
        statusColor = statusMatch[0]["color-code"];
    } else {
        statusText = statusStr;
        statusColor = "BABABA";
    }

    campaignStatus.textContent = statusText;
    campaignStatus.style.backgroundColor = "#" + statusColor;
    campaignStatus.classList.add('status');
    campaignStatus.dataset.property = 'status';
    statusWrapper.appendChild(campaignStatus);
    return statusWrapper;
}

async function addThumbnail(parentElement, programName, campaignName) {
    const response = await searchAsset(programName, campaignName);
    if (response?.imageUrl && response?.imageAltText) {
        const iconImage = document.createElement('img');
        iconImage.src = response.imageUrl;
        iconImage.alt = response.imageAltText;
        parentElement.appendChild(iconImage);
    }
}

async function buildProduct(product) {
    const productMapping = await getProductMapping(product);
    const productEl = div(
        div( 
            { class: 'product-entry' },
            img( { class: 'icon', src: productMapping.icon }),
            span( { class: 'product-label'}, productMapping.label ),
        )
    );
    return productEl;
}

function buildListHeaders(headerConfig) {
    const config = headerConfig;
    const listHeaders = div({ class: 'list-header'});
    let columnCounter = 1;

    config.forEach((column)  => {
        const columnWrapper = div(
            { class: `column-header-wrapper column-${columnCounter}`},
            div( { class: 'column-label', 'data-sortable': column.sortable, 'data-attribute': column.attribute,
                    'data-name': column.name }, column.name
            ),
        );

        columnCounter++;
        //sorting
        if (column.sortable) {
            const columnSort = div(
                { class: 'column-sort-wrapper'},
                img({ class: 'column-sort-asc icon', src: '/icons/chevronUp.svg', title: 'Sort (Ascending)', 
                    onclick: () => { sortColumn('asc', column.attribute) } }),
                img({ class: 'column-sort-desc icon', src: '/icons/chevronDown.svg', title: 'Sort (Descending)', 
                    onclick: () => { sortColumn('desc', column.attribute) } }),
            );
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
    const footerWrapper = div(
        { class: 'list-footer footer-wrapper', 'data-pages': pages },
        div({ class: 'footer-total' }, `Page ${currentPage} of ${pages} -- ${rows} total results`),
        div(
            { class: 'footer-pagination' },
            div({ class: 'footer-pagination-button prev' }, 'Prev'),
            div(
                { class: 'footer-pages-wrapper' },
                div({ class: 'footer-pagination-pages currentpage', id: 'current-page', 'data-pagenumber': currentPage},  currentPage)
            ),
            div({ class: 'footer-pagination-button next' }, 'Next')
        ),
        div({ class: 'footer-perPage' },
            div({ class: 'footer-perPage-label' }, 'Per Page'),
            div(
                { class: 'footer-perPage-dropdown' },
                select(
                    { id: 'per-page' },
                    option({ value: 8 }, '8'),
                    option({ value: 16 }, '16'),
                    option({ value: 32 }, '32'),
                    option({ value: 48 }, '48'),
                    option({ value: 64 }, '64'),
                    option({ value: 80 }, '80'),
                )
            )
        ),
    );

    // add event listeners
    footerWrapper.querySelector('.footer-pagination-button.prev').addEventListener('click', (event) => {
        // Disable the button
        footerPrev.classList.remove('active');
        footerPrev.classList.add('disabled');
        prevPage(event.target);
    });
    footerWrapper.querySelector('.footer-pagination-button.next').addEventListener('click', (event) => {
        // Disable the button
        footerNext.classList.remove('active');
        footerNext.classList.add('disabled');
        nextPage(event.target);
    });

    footerWrapper.querySelector('.footer-perPage-dropdown').addEventListener('change', (event) => {
        repaginate(event.target);
    });

    // display currently selected option
    var options = footerWrapper.querySelectorAll('option');
    options.forEach(option => {
        if (option.value === currentNumberPerPage.toString()) {
            option.selected = true;
        }
    });
    return footerWrapper;
}

function repaginate(dropdown) {
    currentNumberPerPage = dropdown.value;
    //Reset current page to 1
    currentPage = 1;
    const block = document.querySelector('.gmo-program-list.block');
    //Reset cursor to ''
    decorate(block, currentNumberPerPage, '', false, false);
}

async function nextPage(nextBtn) {
    if (currentPage < totalPages) {
        currentPage++;
        const block = document.querySelector('.gmo-program-list.block');
        await decorate(block, currentNumberPerPage, currentPageInfo.nextCursor, false, true, currentGraphqlFilter);

        const prevBtn = block.querySelector('.footer-pagination-button.prev');
        prevBtn.classList.add('active');

        if (currentPage === totalPages) {
            nextBtn.classList.remove('active');
        } else {
            nextBtn.classList.add('active');
        }
    }
}

async function prevPage(prevBtn) {
    if (currentPage > 1) {
        currentPage--;
        const block = document.querySelector('.gmo-program-list.block');

        const currentCursor = currentPageInfo.currentCursor;
        //Calculate cursor for previous page
        const indexCursor = cursorArray.indexOf(currentCursor) - currentNumberPerPage;
        await decorate(block, currentNumberPerPage, cursorArray[indexCursor], true, false,currentGraphqlFilter);
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

function recordSearchFilters(graphQLFilter) {
    const filterKey = "MH_PROGRAM_FILTER";
    const filterParams = JSON.stringify(graphQLFilter);
    sessionStorage.setItem(filterKey, filterParams);
}

function clearStoredSearch() {
    const filterKey = "MH_PROGRAM_FILTER";
    sessionStorage.removeItem(filterKey);
}

function clearURLParams() {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('?')[0];
    history.replaceState(null, '', baseUrl);
}

function displayFilterSelections(filterObj) {
    for (const key in filterObj) {
        if (filterObj[key]._expressions && Array.isArray(filterObj[key]._expressions)) {
            const value = filterObj[key]._expressions[0].value;
            toggleOption(value, key);
        }
    }
}

function addProjectUseFilter(filterArray = {}) {
    filterArray['projectUse'] = { _logOp: 'OR', _expressions: [] }
    filterArray['projectUse']._expressions.push({ value: null, _operator: 'EQUALS', _ignoreCase: true });
    filterArray['projectUse']._expressions.push({ value: 'Prod', _operator: 'EQUALS', _ignoreCase: true });
    return filterArray;
}