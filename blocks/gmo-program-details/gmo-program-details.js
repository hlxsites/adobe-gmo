import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';
import { getQueryVariable } from '../../scripts/shared.js';
import { getProgramInfo } from '../../scripts/graphql.js';
import { resolveMappings, filterArray, getProductMapping, checkBlankString } from '../../scripts/shared-program.js';
import { getBaseConfigPath } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';

let blockConfig;
const programName = getQueryVariable('programName');
const deliverableMappings = resolveMappings("getDeliverableTypeMapping");
const platformMappings = resolveMappings("getPlatformsMapping");

export default async function decorate(block) {

    const programData = await getProgramInfo(programName, "getProgramDetails");
    const deliverables = getProgramInfo(programName, "getProgramDeliverables");

    const p0TargetMarketArea = programData.data.programList.items[0].p0TargetMarketArea;
    const p1TargetMarketArea = programData.data.programList.items[0].p1TargetMarketArea;

    // Extract unique deliverable types
    const uniqueDeliverableTypes = getUniqueItems(programData.data.deliverableList.items, 'deliverableType');
    // Extract unique platforms (flattened from arrays within each item)
    const uniquePlatforms = getUniqueItems(programData.data.deliverableList.items, 'platforms');

    const program = programData.data.programList.items[0];
    const kpis = buildKPIList(program).outerHTML;

    const targetMarketAreas = buildTargetMarketAreaList(p0TargetMarketArea,p1TargetMarketArea).outerHTML;

    const audiences = buildAudienceList(program).outerHTML;
    const date = formatDate(program.launchDate);
    const artifactLinks = buildArtifactLinks(program).outerHTML;
    blockConfig = readBlockConfig(block);
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
                </div>
                ${program.campaignName ? '<div class="header-row2"><span class="subtitle">' + program.campaignName + '</span></div> ': ""}
                <div class="header-row3">
                    <span class="icon icon-calendar"></span>
                    <span class="date-tooltip">Launch date</span>
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
                <div class="total-assets">
                    <div class="h3">Total Assets</div>
                    <span id="totalassets" class="description"></span>
                </div>
            </div>
            <div class="table-wrapper">
                <div class="table-header">
                    <div class="header table-column column1">Deliverable Name</div>
                    <div class="header table-column column2">Deliverable Type</div>
                    <div class="header table-column column3">Platforms</div>
                    <div class="header table-column column4">Review Link</div>
                    <div class="header table-column column5">Final Asset</div>
                    <div class="header table-column column7">Status Update</div>
                    <div class="header table-column column8">Completion Date</div>
                    <div class="header table-column column9">Project Owner</div>
                </div>
                <div class="table-content">
                </div>
            </div>
        </div>
    </div>
    `;
    buildProductCard(program);
    try {
        const imageObject = await searchAsset(program.programName, program.campaignName);
        if (imageObject){
          insertImageIntoCampaignImg(block,imageObject);
          document.getElementById('totalassets').textContent = imageObject.assetCount;
        }
        else
        {
          document.getElementById('totalassets').textContent = 0;
        }
    } catch (error) {
        console.error("Failed to load campaign image:", error);
    }

    block.querySelector('.tab-wrapper').addEventListener('click', (event) => {
        switchTab(event.target);
    })
    block.querySelector('.back-button').addEventListener('click', () => {
        const host = location.origin + getBaseConfigPath();
        const listPage = blockConfig.listpage;
        document.location.href = host + `/${listPage}`;
    })
    block.querySelectorAll('.read-more').forEach((button) => {
        button.addEventListener('click', (event) => {
            const readMore = event.target;
            const parent = readMore.parentElement;
            parent.querySelector('.paragraph').classList.toggle('hide-overflow');
        });
    });
    decorateIcons(block);
    buildFieldScopes('deliverable-type',uniqueDeliverableTypes, block);
    buildFieldScopes('platforms',uniquePlatforms, block);
    const table = await buildTable(await deliverables).then(async (rows) => {
        return rows;
    })
    const tableRoot = block.querySelector('.table-content');
    tableRoot.appendChild(table);
    buildStatus(program.status);
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

function insertImageIntoCampaignImg(block,imageObject) {
    const campaignImgDiv = block.querySelector('.campaign-img');
    const imgElement = document.createElement('img');
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
    const statusArray = await resolveMappings("getStatusList");
    const statusMatch = filterArray(statusArray, 'value', status);
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
    const rows = document.createElement('div');
    const uniqueCategories = getUniqueItems(deliverableList, 'deliverableType');
    let emptyCategory = false;
    uniqueCategories.forEach(async (category) => {
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
        <div class='property table-column column1 deliverable-name'>${deliverableJson.deliverableName}</div>
        <div class='property table-column column2 deliverable-type'>${typeLabel}</div>
        <div class='property table-column column3 platforms'></div>
        <div class='property table-column column4 review-link'>
            <a href="${deliverableJson.reviewLink}" class="campaign-link" target="_blank">Review Link</a>
        </div>
        <div class='property table-column column5'>
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
            <div class='completion-date'>${checkBlankString(deliverableJson.taskCompletionDate)}</div>
            ${deliverableJson.previousTaskCompletionDate ? '<div class="revised-date">Revised from ' + deliverableJson.previousTaskCompletionDate + '</div> ': ""}
        </div>
        <div class='property table-column column9'>${checkBlankString(deliverableJson.driver)}</div>
    `;
    if (!(deliverableJson.linkedFolderLink == null)) {
        const finalAssetLink = document.createElement('a');
        finalAssetLink.href = deliverableJson.linkedFolderLink;
        finalAssetLink.classList.add('campaign-link');
        finalAssetLink.target = '_blank';
        finalAssetLink.textContent = "Final Asset";
        dataRow.querySelector('.column5').appendChild(finalAssetLink);
    }
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