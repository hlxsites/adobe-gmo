import { setCSSVar, waitForDependency } from './scripts.js';

const FLATPICKR_CALENDAR_HEIGHT = 300;
/**
 * Creates a date input field with a label and calendar icon
 * @param {*} container - The element to append the date input to
 * @param {*} id - The id of the date input (gets converted to kebab-case if not already)
 * @param {*} label - The label for the date input
 * @param {*} enableTime - Whether or not to enable time selection
 * @param {*} calendarContainer - The element to append the calendar selection div to - defaults to body element
 * @param {*} idSuffix - The suffix to append to the id of the date input
 * @param {*} defaultDate - The default date to set the date input to
 *   see https://flatpickr.js.org/options/#:~:text=table%20below.-,defaultDate,-String
 * @returns - The date input container
 */
export async function createDateInput(container, id, label, enableTime = false, calendarContainer = null, idSuffix = '', defaultDate = null) {
  await waitForDependency('flatpickr');
  const kebabCaseAttribute = id.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  let idAttribute = kebabCaseAttribute;
  if (idSuffix) idAttribute += `-${idSuffix}`;
  const dateInputContainer = document.createElement('div');
  dateInputContainer.classList.add('date-input-container');
  dateInputContainer.innerHTML = `
      <label class="label" for="${idAttribute}">${label}</label>
      <div class="flatpickr">
        <input type="text" class="${idSuffix}" placeholder="Select Date..." data-input>
        <button class="input-button" title="toggle" data-toggle>
            <span class="icon icon-calendar"></span>
        </a>
      </div>`;
  container.appendChild(dateInputContainer);
  const fpConfig = {
    parseDate: (datestr) => new Date(datestr),
    enableTime,
    wrap: true,
    allowInput: true,
    altInput: true,
    clickOpens: false,
    defaultDate,
    monthSelectorType: 'static',
  };
  if (calendarContainer) {
    fpConfig.appendTo = calendarContainer;
    fpConfig.onClose = () => {
      if (calendarContainer && calendarContainer.close) calendarContainer.close();
    };
  }
  fpConfig.onOpen = () => {
    if (calendarContainer && calendarContainer.showModal) calendarContainer.showModal();
    // override calendar position that is set by flatpickr's js
    if (dateInputContainer.getBoundingClientRect().top + dateInputContainer.getBoundingClientRect().height
      + 5 + FLATPICKR_CALENDAR_HEIGHT
      < window.innerHeight) {
      setCSSVar(
        '--calendar-top',
        `${dateInputContainer.getBoundingClientRect().top + dateInputContainer.getBoundingClientRect().height + 5}px`,
      );
    } else {
      // position above if the calendar would go off the screen
      const labelHeight = dateInputContainer.querySelector('.label')?.getBoundingClientRect?.().height || 0;
      setCSSVar(
        '--calendar-top',
        `${dateInputContainer.getBoundingClientRect().top
          + labelHeight
          - FLATPICKR_CALENDAR_HEIGHT - 5}px`,
      );
    }
  };
  const fp = window.flatpickr(dateInputContainer.querySelector('.flatpickr'), fpConfig);
  fp.altInput.id = idAttribute;
  return dateInputContainer;
}

/**
 * Creates a start date input field with a label and calendar icon
 * See createDateInput for params
 */
export async function createStartDateRangeInput(inputContainer, id, label, enableTime = false, calendarContainer = null) {
  return await createDateInput(inputContainer, id, label, enableTime, calendarContainer, 'start-date');
}

/**
 * Creates an end date input field with a label and calendar icon
 * See createDateInput for params
 */
export async function createEndDateRangeInput(inputContainer, id, label, enableTime = false, calendarContainer = null) {
  return await createDateInput(inputContainer, id, label, enableTime, calendarContainer, 'end-date');
}
