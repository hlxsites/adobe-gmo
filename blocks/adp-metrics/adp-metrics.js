import {
  readBlockConfig,
  loadScript,
} from '../../scripts/lib-franklin.js';

const GENERAL_METRICS = [{
  category: 'Total assets',
  amount: 3026,
}, {
  category: 'Total size',
  amount: 1024 * 1024 * 1024 * 203,
  unit: 'bytes',
}, {
  category: 'Uploads year-to-date',
  amount: 3614,
}, {
  category: 'Uploads quarter-to-date',
  amount: 188,
}, {
  category: 'Uploads last 30 days',
  amount: 47,
}];

function formatNumber(number) {
  const numberStr = String(number);
  if (numberStr.length === 0) {
    return 0;
  }
  let formatted = '';
  let numbersAdded = 0;
  for (let i = numberStr.length - 1; i >= 0; i -= 1) {
    if (numbersAdded > 0 && numbersAdded % 3 === 0) {
      formatted = `,${formatted}`;
    }
    formatted = `${numberStr[i]}${formatted}`;
    numbersAdded += 1;
  }
  return formatted;
}

function formatAmount(metric) {
  let amount = parseInt(metric.amount, 10);

  let suffix = '';
  if (metric.unit === 'bytes') {
    const UNITS = [' B', ' KB', ' MB', ' GB', ' TB', ' PB'];
    let unitIndex = 0;
    while (amount > 1024 && unitIndex < UNITS.length) {
      amount = Math.round(amount / 1024);
      unitIndex += 1;
    }
    suffix = UNITS[unitIndex];
  }

  return `${formatNumber(amount)}${suffix}`;
}

const MIME_TYPES = [
  { category: 'image/jpeg', amount: 981 },
  { category: 'image/png', amount: 769 },
  { category: 'video/mp4', amount: 477 },
  { category: 'image/vnd.adobe.photoshop', amount: 349 },
  { category: 'video/quicktime', amount: 112 },
  { category: 'audio/x-wav', amount: 100 },
  { category: 'application/octet-stream', amount: 48 },
  { category: 'application/json', amount: 30 },
  { category: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', amount: 27 },
  { category: 'application/pdf', amount: 25 },
  { category: 'application/postscript', amount: 21 },
  { category: 'application/x-subrip', amount: 18 },
  { category: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', amount: 16 },
  { category: 'application/vnd.audiograph', amount: 13 },
  { category: 'application/zip', amount: 8 },
  { category: 'image/tiff', amount: 8 },
  { category: 'application/vnd.3gpp.pic-bw-small', amount: 7 },
  { category: 'audio/mpeg', amount: 4 },
  { category: 'image/svg+xml', amount: 3 },
  { category: 'text/html', amount: 3 },
  { category: 'text/plain', amount: 3 },
  { category: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', amount: 2 },
  { category: 'image/gif', amount: 1 },
];

const BUSINESS_UNITS = [{
  category: 'Digital Media',
  amount: 2517,
}, {
  category: 'Other',
  amount: 509,
}];

const PRODUCTS = [{
  category: 'Photoshop',
  amount: 2516,
}, {
  category: 'Captivate',
  amount: 1,
}, {
  category: 'Adobe Consulting Services',
  amount: 1,
}, {
  category: 'Adobe Connect',
  amount: 1,
}, {
  category: 'Acrobat Pro',
  amount: 1,
}, {
  category: 'Other',
  amount: 506,
}];

const CAMPAIGNS = [{
  category: 'Photoshop Everyone Can',
  amount: 2215,
}, {
  category: 'Photoshop Brand Campaign 1.0',
  amount: 173,
}, {
  category: 'Photoshop Every Can (Pilot)',
  amount: 63,
}, {
  category: 'Photoshop Everyone Can Phase 2.5: Generative Fill',
  amount: 70,
}, {
  category: 'Photoshop Gen Fill Fall Release Fast Follow',
  amount: 7,
}, {
  category: 'Photoshop Everyone Can (TESTING)',
  amount: 6,
}, {
  category: 'DEF Initiative (AS TEST 8.24.23)',
  amount: 5,
}, {
  category: 'ZYX Initiative (AS TEST 8.21.23)',
  amount: 2,
}, {
  category: 'TESTING Deliverable NC Automation',
  amount: 2,
}, {
  category: 'campaign name',
  amount: 1,
}, {
  category: 'PW EMEA Folders',
  amount: 1,
}];

const PROGRAMS = [{
  category: 'PS Everyone Can 1.5 Brand Campaign',
  amount: 952,
}, {
  category: 'PS Everyone Can 1.0 Brand Campaign',
  amount: 738,
}, {
  category: 'PS Everyone Can 2.0 Brand Campaign',
  amount: 620,
}, {
  category: 'Photoshop Everyone Can Phase 2.5: Generative Fill',
  amount: 65,
}, {
  category: 'Ps Everyone Can 2.0 - Chapter 5 - Supplemental ROI/Performance Media',
  amount: 42,
}, {
  category: 'Ps Everyone Can Phase 2 Master Campaign Tracker - Chapter 6',
  amount: 16,
}, {
  category: 'Ps Everyone Can 2.0 - Chapter 1 - Primary Content Suites',
  amount: 14,
}, {
  category: 'Demo Projects',
  amount: 9,
}, {
  category: 'TESTING Sub-Project Restructuring (For Grace)',
  amount: 1,
}, {
  category: 'program name',
  amount: 1,
}];

const OWNERS = [{
  category: 'Kelsey Sawyer',
  amount: 83,
}, {
  category: 'Kelsey Bucsko',
  amount: 38,
}, {
  category: 'Carolyn Scott',
  amount: 16,
}, {
  category: 'Alex Michael Smith',
  amount: 9,
}, {
  category: 'Shawnn Guthrie',
  amount: 2,
}, {
  category: 'Grace Daly',
  amount: 1,
}];

function createBarLiteSpec(options) {
  const {
    description = '',
    values = [],
    xLabel = 'Category',
    yLabel = 'Amount',
  } = options;
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description,
    width: 200,
    height: 200,
    data: {
      values,
    },
    mark: 'bar',
    encoding: {
      x: { field: 'category', type: 'ordinal', title: xLabel },
      y: { field: 'amount', type: 'quantitative', title: yLabel },
      tooltip: [{
        field: 'category',
        type: 'nominal',
        title: xLabel,
      }, {
        field: 'amount',
        type: 'quantitative',
        title: yLabel,
      }],
    },
  };
}

function createPieLiteSpec(options) {
  const {
    description = '',
    values = [],
    xLabel = 'Category',
    yLabel = 'Amount',
    innerRadius = 0,
  } = options;
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description,
    width: 200,
    height: 200,
    data: {
      values,
    },
    mark: { type: 'arc', innerRadius },
    encoding: {
      theta: { field: 'amount', type: 'quantitative' },
      color: { field: 'category', type: 'nominal', legend: { title: xLabel } },
      tooltip: [{
        field: 'category',
        type: 'nominal',
        title: xLabel,
      }, {
        field: 'amount',
        type: 'quantitative',
        title: yLabel,
      }],
    },
  };
}

function createDonutLiteSpec(options) {
  return createPieLiteSpec({
    ...options,
    innerRadius: 50,
  });
}

function render(spec, id) {
  vegaEmbed(id, spec, { actions: false });
}

function createGraph(block, id, description, values, type = 'bar', specOptions = {}) {
  let spec = createBarLiteSpec;

  if (type === 'pie') {
    spec = createPieLiteSpec;
  } else if (type === 'donut') {
    spec = createDonutLiteSpec;
  }

  const container = document.createElement('div');
  container.innerHTML = `
    <h2>${description}</h2>
    <div id="${id}" class="asset-metric-graph ${type}"></div>
  `;
  block.append(container);
  render(spec({
    description,
    values,
    ...specOptions,
  }), `#${id}`);
}

function createPlaceholder(block) {
  const placeholder = document.createElement('div');
  placeholder.classList.add('metric-placeholder');
  block.append(placeholder);
}

/**
 *
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);
  block.innerHTML = `
    <h1>${config.title || 'Asset Metrics'}</h1>
    <div class="graph-container">
      <div>
        <h2>Asset Statistics</h2>
        <table>
          <colgroup>
            <col class="table-description" />
            <col class="table-value" />
          </colgroup>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${GENERAL_METRICS.map((metric) => `<tr><td>${metric.category}</td><td>${formatAmount(metric)}</td></tr>`).join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  try {
    await loadScript('https://cdn.jsdelivr.net/npm/vega@5.25.0');
    await loadScript('https://cdn.jsdelivr.net/npm/vega-lite@5.16.0');
    await loadScript('https://cdn.jsdelivr.net/npm/vega-embed@6.22.2');
  } catch (e) {
    console.log('Error rendering graphs', e);
  }

  if (vegaEmbed) {
    const target = block.querySelector('.graph-container');
    createGraph(target, 'mime-types', 'Assets by Format', MIME_TYPES, 'donut', {
      xLabel: 'Format',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'business-units', 'Assets by Business Unit', BUSINESS_UNITS, 'bar', {
      xLabel: 'Business Unit',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'products', 'Assets by Product', PRODUCTS, 'donut', {
      xLabel: 'Product',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'campaigns', 'Assets by Campaign', CAMPAIGNS, 'donut', {
      xLabel: 'Campaign',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'program-names', 'Assets by Program', PROGRAMS, 'donut', {
      xLabel: 'Program',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'program-owners', 'Assets by Program Owner', OWNERS, 'pie', {
      xLabel: 'Owner',
      yLabel: 'Asset Count',
    });
    createGraph(target, 'top-requestors', 'Top Requestors of Content', OWNERS.slice(0, 5), 'bar', {
      xLabel: 'Requestor',
      yLabel: 'Requests',
    });
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
    createPlaceholder(target);
  }
}
