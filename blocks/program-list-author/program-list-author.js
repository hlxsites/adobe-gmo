import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';
import { graphqlAllCampaignsFilter, graphqlCampaignCount, generateFilterJSON } from '../../scripts/graphql.js';
import { getProductMapping, checkBlankString, statusMapping, dateFormat } from '../../scripts/shared-program.js';
import { getBaseConfigPath, getProgramListFieldsConfig } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';

const DEFAULT_ITEMS_PER_PAGE = 8;
let currentPageInfo = {};
let cursorArray = [];
let currentPage = 1;
let currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;
let currentGraphqlFilter = {};
let totalPages = 0;
let campaignCount = await graphqlCampaignCount();
let blockConfig;

async function getHeaderConfig() {
    const programListFieldsConfig = await getProgramListFieldsConfig();

console.log('programListFieldsConfig',programListFieldsConfig)
    return programListFieldsConfig;
}

document.addEventListener('gmoCampaignListBlock', async function() {
    const graphQLFilterArray = getFilterValues();
    const searchInputValue = document.getElementById('campaign-search').value;
    if (searchInputValue !== '') {
        graphQLFilterArray.push({ type: 'campaignName', value: searchInputValue, operator: '=' });
    }

    currentGraphqlFilter = generateFilterJSON(graphQLFilterArray);
    const block = document.querySelector('.program-list-author.block');
    campaignCount = await graphqlCampaignCount(currentGraphqlFilter);

    currentPageInfo = {};
    cursorArray = [];
    currentPage = 1;
    currentNumberPerPage = DEFAULT_ITEMS_PER_PAGE;
    decorate(block, currentNumberPerPage, '', false, false, currentGraphqlFilter);
});

export default async function decorate(block, numPerPage = currentNumberPerPage, cursor = '', previousPage = false, nextPage = false, graphQLFilter = {}) {
    if (blockConfig == undefined) blockConfig = readBlockConfig(block);
    const campaignPaginatedResponse = await graphqlAllCampaignsFilter(numPerPage, cursor, graphQLFilter);
    const campaigns = campaignPaginatedResponse.data.programPaginated.edges;
    currentPageInfo = campaignPaginatedResponse.data.programPaginated.pageInfo;
    currentPageInfo.currentCursor = cursor;

    if (currentPageInfo.hasNextPage) {
        currentPageInfo.nextCursor = currentPageInfo.endCursor === undefined ? campaigns[campaigns.length - 1].cursor : currentPageInfo.endCursor;
    }

    if (!previousPage && !nextPage) {
        cursorArray = campaigns.map(item => item.cursor);
    } else if (nextPage) {
        campaigns.forEach(item => {
            cursorArray.push(item.cursor);
        });
    }

    currentPageInfo.itemCount = campaigns.length;
    totalPages = Math.ceil(campaignCount / currentNumberPerPage);

    const headerConfig = await getHeaderConfig();
    const listHeaders = buildListHeaders(headerConfig);
    const listItems = await buildCampaignList(campaigns, headerConfig, numPerPage);
    const listFooter = buildListFooter(campaignCount, numPerPage);

    block.innerHTML = `
        <div class="refresh-notification"></div>
        <div class="list-container">
        </div>`;

    const listContainer = block.querySelector('.list-container');
    listContainer.appendChild(listHeaders);
    listContainer.appendChild(listItems);
    listContainer.appendChild(listFooter);

    togglePaginationButtons();
    decorateIcons(block);
}

function buildListHeaders(headerConfig) {
    const listHeaders = document.createElement('div');
    listHeaders.classList.add('list-header');
    headerConfig.forEach((column, index) => {

        const columnWrapper = document.createElement('div');
        columnWrapper.classList.add('column-header-wrapper', `column-${index + 1}`);
        const columnEl = document.createElement('div');
        columnEl.classList.add('column-label');
        columnEl.dataset.sortable = column.sortable;
        columnEl.dataset.attribute = column.property;
        columnEl.dataset.name = column.label;
        columnEl.textContent = column.label;

        columnWrapper.appendChild(columnEl);

        if (column.sortable) {
            const columnSort = document.createElement('div');
            columnSort.classList.add('column-sort-wrapper');
            const columnSortAsc = document.createElement('img');
            columnSortAsc.classList.add('column-sort-asc', 'icon');
            columnSortAsc.src = '/icons/chevronUp.svg';
            columnSortAsc.title = 'Sort (Ascending)';
            columnSortAsc.addEventListener('click', () => {
                sortColumn('asc', column.property);
            });
            const columnSortDesc = document.createElement('img');
            columnSortDesc.classList.add('column-sort-desc', 'icon');
            columnSortDesc.src = '/icons/chevronDown.svg';
            columnSortDesc.title = 'Sort (Descending)';
            columnSortDesc.addEventListener('click', () => {
                sortColumn('desc', column.property);
            });
            columnSort.appendChild(columnSortAsc);
            columnSort.appendChild(columnSortDesc);
            columnWrapper.appendChild(columnSort);
        }
        listHeaders.appendChild(columnWrapper);
    });
    return listHeaders;
}


async function buildCampaignList(campaigns, headerConfig, numPerPage) {
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

        const columnsMap = new Map();

        for (const column of headerConfig) {
            const campaignColumn = document.createElement('div');
            campaignColumn.classList.add(`column-${headerConfig.indexOf(column) + 1}`, 'vertical-center');
            campaignColumn.dataset.property = column.property;

            let value;
            if (column.valueLookup) {
                value = await getValueFromEndpoint(campaign.node, column.endPointField);
            } else {
                value = getValueFromNode(campaign.node, column.endPointField);
            }

            switch (column.fieldType) {
                case 'date':
                    campaignColumn.textContent = dateFormat(value);
                    break;
                case 'product':
                    const campaignProducts = await buildProduct(value);
                    campaignProducts.classList.add('vertical-center');
                    campaignColumn.appendChild(campaignProducts);
                    break;
                case 'status':
                    const campaignStatusWrapper = document.createElement('div');
                    campaignStatusWrapper.classList.add('status-wrapper', 'vertical-center');
                    buildStatus(campaignStatusWrapper, value);
                    campaignColumn.appendChild(campaignStatusWrapper);
                    break;
                case 'geo':
                    campaignColumn.textContent = formatGeos(value);
                    break;
                case 'campaign':
                    const campaignInfoWrapper = document.createElement('div');
                    campaignInfoWrapper.classList.add('campaign-info-wrapper');

                    const campaignIconLink = document.createElement('a');
                    let campaignDetailsLink = host + `/${detailsPage}?programName=${value}&`;
                    let programID = await getValueFromEndpoint(campaign.node, column.endPointField2);
                    let campaignName = await getValueFromEndpoint(campaign.node, column.iconEndPointField2);
                    campaignDetailsLink += `programID=${programID}`;
                    campaignIconLink.href = campaignDetailsLink;

                    const campaignIcon = document.createElement('div');
                    campaignIcon.classList.add('campaign-icon');
                    campaignIcon.dataset.programname = getValueFromNode(campaign.node, column.iconEndPointField1);
                    campaignIcon.dataset.campaignname = getValueFromNode(campaign.node, column.iconEndPointField2);
                    campaignIcon.dataset.programid = getValueFromNode(campaign.node, column.endPointField2);

                    await addThumbnail(campaignIcon, value, campaignName);
                    campaignIconLink.appendChild(campaignIcon);

                    const campaignNameWrapper = document.createElement('div');
                    campaignNameWrapper.classList.add('campaign-name-wrapper');

                    const campaignNameLabel = document.createElement('div');
                    campaignNameLabel.classList.add('campaign-name-label');
                    campaignNameLabel.dataset.property = 'campaign';
                    campaignNameLabel.innerHTML = `${checkBlankString(value)}
                        <span class="tooltip">Program Name</span>`;

                    const campaignNameText = document.createElement('div');
                    campaignNameText.classList.add('campaign-name');
                    campaignNameText.innerHTML = `${checkBlankString(campaignName, 'Marketing Moment Not Available')}
                        <span class="tooltip">Marketing Moment</span>`;

                    campaignNameWrapper.appendChild(campaignNameLabel);
                    campaignNameWrapper.appendChild(campaignNameText);

                    // Add click event to the campaign name label and text
                    campaignNameLabel.addEventListener('click', () => {
                        window.location.href = campaignDetailsLink;
                    });
                    campaignNameText.addEventListener('click', () => {
                        window.location.href = campaignDetailsLink;
                    });

                    campaignInfoWrapper.appendChild(campaignIconLink);
                    campaignInfoWrapper.appendChild(campaignNameWrapper);
                    campaignColumn.appendChild(campaignInfoWrapper);
                    break;
                default:
                    campaignColumn.textContent = checkBlankString(value);
            }

            columnsMap.set(column.property, campaignColumn);
        }

        // Append columns to the row in the order defined by the headerConfig
        headerConfig.forEach(column => {
            campaignRow.appendChild(columnsMap.get(column.property));
        });

        listWrapper.appendChild(campaignRow);
    }
    return listWrapper;
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

function buildStatus(statusWrapper, status) {
    const campaignStatus = document.createElement('div');
    const statusStr = checkBlankString(status);
    const statusMatch = statusMapping.filter(item => item.value === statusStr);

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

function formatGeos(geoArray) {
    return geoArray.map(geo => geo.toUpperCase()).join(', ');
}


async function getValueFromEndpoint(node, endPointField) {
    const fields = endPointField.split('.');
    let value = node;
    for (const field of fields) {
        value = value[field];
    }
    return value;
}

function getValueFromNode(node, endPointField) {
    return getValueFromEndpoint(node, endPointField);
}

function togglePaginationButtons() {
    const footerPrev = document.querySelector('.footer-pagination-button.prev');
    const footerNext = document.querySelector('.footer-pagination-button.next');
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
}

function getFilterValues(){
    const filters = document.querySelectorAll('.selected-filter');
    const filterAttributes = [];
    filters.forEach(filter => {
        const dataType = filter.getAttribute('data-type');
        const dataValue = filter.getAttribute('data-value');
        filterAttributes.push({ type: dataType, value: dataValue, operator : "=" });
    });

    return filterAttributes;
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

    const footerPagination = document.createElement('div');
    footerPagination.classList.add('footer-pagination');
    const footerPrev = document.createElement('div');
    footerPrev.classList.add('footer-pagination-button', 'prev');
    footerPrev.textContent = 'Prev';

    footerPrev.addEventListener('click', (event) => {
        footerPrev.classList.remove('active');
        footerPrev.classList.add('disabled');
        prevPage(event.target);
    });

    const footerPageBtnsWrapper = document.createElement('div');
    footerPageBtnsWrapper.classList.add('footer-pages-wrapper');
    const footerNext = document.createElement('div');
    footerNext.classList.add('footer-pagination-button', 'next');
    buildCurrentPageDivElement(currentPage, footerPageBtnsWrapper);

    footerNext.addEventListener('click', (event) => {
        footerNext.classList.remove('active');
        footerNext.classList.add('disabled');
        nextPage(event.target);
    });

    footerNext.textContent = 'Next';
    footerPagination.appendChild(footerPrev);
    footerPagination.appendChild(footerPageBtnsWrapper);
    footerPagination.appendChild(footerNext);

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

    footerWrapper.appendChild(footerTotal);
    footerWrapper.appendChild(footerPagination);
    footerWrapper.appendChild(footerPerPage);
    return footerWrapper;
}

function buildCurrentPageDivElement(pageNumber, footerPageBtnsWrapper) {
    const footerPageBtn = document.createElement('div');
    footerPageBtn.classList.add('footer-pagination-pages', 'currentpage');
    footerPageBtn.id = "current-page";
    footerPageBtn.textContent = pageNumber;
    footerPageBtn.dataset.pagenumber = pageNumber;
    footerPageBtnsWrapper.appendChild(footerPageBtn);
}

function repaginate(dropdown) {
    currentNumberPerPage = dropdown.value;
    currentPage = 1;
    const block = document.querySelector('.program-list-author.block');
    decorate(block, currentNumberPerPage, '', false, false);
}

function nextPage(nextBtn) {
    if (currentPage < totalPages) {
        currentPage++;
        const block = document.querySelector('.program-list-author.block');
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
        const block = document.querySelector('.program-list-author.block');

        const currentCursor = currentPageInfo.currentCursor;
        const indexCursor = cursorArray.indexOf(currentCursor) - currentNumberPerPage;
        decorate(block, currentNumberPerPage, cursorArray[indexCursor], true, false, currentGraphqlFilter);
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
            sortArray.sort((a, b) => {
                a = a.textContent.split('/').reverse().join('');
                b = b.textContent.split('/').reverse().join('');
                return a.localeCompare(b);
            });
        } else {
            sortArray.sort((a, b) => {
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
