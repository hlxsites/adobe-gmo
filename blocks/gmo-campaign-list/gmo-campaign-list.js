import { readBlockConfig } from '../../scripts/lib-franklin.js';

const testCollections = {
    'collection1': {
        'name': 'test campaign 1',
        'type': 'testType1',
        'status': 'testStatus1',
        'activeQuarter': 'testQuarter1',
        'launchYear': 'testYear1', 
        'products': 'testProduct1',
        'entitlements': 'testEntitlement1',
        'audiences': 'testAudiences1',
        'languages': 'testLanguages1',
        'kpi': 'testKPI1',
        'categories': 'testCategories1', 
        'ddom': 'testDdom1'
    },
    'collection2': {
        'name': 'campaign 2',
        'type': 'testType2',
        'status': 'testStatus2',
        'activeQuarter': 'testQuarter2',
        'launchYear': 'testYear2', 
        'products': 'testProduct2',
        'entitlements': 'testEntitlement2',
        'audiences': 'testAudiences2',
        'languages': 'testLanguages2',
        'kpi': 'testKPI2',
        'categories': 'testCategories2', 
        'ddom': 'testDdom2'
    },
    'collection3': {
        'name': 'my third campaign',
        'type': 'testType3',
        'status': 'testStatus3',
        'activeQuarter': 'testQuarter3',
        'launchYear': 'testYear3', 
        'products': 'testProduct3',
        'entitlements': 'testEntitlement3',
        'audiences': 'testAudiences3',
        'languages': 'testLanguages3',
        'kpi': 'testKPI3',
        'categories': 'testCategories3', 
        'ddom': 'testDdom3'
    },
    'collection4': {
        'name': 'your fourth campaign',
        'type': 'testType4',
        'status': 'testStatus4',
        'activeQuarter': 'testQuarter4',
        'launchYear': 'testYear4', 
        'products': 'testProduct4',
        'entitlements': 'testEntitlement4',
        'audiences': 'testAudiences4',
        'languages': 'testLanguages4',
        'kpi': 'testKPI4',
        'categories': 'testCategories4', 
        'ddom': 'testDdom4'
    },
    'collection5': {
        'name': 'five campaigns in',
        'type': 'testType5',
        'status': 'testStatus5',
        'activeQuarter': 'testQuarter5',
        'launchYear': 'testYear5', 
        'products': 'testProduct5',
        'entitlements': 'testEntitlement5',
        'audiences': 'testAudiences5',
        'languages': 'testLanguages5',
        'kpi': 'testKPI5',
        'categories': 'testCategories5',
        'ddom': 'testDdom5'
    }
}
const testConfig = [
    {
        'name': 'Campaign',
        'attribute': 'campaign',
        'sortable': 'true'
    },
    {
        'name': '',
        'attribute': '',
        'sortable': 'false'
    },
    {
        'name': '',
        'attribute': '',
        'sortable': 'true',
        'type': 'date'
    },
    {
        'name': 'Products',
        'attribute': ''
    },
    {
        'name': 'Language',
        'attribute': '',
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
    block.innerHTML = `
        <div class="list-container">
            <div class="list-header">
                ${listHeaders}
            </div>
            <div class="list-items">
            </div>
        </div>`
    buildCollectionList(testCollections);
}

function buildCollectionList(collections) {
    
}

function buildListHeaders(headerConfig) {
    console.log(headerConfig);
    const config = headerConfig;
    let columnHeaders = [];
    config.forEach((column) => {
        console.log(column);
    })
}
