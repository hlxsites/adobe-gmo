import { decorateIcons } from '../../scripts/lib-franklin.js';
import { getQueryVariable } from '../../scripts/shared.js';
import { getProgramInfo } from '../../scripts/graphql.js';
import { checkBlankString } from '../gmo-campaign-list/gmo-campaign-list.js'
import { statusMappings, productMappings } from '../../scripts/shared-campaigns.js';
import { getBaseConfigPath } from '../../scripts/site-config.js';

export default async function decorate(block) {
    const programName = getQueryVariable('programName');
    //const programData = await getProgramDetails(programName);
    const programData = await getProgramInfo(programName, "program");
    const deliverables = getProgramInfo(programName, "deliverables");
    const program = programData.data.programList.items[0];
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
                <div class="product-overview-wrapper">
                    <span class="h3">Marketing Goal</span>
                    <div class="overview paragraph hide-overflow">${checkBlankString(program.marketingGoal.plaintext)}</div>
                    <div class="button no-bg read-more">Read more</div>
                </div>
                <div class="product-value-wrapper">
                    <span class="h3">Product Value</span>
                    <div class="description paragraph hide-overflow">${checkBlankString(program.productValue.plaintext)}</div>
                    <div class="button no-bg read-more">Read more</div>
                </div>
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
                <div class="channel-scope-wrapper">
                    <span class="h3">Deliverable Type</span>
                    <div class="tags-wrapper">
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
                    <div class="header table-column column3">Platforms</div>
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


    block.querySelector('.tab-wrapper').addEventListener('click', (event) => {
        switchTab(event.target);
    })
    block.querySelector('.back-button').addEventListener('click', () => {
        const host = location.origin + getBaseConfigPath();
        document.location.href = host + `/campaigns`;
    })
    block.querySelectorAll('.read-more').forEach((button) => {
        button.addEventListener('click', (event) => {
            const readMore = event.target;
            const parent = readMore.parentElement;
            parent.querySelector('.paragraph').classList.toggle('hide-overflow');
        });
    });
    decorateIcons(block);
    buildChannelScope(await deliverables, block);
    buildDeliverablesTable(await deliverables, block);
}

async function buildDeliverablesTable(deliverables, block) {
    const rows = buildTableNoGroups(deliverables);
    const tableRoot = block.querySelector('.table-content');
    tableRoot.appendChild(rows);
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

async function buildChannelScope(deliverables, block) {
    const list = deliverables.data.deliverableList.items;
    const uniqueScopes = getUniqueValues(list, 'deliverableType');
    if (uniqueScopes.length == 0) {
        block.querySelector('.channel-scope-wrapper').classList.add('inactive');
        return;
    }
    const scopesParent = block.querySelector('.channel-scope-wrapper .tags-wrapper');
    uniqueScopes.forEach((scope) => {
        if (scope == null || scope == undefined || scope == '') return;
        const tag = document.createElement('div');
        tag.classList.add('scope-tag');
        tag.textContent = scope;
        scopesParent.appendChild(tag);
    })
}   

function buildKPIList(program) {
    let kpiList = document.createElement('ul');
    program.primaryKpi?.forEach((kpi) => {
        const kpiLi = createKPI(kpi);
        kpiList.appendChild(kpiLi);
    })
    program.additionalKpi?.forEach((kpi) => {
        const kpiLi = createKPI(kpi);
        kpiList.appendChild(kpiLi);
    })
    if (kpiList.children.length == 0) {
        kpiList.remove();
        kpiList = document.createElement('div');
        kpiList.textContent = "Not Available";
    }
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
    program.primaryAudience?.forEach((audience) => {
        const audienceDiv = createAudience(audience);
        audienceList.appendChild(audienceDiv);
    })
    program.additionalAudiences?.forEach((audience) => {
        const audienceDiv = createAudience(audience);
        audienceList.appendChild(audienceDiv);
    })
    if (audienceList.children.length == 0) audienceList.textContent = "Not Available";
    return audienceList;
}

function buildStatus(status) {
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('campaign-status');
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

function buildTableNoGroups(response) {
    const deliverableList = response.data.deliverableList.items;
    const programKpi = response.data.programList.items.primaryKpi;
    const rows = document.createElement('div');
    deliverableList.forEach((deliverable) => {
        const tableRow = buildTableRow(deliverable, programKpi, false);
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

function buildTableRow(deliverableJson, kpi, createHidden) {
    const dataRow = document.createElement('div');
    dataRow.classList.add('row', 'datarow');
    if (createHidden) dataRow.classList.add('inactive');
    const status = (deliverableJson.deliverableStatusUpdate == null) ? "Not Available" : deliverableJson.deliverableStatusUpdate + "%";
    const statusPct = (deliverableJson.deliverableStatusUpdate == null) ? "0%" : deliverableJson.deliverableStatusUpdate + "%";
    let platformString = '';
    deliverableJson.platforms?.forEach((platform) => {
        platformString = platformString + platform + ', ';
    })
    platformString = platformString.slice(0, -2);
    dataRow.innerHTML = `
        <div class='property table-column column1 deliverable-name'>${deliverableJson.deliverableName}</div>
        <div class='property table-column column2'>${deliverableJson.deliverableType}</div>
        <div class='property table-column column3 platforms'>${platformString}</div>
        <div class='property table-column column4'>
            <a href="${deliverableJson.reviewLink}" class="campaign-link" target="_blank">Review Link</a>
        </div>
        <div class='property table-column column5'>
        </div>
        <div class='property table-column column6'>${checkBlankString(kpi)}</div>
        <div class='property table-column column7 justify-center'>
            <div class='status-wrapper'>
                <div class='status-heading'>
                    <div class='status-label'>Progress</div>
                    <div class='status-percent'>${status}</div>
                </div>
                <div class='status-bar-wrapper'>
                    <div class='status-bar-underlay'></div>
                    <div class='status-bar' style='width: ${statusPct}'></div>
                </div>
            </div>
        </div>
        <div class='property table-column column8'>${checkBlankString(deliverableJson.taskCompletionDate)}</div>
        <div class='property table-column column9'>${checkBlankString(deliverableJson.driver)}</div>
    `
    console.log(deliverableJson.linkedFolderLink);
    if (!(deliverableJson.linkedFolderLink == null)) {
        const finalAssetLink = document.createElement('a');
        finalAssetLink.href = deliverableJson.linkedFolderLink;
        finalAssetLink.classList.add('campaign-link');
        finalAssetLink.target = '_blank';
        finalAssetLink.textContent = "Final Asset";
        dataRow.querySelector('.column5').appendChild(finalAssetLink);
    }
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