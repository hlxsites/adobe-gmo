/* eslint-disable import/prefer-default-export */
import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';

function createFlatpickrDateInput(parentElement, attribute, idSuffix, label, enableTime) {
  const kebabCaseAttribute = attribute.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  const idAttribute = `${kebabCaseAttribute}-${idSuffix}`;

  const dateInputContainer = document.createElement('div');
  dateInputContainer.classList.add('date-input-container');
  dateInputContainer.innerHTML = `
    <label class="label" for="${idAttribute}">${label}</label>
    <div class="flatpickr">
      <input class="${idSuffix}" type="text" placeholder="Select Date..." data-input>
      <button class="input-button" title="toggle" data-toggle>
          <span class="icon icon-calendar"></span>
      </a>
    </div>`;
  parentElement.appendChild(dateInputContainer);
  const fp = window.flatpickr(dateInputContainer.querySelector('.flatpickr'), {
    parseDate: (datestr) => new Date(datestr),
    enableTime,
    wrap: true,
    allowInput: true,
    altInput: true,
    clickOpens: false,
    monthSelectorType: 'static',
  });
  fp.altInput.id = idAttribute;
  return dateInputContainer;
}

function parseMillisEpochToSecondsEpoch(dateStr, addDays = 0) {
  return dateStr && parseInt(dateStr, 10) > 0
    ? (new Date(dateStr).getTime()) / 1000 + (addDays * 60 * 60 * 24)
    : undefined;
}

function createCalendarRange(enableTime = false) {
  return window.instantsearch.connectors.connectRange((options, isFirstRendering) => {
    const { widgetParams } = options;
    const { attribute, container } = widgetParams;
    if (!isFirstRendering) {
      const { start } = options;
      const clearFlatpickr = (cssClass) => {
        // eslint-disable-next-line no-underscore-dangle
        const flatpickrElement = container.querySelector(`.${cssClass}`).parentElement._flatpickr;
        if (flatpickrElement) {
          flatpickrElement.clear();
        }
      };
      if (start[0] === -Infinity) clearFlatpickr('start-date');
      if (start[1] === Infinity) clearFlatpickr('end-date');
      return;
    }
    const refinementValues = window.search.helper?.state?.numericRefinements?.[attribute];
    const start = refinementValues?.[attribute];
    const end = refinementValues?.[attribute];
    const startDate = createFlatpickrDateInput(container, attribute, 'start-date', 'Start date', enableTime);
    const endDate = createFlatpickrDateInput(container, attribute, 'end-date', 'End date', enableTime);
    if (start) startDate.querySelector('input').value = start === -Infinity ? '' : new Date(start * 1000).toISOString();
    if (end) endDate.querySelector('input').value = end === Infinity ? '' : new Date(end * 1000).toISOString();
    decorateIcons(container);

    const { refine } = options;

    const handleChange = (dateBegin, dateEnd) => {
      const formattedBeginDate = parseMillisEpochToSecondsEpoch(dateBegin.value, 1);
      const formattedEndDate = parseMillisEpochToSecondsEpoch(dateEnd.value, 1);

      refine([formattedBeginDate, formattedEndDate]);
    };

    // eslint-disable-next-line no-underscore-dangle
    const startDatePicker = startDate.querySelector('.flatpickr')._flatpickr;
    // eslint-disable-next-line no-underscore-dangle
    const endDatePicker = endDate.querySelector('.flatpickr')._flatpickr;

    startDatePicker.config.onChange.push(() => {
      handleChange(startDate.querySelector('input'), endDate.querySelector('input'));
    });

    endDatePicker.config.onChange.push((selectedDates, dateStr) => {
      startDatePicker.set('maxDate', dateStr);
      handleChange(startDate.querySelector('input'), endDate.querySelector('input'));
    });
    // close when user does any scrolling
    window.addEventListener('scroll', () => {
      startDatePicker.close();
      endDatePicker.close();
    });
  });
}

function addCalendarRefinement(container, attribute, enableTime = false) {
  const calendarRange = createCalendarRange(enableTime);
  window.search.addWidgets([
    calendarRange({
      container,
      attribute,
    }),
  ]);
}

export default function decorate(block) {
  const cfg = readBlockConfig(block);
  const { refinement, config } = JSON.parse(cfg.blockdata);
  block.textContent = '';
  addCalendarRefinement(block, refinement.metadataField, config?.enableTime);
}
