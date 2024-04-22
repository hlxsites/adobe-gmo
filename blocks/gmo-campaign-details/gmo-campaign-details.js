import { decorateIcons } from '../../scripts/lib-franklin.js';

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
        'statusUpdate': '57'
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
        'statusUpdate': '86'
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
        'statusUpdate': '57'
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
        'statusUpdate': '17'
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
        'statusUpdate': '0%'
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
        'statusUpdate': '57'
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
        'statusUpdate': '86'
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
        'statusUpdate': '57'
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
        'statusUpdate': '12'
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
        'statusUpdate': '5'
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
        'statusUpdate': '77'
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
        'statusUpdate': '97%'
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
        'statusUpdate': '100'
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
        'statusUpdate': '26'
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
        'statusUpdate': '67'
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
        'statusUpdate': '89'
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
        'statusUpdate': '57'
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
        'statusUpdate': '86'
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
        'statusUpdate': '57'
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
        'statusUpdate': '17'
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
        'statusUpdate': '57'
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
        'statusUpdate': '17'
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
        'statusUpdate': '57'
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
        'statusUpdate': '17'
    }
];

export default async function decorate(block) {
    const rows = buildRows(testData);
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
                    <span class="h1">Express Mobile Beta</span>
                    <div class="campaign-status">In Progress</div>
                </div>
                <div class="header-row2">
                    <span class="icon icon-calendar"></span>
                    <span class="campaign-date">03/07/2024</span>
                </div>
            </div>
        </div>
        <div class="tab-wrapper">
            <div id="tab1toggle" class="tab active">Overview</div>
            <div id="tab2toggle" class="tab">Deliverables</div>
            <div id="tab3toggle" class="tab ">Calendar</div>
        </div>
        <div id="tab1" class="two-column overview inactive">
            <div class="overview-wrapper">
                <span class="h1 overview-heading">At a Glance</span>
                <span class="h3">Strategy</span>
                <span class="description">
                    Express mobile public beta is not a major at scale marketing moment (due to the limited nature of beta experience) with key audiences of
                    Existing Express users, investors and media. Marketing approach is signaling to the market our continued momentum with the new mobile
                    beta release, focusing efforts on PR, social/community and in-app surfaces.
                </span>
                <div class="button no-bg">Read more</div>
                <div class="kpis-wrapper">
                    <span class="h3">KPIs to Measure Success</span>
                    <ul>
                        <li>PR impressions & dedicated earned stories</li>
                        <li>Mobile exports</li>
                        <li>Community & social interactions</li>
                        <li>100% by EOL</li>
                    </ul>
                </div>
                <div class="use-cases-wrapper">
                    <span class="h3">Hero Use Cases</span>
                    <div class="tags-wrapper">
                        <div class="use-case-tag">Text to Image</div>
                        <div class="use-case-tag">Use Case 2</div>
                    </div>
                </div>
                <div class="links-wrapper">
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
                <div class="card milestones">
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
                    <div class="product card-content">
                        <span class="icon icon-Express"></span>
                        Adobe Express Mobile App
                    </div>
                </div>
                <div class="card audiences">
                    <div class="card-heading h3">Audiences</div>
                    <div class="audience card-content">
                        <span class="icon icon-gear"></span>
                        Existing Express Users
                    </div>
                </div>
            </div>
        </div>
        <div id="tab2" class="deliverables">
            <div class="page-heading">
                <div class="artifacts-wrapper">
                    <span class="h3">Links to Important Artifacts</span>
                    <div class="links">
                        <a href="#" class="campaign-link">Creative Architecture</a>
                        <a href="#" class="campaign-link">E2E Journeys</a>
                        <a href="#" class="campaign-link">Marketing Brief</a>
                    </div>
                </div>
                <div class="total-assets">
                    <div class="h3">Total Assets</div>
                    <span class="description">7</span>
                </div>
            </div>
            <div class="table-wrapper">
                <div class="table-header">
                    <div class="header table-column column1">Content Name</div>
                    <div class="header table-column column2">Content Type</div>
                    <div class="header table-column column3">Channel</div>
                    <div class="header table-column column4">Review Link</div>
                    <div class="header table-column column5">Final Asset</div>
                    <div class="header table-column column6">KPI</div>
                    <div class="header table-column column7">Status Update</div>
                    <div class="header table-column column8">Due Date</div>
                    <div class="header table-column column9">Lead / Driver</div>
                </div>
                <div class="table-content">
                </div>
            </div>
        </div>
        <div id="tab3" class="calendar inactive">
        </div>
    </div>
    `;
    const tableRoot = block.querySelector('.table-content');
    tableRoot.appendChild(rows);
    decorateIcons(block);
}
function buildRows(data) {
    console.log(data);
    const rows = document.createElement('div');
    const uniqueCategories = getUniqueValues(data, 'category');
    uniqueCategories.forEach((category) => {
        // build header row
        const headerRow = document.createElement('div');
        headerRow.classList.add('row', 'collapsible', 'header');
        headerRow.innerHTML = `
            <div class="heading-wrapper">
                <span class="icon icon-next"></span>
                <span class="icon icon-collapse inactive"></span>
                <div class="headertext">${category}</div>
            </div>`;
        attachListener(headerRow);
        rows.appendChild(headerRow);
        const matchingCampaigns = data.filter(campaign => campaign.category === category);
        // create subcategory headings
        const subCats = getUniqueValues(matchingCampaigns, 'subcategory');
        subCats.forEach((subCat) => {
            const subCatHeader = document.createElement('div');
            subCatHeader.classList.add('row', 'collapsible', 'header', 'inactive');
            subCatHeader.innerHTML = `
            <div class="heading-wrapper subheading">
                <span class="icon icon-next"></span>
                <span class="icon icon-collapse inactive"></span>
                <div class="headertext">${subCat}</div>
            </div>`;
            attachListener(subCatHeader);
            headerRow.appendChild(subCatHeader);
            const matchingSubs = data.filter(campaign => campaign.subcategory === subCat);
            matchingSubs.forEach((campaign) => {
                const dataRow = document.createElement('div');
                dataRow.classList.add('row', 'datarow', 'inactive');
                dataRow.innerHTML = `
                    <div class='property table-column column1'>${campaign.name}</div>
                    <div class='property table-column column2'>${campaign.type}</div>
                    <div class='property table-column column3'>${campaign.channel}</div>
                    <div class='property table-column column4'>${campaign.reviewLinkName}</div>
                    <div class='property table-column column5'>${campaign.finalAssetName}</div>
                    <div class='property table-column column6'>${campaign.kpi}</div>
                    <div class='property table-column column7'>${campaign.statusUpdate}</div>
                    <div class='property table-column column8'>${campaign.dueDate}</div>
                    <div class='property table-column column9'>${campaign.driver}</div>
                `
                subCatHeader.appendChild(dataRow);
            });
        });
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