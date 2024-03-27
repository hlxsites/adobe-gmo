import { readBlockConfig } from '../../scripts/lib-franklin.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';

const icon = 'https://delivery-p108396-e1046543.adobeaemcloud.com/adobe/assets/deliver/urn:aaid:aem:acdaa42f-00ae-42f4-97e5-8309c42d9076/marketing-hub-102023-lockup-video.png'
const testCampaigns = [
    {
        'name': 'test campaign 1',
        'type': 'testType1',
        'status': 'On Track',
        'activeQuarter': 'testQuarter1',
        'launch': '03/07/2024', 
        'products': [
            'Photoshop',
            'Lightroom',
            'Express'
        ],
        'entitlements': 'testEntitlement1',
        'audiences': 'testAudiences1',
        'languages': 'English (WW)',
        'kpi': 'testKPI1',
        'categories': 'testCategories1', 
        'ddom': 'testDdom1',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        'name': 'campaign 2',
        'type': 'testType2',
        'status': 'On Track',
        'activeQuarter': 'testQuarter2',
        'launch': '04/03/2024', 
        'products': [
            'Photoshop',
            'Acrobat'
        ],
        'entitlements': 'testEntitlement2',
        'audiences': 'testAudiences2',
        'languages': 'English (WW)',
        'kpi': 'testKPI2',
        'categories': 'testCategories2', 
        'ddom': 'testDdom2',
        'description': 'Express mobile public beta is not a major at scale marketing moment (due to the limited nature of beta experience) with key audiences of Existing Express users, investors, and media.'
    },
    {
        'name': 'my third campaign',
        'type': 'testType3',
        'status': 'On Track',
        'activeQuarter': 'testQuarter3',
        'launch': '10/08/2020', 
        'products': [
            'Express'
        ],
        'entitlements': 'testEntitlement3',
        'audiences': 'testAudiences3',
        'languages': 'English (WW)',
        'kpi': 'testKPI3',
        'categories': 'testCategories3', 
        'ddom': 'testDdom3',
        'description': 'Drive content review and approval through the platform, increase visibility and efficiency across multiplie verticals.'
    },
    {
        'name': 'your fourth campaign',
        'type': 'testType4',
        'status': 'Delayed',
        'activeQuarter': 'testQuarter4',
        'launch': '12/10/2023', 
        'products': [
            'Acrobat',
            'Express'
        ],
        'entitlements': 'testEntitlement4',
        'audiences': 'testAudiences4',
        'languages': 'English (WW)',
        'kpi': 'testKPI4',
        'categories': 'testCategories4', 
        'ddom': 'testDdom4',
        'description': 'Drive new unique visitors early in their careers to engage with Acrobat (US/APAC/JP) and change perception through focus on BSV (Germany).'
    },
    {
        'name': 'five campaigns in',
        'type': 'testType5',
        'status': 'Canceled',
        'activeQuarter': 'testQuarter5',
        'launch': '06/21/2023', 
        'products': [
            'AEM',
            'Illustrator'
        ],
        'entitlements': 'testEntitlement5',
        'audiences': 'testAudiences5',
        'languages': 'English (WW)',
        'kpi': 'testKPI5',
        'categories': 'testCategories5',
        'ddom': 'testDdom5',
        'description': 'Optimize media strategy to target Hybrid Hobbyists and drive home Lightroom\'s value props.'
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
        'attribute': 'launch',
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
    const numPerPage = 2;
    const campaignCount = testCampaigns.length;
    const config = testConfig;
    const listHeaders = buildListHeaders(config);
    const listItems = buildCampaignList(testCampaigns, numPerPage);
    const listFooter = buildListFooter(campaignCount, numPerPage);
    //paginate(listItems);

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

function buildCampaignList(campaigns, numPerPage) {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-items');

    campaigns.forEach((campaign, index) => {
        const campaignRow = document.createElement('div');
        campaignRow.classList.add('campaign-row');
        if ((index + 1) > numPerPage) campaignRow.classList.add('hidden');
        const campaignInfoWrapper = document.createElement('div');
        campaignInfoWrapper.classList.add('campaign-info-wrapper','column-1');
        const campaignIcon = document.createElement('div');
        campaignIcon.classList.add('campaign-icon');
        campaignIcon.innerHTML = `<img src=${icon}></img>`;
        const campaignName = document.createElement('div');
        campaignName.classList.add('campaign-name-wrapper');
        campaignName.innerHTML = `
            <div class='campaign-name-label'>Campaign Name</div>
            <div class='campaign-name' data-property='campaign'>${campaign.name}</div>
        `
        campaignInfoWrapper.appendChild(campaignIcon);
        campaignInfoWrapper.appendChild(campaignName);
        const campaignOverview = document.createElement('div');
        campaignOverview.textContent = campaign.description;
        campaignOverview.classList.add('column-2', 'campaign-description');
        campaignOverview.dataset.property = 'description';
        const campaignLaunch = document.createElement('div');
        campaignLaunch.textContent = campaign.launch;
        campaignLaunch.classList.add('column-3', 'campaign-launch-date');
        campaignLaunch.dataset.property = 'launch';
        const campaignProducts = buildProducts(campaign.products);
        campaignProducts.classList.add('column-4');
        const campaignLanguage = document.createElement('div');
        campaignLanguage.textContent = campaign.languages;
        campaignLanguage.classList.add('column-5');
        const campaignStatusWrapper = document.createElement('div');
        campaignStatusWrapper.classList.add('status-wrapper', 'column-6');
        const campaignStatus = document.createElement('div');
        campaignStatus.textContent = campaign.status;
        campaignStatus.classList.add(determineStatusColor(campaign.status)); // this will need additional processing
        campaignStatus.classList.add('status');
        campaignStatus.dataset.property = 'status';
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

function buildProducts(products) {
    const campaignProducts = document.createElement('div');
    if (products.length > 1) {
        products.forEach((product) => {
            console.log(product);
            const productEl = document.createElement('div');
            productEl.classList.add('product-entry');
            productEl.innerHTML = `
                <span class='icon icon-${product}'></span>
                <span class='product-label'>${product}</span>
            `
            campaignProducts.appendChild(productEl);
        })
    } else {

    }

    //campaignProducts.textContent = products; // this will need additional processing
    return campaignProducts;
}

function buildListHeaders(headerConfig) {
    //console.log(headerConfig);
    const config = headerConfig;
    const listHeaders = document.createElement('div');
    listHeaders.classList.add('list-header');
    let columnCounter = 1;
    config.forEach((column)  => {
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
            //columnSortAsc.dataset.property = column.attribute;
            columnSortAsc.addEventListener('click', () => {
                sortColumn('asc', column.attribute);
            })
            //columnSortAsc.textContent = "^";
            const columnSortDesc = document.createElement('span');
            columnSortDesc.classList.add('column-sort-desc', 'icon', 'icon-chevronDown');
            //columnSortDesc.dataset.property = column.attribute;
            columnSortDesc.addEventListener('click', () => {
                sortColumn('desc', column.attribute);
            })
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

function buildListFooter(rows, rowsPerPage) {
    const pages = Math.ceil(rows / rowsPerPage);
    const footerWrapper = document.createElement('div');
    footerWrapper.classList.add('list-footer', 'footer-wrapper');
    console.log('calculated num of pages: ' + pages);
    footerWrapper.dataset.pages = pages;
    const footerTotal = document.createElement('div');
    footerTotal.textContent = `Page 1 of ${pages} -- ${rows} total results`;
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
    const footerPageBtn = document.createElement('div');
    footerPageBtn.classList.add('footer-pagination-pages', 'currentpage');
    footerPageBtn.id = "current-page";
    footerPageBtn.textContent = '1';
    footerPageBtn.dataset.pagenumber = 1;
    footerPageBtnsWrapper.appendChild(footerPageBtn);
    const footerNext = document.createElement('div');
    footerNext.classList.add('footer-pagination-button', 'next');
    if (pages > 1) {
        footerNext.classList.add('active');
        for (let i = 2; i <= pages; i++) {
            const footerPageBtns = document.createElement('div');
            footerPageBtns.classList.add('footer-pagination-pages');
            footerPageBtns.textContent = i;
            footerPageBtns.dataset.pagenumber = i;
            footerPageBtnsWrapper.appendChild(footerPageBtns);
        }
    }
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
    const footerPerPageDropdown = document.createElement('div');
    footerPerPageDropdown.innerHTML = `
    <select name="per-page" id="per-page">
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
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

function paginate(listItems) {

}

function nextPage(nextBtn) {
    if (!(nextBtn.classList.contains('active'))) {
        return;
    }
    const prevBtn = document.querySelector('.footer-pagination-button.prev');
    const currentPageBtn = document.querySelector('#current-page');
    const currentPageValue = parseInt(currentPageBtn.dataset.pagenumber);
    const targetPage = (currentPageValue + 1);
    const nextSelector = "[data-pagenumber='" + (targetPage) + "']";
    const nextPageBtn = document.querySelector(nextSelector);
    const itemsPerPage = document.querySelector('#per-page').value;
    const listItems = document.querySelectorAll('.campaign-row');

    const lowerBound = ((targetPage * itemsPerPage) - itemsPerPage);
    const upperBound = (targetPage * itemsPerPage);

    listItems.forEach((row, index) => {
        //if ((index + 1) <= (currentPageValue * itemsPerPage) || (index + 1) > (targetPage * itemsPerPage)) {
        if ((index + 1) <= (lowerBound) || (index + 1) > (upperBound)) {
            row.classList.add('hidden');
        } else {
            row.classList.remove('hidden');
        }
    })
    //increment page counter
    prevBtn.classList.add('active');
    const totalPages = parseInt(document.querySelector('.list-footer.footer-wrapper').dataset.pages);
    if (totalPages == targetPage) nextBtn.classList.remove('active');
    currentPageBtn.id = '';
    currentPageBtn.classList.remove('currentpage');
    nextPageBtn.id = 'current-page';
    nextPageBtn.classList.add('currentpage');
}

function prevPage(prevBtn) {
    if (!(prevBtn.classList.contains('active'))) {
        return;
    }
    const nextBtn = document.querySelector('.footer-pagination-button.next');
    const currentPageBtn = document.querySelector('#current-page');
    const currentPageValue = parseInt(currentPageBtn.dataset.pagenumber);
    const targetPage = (currentPageValue - 1);
    const prevSelector = "[data-pagenumber='" + (targetPage) + "']";
    const prevPageBtn = document.querySelector(prevSelector);
    const itemsPerPage = document.querySelector('#per-page').value;
    const listItems = document.querySelectorAll('.campaign-row');

    const lowerBound = ((targetPage * itemsPerPage) - itemsPerPage);
    //console.log('test lower bound: ' + lowerBound);
    const upperBound = (targetPage * itemsPerPage);
    //console.log('test upper bound: ' + upperBound);

    listItems.forEach((row, index) => {
        //if ((index + 1) <= (currentPageValue * itemsPerPage) || (index + 1) > (targetPage * itemsPerPage)) {
        if ((index + 1) < (lowerBound) || (index + 1) > (upperBound)) {
            row.classList.add('hidden');
        } else {
            row.classList.remove('hidden');
        }
    })
    nextBtn.classList.add('active');
    //const totalPages = parseInt(document.querySelector('.list-footer.footer-wrapper').dataset.pages);
    if (targetPage == 1) prevBtn.classList.remove('active');
    currentPageBtn.id = '';
    currentPageBtn.classList.remove('currentpage');
    prevPageBtn.id = 'current-page';
    prevPageBtn.classList.add('currentpage');
}

function sortColumn(dir, property) {
    // need to handle dates
    console.log('clicked sort: ' + dir + ', ' + property);
    const container = document.querySelector('.list-items');
    if (!container) {
        console.error("Could not locate list container.");
        return;
    }

    const selector = '[data-property="' + property + '"]';
    console.log(selector)
    const divs = document.querySelectorAll(selector);
    console.log(divs.length);
    //document.querySelectorAll('[data-property="description"]')
    const sortArray = [];

    // Retrieve text content of each div and store it in an array
    divs.forEach(div => {
        const textContent = div.textContent.trim();
        //const row = div.parentElement; // need to make this more general
        const row = div.closest('.campaign-row');
        console.log(row);
        sortArray.push({ textContent, row });
    });

    // Sort the divs based on their text content
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

    // Update the container with the sorted divs
    sortArray.forEach(({ row }, index) => {
        container.appendChild(row);
    });
}

function determineStatusColor(status) {
    switch(status) {
        case 'On Track':
            return 'green';
        case 'Delayed':
            return 'yellow';
        case 'Canceled':
            return 'red';
        default:
            return 'red';       
    }
}