import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';

const icon = 'https://delivery-p108396-e1046543.adobeaemcloud.com/adobe/assets/deliver/urn:aaid:aem:acdaa42f-00ae-42f4-97e5-8309c42d9076/marketing-hub-102023-lockup-video.png'
const testCollections = [
    {
        'name': 'test campaign 1',
        'type': 'testType1',
        'status': 'testStatus1',
        'activeQuarter': 'testQuarter1',
        'launch': 'testYear1', 
        'products': 'testProduct1',
        'entitlements': 'testEntitlement1',
        'audiences': 'testAudiences1',
        'languages': 'testLanguages1',
        'kpi': 'testKPI1',
        'categories': 'testCategories1', 
        'ddom': 'testDdom1',
        'description': 'This is a test description that can be 2 lines long.'
    },
    {
        'name': 'campaign 2',
        'type': 'testType2',
        'status': 'testStatus2',
        'activeQuarter': 'testQuarter2',
        'launch': 'testYear2', 
        'products': 'testProduct2',
        'entitlements': 'testEntitlement2',
        'audiences': 'testAudiences2',
        'languages': 'testLanguages2',
        'kpi': 'testKPI2',
        'categories': 'testCategories2', 
        'ddom': 'testDdom2',
        'description': 'This is a test description that can be 2 lines long.'
    },
    {
        'name': 'my third campaign',
        'type': 'testType3',
        'status': 'testStatus3',
        'activeQuarter': 'testQuarter3',
        'launch': 'testYear3', 
        'products': 'testProduct3',
        'entitlements': 'testEntitlement3',
        'audiences': 'testAudiences3',
        'languages': 'testLanguages3',
        'kpi': 'testKPI3',
        'categories': 'testCategories3', 
        'ddom': 'testDdom3',
        'description': 'This is a test description that can be 2 lines long.'
    },
    {
        'name': 'your fourth campaign',
        'type': 'testType4',
        'status': 'testStatus4',
        'activeQuarter': 'testQuarter4',
        'launch': 'testYear4', 
        'products': 'testProduct4',
        'entitlements': 'testEntitlement4',
        'audiences': 'testAudiences4',
        'languages': 'testLanguages4',
        'kpi': 'testKPI4',
        'categories': 'testCategories4', 
        'ddom': 'testDdom4',
        'description': 'This is a test description that can be 2 lines long.'
    },
    {
        'name': 'five campaigns in',
        'type': 'testType5',
        'status': 'testStatus5',
        'activeQuarter': 'testQuarter5',
        'launch': 'testYear5', 
        'products': 'testProduct5',
        'entitlements': 'testEntitlement5',
        'audiences': 'testAudiences5',
        'languages': 'testLanguages5',
        'kpi': 'testKPI5',
        'categories': 'testCategories5',
        'ddom': 'testDdom5',
        'description': 'This is a test description that can be 2 lines long.'
    }
]
const testConfig = [
    {
        'name': 'Campaign',
        'attribute': 'campaign',
        'sortable': 'true'
    },
    {
        'name': 'Overview',
        'attribute': 'description',
        'sortable': 'false'
    },
    {
        'name': 'Launch Date',
        'attribute': 'launchDate',
        'sortable': 'true',
        'type': 'date'
    },
    {
        'name': 'Products',
        'attribute': 'products'
    },
    {
        'name': 'Language',
        'attribute': 'language',
        'type': 'string'
    },
    {
        'name': 'Status',
        'attribute': 'status',
        'sortable': 'true'
    }
]


export default async function decorate(block) {
    //const config = readBlockConfig(block); // this will be for final implementation
    const config = testConfig;
    const listHeaders = buildListHeaders(config);
    const listItems = buildCampaignList(testCollections);
    const listFooter = buildListFooter();

    block.innerHTML = `
        <div class="list-container">
        </div>`

    /*
                <div class="list-header">
                ${listHeaders}
            </div>
            <div class="list-items">
            </div>
    */
    const listContainer = block.querySelector('.list-container');
    listContainer.appendChild(listHeaders);
    listContainer.appendChild(listItems);
    listContainer.appendChild(listFooter);
    decorateIcons(block);
}

function buildCampaignList(campaigns) {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-items');
    campaigns.forEach((campaign) => {
        const campaignRow = document.createElement('div');
        campaignRow.classList.add('campaign-row');
        const campaignInfoWrapper = document.createElement('div');
        campaignInfoWrapper.classList.add('campaign-info-wrapper','column-1');
        const campaignIcon = document.createElement('div');
        campaignIcon.classList.add('campaign-icon');
        campaignIcon.innerHTML = `<img src=${icon}></img>`
        const campaignName = document.createElement('div');
        campaignName.classList.add('campaign-name-wrapper');
        campaignName.innerHTML = `
            <div class='campaign-name-label'>Campaign Name</div>
            <div class='campaign-name'>${campaign.name}</div>
        `
        campaignInfoWrapper.appendChild(campaignIcon);
        campaignInfoWrapper.appendChild(campaignName);
        const campaignOverview = document.createElement('div');
        campaignOverview.textContent = campaign.description;
        campaignOverview.classList.add('column-2');
        const campaignLaunch = document.createElement('div');
        campaignLaunch.textContent = campaign.launch;
        campaignLaunch.classList.add('column-3', 'campaign-launch-date');
        const campaignProducts = document.createElement('div');
        campaignProducts.textContent = campaign.products; // this will need additional processing
        campaignProducts.classList.add('column-4');
        const campaignLanguage = document.createElement('div');
        campaignLanguage.textContent = campaign.languages;
        campaignLanguage.classList.add('column-5');
        const campaignStatusWrapper = document.createElement('div');
        campaignStatusWrapper.classList.add('status-wrapper', 'column-6');
        const campaignStatus = document.createElement('div');
        campaignStatus.textContent = campaign.status; // this will need additional processing
        campaignStatus.classList.add('status');
        campaignStatusWrapper.appendChild(campaignStatus);
        campaignRow.appendChild(campaignInfoWrapper);
        campaignRow.appendChild(campaignOverview);
        campaignRow.appendChild(campaignLaunch);
        campaignRow.appendChild(campaignProducts);
        campaignRow.appendChild(campaignLanguage);
        campaignRow.appendChild(campaignStatusWrapper);

        listWrapper.appendChild(campaignRow);
    });
    return listWrapper;
}

function buildListHeaders(headerConfig) {
    //console.log(headerConfig);
    const config = headerConfig;
    const listHeaders = document.createElement('div');
    listHeaders.classList.add('list-header');
    let columnCounter = 1;
    config.forEach((column) => {
        //console.log(column);
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
            // <span class="icon icon-previous"></span>
            columnSortAsc.classList.add('column-sort-asc', 'icon', 'icon-chevronUp');
            //columnSortAsc.textContent = "^";
            const columnSortDesc = document.createElement('span');
            columnSortDesc.classList.add('column-sort-desc', 'icon', 'icon-chevronDown');
            //columnSortDesc.textContent = "v";
            columnSort.appendChild(columnSortAsc);
            columnSort.appendChild(columnSortDesc);
            columnWrapper.appendChild(columnSort);
        }
        //end sorting
        listHeaders.appendChild(columnWrapper);
    })
    return listHeaders;
}

function buildListFooter() {
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('list-footer', 'footer-wrapper');
    const footerTotal = document.createElement('div');
    footerTotal.textContent = 'Page 1 of 2 -- 46 total results';
    footerTotal.classList.add('footer-total');
    // pagination
    const footerPagination = document.createElement('div');
    footerPagination.classList.add('footer-pagination');
    const footerPrev = document.createElement('div');
    footerPrev.classList.add('footer-pagination-button', 'prev');
    footerPrev.textContent = 'Prev';
    const footerPages = document.createElement('div');
    footerPages.classList.add('footer-pagination-pages');
    footerPages.textContent = '1';
    const footerNext = document.createElement('div');
    footerNext.classList.add('footer-pagination-button', 'next');
    footerNext.textContent = 'Next';
    footerPagination.appendChild(footerPrev);
    footerPagination.appendChild(footerPages);
    footerPagination.appendChild(footerNext);
    // end pagination

    // per-page controls
    const footerPerPage = document.createElement('div');
    footerPerPage.classList.add('footer-perPage');
    const footerPerPageLabel = document.createElement('div');
    footerPerPageLabel.textContent = 'Per Page';
    footerPerPageLabel.classList.add('footer-perPage-label');
    const footerPerPageDropdown = document.createElement('div');
    footerPerPageDropdown.innerHTML = `
    <select name="per-page" id="per-page">
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="48">48</option>
        <option value="64">64</option>
        <option value="80">80</option>
    </select>
    `
    footerPerPageDropdown.classList.add('footer-perPage-dropdown');
    footerPerPage.appendChild(footerPerPageLabel);
    footerPerPage.appendChild(footerPerPageDropdown);
    // end per-page controls

    footerWrapper.appendChild(footerTotal);
    footerWrapper.appendChild(footerPagination);
    footerWrapper.appendChild(footerPerPage);
    return footerWrapper;
}
