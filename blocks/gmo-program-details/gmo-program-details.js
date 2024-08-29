import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';
import { executeQuery } from '../../scripts/graphql.js';
import { filterArray, getProductMapping, checkBlankString, dateFormat, statusMapping, getMappingArray } from '../../scripts/shared-program.js';
import { getBaseConfigPath } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';

let blockConfig;
const queryVars = extractQueryVars();
const programName = queryVars.programName;
const programID = queryVars.programID;
const deliverableMappings = getMappingArray('deliverableType');
const platformMappings = getMappingArray('platforms');
const taskStatusMappings = getMappingArray('taskStatus');
const startDateProp = 'taskPlannedStartDate';
const endDateProp = 'taskPlannedEndDate';
let viewStart, viewEnd, calendarDeliverables;

// Thumbnail cache array object to store the image objects using cacheKey = `${programName}-${campaignName}-${deliverableType}`;
const thumbnailCache = {};

export default async function decorate(block) {
    const encodedSemi = encodeURIComponent(';');
    const encodedProgram = encodeURIComponent(programName);
    const encodedPath = queryVars.path ? `${encodeURIComponent(queryVars.path)}` : '';

    blockConfig = readBlockConfig(block);
    // Including path in the query if present
    const programQueryString = `getProgramDetails${encodedSemi}programName=${encodedProgram}${encodedSemi}programID=${encodeURIComponent(programID)}` +
        (encodedPath ? `${encodedSemi}path=${encodedPath}` : '');

    const deliverableQueryString = `getProgramDeliverables${encodedSemi}programName=${encodedProgram}${encodedSemi}programID=${encodeURIComponent(programID)}`;

    // Immediately render a placeholder header
    block.innerHTML = `
    <div class="back-button">
        <span class="icon icon-back"></span>
        <span class="back-label">Back</span>
    </div>
    <div class="main-body-wrapper">
        <div class="placeholder-header">Loading program details...</div>
    </div>
    `;

    // Wait for program data to render the actual header
    const programData = await executeQuery(programQueryString);
    const program = programData.data.programList.items[0];
    const header = buildHeader(program, queryVars).outerHTML;

    // Update the header with the actual data
    block.querySelector('.placeholder-header').outerHTML = header;

    let imageObject = {imageUrl : '', imageAltText: '', assetCount: 0};
    let totalassets = 0;
    if (program) {
        try {
            imageObject = await searchAsset(program.programName, program.campaignName);
            if (imageObject) {
                insertImageIntoCampaignImg(block, imageObject);
                totalassets = imageObject.assetCount;
            }
        } catch (error) {
            console.error("Failed to load campaign image:", error);
        }
        decorateIcons(block);
    }
    else
    {   //programName and campaignName is null
        block.innerHTML = `
        <div class="back-button">
            <span class="icon icon-back"></span>
            <span class="back-label">Back</span>
        </div>
        <div class="main-body-wrapper">
            ${header}
            <div class="no-data-msg">No data available.</div>
        </div>
        `;
        try {
            //programName and campaignName is null display under development icon
            imageObject = await searchAsset(null, null);
            if (imageObject) {
                insertImageIntoCampaignImg(block, imageObject);
                totalassets = imageObject.assetCount;
            }
        } catch (error) {
            console.error("Failed to load campaign image:", error);
        }

        decorateIcons(block);
        enableBackBtn(block, blockConfig);
        return;
    }

    const p0TargetMarketArea = program.p0TargetMarketArea;
    const p1TargetMarketArea = program.p1TargetMarketArea;
    const kpis = buildKPIList(program).outerHTML;
    const targetMarketAreas = buildTargetMarketAreaList(p0TargetMarketArea,p1TargetMarketArea).outerHTML;
    const audiences = buildAudienceList(program).outerHTML;
    const artifactLinks = buildArtifactLinks(program).outerHTML;

    const currentYear = new Date().getFullYear();

    // Inject the additional HTML content
    block.querySelector('.main-body-wrapper').innerHTML += `
        <div class="tab-wrapper">
            <div id="tab1toggle" data-target="tab1" class="tabBtn active">Overview</div>
            <div id="tab2toggle" data-target="tab2" class="tabBtn">Deliverables</div>
            <div id="tab3toggle" data-target="tab3" class="tabBtn">Calendar</div>
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
                <div class="kpis-wrapper">
                    <span class="h3">Target Market Area</span>
                    ${targetMarketAreas}
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

                <div id="deliverable-type" class="channel-scope-wrapper">
                    <span class="h3">Deliverable Type</span>
                    <div class="tags-wrapper">
                    </div>
                </div>

                <div id="platforms" class="channel-scope-wrapper">
                    <span class="h3">Platforms</span>
                    <div class="tags-wrapper">
                    </div>
                </div>
                ${artifactLinks}
            </div>
            <div class="infocards-wrapper">
                <div class="card products">
                    <div class="card-heading h3">Products</div>
                </div>
                <div class="card audiences">
                    <div class="card-heading h3">Audiences</div>
                    ${audiences}
                </div>
            </div>
        </div>
        <div id="tab2" class="deliverables tab inactive">
            <div class="page-heading">
                ${artifactLinks}
                <div class="total-assets total-assets-tooltip">
                    <div class="h3">Total Approved Assets</div>
                    <span id="totalassets" class="description">${totalassets}</span>
                    <span class="tooltiptext">To view the assets, go to the "All Asset" search page and use Program and Campaign name facet to filter the assets</span>
                </div>
            </div>
            <div class="table-wrapper">
                <div class="table-header">
                    <div class="header table-column column1">Deliverable Task Name</div>
                    <div class="header table-column column2">Deliverable Type</div>
                    <div class="header table-column column3">Platforms</div>
                    <div class="header table-column column4">QA Files</div>
                    <div class="header table-column column5">Final Asset</div>
                    <div class="header table-column column7">Status Update</div>
                    <div class="header table-column column8">Completion Date</div>
                    <div class="header table-column column9">Task Owner</div>
                </div>
                <div class="table-content">
                </div>
            </div>
        </div>
        <div id="tab3" class="calendar tab inactive">
            <div class="control-wrapper">
                <div class="inc-dec-wrapper">
                    <div class="year-switch">
                        <div id="dec-year" class="year-toggle">
                            <img class="left" data-direction="left" src="/icons/chevron-right.svg"></img>
                        </div>
                        <div id="inc-year" class="year-toggle">
                            <img class="right" data-direction="right" src="/icons/chevron-right.svg"></img>
                        </div>
                    </div>
                    <div class="current-year" data-quarter="1" data-year="${currentYear}">${currentYear}</div>
                </div>
                <div class="right-controls">
                    <div class="today-button">Today</div>
                    <div class="filter-dropdown-wrapper">
                        <div class="filter-dropdown-button">
                            <div class="label">Selected View: Year</div>
                            <span class="icon icon-chevronDown"></span>
                            <span class="icon icon-chevronUp inactive"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Wait for deliverables data
    const deliverables = await executeQuery(deliverableQueryString);

    const uniqueDeliverableTypes = getUniqueItems(programData.data.deliverableList.items, 'deliverableType');
    const uniquePlatforms = getUniqueItems(programData.data.deliverableList.items, 'platforms');

    buildProductCard(program);
    buildFieldScopes('deliverable-type', uniqueDeliverableTypes, block);
    buildFieldScopes('platforms', uniquePlatforms, block);

    const table = await buildTable(await deliverables).then(async (rows) => {
        return rows;
    });

    // Batch Dom Updates
    const tableRoot = block.querySelector('.table-content');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(table);
    tableRoot.appendChild(fragment);

    buildStatus(program.status);

    // Optimize Event Listeners: Added debouncing to event listeners to prevent performance issues.
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    block.querySelector('.tab-wrapper').addEventListener('click', debounce((event) => {
        switchTab(event.target);
    }, 300));

    enableBackBtn(block, blockConfig);
    
    block.querySelectorAll('.read-more').forEach((button) => {
        button.addEventListener('click', (event) => {
            const readMore = event.target;
            const parent = readMore.parentElement;
            const paragraph = parent.querySelector('.paragraph');
            paragraph.classList.toggle('hide-overflow');
            readMore.textContent = paragraph.classList.contains('hide-overflow') ? 'Read more' : 'Read less';
        });
    });

    decorateIcons(block);
    buildCalendar(await deliverables, block, "year", await deliverableMappings);
}

function enableBackBtn(block, blockConfig) {
    block.querySelector('.back-button').addEventListener('click', () => {
        const host = location.origin + getBaseConfigPath();
        const listPage = blockConfig.listpage;
        document.location.href = host + `/${listPage}`;
    })
}

function buildDriverField(driverName) {
    const driverSpan = document.createElement('span');
    driverSpan.classList.add('driver-text');
    driverSpan.innerHTML = `Project Owner: ${driverName}`;
    return driverSpan;
}

function buildHeader(program, queryVars) {
    const headerWrapper = document.createElement('div');
    headerWrapper.classList.add('details-header-wrapper');
    const date = program && program.launchDate ? `<div class="header-row3"><span class="icon icon-calendar">` +
        `</span><span class="date-tooltip">Proposed Launch Date</span><span class="campaign-date">${formatDate(program.launchDate)}</span></div>` : "";
    const programName = program ? program.programName : queryVars.programName;
    const campaignName = program && program.campaignName ? '<div class="header-row2"><span class="subtitle">' + program.campaignName + '</span></div> ': "";

    const driver = program && program.driver ? program.driver : "Not Available";
    let driverField = '';

    if (program){
      driverField=buildDriverField(driver).outerHTML;
    }

    const releaseTier = `
        <div class="header-row3">
            <span class="icon-release-tier"></span>
            <span class="release-tier">Release Tier: ${program.releaseTier ? program.releaseTier : "Not Available"}</span>
        </div>`;

    const productGroup = `
        <div class="header-row3">
            <span class="icon-productGroup"></span>
            <span class="productGroup">${program.productGroup && program.productGroup.length > 0 ? program.productGroup.join(', ') : "Not Available"}</span>
        </div>`;

    headerWrapper.innerHTML = `
        <div class="campaign-img">
        </div>
        <div class="header-title">
            <div class="header-row1">
                <span class="h1">${programName}</span>
            </div>
            ${campaignName}
            <div class="header-row3">
              ${date}
              ${driverField}
              ${releaseTier}
              ${productGroup}
            </div>
        </div>
    `
    return headerWrapper;
}

/**
 * Extracts unique values from a specified property within an array of objects.
 *
 * @param {Array} items - The array of objects to extract values from.
 * @param {string} property - The property name to extract values from each object.
 * @returns {Array} - An array of unique values extracted from the specified property.
 *
 * This function flattens arrays of values if the property contains arrays within each object,
 * filters out null and undefined values, and returns a unique set of these values.
 */
function getUniqueItems(items, property) {
    return [...new Set(items.flatMap(item => item[property])
        .filter(value => value !== null && value !== undefined)
    )];
}

function insertImageIntoCampaignImg(block, imageObject) {
    const campaignImgDiv = block.querySelector('.campaign-img');
    const imgElement = document.createElement('img');
    //Lazy load images
    imgElement.loading = 'lazy';
    imgElement.src = imageObject.imageUrl;
    imgElement.alt = imageObject.imageAltText;
    campaignImgDiv.appendChild(imgElement);
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


async function buildFieldScopes(scopeTypeId, scopes, block) {
    if (scopes.length == 0) {
        block.querySelector(`#${scopeTypeId}.channel-scope-wrapper`).classList.add('inactive');
        return;
    }
    const scopesParent = block.querySelector(`#${scopeTypeId}.channel-scope-wrapper .tags-wrapper`);
    scopes.forEach(async (scope) => {
        if (scope == null || scope == undefined || scope == '') return;
        const tag = document.createElement('div');
        tag.classList.add('scope-tag');
        tag.textContent = await lookupType(scope, scopeTypeId);
        scopesParent.appendChild(tag);
    });
}

function buildKPIList(program) {
    let kpiList = document.createElement('ul');
    program.primaryKpi?.forEach((kpi) => {
        const kpiLi = createLI(kpi);
        kpiList.appendChild(kpiLi);
    })
    program.additionalKpi?.forEach((kpi) => {
        const kpiLi = createLI(kpi);
        kpiList.appendChild(kpiLi);
    })
    if (kpiList.children.length == 0) {
        kpiList.remove();
        kpiList = document.createElement('div');
        kpiList.textContent = "Not Available";
    }
    return kpiList;
}

function buildTargetMarketAreaList(p0TargetMarketArea,p1TargetMarketArea) {
    let ulList = document.createElement('ul');
    p0TargetMarketArea?.forEach((item) => {
        const itemLi = createLI(item);
        ulList.appendChild(itemLi);
    });

    p1TargetMarketArea?.forEach((item) => {
        const itemLi = createLI(item);
        ulList.appendChild(itemLi);
    })
    if (ulList.children.length == 0) {
        ulList.remove();
        ulList = document.createElement('div');
        ulList.textContent = "Not Available";
    }
    return ulList;
}

function createLI(li) {
    const liItem = document.createElement('li');
    const liText = parseString(li);
    liItem.textContent = liText;
    return liItem;
}

async function buildProductCard(program) {
    const productMapping = await getProductMapping(program.productOffering);
    const productList = document.createElement('div');
    productList.classList.add('product', 'card-content');
    productList.innerHTML = `
        <img class="icon" src=${productMapping.icon}></img>
        ${checkBlankString(productMapping.label)}
    `
    document.querySelector('.card.products').appendChild(productList);
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

function buildArtifactLinks(program) {
   const artifactLinks = document.createElement('div');
   artifactLinks.classList.add('links-wrapper');
   artifactLinks.innerHTML = `
   <span class="h3">Links to Important Artifacts</span>
   <div class="links">
       ${program.creativeArchitectureLink ? '<a href="' + program.creativeArchitectureLink + '" target="_blank" class="campaign-link">Creative Architecture</a> ': ""}
       ${program.e2eJourney ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">E2E Journeys</a> ': ""}
       ${program.gtmSLink ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">GTM-S</a> ': ""}
       ${program.gtmPLink ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">GTM-P</a> ': ""}
       ${program.marketingBrief ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">Marketing Brief</a> ': ""}
       ${program.marketingDoc ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">Marketing Doc</a> ': ""}
       ${program.pager ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">2-Pager</a> ': ""}
       ${program.adr ? '<a href="' + program.e2eJourney + '" target="_blank" class="campaign-link">ADR</a> ': ""}
   </div>
   `;
   // see how many 'links' were made. if none, hide the section
   const numLinks = artifactLinks.querySelectorAll('.campaign-link')?.length;
   if (numLinks == 0) artifactLinks.classList.add('inactive');
   return artifactLinks;
}

async function buildStatus(status) {
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('campaign-status');
    const statusMatch = filterArray(statusMapping, 'value', status);
    const statusText = statusMatch ? statusMatch[0].text : status;
    const statusHex = statusMatch[0]["color-code"];
    statusDiv.textContent = statusText;
    statusDiv.style.backgroundColor = "#" + statusHex;
    document.querySelector('.header-row1').appendChild(statusDiv);
}

function createAudience(audience) {
    const text = parseString(audience);
    const audienceDiv = document.createElement('div');
    audienceDiv.classList.add('audience', 'card-content');
    audienceDiv.innerHTML = `
        <img class="icon icon-gear" src="/icons/gear.svg"></img>
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

async function buildTable(jsonResponse) {
    const deliverableList = jsonResponse.data.deliverableList.items;
    const programKpi = jsonResponse.data.programList?.items.primaryKpi;
    let rows = document.createElement('div');
    // we want the 'null' deliverableType to be part of this set for filtering
    const uniqueCatSet = new Set();
    deliverableList.forEach(object => { uniqueCatSet.add(object['deliverableType']) })
    const uniqueCategories = Array.from(uniqueCatSet);
    const sortedCategories = sortDeliverableTypes(uniqueCategories);
    let emptyCategory = false;
    sortedCategories.forEach(async (category) => {
        // build header row
        let headerRow;
        const matchingCampaigns = deliverableList.filter(deliverable => deliverable.deliverableType === category);
        const matchCount = matchingCampaigns.length;
        if (category == null || category == undefined || category === '') {
            emptyCategory = true;
            headerRow = rows;
        } else {
            headerRow = await buildHeaderRow(category, 'header', false, matchCount);
            attachListener(headerRow);
            rows.appendChild(headerRow);
        }
        matchingCampaigns.forEach(async (campaign) => {
            const tableRow = await buildTableRow(campaign, programKpi, !emptyCategory);
            headerRow.appendChild(tableRow);
        })
        // sort grouped rows by date
        if (!emptyCategory) {
            dateSort(headerRow);
        }
        emptyCategory = false;
    });
    //sort the rows
    sortRows(rows);
    return rows;
}

function dateSort(parent) {
    const childNodes = Array.from(parent.getElementsByClassName('datarow'));
    childNodes.sort((a, b) => {
        const dateA = new Date(a.querySelector('.completion-date').innerHTML);
        const dateB = new Date(b.querySelector('.completion-date').innerHTML);
        // Check if dates are valid
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0; // Move on if date is invalid
        }
        return dateA - dateB;
    })
    childNodes.forEach((node) => {
        parent.appendChild(node);
    })
}

function sortDeliverableTypes(arr) {
    return arr.sort((a, b) => {
        // If a is null and b is not null, a should come after b
        if (a === null && b !== null) return 1;
        // If b is null and a is not null, b should come after a
        if (a !== null && b === null) return -1;
        // If both a and b are null, they are equal in terms of sorting
        if (a === null && b === null) return 0;
        // If neither a nor b are null, sort them alphabetically
        return a.localeCompare(b);
    });
}

async function lookupType(rawText, mappingType) {
    const mappings = (mappingType === 'deliverable-type') ? await deliverableMappings : await platformMappings;
    const typeMatch = mappings.filter(item => item.value === rawText);
    const typeText =  typeMatch.length > 0 ? typeMatch[0].text : rawText;
    return typeText;
}

/**
 * @param {string} category - String value of the category property
 * @param {string} headerType - Type of header. Either 'category' or 'subcategory'
 * @param {boolean} isInactive - Determines whether or not the header will be hidden initially
 * @param {number} matchCount - Number of matching items, will display beside the label
 */
async function buildHeaderRow(category, headerType, isInactive, matchCount) {
    //look up friendly name for deliverable type
    const typeLabel = await lookupType(category, 'deliverable-type');
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
            <img class="icon-next" src="/icons/next.svg"></img>
            <img class="icon-collapse inactive" src="/icons/collapse.svg"></img>
            <div class="headertext">${typeLabel} (${matchCount})</div>
        </div>`;
    return headerRow;
}

async function buildTableRow(deliverableJson, kpi, createHidden) {
    //look up friendly name for deliverable type
    const typeLabel = await lookupType(deliverableJson.deliverableType, 'deliverable-type');
    const dataRow = document.createElement('div');
    dataRow.classList.add('row', 'datarow');
    if (createHidden) dataRow.classList.add('inactive');
    const status = (deliverableJson.deliverableStatusUpdate == null) ? "Not Available" : deliverableJson.deliverableStatusUpdate + "%";
    const statusPct = (deliverableJson.deliverableStatusUpdate == null) ? "0%" : deliverableJson.deliverableStatusUpdate + "%";
    dataRow.innerHTML = `
        <div class='property table-column column1 deliverable-name'>${checkBlankString(deliverableJson.deliverableName)}</div>
        <div class='property table-column column2 deliverable-type'>${checkBlankString(typeLabel)}</div>
        <div class='property table-column column3 platforms'></div>
        <div class='property table-column column4 qa-files'>
            ${deliverableJson.reviewLink ? '<a href="' + deliverableJson.reviewLink + '"target="_blank" class="campaign-link">QA Files</a> ': "Not Available"}
        </div>
        <div class='property table-column column5'>
            ${deliverableJson.linkedFolderLink ? '<a href="' + deliverableJson.linkedFolderLink + '"target="_blank" class="campaign-link">Final Asset</a> ': "Not Available"}
        </div>
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
        <div class='property table-column column8 date-wrapper'>
            <div class='completion-date'>${dateFormat(deliverableJson.taskCompletionDate)}</div>
            ${deliverableJson.previousTaskCompletionDate ? '<div class="revised-date">Revised from ' + deliverableJson.previousTaskCompletionDate + '</div> ': ""}
        </div>
        <div class='property table-column column9'>${checkBlankString(deliverableJson.driver)}</div>
    `;
    createPlatformString(deliverableJson.platforms, dataRow);
    return dataRow;
}

async function createPlatformString(platforms, htmlElem) {
    let platformString = '';
    if (platforms && platforms.length > 0) {
        for (const rawPlatform of platforms) {
            const platform = await lookupType(rawPlatform, 'platform');
            platformString += platform + ', ';
        }
        platformString = platformString.slice(0, -2);
    } else {
        platformString = 'Not Available'
    }
    htmlElem.querySelector('.column3.platforms').textContent = platformString;
}

function sortRows(rows) {
    const rowParent = rows;
    const nodes = Array.from(rowParent.childNodes);
    // Sort child nodes by class name
    nodes.sort((a, b) => {
        var classA = a.classList ? a.classList.contains('datarow') : false;
        var classB = b.classList ? b.classList.contains('datarow') : false;

        if (classA && !classB) {
            return 1;
        } else if (!classA && classB) {
            return -1;
        } else {
            return 0;
        }
    });

    // Rearrange child nodes
    nodes.forEach((node) => {
        rowParent.appendChild(node);
    });
    return rowParent;
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

function extractQueryVars() {
    const urlStr = window.location.href;
    const pnRegex = /[?&]programName=([^&]+)&programID=([^&]+)(&path=([^&]+))?/;
    const match = urlStr.match(pnRegex);
    if (match && match[1] && match[2]) {
        const pName = decodeURIComponent(match[1]); // Removed the replace method
        let pID = decodeURIComponent(match[2]);
        let pPath = match[4] ? decodeURIComponent(match[4]) : null;
        if (pID.endsWith('#')) {
            pID = pID.slice(0, -1);
        }
        return {
            programName: pName,
            programID: pID,
            path: pPath
        };
    } else {
        return {
            programName: 'Program Name Not Available',
            programID: 'Program ID Not Available',
            path: null
        };
    }
}

// program calendar view
async function buildCalendar(dataObj, block, type, mappingArray, period) {
    if (!calendarDeliverables) calendarDeliverables = dataObj.data.deliverableList.items;
    if (!deliverableMappings) deliverableMappings = await mappingArray;
    if (!taskStatusMappings) taskStatusMappings = await taskStatusMappings;

    const programLaunch = document.querySelector('span.campaign-date').textContent;
    const programLaunchDate = new Date(programLaunch);

    // multiple of 3 for width of column when viewing in quarter mode. can change this
    // by adjusting the multiple below, and also the % width of the calendar background
    // when drawing a 'quarter' calendar.

    const columnWidth = (type === "year") ? 8.315 : (8.315 * 3);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // if there are no deliverables, display msg to user and end construction.
    if (calendarDeliverables.length === 0) {
        const calendarTab = document.querySelector('.calendar.tab');
        calendarTab.innerHTML = `
            <div class="no-data-msg">Required Data is Unavailable for this view.</div>
        `;
        return;
    }

    // get start of the view
    viewStart = getTimeBounds(calendarDeliverables, "start", startDateProp);
    viewStart = (!(isValidDate(viewStart)) || viewStart <= 0) ? programLaunchDate : viewStart;   
    const viewStartYear = viewStart.getUTCFullYear();

    const displayYear = period ? period.year : viewStartYear;
    const displayQuarter = period ? period.quarter : 1;

    const yearIndicator = block.querySelector('.inc-dec-wrapper .current-year');
    yearIndicator.dataset.year = displayYear;
    yearIndicator.textContent = displayYear;

    // get end of the view
    viewEnd = getTimeBounds(calendarDeliverables, "end", endDateProp);
    if (!(isValidDate(viewEnd)) || viewEnd.getFullYear() === 1969) {
        viewEnd = new Date(viewStart);
        viewEnd.setMonth(viewStart.getMonth() + 1);
    }
    const viewEndYear = viewEnd.getUTCFullYear();

    // get array of all years to be included
    let years = calendarYears(viewStartYear, viewEndYear);

    // disable increment/decrement if only one year in view
    if (years.length === 1) {
        document.querySelector('.inc-dec-wrapper > .year-switch').classList.add('disabled');
    }

    // build the calendar background here as we already know the period and style
    let calendarEl;
    if (type === "year") {
        calendarEl = buildYearCal(years);
    } else {
        // if the last item ends in December we need another year to catch the Q1 n+1 finish
        if (viewEnd.getUTCMonth = 11) {
            years.push(viewEndYear + 1);
        }
        calendarEl = buildQuarterCal(years);
    }
    // get unique deliverable types
    const uniqueGroups = getUniqueItems(calendarDeliverables, "deliverableType");

    // set up the content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');
    if (type === "quarter") {
        contentWrapper.classList.add('quarter-view');
        contentWrapper.dataset.view = "quarter";
    } else {
        contentWrapper.dataset.view = "year";
    }

    var groupIndex = 1;
    for (const group of uniqueGroups) {
        const groupType = await lookupType(group, 'deliverable-type');
        // find all members of this group
        const matchedItems = calendarDeliverables.filter(item => item.deliverableType === group);

        // find the earliest date- this is how we set the position for the group against the calendar
        let earliestStartDate = getTimeBounds(matchedItems, "start", startDateProp);
        earliestStartDate = (!(isValidDate(earliestStartDate)) || earliestStartDate.getFullYear() === 1969) ? new Date(viewStart) : earliestStartDate;
        let latestEndDate = getTimeBounds(matchedItems, "end", endDateProp);
        latestEndDate = (!(isValidDate(latestEndDate)) || latestEndDate.getFullYear() === 1969) ? new Date(viewEnd) : latestEndDate;
        const startMonth = (earliestStartDate.getUTCMonth()); // getMonth returns 0-11 but this is desirable
        const startDay = (earliestStartDate.getUTCDate() - 1); // if at start of month, we don't want to add any more margin
        const endMonth = (latestEndDate.getUTCMonth());
        const endDay = (latestEndDate.getUTCDate() - 1);

        const groupStartYear = earliestStartDate.getUTCFullYear();
        const groupEndYear = latestEndDate.getUTCFullYear();

        // accounting for different years in view
        const startYearOffset = ((groupStartYear - viewStartYear) * 12);
        const endYearOffset = ((groupEndYear - viewStartYear) * 12);
        const totalDaysInMonth = new Date(Date.UTC(groupStartYear, startMonth, 0)).getUTCDate();
        const totalDaysInEndMonth = new Date(Date.UTC(groupEndYear, endMonth, 0)).getUTCDate();

        const percentOfStartMonth = (startDay / totalDaysInMonth);
        const percentOfEndMonth = (endDay / totalDaysInEndMonth);
        const dayMargin = (percentOfStartMonth * columnWidth);
        const endDayMargin = (percentOfEndMonth * columnWidth);
        let startPosition = (((startYearOffset + startMonth) * columnWidth) + dayMargin).toFixed(2);
        let endPosition = (((endYearOffset + endMonth) * columnWidth) + endDayMargin).toFixed(2);

        if (type === "quarter") {
            startPosition = parseFloat(startPosition) + parseFloat(columnWidth);
            endPosition = parseFloat(endPosition) + parseFloat(columnWidth);
        }

        if (endMonth > 9) endPosition = endPosition - 0.35;
        const widthOfGroup = (endPosition - startPosition); // width of group = start position + (day duration)
        // calculate the duration of the group as that helps set the width of its members
        const groupDuration = Math.floor((latestEndDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');

        for (const item of matchedItems) {
            const itemStartDate = (item[startDateProp]) ? new Date(item[startDateProp]) : viewStart;
            const itemEndDate = (item[endDateProp]) ? new Date(item[endDateProp]) : viewEnd;

            const itemEndDateStr = itemEndDate ? itemEndDate.toLocaleDateString().split(',')[0] : null;
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);

            let daysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((daysDifference / groupDuration) * 100).toFixed(2);
            let itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.style.marginLeft = startPctDiff + '%';

            // Find the corresponding color code from the taskStatusMappings array
            const itemStatusMapping = await getTaskStatusMapping(item.taskStatus);
            const { text: statusText = 'Unknown Status', 'color-code': colorCode = 'green' } = itemStatusMapping;

            // Create a placeholder for the thumbnail
            itemEl.innerHTML = `
                <div class="color-tab"></div>
                <div class="item-content">
                    <div class="content-row">
                        <div class="info">
                            <div class="thumbnail"></div>
                            <div class="name" title="${item.deliverableName}">${item.deliverableName}</div>
                            <div class="item-status"
                                 data-status="${checkBlankString(item.taskStatus)}"
                                 style="background-color: #${colorCode};"
                                 title="${statusText}">
                            </div>
                        </div>
                    </div>
                    <div class="content-row bottom">
                        ${itemEndDateStr ? '<div class="start-date" title="Task Planned End Date: ' + itemEndDateStr + '">End Date: ' + itemEndDateStr + '</div>' : ''}
                        <div class="link">
                            <a href="${item.reviewLink}" target="_blank">QA Files</a>
                        </div>
                    </div>
                </div>
            `;
            itemEl.style.width = itemDurationPct + '%';

            // Call the new function to fetch and add the thumbnail, ensuring sequential execution
            await addThumbnailToItem(itemEl, item.programName, item.campaignName,item.deliverableType);
            itemWrapper.appendChild(itemEl);

        };

        //await lookupType(category, 'deliverable-type');
        const groupEl = document.createElement('div');
        groupEl.classList.add('calendar-group', `color${groupIndex}`);
        groupEl.style.marginLeft = startPosition + '%';
        groupEl.style.width = widthOfGroup + '%';
        groupEl.innerHTML = `
            <div class="group-header">
                <div class="left-block">
                    <img src="/icons/chevron-right.svg" class="group-expand group-controls inactive"></img>
                    <img src="/icons/chevron-right.svg" class="group-collapse group-controls"></img>
                    <div class="group-heading" title="${groupType}">${groupType}</div>
                    <div class="group-count">${matchedItems.length}</div>
                </div>
                <div class="right-block">
                </div>
            </div>
        `;
        groupEl.appendChild(itemWrapper);
        groupEl.querySelectorAll('.group-controls').forEach((arrow) => {
            arrow.addEventListener('click', showHideGroup);
        });

        contentWrapper.appendChild(groupEl);
        groupIndex +=1;

    };

    calendarEl.appendChild(contentWrapper);
    block.querySelector('.calendar.tab').appendChild(calendarEl);

    // populate "filter" dropdown
    const filterDropdown = document.createElement('div');
    filterDropdown.classList.add('filter-dropdown-content');
    const uniqueYears = getUniqueYears(calendarDeliverables);
    const yearOptionLabel = document.createElement('div');
    yearOptionLabel.classList.add('filter-label');
    yearOptionLabel.textContent = 'Year';
    const quarterOptionLabel = document.createElement('div');
    quarterOptionLabel.classList.add('filter-label');
    quarterOptionLabel.textContent = 'Quarter';
    filterDropdown.appendChild(yearOptionLabel);

    // when choosing 'Quarter' the top left controls change to control the quarter in focus
    // its kind of a zoomed in view.
    uniqueYears.forEach((year) => {
        const yearOption = document.createElement('div');
        yearOption.classList.add('filter-option');
        yearOption.dataset.year = year;
        yearOption.textContent = year;
        yearOption.addEventListener('click', (event) => filterDropdownSelection(event, viewStartYear, years.length));
        filterDropdown.appendChild(yearOption);
    });
    filterDropdown.appendChild(quarterOptionLabel);
    const quarters = [ 1, 2, 3, 4 ];
    quarters.forEach((quarter) => {
        const quarterOption = document.createElement('div');
        quarterOption.classList.add('filter-option');
        quarterOption.dataset.period = quarter;
        quarterOption.textContent = quarter;
        //quarterOption.addEventListener('click', filterDropdownSelection);
        quarterOption.addEventListener('click', (event) => filterDropdownSelection(event, viewStartYear, years.length));
        filterDropdown.appendChild(quarterOption);
    })

    const filterDropdownWrapper = block.querySelector('.filter-dropdown-wrapper');
    filterDropdownWrapper.appendChild(filterDropdown);
    filterDropdownWrapper.querySelector('.filter-dropdown-button').addEventListener('click', (event) => toggleDropdown(event.target));

    // scroll to the right
    const calendarWrapper = document.querySelector('.calendar-wrapper')
    const scrollPct = calculateScroll(type, viewStartYear, displayYear, displayQuarter, years.length);
    document.addEventListener('DOMContentLoaded', scrollOnInit(calendarWrapper, scrollPct));

    // indicator that shows current day/month
    const currentMonth = currentDate.getMonth() + 1;
    // calculate the percentage completion of the current month for the indicator offset
    const totalDaysInMonth = new Date((new Date(currentYear, currentMonth, 1)) - 1).getDate();
    const percentOfMonth = (currentDate.getUTCDate() / totalDaysInMonth).toFixed(2) * 100;
    const monthEl = block.querySelector(`.month-wrapper[data-year='${currentYear}'] .month[data-num='${currentMonth}']`);
    monthEl.classList.add('current');
    const lineEl = document.createElement('div');
    lineEl.classList.add('calendar-indicator');
    // use direct style for offset
    lineEl.style.marginRight = ((-2 * percentOfMonth) + 100) + '%';
    monthEl.appendChild(lineEl);
    
    // close dropdown listener for clicks outside open dropdown
    document.querySelector('.gmo-program-details.block').addEventListener('click', dismissDropdown);
    block.querySelectorAll('.year-switch > .year-toggle').forEach((control) => {
        control.removeEventListener('click', changePeriod);
        if (years.length > 1) {
            control.addEventListener('click', changePeriod);
        }
    });
    block.querySelector('.right-controls .today-button').addEventListener('click', () => {
        const calendarWrapper = document.querySelector('.calendar-wrapper')
        // determine scroll pct for years. always use type = year because "today" doesn't care about quarters.
        const yearScrollPct = calculateScroll("year", viewStartYear, currentYear, displayQuarter, years.length);
        // determine how far through the current year we are
        const now = new Date();
        now.setHours(0,0,0,0);
        const dateDiff = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const dayPct = (((dateDiff) * ((1 / years.length) / 365)) * 100);
        // get total scroll percent by adding year + day scroll pct
        const totalScroll = (parseFloat(yearScrollPct) + parseFloat(dayPct)).toFixed(2);
        // scroll to position
        scrollToPosition(calendarWrapper, totalScroll);
    });
}

// calendar view supporting functions

// Helper function to get task status mapping
async function getTaskStatusMapping(taskStatus) {
    const taskStatusArray = await taskStatusMappings;
    return taskStatusArray.find(mapping => mapping.value === taskStatus) || {};
}

async function addThumbnailToItem(itemEl, programName, campaignName, deliverableType) {
    // Create a unique key for the cache based on the parameters, only add the campaignName in cacheKey when it is not null or empty
    const cacheKey = campaignName ? `${programName}-${campaignName}-${deliverableType}` : `${programName}-${deliverableType}`;

    // Check if the imageObject is already cached
    let imageObject = thumbnailCache[cacheKey];

    // If not cached, make the API call and store the result in the cache
    if (!imageObject) {
        try {
            imageObject = await searchAsset(programName, campaignName, deliverableType);
            thumbnailCache[cacheKey] = imageObject; // Store the result in the cache
        } catch (error) {
            console.error("Failed to load thumbnail image:", error);
            return; // Exit the function if the API call fails
        }
    }

    // Use the cached or newly fetched imageObject
    if (imageObject && imageObject.imageUrl) {
        const thumbnailDiv = itemEl.querySelector('.thumbnail');
        const imgElement = document.createElement('img');
        imgElement.src = imageObject.imageUrl;
        imgElement.alt = imageObject.imageAltText;
        imgElement.loading = 'lazy';
        thumbnailDiv.appendChild(imgElement);
    } else {
        console.error("Image Object does not have a valid imageUrl");
    }
}

function getTimeBounds(items, whichEnd, property) {
    const desiredDate = items.reduce((dateCompare, currentItem) => {
        const currentItemDate = new Date(currentItem[property]); // Ensure UTC
        if (whichEnd === "start") {
            return currentItemDate < dateCompare ? currentItemDate : dateCompare;
        } else {
            return currentItemDate > dateCompare ? currentItemDate : dateCompare;
        }
    },  new Date(items[0][property]));
    return desiredDate;
}

function showHideGroup(event) {
    const arrow = event.target;
    const group = arrow.closest('.calendar-group');
    group.querySelector('.group-content').classList.toggle('inactive');
    group.querySelector('.group-expand').classList.toggle('inactive');
    group.querySelector('.group-collapse').classList.toggle('inactive');
    group.querySelector('.group-header').classList.toggle('content-hidden')
}

function changePeriod(event) {
    const arrow = event.target;
    const direction = arrow.dataset.direction;
    const wrapper = arrow.closest('.inc-dec-wrapper');
    const yearEl = wrapper.querySelector('.current-year');
    const contentWrapper = document.querySelector('.calendar-content-wrapper');
    const view = contentWrapper.dataset.view;
    const currentYear = parseInt(yearEl.dataset.year);
    const maxYear = viewEnd.getUTCFullYear(); // Use the maximum year from the viewEnd variable
    const minYear = viewStart.getUTCFullYear(); // Use the minimum year from the viewStart variable

    let newPeriod, newYear, newQuarter;

    if (view === "quarter") {
        const currentQuarter = parseInt(yearEl.dataset.quarter);
        newQuarter = (direction == 'right') ? (currentQuarter + 1) : (currentQuarter - 1);
        newYear = currentYear;
        if (newQuarter > 4) {
            newQuarter = 1;
            newYear = currentYear + 1;
        }
        if (newQuarter < 1) {
            newQuarter = 4;
            newYear = currentYear - 1;
        }
    } else {
        newYear = (direction == 'right') ? (currentYear + 1) : (currentYear - 1);
        newQuarter = 1;
    }

    // Prevent the year from going beyond the maximum or minimum year
    if (newYear > maxYear || newYear < minYear) {
        return;
    }

    newPeriod = { 'year': newYear, 'quarter': newQuarter };
    refreshCalendar(newPeriod, view);
}

function getUniqueYears(items) {
    const yearsSet = new Set();
    items.forEach(item => {
        const startDate = item[startDateProp];
        if (startDate) {
            const year = startDate.split('-')[0];
            yearsSet.add(year);
        }
    });
    if (yearsSet.size === 0) {
        const startYear = viewStart.getFullYear();
        const endYear = viewEnd.getFullYear();
        for (let year = startYear; year <= endYear; year++) {
            yearsSet.add(year);
        }
    }
    const years = Array.from(yearsSet);
    years.sort((a, b) => parseInt(a) - parseInt(b));
    return years;
}

// handle clicking on the year button
function toggleDropdown(element) {
    const dropdown = element.closest('.filter-dropdown-wrapper');
    const iconChevronDown = dropdown.querySelector('.icon-chevronDown');
    const iconChevronUp = dropdown.querySelector('.icon-chevronUp');

    iconChevronDown.classList.toggle('inactive');
    iconChevronUp.classList.toggle('inactive');
    dropdown.classList.toggle('active');
}

// handle clicks outside the dropdown
function dismissDropdown(event) {
    const isInsideDropdown = event ? event.target.closest('.filter-dropdown-wrapper') : false;
    if (!isInsideDropdown) {
        const dropdown = document.querySelector('.filter-dropdown-wrapper');
        dropdown.querySelector('.icon-chevronDown').classList.remove('inactive');
        dropdown.querySelector('.icon-chevronUp').classList.add('inactive');
        dropdown.classList.remove('active');
    }
}

function filterDropdownSelection(event, viewStartYear, numYears) {
    // if we're hopping views, redraw the calendar
    // if not just scroll
    const calendarContentEl = document.querySelector('.calendar-content-wrapper');
    const currentView = calendarContentEl.dataset.view;

    const optionEl = event.target;
    let year, quarter, view;
    if (("period") in optionEl.dataset) {
        // quarter view
        quarter = optionEl.dataset.period;
        year = document.querySelector('.inc-dec-wrapper .current-year').dataset.year;
        view = "quarter";
    } else {
        // year view
        view = "year";
        year = optionEl.dataset.year;
        quarter = 1;
    }

    const period = { 'year': year, 'quarter': quarter }

    if (currentView === view) {
        // scroll over
        const scrollPct = calculateScroll(view, viewStartYear, year, quarter, numYears);
        const calendarWrapper = document.querySelector('.calendar-wrapper');
        scrollToPosition(calendarWrapper, scrollPct);
    } else {
        const viewStr = view.charAt(0).toUpperCase() + view.slice(1);
        document.querySelector('.filter-dropdown-button > .label').textContent = `Selected View: ${viewStr}`;
        refreshCalendar(period, view);
    }
    dismissDropdown();
}

// retrieve the year via js when refreshing in quarter view
function refreshCalendar(period, view) {
    const block = document.querySelector('.gmo-program-details.block');
    const yearEl = block.querySelector('.inc-dec-wrapper .current-year');
    yearEl.dataset.year = period.year;
    yearEl.dataset.quarter = period.quarter;

    if (view === "year") {
        yearEl.textContent = period.year;
    } else {
        yearEl.textContent = `Q${period.quarter} ${period.year}`;
    }


    // trick to remove event listeners
    block.querySelector('.filter-dropdown-wrapper').outerHTML += '';
    block.querySelector('.right-controls .today-button').outerHTML += '';

    block.querySelector('.calendar-wrapper').remove();
    block.querySelector('.filter-dropdown-content').remove();

    buildCalendar(calendarDeliverables, block, view, deliverableMapping, period);
}

// ?
/*
function lookupType(rawText) {
    const typeMatch = deliverableMapping.filter(item => item.value === rawText);
    const typeText =  typeMatch.length > 0 ? typeMatch[0].text : rawText;
    return typeText;
}
    */


function calendarYears(startYear, endYear) {
    let years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
}

function buildYearCal(years) {
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar-wrapper');
    if (years.length > 1) calendarEl.classList.add('multiyear');
    const backgroundEl = document.createElement('div');
    backgroundEl.classList.add('calendar-background');
    backgroundEl.style.width = (years.length * 100) + '%';

    years.forEach((year) => {
        const yearWrapper = document.createElement('div');
        yearWrapper.dataset.year = year;
        yearWrapper.classList.add('year-wrapper');
        yearWrapper.style.width = (100 / years.length) + '%';
        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('header-wrapper');
        const quartersHeader = document.createElement('div');
        quartersHeader.classList.add('quarter-header');
        quartersHeader.innerHTML = `
            <div class="quarter">Q1 ${year}</div>
            <div class="quarter">Q2 ${year}</div>
            <div class="quarter">Q3 ${year}</div>
            <div class="quarter">Q4 ${year}</div>
        `;
        calendarHeader.appendChild(quartersHeader);

        const monthsWrapper = document.createElement('div');
        monthsWrapper.classList.add('month-wrapper');
        monthsWrapper.dataset.year = year;
        monthsWrapper.innerHTML = `
            <div class="month" data-num="1"><div class="label">Jan</div></div>
            <div class="month" data-num="2"><div class="label">Feb</div></div>
            <div class="month" data-num="3"><div class="label">Mar</div></div>
            <div class="month" data-num="4"><div class="label">Apr</div></div>
            <div class="month" data-num="5"><div class="label">May</div></div>
            <div class="month" data-num="6"><div class="label">Jun</div></div>
            <div class="month" data-num="7"><div class="label">Jul</div></div>
            <div class="month" data-num="8"><div class="label">Aug</div></div>
            <div class="month" data-num="9"><div class="label">Sep</div></div>
            <div class="month" data-num="10"><div class="label">Oct</div></div>
            <div class="month" data-num="11"><div class="label">Nov</div></div>
            <div class="month" data-num="12"><div class="label">Dec</div></div>
        `;
        yearWrapper.appendChild(calendarHeader);
        yearWrapper.appendChild(monthsWrapper);
        backgroundEl.appendChild(yearWrapper);
    });
    calendarEl.appendChild(backgroundEl);
    return calendarEl;
}


function buildQuarterCal(years) {
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar-wrapper', 'quarter-view');
    if (years.length > 1) calendarEl.classList.add('multiyear');
    const backgroundEl = document.createElement('div');
    backgroundEl.classList.add('calendar-background');
    // this is wider for 'quarter' view- see equivalent in 'year' view.
    backgroundEl.style.width = (years.length * 300) + '%';

    years.forEach((year) => {
        const yearWrapper = document.createElement('div');
        yearWrapper.dataset.year = year;
        yearWrapper.classList.add('year-wrapper');
        yearWrapper.style.width = (100 / years.length) + '%';
        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('header-wrapper');
        const quartersHeader = document.createElement('div');
        quartersHeader.classList.add('quarter-header');
        quartersHeader.innerHTML = `
            <div class="quarter">Fiscal Q1 ${year}</div>
            <div class="quarter">Fiscal Q2 ${year}</div>
            <div class="quarter">Fiscal Q3 ${year}</div>
            <div class="quarter">Fiscal Q4 ${year}</div>
        `;
        calendarHeader.appendChild(quartersHeader);

        const monthsWrapper = document.createElement('div');
        monthsWrapper.classList.add('month-wrapper');
        monthsWrapper.dataset.year = year;
        monthsWrapper.innerHTML = `
            <div class="month" data-num="12"><div class="label">Dec Q1</div></div>
            <div class="month" data-num="1"><div class="label">Jan Q1</div></div>
            <div class="month" data-num="2"><div class="label">Feb Q1</div></div>
            <div class="month" data-num="3"><div class="label">Mar Q2</div></div>
            <div class="month" data-num="4"><div class="label">Apr Q2</div></div>
            <div class="month" data-num="5"><div class="label">May Q2</div></div>
            <div class="month" data-num="6"><div class="label">Jun Q3</div></div>
            <div class="month" data-num="7"><div class="label">Jul Q3</div></div>
            <div class="month" data-num="8"><div class="label">Aug Q3</div></div>
            <div class="month" data-num="9"><div class="label">Sep Q4</div></div>
            <div class="month" data-num="10"><div class="label">Oct Q4</div></div>
            <div class="month" data-num="11"><div class="label">Nov Q4</div></div>
        `;
        yearWrapper.appendChild(calendarHeader);
        yearWrapper.appendChild(monthsWrapper);
        backgroundEl.appendChild(yearWrapper);
    });
    calendarEl.appendChild(backgroundEl);
    return calendarEl;
}

function scrollOnInit(element, scrollPct) {
    // Observer to detect when the element becomes visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resizeGroups();
                scrollToPosition(element, scrollPct);
                observer.disconnect(); // Stop observing after scrolling
            }
        });
    });

    // Start observing the element
    observer.observe(element);
}

function getHorizontalOverflow(element) {
    return element.scrollWidth - element.clientWidth;
}

function resizeGroups() {
    const groups = document.querySelectorAll('.calendar-group');
    groups.forEach((group) => {
        const overflow = getHorizontalOverflow(group);
        if (overflow) {
            group.querySelector('.group-header').style.paddingRight = overflow + 'px';
            group.style.paddingRight = overflow + 'px';
        }
    })
}

function scrollToPosition(element, scrollPct) {
    const maxScrollLeft = element.scrollWidth;
    const scrollAmt = (maxScrollLeft) * (scrollPct / 100);
    element.scrollTo({
        left: scrollAmt, // Replace with desired position
        behavior: 'smooth' // Optional: for smooth scrolling
    });
}

function calculateScroll(type, viewStartYear, displayYear, displayQuarter, numYears) {
    const yearDiff = displayYear - viewStartYear;
    const yearWidthOffsetPct = (((yearDiff / numYears)) * 100);

    if (type === "quarter") {
        return ((yearWidthOffsetPct) + ((displayQuarter - 1) * ((1 / numYears) / 4)) * 100).toFixed(2);
    } else {
        return (yearWidthOffsetPct).toFixed(2);
    }
}

function isValidDate(dateObj) {
    return dateObj instanceof Date && !isNaN(dateObj);
}
