import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getQueryVariable } from '../../scripts/shared.js';
import { getProgramDetails } from '../../scripts/graphql.js';
import { checkBlankString } from '../gmo-campaign-list/gmo-campaign-list.js'

    const testData = [
    {
        'category': 'Awareness',
        'subcategory': 'Meet AI Assistant',
        'name': 'Content Name',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '03/07/2024',
        'driver': 'Linda Tan'
    },
    {
        'category': 'Awareness',
        'subcategory': 'Meet AI Assistant',
        'name': 'Content Name',
        'type': 'Animated Display',
        'channel': 'All',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '86',
        'dueDate': '03/07/2024',
        'driver': 'Linda Tan'
    },
    {
        'category': 'Awareness',
        'subcategory': 'Customer Story',
        'name': 'Bryan',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '03/07/2024',
        'driver': 'Linda Tan'
    },
    {
        'category': 'Awareness',
        'subcategory': 'Customer Story',
        'name': 'Maegan',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '17',
        'dueDate': '03/07/2024',
        'driver': 'Aina Tchoshanova'
    },
    {
        'category': 'Awareness',
        'subcategory': 'Influencer Videos and Social Owned Content',
        'name': 'Influencer',
        'type': 'Streaming Video',
        'channel': 'Tiktok',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '0%',
        'dueDate': '03/17/2024',
        'driver': 'Aina Tchoshanova'
    },
    {
        'category': 'Education',
        'subcategory': 'Meet AI Assistant',
        'name': 'Content Name',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '04/12/2024',
        'driver': 'Leah Walker'
    },
    {
        'category': 'Education',
        'subcategory': 'Meet AI Assistant',
        'name': 'Content Name',
        'type': 'Animated Display',
        'channel': 'All',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '86',
        'dueDate': '04/12/2024',
        'driver': 'Leah Walker'
    },
    {
        'category': 'Education',
        'subcategory': 'Customer Story',
        'name': 'Bryan',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '05/09/2024',
        'driver': 'Benjamin Lee'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Meet the new AI Assistant',
        'name': 'Richard',
        'type': 'Influencer Content',
        'channel': 'TikTok',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '12',
        'dueDate': '05/09/2024',
        'driver': 'Benjamin Lee'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Meet the new AI Assistant',
        'name': 'Antonio',
        'type': 'Influencer Content',
        'channel': 'YouTube',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '5',
        'dueDate': '05/09/2024',
        'driver': 'Benjamin Lee'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Financial Report',
        'name': 'Citigroup',
        'type': 'Documentation',
        'channel': 'None',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '77',
        'dueDate': '05/23/2024',
        'driver': 'Benjamin Lee'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Adobe Owned Use Cases',
        'name': 'David',
        'type': 'Streaming Video',
        'channel': 'Twitch.tv',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '97%',
        'dueDate': '06/17/2024',
        'driver': 'Benjamin Lee'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Adobe Owned Use Cases',
        'name': 'Charles',
        'type': 'Media',
        'channel': 'x.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '100',
        'dueDate': '07/11/2024',
        'driver': 'Rufus Green'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Early Access Offer',
        'name': 'Ashley',
        'type': 'Influencer Content',
        'channel': 'TikTok',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '26',
        'dueDate': '08/01/2024',
        'driver': 'Rufus Green'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Email - AI Assistant + Early Access Offer',
        'name': 'Missy',
        'type': 'Artificial Intelligence',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '67',
        'dueDate': '08/01/2024',
        'driver': 'Rufus Green'
    },
    {
        'category': 'Conversion',
        'subcategory': 'Influencer Use Cases / CAMP',
        'name': 'Logan',
        'type': 'Streaming Video',
        'channel': 'YouTube',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '89',
        'dueDate': '09/21/2024',
        'driver': 'Marcus Webber'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Content Name',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '09/21/2024',
        'driver': 'Marcus Webber'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Content Name',
        'type': 'Animated Display',
        'channel': 'All',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '86',
        'dueDate': '10/09/2024',
        'driver': 'Marcus Webber'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Bryan',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Maegan',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '17',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Bryan',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': 'Use',
        'subcategory': 'Content Supply Chain',
        'name': 'Maegan',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '17',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': 'Use',
        'subcategory': 'Customer Story',
        'name': 'Bryan',
        'type': 'Streaming Video',
        'channel': 'Adobe.com',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '57',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': 'Use',
        'subcategory': 'Customer Story',
        'name': 'Maegan',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '17',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': '',
        'subcategory': '',
        'name': 'Empty Cat Empty Sub',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '35',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': '',
        'subcategory': 'Empty Category',
        'name': 'Empty Category Name',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '35',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'subcategory': 'No Category',
        'name': 'No Category Name',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '85',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    },
    {
        'category': '',
        'name': 'No Subcategory Name',
        'type': 'Animated Display',
        'channel': 'Display',
        'reviewLinkName': 'Review Link',
        'reviewLinkHref': '#',
        'finalAssetName': 'Final Asset',
        'finalAssetHref': '#',
        'kpi': 'KPI',
        'statusUpdate': '35',
        'dueDate': '11/29/2024',
        'driver': 'Sean Smith'
    }
];

export default async function decorate(block) {
    //const rows = buildTable(testData);
    // /graphql/execute.json/gmo/getProgramDetails;programName=<name here>
    const programName = getQueryVariable('programName');
    const graphqlData = await getProgramDetails(programName);
    const program = graphqlData.data.programList.items[0];
    const rows = buildTableNoGroups(testData);
    const kpis = buildKPIList(program).outerHTML;
    const products = buildProductList(program).outerHTML;
    const audiences = buildAudienceList(program).outerHTML;
    const date = formatDate(program.launchDate);
    const status = buildStatus(program.status).outerHTML;
    block.innerHTML = `
    <div class="back-button">
        <span class="icon icon-back"></span>
        <span class="back-label">Back</span>
    </div>
    <div class="main-body-wrapper">
        <div class="details-header-wrapper">
            <div class="campaign-img">
            </div>
            <div class="header-title">
                <div class="header-row1">
                    <span class="h1">${program.programName}</span>
                    ${status}
                </div>
                <div class="header-row2">
                    <span class="icon icon-calendar"></span>
                    <span class="campaign-date">${date}</span>
                </div>
            </div>
        </div>
        <div class="tab-wrapper">
            <div id="tab1toggle" data-target="tab1" class="tabBtn active">Overview</div>
            <div id="tab2toggle" data-target="tab2" class="tabBtn">Deliverables</div>
            <div id="tab3toggle" data-target="tab3" class="tabBtn inactive">Calendar</div>
        </div>
        <div id="tab1" class="two-column overview tab">
            <div class="overview-wrapper">
                <span class="h1 overview-heading">At a Glance</span>
                <span class="h3">Product Value</span>
                <span class="description">${checkBlankString(program.productValue.plaintext)}
                </span>
                <div class="button no-bg">Read more</div>
                <div class="kpis-wrapper">
                    <span class="h3">KPIs to Measure Success</span>
                    ${kpis}
                </div>
                <div class="use-cases-wrapper inactive">
                    <span class="h3">Hero Use Cases</span>
                    <div class="tags-wrapper">
                        <div class="use-case-tag">Text to Image</div>
                        <div class="use-case-tag">Use Case 2</div>
                    </div>
                </div>
                <div class="main-message-wrapper inactive">
                    <span class="h3">Main Message</span>
                    <span class="description">
                        A major genAI release of the Photoshop beta app that delivers new and enhanced generative AI capabilities.
                    </span>
                </div>
                <div class="channel-scope-wrapper inactive">
                    <span class="h3">Key Channel Scope</span>
                    <div class="tags-wrapper">
                        <div class="scope-tag">A.com</div>
                        <div class="scope-tag">Email</div>
                        <div class="scope-tag">PR</div>
                    </div>
                </div>
                <div class="links-wrapper inactive">
                    <span class="h3">Links to Important Artifacts</span>
                    <div class="links">
                        <a href="#" class="campaign-link">Creative Architecture</a>
                        <a href="#" class="campaign-link">E2E Journeys</a>
                        <a href="#" class="campaign-link">GTM-S</a>
                        <a href="#" class="campaign-link">GTM-P</a>
                        <a href="#" class="campaign-link">Marketing Brief</a>
                        <a href="#" class="campaign-link">Messaging Doc</a>
                    </div>
                </div>
            </div>
            <div class="infocards-wrapper">
                <div class="card milestones inactive">
                    <div class="card-heading h3">Milestones</div>
                    <div class="milestone">
                        <span class="icon icon-trophy"></span>
                        Milestone 1
                    </div>
                    <div class="milestone">
                        <span class="icon icon-trophy"></span>
                        Milestone 2
                    </div>
                    <div class="milestone">
                        <span class="icon icon-trophy"></span>
                        Milestone 3
                    </div>
                </div>
                <div class="card products">
                    <div class="card-heading h3">Products</div>
                    ${products}
                </div>
                <div class="card scope inactive">
                    <div class="card-heading h3">Feature Scope</div>
                    <ul>
                        <li>Text to image</li>
                        <li>Generative fill</li>
                        <li>Text effects</li>
                    </ul>
                </div>
                <div class="card audiences">
                    <div class="card-heading h3">Audiences</div>
                    ${audiences}
                </div>
            </div>
        </div>
        <div id="tab2" class="deliverables tab inactive">
            <div class="page-heading">
                <div class="artifacts-wrapper inactive">
                    <span class="h3">Links to Important Artifacts</span>
                    <div class="links">
                        <a href="#" class="campaign-link">Creative Architecture</a>
                        <a href="#" class="campaign-link">E2E Journeys</a>
                        <a href="#" class="campaign-link">Marketing Brief</a>
                    </div>
                </div>
                <div class="total-assets inactive">
                    <div class="h3">Total Assets</div>
                    <span class="description">7</span>
                </div>
            </div>
            <div class="table-wrapper">
                <div class="table-header">
                    <div class="header table-column column1">Deliverable Name</div>
                    <div class="header table-column column2">Deliverable Type</div>
                    <div class="header table-column column3">Channel</div>
                    <div class="header table-column column4">Review Link</div>
                    <div class="header table-column column5">Final Asset</div>
                    <div class="header table-column column6">KPI</div>
                    <div class="header table-column column7">Status Update</div>
                    <div class="header table-column column8">Completion Date</div>
                    <div class="header table-column column9">Project Owner</div>
                </div>
                <div class="table-content">
                </div>
            </div>
        </div>
        <div id="tab3" class="calendar tab inactive">
        </div>
    </div>
    `;
    const tableRoot = block.querySelector('.table-content');
    tableRoot.appendChild(rows);
    block.querySelector('.tab-wrapper').addEventListener('click', (event) => {
        switchTab(event.target);
    })
    block.querySelector('.back-button').addEventListener('click', (event) => {
        const host = location.origin + '/drafts/mdickson';
        document.location.href = host + `/campaigns`;
    })
    decorateIcons(block);
}

function switchTab(tab) {
    if (tab.classList.contains('active') || tab.classList.contains('tab-wrapper')) {
        return;
    } 
    document.querySelector('.tabBtn.active').classList.toggle('active');
    document.querySelector(`.tab:not(.inactive)`).classList.toggle('inactive');
    const targetTab = tab.dataset.target;
    const tabElement = document.getElementById(targetTab);
    tabElement.classList.toggle('inactive');
    tab.classList.toggle('active');
}

function buildKPIList(program) {
    const kpiList = document.createElement('ul');
    program.primaryKpi.forEach((kpi) => {
        const kpiLi = createKPI(kpi);
        kpiList.appendChild(kpiLi);
    })
    program.additionalKpi.forEach((kpi) => {
        const kpiLi = createKPI(kpi);
        kpiList.appendChild(kpiLi);
    })
    return kpiList;
}

function createKPI(kpi) {
    const kpiLi = document.createElement('li');
    const kpiText = parseString(kpi);
    kpiLi.textContent = kpiText;
    return kpiLi;
}

function buildProductList(program) {
    const product = checkBlankString(program.productOffering);
    const productList = document.createElement('div');
    productList.classList.add('product', 'card-content');
    const productMappings = {
        "acrobat-pro": {
            "name": "Acrobat Pro",
            "icon": "Acrobat"
        },
        "lightroom": {
            "name": "Lightroom",
            "icon": "Lightroom",
        },
        "Not Available": {
            "name": "Not Available",
            "icon": "gear"
        }
    }
    const productName = productMappings[product].name;
    const productLabel = productMappings[product].icon;
    productList.innerHTML = `
        <span class="icon icon-${productLabel}"></span>
        ${productName}
    `
    return productList;
}

function buildAudienceList(program) {
    const audienceList = document.createElement('div');
    program.primaryAudience.forEach((audience) => {
        const audienceDiv = createAudience(audience);
        audienceList.appendChild(audienceDiv);
    })
    program.additionalAudiences?.forEach((audience) => {
        const audienceDiv = createAudience(audience);
        audienceList.appendChild(audienceDiv);
    })
    return audienceList;
}

function buildStatus(status) {
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('campaign-status');
    const statusMappings = {
        "PLN": {
            "label": "Planning",
            "color": "green"
        }
    }
    const statusLabel = statusMappings[status].label;
    const statusColor = statusMappings[status].color;
    statusDiv.textContent = statusLabel;
    statusDiv.classList.add(statusColor);
    return statusDiv;
}

function createAudience(audience) {
    const text = parseString(audience);
    const audienceDiv = document.createElement('div');
    audienceDiv.classList.add('audience', 'card-content');
    audienceDiv.innerHTML = `
        <span class="icon icon-gear"></span>
        ${text}
    `;
    return audienceDiv;
}

function parseString(text) {
    let parsed = text.replace(/-/g, ' ').split(' ');
    parsed[0] = parsed[0].charAt(0).toUpperCase() + parsed[0].slice(1);
    parsed = parsed.join(' ');
    return parsed;
}

function formatDate(dateString) {
    const parts = dateString.split('-');
    const yyyy = parts[0];
    const mm = parts[1];
    const dd = parts[2];

    // Formatting the date into mm/dd/yyyy format
    const formattedDate = mm + '/' + dd + '/' + yyyy;
    
    return formattedDate;
}

function buildTable(data) {
    const rows = document.createElement('div');
    const uniqueCategories = getUniqueValues(data, 'category');
    let isRowHidden = true;
    let emptyCategory = false;
    uniqueCategories.forEach((category) => {
        // build header row
        let headerRow;
        if (!((category == undefined) || (category === ''))) {
            headerRow = buildHeaderRow(category, 'header', false);
            attachListener(headerRow);
            rows.appendChild(headerRow);
        } else {
            emptyCategory = true;
            headerRow = rows;
        }
        const matchingCampaigns = data.filter(campaign => campaign.category === category);
        // create subcategory headings
        const subCats = getUniqueValues(matchingCampaigns, 'subcategory');
        subCats.forEach((subCat) => {
            let subCatHeader;
            if (!((subCat == undefined) || (subCat === ''))) {
                if(emptyCategory) {
                    subCatHeader = buildHeaderRow(subCat, 'category', false);
                } else {
                    subCatHeader = buildHeaderRow(subCat, 'subcategory', true);
                }
                attachListener(subCatHeader);
                headerRow.appendChild(subCatHeader);
            } else {
                subCatHeader = rows;
                isRowHidden = false;
            }

            const matchingSubs = data.filter(campaign => campaign.subcategory === subCat);
            matchingSubs.forEach((campaign) => {
                const tableRow = buildTableRow(campaign, isRowHidden);
                subCatHeader.appendChild(tableRow);
                isRowHidden = true;
            });
        });
    })
    return rows;
}

function buildTableNoGroups(data) {
    const rows = document.createElement('div');
    data.forEach((campaign) => {
        const tableRow = buildTableRow(campaign, false);
        rows.appendChild(tableRow);
    })
    return rows;
}

function getUniqueValues(array, filterValue) {
    const uniqueValues = new Set();
    array.forEach(obj => {
        uniqueValues.add(obj[filterValue]);
    })
    return Array.from(uniqueValues);
}

/**
 * @param {string} category - String value of the category property
 * @param {string} headerType - Type of header. Either 'category' or 'subcategory'
 * @param {boolean} isInactive - Determines whether or not the header will be hidden initially
 */
function buildHeaderRow(category, headerType, isInactive) {
    const headerRow = document.createElement('div');
    headerRow.classList.add('row', 'collapsible', 'header');
    let divopen;
    if (headerType === 'subcategory') { 
        headerRow.classList.add('subheader');
        divopen = '<div class="heading-wrapper subheading">';
    } else {
        divopen = '<div class="heading-wrapper">';
    }
    if (isInactive) headerRow.classList.add('inactive');
    headerRow.innerHTML = `
        ${divopen}
            <span class="icon icon-next"></span>
            <span class="icon icon-collapse inactive"></span>
            <div class="headertext">${category}</div>
        </div>`;
    return headerRow;
}

function buildTableRow(campaignJson, createHidden) {
    //console.log(campaignJson);
    const dataRow = document.createElement('div');
    dataRow.classList.add('row', 'datarow');
    if (createHidden) dataRow.classList.add('inactive');
    dataRow.innerHTML = `
        <div class='property table-column column1'>${campaignJson.name}</div>
        <div class='property table-column column2'>${campaignJson.type}</div>
        <div class='property table-column column3'>${campaignJson.channel}</div>
        <div class='property table-column column4'>
            <a href="${campaignJson.reviewLinkHref}" class="campaign-link">Review Link</a>
        </div>
        <div class='property table-column column5'>
            <a href="${campaignJson.finalAssetHref}" class="campaign-link">Final Asset</a>
        </div>
        <div class='property table-column column6'>${campaignJson.kpi}</div>
        <div class='property table-column column7 justify-center'>
            <div class='status-wrapper'>
                <div class='status-heading'>
                    <div class='status-label'>Progress</div>
                    <div class='status-percent'>${campaignJson.statusUpdate}%</div>
                </div>
                <div class='status-bar-wrapper'>
                    <div class='status-bar-underlay'></div>
                    <div class='status-bar' style='width: ${campaignJson.statusUpdate}%'></div>
                </div>
            </div>
        </div>
        <div class='property table-column column8'>${campaignJson.dueDate}</div>
        <div class='property table-column column9'>${campaignJson.driver}</div>
    `
    return dataRow;
}

function attachListener(htmlElement) {
    htmlElement.querySelector('.heading-wrapper').addEventListener('click', (event) => {
        const arrow = event.target;
        const headerRow = arrow.closest('.row.collapsible');
        const rowChildren = headerRow.children;
        headerRow.querySelector('.icon-next').classList.toggle('inactive');
        headerRow.querySelector('.icon-collapse').classList.toggle('inactive');
        Array.from(rowChildren).forEach((child) => {
            //if child has 'row' class, then toggle 'visible' class
            if (child.classList.contains('row')) child.classList.toggle('inactive');
        })
    })
}