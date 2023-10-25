import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';
import { createStartDateRangeInput, createEndDateRangeInput } from '../../scripts/date-input.js';

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
    const startDate = createStartDateRangeInput(container, attribute, 'Start date', enableTime);
    const endDate = createEndDateRangeInput(container, attribute, 'End date', enableTime);
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
