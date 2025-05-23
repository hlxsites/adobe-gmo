import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';
import { executeQuery } from '../../scripts/graphql.js';
import { getBaseConfigPath } from '../../scripts/site-config.js';
import { searchAsset } from '../../scripts/assets.js';
import { 
    filterArray, getProductMapping, checkBlankString,
    dateFormat, getMappingArray, showLoadingOverlay,
    hideLoadingOverlay, div, span, img, a
} from '../../scripts/shared-program.js';


let blockConfig;
let deliverableMappings, platformMappings, taskStatusMappings, statusMappings;
const queryVars = extractQueryVars();
const programName = queryVars.programName;
const programID = queryVars.programID;
const startDateProp = 'taskPlannedStartDate';
const endDateProp = 'taskPlannedEndDate';
let viewStart, viewEnd, calendarDeliverables;

// Thumbnail cache array object to store the image objects using cacheKey = `${programName}-${campaignName}-${deliverableType}`;
const thumbnailCache = {};

export default async function decorate(block) {
    blockConfig = readBlockConfig(block);
    block.innerHTML = ` `;

    const currentYear = new Date().getFullYear();

    const backButton = div({ class: 'back-button'}, span({ class: 'icon icon-back'}), span({ class: 'back-label'}, 'Back'));
    const bodyWrapper = div({ class: 'main-body-wrapper'});
    const headerWrapper = div(
        { class: 'details-header-wrapper'}, 
        div({ class: 'campaign-img'}), 
        div(
            { class: 'header-title'},
            div({ class: 'header-row1'}, span({ class: 'h1'}, 'Loading details..')),
            div(
                { class: 'header-row2 header-row3'},
                div({ class: 'header-row3 data-element'}, 
                    span({ class: 'icon icon-calendar'}),
                    span({ class: 'date-tooltip'}, 'Proposed Launch Date'),
                    span({ class: 'campaign-date'}, 'Loading details..'),
                ),
                span({ class: 'driver-text'}, 'Project Owner: Loading details..'),
                div(
                    { class: 'header-row3 data-element'},
                    span({ class: 'icon icon-release-tier'}),
                    span({ class: 'release-tier'}, 'Release Tier: Loading details..'),
                ),
                div(
                    { class: 'header-row3 data-element'},
                    span({ class: 'icon icon-productGroup'}),
                    span({ class: 'productGroup'}, 'Loading details..'),
                ),
             ),
        ),
    );

    // export asset count button
    const exportAssetCountButton = div(
        { class: 'export-asset-count-button'},
        img({ class: 'icon icon-download' , 'data-direction': 'left', src: '/icons/download-button.svg'}),
        span({ class: 'button-label'}, 'Export Asset Count'),
    );

    // tab wrapper
    const hideCalendar = blockConfig.hidecalendar;
    const tabWrapper = div(
        { class: 'tab-wrapper'},
        div({ id: 'tab1toggle', class: 'tabBtn active', 'data-target': 'tab1'}, 'Overview'),
        div({ id: 'tab2toggle', class: 'tabBtn', 'data-target': 'tab2'}, 'Deliverables'),
        div({ id: 'tab3toggle', class: `tabBtn ${hideCalendar == 'true' ? 'inactive' : ''}`, 'data-target': 'tab3'}, 'Calendar'),
    );

    // overview tab
    const overviewTab = div(
        { id: 'tab1', class: 'two-column overview tab'},
        div(
            { class: 'overview-wrapper'},
            span({ class: 'h1 overview-heading'}, 'At a Glance'),
            div(
                { class: 'product-overview-wrapper'},
                span({ class: 'h3'}, 'Marketing Goal'),
                div({ class: 'overview paragraph hide-overflow'}, ' '),
                div({ class: 'button no-bg read-more'}, 'Read more'),
            ),
            div(
                { class: 'product-value-wrapper'},
                span({ class: 'h3'}, 'Product Value'),
                div({ class: 'description paragraph hide-overflow'}, ' '),
                div({ class: 'button no-bg read-more'}, 'Read more'),
            ),
            div(
                { class: 'kpis-wrapper'},
                span({ class: 'h3'}, 'KPIs to Measure Success'),
            ),
            div(
                { class: 'kpis-wrapper market-wrapper'},
                span({ class: 'h3'}, 'Target Market Area'),
            ),
            div(
                { class: 'use-cases-wrapper inactive'},
                span({ class: 'h3'}, 'Hero Use Cases'),
                div(
                    { class: 'tags-wrapper'},
                    div({ class: 'use-case-tag'}, 'Text to Image'),
                    div({ class: 'use-case-tag'}, 'Use Case 2'),
                )
            ),
            div(
                { id: 'deliverable-type', class: 'channel-scope-wrapper'},
                span({ class: 'h3'}, 'Deliverable Type'),
                div({ class: 'description'}, 'Select a deliverable type to display platform the assets were created for.'),
                div({ class: 'tags-wrapper'}),
            ),
            div(
                { id: 'platforms', class: 'channel-scope-wrapper'},
                span({ class: 'h3'}, 'Platforms'),
                div({ class: 'description'}, 'Select a platform to display deliverable type the assets were created for.'),
                div({ class: 'tags-wrapper'}),
            ),
        ),
        div(
            exportAssetCountButton,
        ),
        div(
            { class: 'infocards-wrapper'},
            div(
                { class: 'card products'},
                div({ class: 'card-heading h3'}, 'Products'),
            ),
            div(
                { class: 'card audiences'},
                div({ class: 'card-heading h3'}, 'Audiences'),
            ),
        ),
    );



    // deliverables tab
    const expandCollapseTooltip = 'Expand/Collapse All Deliverable Tasks';
    const deliverablesTab = div(
        { id: 'tab2', class: 'deliverables tab inactive'},
        div(
            { class: 'page-heading'},
            div(
                { class: 'total-assets total-assets-tooltip' },
                div({ class: 'h3'}, 'Total Approved Assets'),
                span({ id: 'totalassets', class: 'description'}, 'Not Available'),
                span(
                    { class: 'tooltiptext'},
                    'To view the assets, go to the "All Asset" search page and use Program and Campaign name facet to filter the assets.',
                ),
            ),
        ),
        div(
            { class: 'table-wrapper'},
            div(
                { class: 'table-header' },
                img({ class: 'expand-deliverables showhide-deliverables', src: "/icons/AddCircle_18_N.svg", title: expandCollapseTooltip }),
                img({ class: 'collapse-deliverables showhide-deliverables inactive', src: "/icons/RemoveCircle_18_N.svg", title: expandCollapseTooltip }),
                div({ class: 'header table-column column1' }, 'Deliverable Task Name'),
                div({ class: 'header table-column column2' }, 'Deliverable Type'),
                div({ class: 'header table-column column3' }, 'Platforms'),
                div({ class: 'header table-column column4' }, 'QA Files'),
                div({ class: 'header table-column column5' }, 'Approved Collection Link(s)'),
                div({ class: 'header table-column column7' }, 'Status Update'),
                div({ class: 'header table-column column10' }, 'Task Status'),
                div({ class: 'header table-column column8' }, 'Completion Date'),
                div({ class: 'header table-column column9' }, 'Task Owner'),               
            ),
            div({ class: 'table-content' }),
        )       
    );

    // calendar tab
    const calendarTab = div(
        { id: 'tab3', class: 'calendar tab inactive'},
        div(
            { class: 'control-wrapper' },
            div(
                { class: 'inc-dec-wrapper' },
                div(
                    { class: 'year-switch' },
                    div(
                        { id: 'dec-year', class: 'year-toggle' },
                        img(
                            { class: 'left', 'data-direction': 'left', src: '/icons/chevron-right.svg'},
                        ),
                    ),
                    div(
                        { id: 'inc-year', class: 'year-toggle' },
                        img(
                            { class: 'right', 'data-direction': 'right', src: '/icons/chevron-right.svg'},
                        ),
                    )
                ),
                div(
                    { class: 'current-year', 'data-quarter': '1', 'data-year': `${currentYear}` },
                    `${currentYear}`,
                ),
            ),
            div(
                { class: 'right-controls' },
                div({ class: 'today-button' }, 'Today'),
                div(
                    { class: 'filter-dropdown-wrapper' },
                    div(
                        { class: 'filter-dropdown-button' },
                        div({ class: 'label' }, 'Selected View: Year'),
                        span({ class: 'icon icon-chevronDown' }),
                        span({ class: 'icon icon-chevronUp inactive' }),
                    ),
                ),
            ),
        ),
    );

    bodyWrapper.appendChild(headerWrapper);
    bodyWrapper.appendChild(tabWrapper);
    bodyWrapper.appendChild(overviewTab);
    bodyWrapper.appendChild(deliverablesTab);
    bodyWrapper.appendChild(calendarTab);
    showLoadingOverlay(bodyWrapper);
    block.appendChild(backButton);
    block.appendChild(bodyWrapper);
    decorateIcons(block);

    // add dynamic data
    addProgramStats(block);

    // enable back button
    enableBackBtn(block, blockConfig);
}

async function addProgramStats(block) {
    // mappings
    deliverableMappings = getMappingArray('deliverableType');
    platformMappings = getMappingArray('platforms');
    taskStatusMappings = getMappingArray('taskStatus');
    statusMappings = getMappingArray('status');

    // main program data
    const encodedSemi = encodeURIComponent(';');
    const encodedProgram = encodeURIComponent(programName);
    const encodedPath = queryVars.path ? `${encodeURIComponent(queryVars.path)}` : '';
    const programQueryString = `getProgramDetails${encodedSemi}programName=${encodedProgram}${encodedSemi}programID=${encodeURIComponent(programID)}` +
        (encodedPath ? `${encodedSemi}path=${encodedPath}` : '');
    const programData = await executeQuery(programQueryString);
    const program = programData.data.programList.items[0];

    const uniqueDeliverableTypes = getUniqueItems(programData.data.deliverableList.items, 'deliverableType');
    const uniquePlatforms = getUniqueItems(programData.data.deliverableList.items, 'platforms');
    const bodyWrapper = document.querySelector('.main-body-wrapper');

    // for deliverable list
    const deliverableQueryString = `getProgramDeliverables${encodedSemi}programName=${encodedProgram}${encodedSemi}programID=${encodeURIComponent(programID)}`;
    let imageTest = {imageUrl : '', imageAltText: '', assetCount: 0};
    imageTest = await searchAsset(programName, programName.campaignName, 'email', 'appier');
    console.log('Image Test:', imageTest);


    // for thumbnails
    let imageObject = {imageUrl : '', imageAltText: '', assetCount: 0};
    let totalassets = 0;

    // build header
    let header = block.querySelector('.details-header-wrapper');
    if (!(program === undefined)) {
        const programHeader = buildHeader(program, queryVars).outerHTML;
        // Update the header with the actual data
        header.outerHTML = programHeader;
        try {
            imageObject = await searchAsset(program.programName, program.campaignName);
            if (imageObject) {
                insertImageIntoCampaignImg(block, imageObject);
                totalassets = imageObject.assetCount;
            }
        } catch (error) {
            console.error("Failed to load campaign image:", error);
        }
    } else {
        //programName and campaignName is null
        const noDataBlock = div(
            div(
                { class: 'back-button' },
                span({ class: 'icon icon-back' }),
                span({ class: 'back-label' }, 'Back')
            ),
            div(
                { class: 'main-body-wrapper' }, 
                header,
                div({ class: 'no-data-msg' }, 'No program data available.'),
            ),
        );
        header.textContent = 'Unable to retrieve program information.';
        block.innerHTML = noDataBlock.innerHTML;

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
        hideLoadingOverlay(bodyWrapper);
        enableBackBtn(block, blockConfig);
        decorateIcons(block);
        return;
    }

    // start populating needed statistics and areas
    // add major UI elements
    const p0TargetMarketArea = program.p0TargetMarketArea ? program.p0TargetMarketArea : null;
    const p1TargetMarketArea = program.p1TargetMarketArea ? program.p1TargetMarketArea : null;
    const kpis = buildKPIList(program);
    const targetMarketAreas = buildTargetMarketAreaList(p0TargetMarketArea,p1TargetMarketArea);
    const audiences = buildAudienceList(program);
    const artifactLinks = buildArtifactLinks(program);
    const collections = buildProgramCollections(program);

    document.querySelector('.kpis-wrapper').appendChild(kpis);
    document.querySelector('.market-wrapper').appendChild(targetMarketAreas);
    document.querySelector('.card.audiences').appendChild(audiences);
    document.querySelector('.overview-wrapper').appendChild(artifactLinks);

    // add text
    const marketingGoal = checkBlankString(program.marketingGoal.plaintext);
    document.querySelector('.product-overview-wrapper > .paragraph').textContent = marketingGoal;
    const productValue = checkBlankString(program.productValue.plaintext);
    document.querySelector('.product-value-wrapper > .paragraph').textContent = productValue;

    // deliverables tab
    const deliverables = executeQuery(deliverableQueryString);
    document.querySelector('.page-heading').appendChild(artifactLinks);
    document.querySelector('.total-assets > .description').textContent = totalassets;
    if (collections) document.querySelector('.deliverables > .page-heading').appendChild(collections);

    //Create a map to store the associations
    const deliverableTypeToPlatformsMap = new Map();
    // Create a map to store the associations
    const platformToDeliverableTypesMap = new Map();

    // Populate the map
    programData.data.deliverableList.items.forEach(item => {
        const deliverableType = item.deliverableType; //array of deliverableType
        const platforms = item.platforms; // array of platform strings
        // If deliverableType or platforms is null, skip the iteration
        if (deliverableType === null || deliverableType === undefined || platforms === null || platforms === undefined) {
            return;
        }
        //if deliverableType or Platforms has same value, show both buttons
        if (deliverableType.value === 0 || platforms.value === 0) {
            return;
        }
        platforms.forEach(async platform => {
            let assetResult = {imageUrl : '', imageAltText: '', assetCount: 0};
            assetResult = await searchAsset(programName, programName.campaignName, deliverableType, platform);
            let assetCount = assetResult.assetCount;

            // deliverableType, platform, assetCount
            if (!deliverableTypeToPlatformsMap.has(deliverableType)) {
                // Case: If the deliverable type is not in the map, create a new entry with the platform added to the new map.
                const deliverableTypesPlatformAssetCountMap = new Map();
                deliverableTypesPlatformAssetCountMap.set(platform, assetCount);
                // Create a new entry for each deliverable type with the new map.
                deliverableTypeToPlatformsMap.set(deliverableType, deliverableTypesPlatformAssetCountMap);
            } else {
                // Case: If the deliverable type is in the map, add the platform to the existing set.
                const deliverableTypesPlatformAssetCountMap = deliverableTypeToPlatformsMap.get(deliverableType);
                deliverableTypesPlatformAssetCountMap.set(platform, assetCount);
                deliverableTypeToPlatformsMap.set(deliverableType, deliverableTypesPlatformAssetCountMap);
            }

            if (!platformToDeliverableTypesMap.has(platform)) {
                // Case: If the platform is not in the map, create a new entry with the deliverableType added to the new map.
                const platformdeliverableTypesAssetCountMap = new Map();
                platformdeliverableTypesAssetCountMap.set(deliverableType, assetCount);
                // Create a new entry for each platform with the new map.
                platformToDeliverableTypesMap.set(platform, platformdeliverableTypesAssetCountMap);
            } else {
                // Case: If the platform is in the map, add the deliverableType to the existing set.
                const platformdeliverableTypesAssetCountMap = platformToDeliverableTypesMap.get(platform);
                platformdeliverableTypesAssetCountMap.set(deliverableType, assetCount);
                platformToDeliverableTypesMap.set(platform, platformdeliverableTypesAssetCountMap);
            }
        });

    });

    // Attach event listener to the button
    const exportAssetCountButton = document.querySelector('.export-asset-count-button');
    exportAssetCountButton.addEventListener('click', () => {
    createCSV(deliverableTypeToPlatformsMap);
    });

            function createCSV(deliverableTypeToPlatformsMap) {
            // Define the CSV header
            let header = `Program name: ${program.programName}\n\n`;
            let csvContent = `data:text/csv;charset=utf-8,${header}Deliverable Type,Platforms (by Deliverable Type),Deliverable Types - Asset Counts,Platform - Asset Counts\n`;
            let grandTotalAssetCount = 0;

            // Iterate over the deliverableTypeToPlatformsMap to extract data
            deliverableTypeToPlatformsMap.forEach((platformsMap, deliverableType) => {
                let totalAssetCount = 0;
                
                platformsMap.forEach(assetCount => {
                    totalAssetCount += assetCount;
                });
        
                // Add the deliverable type row
                csvContent += `${deliverableType},All platforms,${totalAssetCount},\n`;
        
                // Add the platform rows
                platformsMap.forEach((assetCount, platform) => {
                    csvContent += `,${platform},,${assetCount}\n`;
                });

               // Add to grand total
                grandTotalAssetCount += totalAssetCount;
            });

             // add a blank row
             csvContent += '\n';

            // Add the grand total asset count row and bold the text  
            csvContent += `Instances of assets deployed,,${grandTotalAssetCount},\n`;

            // Encode the CSV content
            const encodedUri = encodeURI(csvContent);
        
            // Create a link element to download the CSV file
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "marketing-dashboard-hcv-count.csv");
        
            // Append the link to the document body and trigger the download
            document.body.appendChild(link);
            link.click();
        
            // Remove the link from the document
            document.body.removeChild(link);
        }

    buildProductCard(program);
    buildFieldScopes('deliverable-type', uniqueDeliverableTypes, block, deliverableTypeToPlatformsMap);
    buildFieldScopes('platforms', uniquePlatforms, block, platformToDeliverableTypesMap);

    const table = buildTable(await deliverables).then(async (rows) => {
        return rows;
    });
    const tableRoot = block.querySelector('.table-content');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(await table);
    tableRoot.appendChild(fragment);
    buildStatus(program.status);

    // calendar tab
    buildCalendar(await deliverables, block, "year", await deliverableMappings);

    // enable 'read more' buttons
    block.querySelectorAll('.read-more').forEach((button) => {
        button.addEventListener('click', (event) => {
            const readMore = event.target;
            const parent = readMore.parentElement;
            const paragraph = parent.querySelector('.paragraph');
            paragraph.classList.toggle('hide-overflow');
            readMore.textContent = paragraph.classList.contains('hide-overflow') ? 'Read more' : 'Read less';
        });
    });

    // enable tab switching
    block.querySelector('.tab-wrapper').addEventListener('click', (event) => {
        switchTab(event.target);
    });

    // enable expand/collapse all deliverables
    block.querySelectorAll('.expand-deliverables, .collapse-deliverables').forEach((button) => {
        button.addEventListener('click', (event) => {
            const clickedBtn = event.currentTarget;
            document.querySelector('.showhide-deliverables.inactive').classList.toggle('inactive');
            clickedBtn.classList.toggle('inactive');
    
            const expand = clickedBtn.classList.contains('expand-deliverables');
            document.querySelectorAll('.row.collapsible').forEach((group) => toggleGroup(group, expand));
        });
    })

    // decorate any new icons
    decorateIcons(block);

    // remove loading spinner
    hideLoadingOverlay(bodyWrapper);
}

function toggleGroup(group, expand) {
    if (expand) {
        group.querySelector('.icon-next').classList.add('inactive');
        group.querySelector('.icon-collapse').classList.remove('inactive');
    } else {
        group.querySelector('.icon-next').classList.remove('inactive');
        group.querySelector('.icon-collapse').classList.add('inactive');
    }
    Array.from(group.children).forEach((child) => {
        if (child.classList.contains('row')) {
            child.classList.toggle('inactive', !expand);
        }
    });
};

function enableBackBtn(block, blockConfig) {
    block.querySelector('.back-button').addEventListener('click', () => {
        const host = location.origin + getBaseConfigPath();
        const listPage = blockConfig.listpage;
        document.location.href = host + `/${listPage}?isBack=true`;
    })
}

function buildProgramCollections(program) {
    const programCollections = program.programLevelcollectionLink;
    if (programCollections) {
        const collectionsElem = div(
            { id: 'collections-wrapper', class: 'collections-wrapper' },
            div({ class: 'h3' }, 'Program Collection(s)'),
        );
        const collectionsLinksWrapper = div({ class: 'collections' });
    
        programCollections.forEach((collection) => {
            const collectionData = parseProgramCollectionLink(collection);
            const collectionLink = a({ class: 'collection-link', href: collectionData.link, target: '_blank' }, collectionData.name);
            collectionsLinksWrapper.appendChild(collectionLink);
        });
        collectionsElem.appendChild(collectionsLinksWrapper);
        return collectionsElem;
    } else {
        return null;
    }
}

function buildHeader(program, queryVars) {
    const programName = program ? program.programName : queryVars.programName;
    
    const dateDiv = program?.launchDate
        ? div(
            { class: 'header-row3'},
            span({ class: 'icon icon-calendar' }),
            span({ class: 'date-tooltip' }, 'Proposed Launch Date'),
            span({ class: 'campaign-date' }, formatDate(program.launchDate)),
        ) 
        : "";
    const campaignNameDiv = program?.campaignName 
        ? div(
            { class: 'header-row2' },
            span({ class: 'subtitle' },
            program.campaignName))
        : "";
    const releaseTierDiv = div(
        { class: 'header-row3' },
        span({ class: 'icon-release-tier' }),
        span({ class: 'release-tier' }, `Release Tier: ${program.releaseTier ? program.releaseTier : 'Not Available'}`),
    );
    const productGroupDiv = div(
        { class: 'header-row3' },
        span({ class: 'icon-productGroup' }),
        span({ class: 'productGroup' }, `${program.productGroup && program.productGroup.length > 0 ? program.productGroup.join(', ') : "Not Available"}`)
    );
    const driverDiv = program 
        ? span({ class: 'driver-text' }, `Project Owner: ${program.driver ? program.driver : "Not Available"}`)
        : "";
    const header = div(
        { class: 'details-header-wrapper' },
        div({ class: 'campaign-img' }),
        div(
            { class: 'header-title' },
            div(
                { class: 'header-row1' },
                span({ class: 'h1' }, programName)
            ),
            campaignNameDiv,
            div(
                { class: 'header-row3' },
                dateDiv,
                driverDiv,
                releaseTierDiv,
                productGroupDiv
            ),
        )
    );
    return header;
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
    if (campaignImgDiv) campaignImgDiv.appendChild(imgElement);
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


async function buildFieldScopes(scopeTypeId, scopes, block, associationMap) {
    if (scopes.length == 0) {
        block.querySelector(`#${scopeTypeId}.channel-scope-wrapper`).classList.add('inactive');
        return;
    }
    const scopesParent = block.querySelector(`#${scopeTypeId}.channel-scope-wrapper .tags-wrapper`);
    scopes.forEach(async (scope) => {
        if (scope == null || scope == undefined || scope == '') return;
        const tag = document.createElement('button');
        tag.classList.add('scope-tag');
        tag.textContent = await lookupType(scope, scopeTypeId);
        tag.id = scope;
            scopesParent.appendChild(tag);
            
            let isSelected = false;
            
            tag.addEventListener('click', async () => {
                if (isSelected) {
                    let headingDiv1 = document.getElementById((scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                    // Fetch all .scope-tag class from headingDiv1
                    let alternativeTags = headingDiv1.querySelectorAll('.scope-tag');

                    // Clear the selection
                    const allTags = document.querySelectorAll('.scope-tag');
                    allTags.forEach(t => {
                    t.style.display = 'inline-block';
                     t.classList.remove('selected'); // Remove the selected class
                    });
                    const associatedItems = associationMap.get(scope);

                    // Reset the associated buttons
                    if (associatedItems) {
                        associatedItems.forEach(async (_count, key) => {
                            const associatedTag = Array.from(alternativeTags).find(t => t.id.includes(key));
                            if (associatedTag) {
                                let alternateTextContent = await lookupType(associatedTag.id, (scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                                associatedTag.textContent = `${alternateTextContent}`;
                                associatedTag.style.display = 'inline-block';
                                associatedTag.style.pointerEvents = 'auto'; // Make the clickable
                            }
                        });
                    }

                    tag.textContent = await lookupType(scope, scopeTypeId);
                    isSelected = false;

                    // Reset the heading text content
                    let headingDiv = document.getElementById((scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                    // Fetch h3 class from headingDiv
                    let heading = headingDiv.querySelector('span.h3');
                    
                    // Remove the appended heading.textContent
                    heading.textContent = heading.textContent.split(' (')[0];

                    // Remove the "Clear selection" hyperlink text next to the headingDiv
                    let clearSelection = document.getElementById('clear-selection');
                    clearSelection.remove();
                } else {
                    // Hide all buttons
                    const allTags = document.querySelectorAll('.scope-tag');
                    allTags.forEach(t => t.style.display = 'none');

                    let associatedHeadingDiv = document.getElementById((scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                    // Fetch all .scope-tag class from associatedHeadingDiv
                    let alternativeTags = associatedHeadingDiv.querySelectorAll('.scope-tag');
            
                    // Get the associated items
                    const associatedItems = associationMap.get(scope);
            
                    // Update the clicked button's text content to include the length
                    tag.textContent = `${await lookupType(scope, scopeTypeId)}`;
                    tag.style.display = 'inline-block';

                    let totalAssociatedAssetCount = 0;
            
                    // Show the associated buttons
                    if (associatedItems) {
                        associatedItems.forEach(async (count, key) => {
                            totalAssociatedAssetCount = totalAssociatedAssetCount + count;
                            const associatedTag = Array.from(alternativeTags).find(t => t.id.includes(key));
                            let alternateTextContent = await lookupType(associatedTag.id, (scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                            if (associatedTag) {
                                associatedTag.textContent = `${await lookupType(scope, scopeTypeId)}: ${alternateTextContent} (${count})`;
                                associatedTag.style.display = 'inline-block';
                                associatedTag.style.pointerEvents = 'none'; // Make the tag non-clickable
                                
                            }
                        });
                    }
                    // Add the selected class to the clicked button
                    tag.classList.add('selected');
                    isSelected = true;
                    let alternateHeadingDiv = document.getElementById((scopeTypeId === 'deliverable-type') ? 'platforms' : 'deliverable-type');
                    // Fetch h3 class from headingDiv
                    let alternateHeading = alternateHeadingDiv.querySelector('span.h3');
                    
                    // Append heading.textContent with number 3
                    alternateHeading.textContent = `${alternateHeading.textContent} (${totalAssociatedAssetCount} ${totalAssociatedAssetCount > 1 ? 'assets' : 'asset'})`;
                    
                    let headingDiv = document.getElementById((scopeTypeId));

                    // Add a "Clear selection" hyperlink text next to the headingDiv
                    let clearSelection = document.createElement('a');
                    clearSelection.id = 'clear-selection';
                    clearSelection.classList.add('clear-selection');
                    clearSelection.textContent = 'Clear selection';
                    clearSelection.addEventListener('click', () => {
                        tag.click();
                    });
                    // Append the "Clear selection" hyperlink text next to the headingDiv as its first child
                    headingDiv.firstChild.appendChild(clearSelection);
                
                }
            });
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
    const productList = div(
        { class: 'product card-content' },
        img({ class: 'icon', src: productMapping.icon }),
        checkBlankString(productMapping.label),
    );
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
    const artifactLinks = div(
        { class: 'links-wrapper' },
        span({ class: 'h3' }, 'Links to Important Artifacts'),
        div(
            { class: 'links' },
            program.creativeArchitectureLink ? a({ class: 'campaign-link', target: '_blank', href: program.creativeArchitectureLink }) : "",
            program.e2eJourney ? a({ class: 'campaign-link', target: '_blank', href: program.e2eJourney }) : "",
            program.gtmSLink ? a({ class: 'campaign-link', target: '_blank', href: program.gtmSLink }) : "",
            program.gtmPLink ? a({ class: 'campaign-link', target: '_blank', href: program.gtmPLink }) : "",
            program.marketingBrief ? a({ class: 'campaign-link', target: '_blank', href: program.marketingBrief }) : "",
            program.marketingDoc ? a({ class: 'campaign-link', target: '_blank', href: program.marketingDoc }) : "",
            program.pager ? a({ class: 'campaign-link', target: '_blank', href: program.pager }) : "",
            program.adr ? a({ class: 'campaign-link', target: '_blank', href: program.adr }) : "",
        )
    )
    // see how many 'links' were made. if none, hide the section
    const numLinks = artifactLinks.querySelectorAll('.campaign-link')?.length;
    if (numLinks == 0) artifactLinks.classList.add('inactive');
    return artifactLinks;
}

async function buildStatus(status) {
    const statusMatch = filterArray(await statusMappings, 'value', status);
    const statusText = statusMatch ? statusMatch[0].text : status;
    const statusHex = statusMatch[0]["color-code"];
    const statusDiv = div({ class: 'campaign-status', style: `background-color: #${statusHex}`}, statusText);
    document.querySelector('.header-row1').appendChild(statusDiv);
}

function createAudience(audience) {
    const text = parseString(audience);
    const audienceDiv = div(
        { class: 'audience card-content'},
        img({ class: 'icon icon-gear', src: '/icons/gear.svg' }),
        text,
    );
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
            const tableRow = await buildTableRow(campaign, !emptyCategory);
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
    const headerRowDiv = div({ class: 'row collapsible header' });
    const divOpen = div(
        { class: 'heading-wrapper' },
        img({ class: 'icon-next', src: '/icons/next.svg' }),
        img({ class: 'icon-collapse inactive', src: '/icons/collapse.svg' }),
        div({ class: 'headertext' }, `${typeLabel} (${matchCount})`),
    );
    if (headerType === 'subcategory') {
        headerRowDiv.classList.add('subheader');
        divOpen.classList.add('subheading');
    }
    headerRowDiv.appendChild(divOpen);
    if (isInactive) headerRowDiv.classList.add('inactive');
    return headerRowDiv;
}

async function buildTableRow(deliverable, createHidden) {
    //look up friendly name for deliverable type
    const typeLabel = await lookupType(deliverable.deliverableType, 'deliverable-type');
    const assetLinks = createAssetLink(deliverable);
    const status = (deliverable.deliverableStatusUpdate == null) ? "Not Available" : deliverable.deliverableStatusUpdate + "%";
    const statusPct = (deliverable.deliverableStatusUpdate == null) ? "0%" : deliverable.deliverableStatusUpdate + "%";
    const taskStatusInfo = await getTaskStatusMapping(deliverable.taskStatus);
    const taskStatus = taskStatusInfo ? taskStatusInfo.text : checkBlankString(deliverable.taskStatus);

    const dataRowDiv = div(
        { class: 'row datarow' },
        div({ class: 'property table-column column1 deliverable-name' }, checkBlankString(deliverable.deliverableName)),
        div({ class: 'property table-column column2 deliverable-type' }, checkBlankString(typeLabel)),
        div({ class: 'property table-column column3 platforms' }),
        div(
            { class: 'property table-column column4 qa-files' },
            deliverable.reviewLink 
            ? a({ class: 'campaign-link', target: '_blank', href: deliverable.reviewLink }, 'QA Files')
            : 'Not Available'
        ),
        div({ class: 'property table-column column5' }, assetLinks),
        div(
            { class: 'property table-column column7 justify-center' },
            div(
                { class: 'status-wrapper '},
                div(
                    { class: 'status-heading' },
                    div({ class: 'status-label' }, 'Progress'),
                    div({ class: 'status-percent' }, status),
                ),
                div(
                    { class: 'status-bar-wrapper' },
                    div({ class: 'status-bar-underlay' }),
                    div({ class: 'status-bar', style: `width: ${statusPct}` }),
                ),
            )
        ),
        div({ class: 'property table-column column10', style: `${taskStatusInfo ? 'border-color: #' +
            taskStatusInfo['color-code'] : ''}` }, taskStatus),
        div({ class: 'property table-column column8 date-wrapper' },
            div({ class: 'completion-date' }, dateFormat(deliverable.taskCompletionDate)),
            deliverable.previousTaskCompletionDate
                ? div({ class: 'revised-date' }, `Revised from ${deliverable.previousTaskCompletionDate}`)
                : ''
        ),
        div({ class: 'property table-column column9' }, checkBlankString(deliverable.driver)),
    );
    if (createHidden) dataRowDiv.classList.add('inactive');
    createPlatformString(deliverable.platforms, dataRowDiv);
    return dataRowDiv;
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

function createAssetLink(deliverable) {
    const collections = deliverable.collectionLink;
    const linkWrapper = div({ class: 'collection-link-wrapper '});
    if (collections) {
        collections.forEach((collection) => {
            const collectionData = parseCollectionLink(collection);
            const parsedCollectionName = parseCollectionName(collectionData.fullName);
            const collectionLink = a({ class: 'collection-link', href: collectionData.link, target: '_blank', title: collectionData.name }, parsedCollectionName);
            linkWrapper.appendChild(collectionLink);
        });
    } else {
        const linkedFolder = deliverable.linkedFolderLink;
        if (linkedFolder) {
            const linkedFolderLink = a({ class: 'campaign-link', target: '_blank', href: linkedFolder }, 'Approved Assets (Workfront)');
            linkWrapper.appendChild(linkedFolderLink);
        } else {
            linkWrapper.textContent = 'Not Available';
        }
        
    }
    return linkWrapper;
}

function parseCollectionName(rawString) {
    const collectionName = rawString;
    const maxLength = 67;
    const charsToShow = 28;
    
    if (collectionName.length > maxLength) {
        const truncatedString = collectionName.slice(0, charsToShow) + "[...]" + collectionName.slice(-charsToShow);
        return truncatedString;
    } else {
        return collectionName;
    }
}

function parseProgramCollectionLink(collectionString) {
    let collectionName, collectionLink;
    const splitString = collectionString.split(';');
    if (splitString.length > 1) {
        collectionName = splitString[0];
        collectionLink = splitString[1];
    } else {
        collectionName = 'Collection';
        collectionLink = splitString[0];
    }

    const parsedCollection = {
        'name': collectionName,
        'link': collectionLink,
    }
    return parsedCollection;
}

function parseCollectionLink(collectionString) {
    let collectionName, collectionPlatform, collectionCategory, collectionLink;
    const fullNameSplit = collectionString.split(';');
    const splitString = collectionString.split(' | ');

    const fullName = (fullNameSplit.length > 1) ? fullNameSplit[0] : 'Collection';

    if (splitString.length > 1) {
        collectionName = splitString[0];
        collectionPlatform = splitString[1];
        [ collectionCategory, collectionLink ] = splitString[2].split(';');
    } else {
        collectionName = 'Collection';
        collectionPlatform, collectionCategory = 'Not Available';
        collectionLink = splitString[0];
    }

    const parsedCollection = {
        'name': collectionName,
        'platform': collectionPlatform,
        'category': collectionCategory,
        'link': collectionLink,
        'fullName': fullName
    }
    return parsedCollection;
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
    const pnRegex = /[?&]programName=([^&]+)&programID=([^&]+)(&path=([^&#]+))?/;
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

    // update- if viewEnd is before viewStart, ignore and set arbitrary viewStart+1 month end date
    if (!(isValidDate(viewEnd)) || viewEnd <= 0 || viewEnd < viewStart) {
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

    const contentWrapperDiv = div({ class: 'calendar-content-wrapper' });
    if (type === 'quater') {
        contentWrapperDiv.classList.add('quarter-view');
        contentWrapperDiv.dataset.view = 'quarter';
    } else {
        contentWrapperDiv.dataset.vew = 'year';
    }

    var groupIndex = 1;
    for (const group of uniqueGroups) {
        const groupType = await lookupType(group, 'deliverable-type');
        // find all members of this group
        const matchedItems = calendarDeliverables.filter(item => item.deliverableType === group);

        // find the earliest date- this is how we set the position for the group against the calendar
        let earliestStartDate = getTimeBounds(matchedItems, "start", startDateProp);
        earliestStartDate = (!(isValidDate(earliestStartDate)) || earliestStartDate <= 0) ? new Date(viewStart) : earliestStartDate;
        let latestEndDate = getTimeBounds(matchedItems, "end", endDateProp);
        latestEndDate = (!(isValidDate(latestEndDate)) || latestEndDate <= 0) ? new Date(viewEnd) : latestEndDate;
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
        const itemWrapperDiv = div({ class: 'group-content' });

        for (const item of matchedItems) {
            const itemStartDate = (item[startDateProp]) ? new Date(item[startDateProp]) : viewStart;
            const itemEndDate = (item[endDateProp]) ? new Date(item[endDateProp]) : viewEnd;

            const itemEndDateStr = itemEndDate ? itemEndDate.toLocaleDateString().split(',')[0] : null;
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);

            let daysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((daysDifference / groupDuration) * 100).toFixed(2);

            // Find the corresponding color code from the taskStatusMappings array
            const itemStatusMapping = await getTaskStatusMapping(item.taskStatus);
            const { text: statusText = 'Unknown Status', 'color-code': colorCode = 'green' } = itemStatusMapping;

            // Create a placeholder for the thumbnail
            const itemElDiv = div({ class: 'item', style: `margin-left: ${startPctDiff}%;width: ${itemDurationPct}%`},
                div({ class: 'color-tab'}),
                div(
                    { class: 'item-content' },
                    div(
                        { class: 'content-row' },
                        div(
                            { class: 'info' },
                            div({ class: 'thumbnail' }),
                            div({ class: 'name', title: item.deliverableName}, item.deliverableName),
                            div({ class: 'item-status', 'data-status': checkBlankString(item.taskStatus),
                                style: `background-color: #${colorCode}`, title: statusText,
                            }),
                        ),
                    ),
                    div(
                        { class: 'content-row bottom' },
                        itemEndDateStr 
                            ? div({ class: 'start-date', title: `Task Planned End Date: ${itemEndDateStr}`}, `End Date: ${itemEndDateStr}`)
                            : '',
                        div(
                            { class: 'link' },
                            a({ href: item.reviewLink, target: '_blank' }, 'QA Files'),
                        )
                    )
                )
            );

            // Call the new function to fetch and add the thumbnail, ensuring sequential execution
            await addThumbnailToItem(itemElDiv, item.programName, item.campaignName,item.deliverableType);
            itemWrapperDiv.appendChild(itemElDiv);
        };

        const groupElDiv = div({ class: `calendar-group color${groupIndex}`,
            style: `margin-left: ${startPosition}%;width: ${widthOfGroup}%`},
                div({ class: 'group-header'},
                    div({ class: 'left-block' },
                        img({ src: '/icons/chevron-right.svg', class: 'group-expand group-controls inactive'}),
                        img({ src: '/icons/chevron-right.svg', class: 'group-collapse group-controls'}),
                        div({ class: 'group-heading', title: `${groupType}`}, groupType),
                        div({ class: 'group-count'}, matchedItems.length)
                    ),
                    div({ class: 'right-block' }),
                ),
        );

        groupElDiv.appendChild(itemWrapperDiv);
        groupElDiv.querySelectorAll('.group-controls').forEach((arrow) => {
            arrow.addEventListener('click', showHideGroup);
        });

        contentWrapper.appendChild(groupElDiv);
        groupIndex = (groupIndex === 5) ? 1 : groupIndex + 1;
    };

    calendarEl.appendChild(contentWrapper);
    block.querySelector('.calendar.tab').appendChild(calendarEl);

    // populate "filter" dropdown
    const filterDropdown = div({ class: 'filter-dropdown-content'});
    const uniqueYears = getUniqueYears(calendarDeliverables);
    const yearOptionLabel = div({ class: 'filter-label' }, 'Year');
    const quarterOptionLabel = div({ class: 'filter-label' }, 'Quarter');
    filterDropdown.appendChild(yearOptionLabel);

    // when choosing 'Quarter' the top left controls change to control the quarter in focus
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
        const quarterOption = div({ class: 'filter-option', 'data-period': quarter }, quarter);
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

    // account for view not including current date
    if (monthEl) {
        monthEl.classList.add('current');
        // use direct style for line offset
        const lineEl = div({ class: 'calendar-indicator', style: `margin-right: ${((-2 * percentOfMonth) + 100)}%` })
        monthEl.appendChild(lineEl);
    }

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
        const imgEl = img({ src: imageObject.imageUrl, alt: imageObject.imageAltText, loading: 'lazy' });
        thumbnailDiv.appendChild(imgEl);
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

    buildCalendar(calendarDeliverables, block, view, deliverableMappings, period);
}

function calendarYears(startYear, endYear) {
    let years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
}

function buildYearCal(years) {
    const calendarEl = div({ class: 'calendar-wrapper' });
    if (years.length > 1) calendarEl.classList.add('multiyear');
    const backgroundEl = div({ class: 'calendar-background', style: `width: ${(years.length * 100)}%` });

    years.forEach((year) => {
        const yearWrapper = div(
            { class: 'year-wrapper', style: `width: ${(100 / years.length)}%`, 'data-year': year },
            div(
                { class: 'header-wrapper' },
                div(
                    { class: 'quarter-header' },
                    div({ class: 'quarter' }, `Q1 ${year}`),
                    div({ class: 'quarter' }, `Q2 ${year}`),
                    div({ class: 'quarter' }, `Q3 ${year}`),
                    div({ class: 'quarter' }, `Q4 ${year}`),
                ),
            ),
            div(
                { class: 'month-wrapper', 'data-year': year },
                div({ class: 'month', 'data-num': '1'},
                    div({ class: 'label' }, 'Jan'),
                ),
                div({ class: 'month', 'data-num': '2'},
                    div({ class: 'label' }, 'Feb'),
                ),
                div({ class: 'month', 'data-num': '3'},
                    div({ class: 'label' }, 'Mar'),
                ),
                div({ class: 'month', 'data-num': '4'},
                    div({ class: 'label' }, 'Apr'),
                ),
                div({ class: 'month', 'data-num': '5'},
                    div({ class: 'label' }, 'May'),
                ),
                div({ class: 'month', 'data-num': '6'},
                    div({ class: 'label' }, 'Jun'),
                ),
                div({ class: 'month', 'data-num': '7'},
                    div({ class: 'label' }, 'Jul'),
                ),
                div({ class: 'month', 'data-num': '8'},
                    div({ class: 'label' }, 'Aug'),
                ),
                div({ class: 'month', 'data-num': '9'},
                    div({ class: 'label' }, 'Sep'),
                ),
                div({ class: 'month', 'data-num': '10'},
                    div({ class: 'label' }, 'Oct'),
                ),
                div({ class: 'month', 'data-num': '11'},
                    div({ class: 'label' }, 'Nov'),
                ),
                div({ class: 'month', 'data-num': '12'},
                    div({ class: 'label' }, 'Dec'),
                ),
            )
        );
        backgroundEl.appendChild(yearWrapper);
    });
    calendarEl.appendChild(backgroundEl);
    return calendarEl;
}


function buildQuarterCal(years) {
    const calendarEl = div({ class: 'calendar-wrapper quarter-view' });
    if (years.length > 1) calendarEl.classList.add('multiyear');

    // this is wider for 'quarter' view- see equivalent in 'year' view.
    const backgroundEl = div({ class: 'calendar-background', style: `width: ${(years.length * 300)}%`});

    years.forEach((year) => {
        const yearWrapper = div(
            { class: 'year-wrapper', style: `width: ${(100 / years.length)}%`, 'data-year': year },
            div(
                { class: 'header-wrapper' },
                div(
                    { class: 'quarter-header' },
                    div({ class: 'quarter' }, `Fiscal Q1 ${year}`),
                    div({ class: 'quarter' }, `Fiscal Q2 ${year}`),
                    div({ class: 'quarter' }, `Fiscal Q3 ${year}`),
                    div({ class: 'quarter' }, `Fiscal Q4 ${year}`),
                ),
            ),
            div({ class: 'month-wrapper', 'data-year': year },
                div({ class: 'month', 'data-num': '12'},
                    div({ class: 'label' }, 'Dec Q1'),
                ),
                div({ class: 'month', 'data-num': '1'},
                    div({ class: 'label' }, 'Jan Q1'),
                ),
                div({ class: 'month', 'data-num': '2'},
                    div({ class: 'label' }, 'Feb Q1'),
                ),
                div({ class: 'month', 'data-num': '3'},
                    div({ class: 'label' }, 'Mar Q2'),
                ),
                div({ class: 'month', 'data-num': '4'},
                    div({ class: 'label' }, 'Apr Q2'),
                ),
                div({ class: 'month', 'data-num': '5'},
                    div({ class: 'label' }, 'May Q2'),
                ),
                div({ class: 'month', 'data-num': '6'},
                    div({ class: 'label' }, 'Jun Q3'),
                ),
                div({ class: 'month', 'data-num': '7'},
                    div({ class: 'label' }, 'Jul Q3'),
                ),
                div({ class: 'month', 'data-num': '8'},
                    div({ class: 'label' }, 'Aug Q3'),
                ),
                div({ class: 'month', 'data-num': '9'},
                    div({ class: 'label' }, 'Sep Q4'),
                ),
                div({ class: 'month', 'data-num': '10'},
                    div({ class: 'label' }, 'Oct Q4'),
                ),
                div({ class: 'month', 'data-num': '11'},
                    div({ class: 'label' }, 'Nov Q4'),
                ),
            )
        );
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
    return ((element.scrollWidth - element.clientWidth) + 4);
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