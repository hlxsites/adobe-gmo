import { testCalendar } from '../../scripts/shared-program.js';
import { checkBlankString } from './shared-program.js';

let deliverables, deliverableMapping;
const startDateProp = 'deliverableProjectStartDate';
const endDateProp = 'deliverableProjectEndDate';
const quarterRef = [ '12', '3', '6', '9' ];


export async function buildCalendar(dataObj, block, period, type, mappingArray) {
    //if (!deliverables) deliverables = dataObj;
    if (!deliverables) deliverables = dataObj.data.deliverableList.items;
    if (!deliverableMapping) deliverableMapping = await mappingArray;
    const displayYear = period.year;
    const displayQuarter = period.quarter;
    const columnWidth = 8.315;
    const calendarEl = (type === "year") ? buildYearCal(displayYear) : buildQCal(displayYear);

    // set an 'end' to the calendar view
    let lastMonthInView, lastDateInView, earliestMonthInView, earliestDateInView, earliestYearInView;

    // filter by chosen displayYear
    const yearFilteredItems = deliverables.filter(item => item[startDateProp].includes(displayYear) || item[endDateProp].includes(displayYear));
    //const yearFilteredItems = deliverables.filter(item => item[startDateProp].includes(displayYear));
    //console.log(yearFilteredItems);

    // get unique groupings
    const uniqueGroups = getUniqueItems(yearFilteredItems, "deliverableType");

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');

    if (type === "quarter") { 
        contentWrapper.classList.add('quarter-view');
        contentWrapper.dataset.view = "quarter";
        lastMonthInView = 10;
        earliestMonthInView = 11;
        earliestYearInView = (displayYear - 1);
    } else {
        contentWrapper.dataset.view = "year";
        lastMonthInView = 11;
        earliestMonthInView = 0;
        earliestYearInView = displayYear;
    }
    lastDateInView = new Date(displayYear, lastMonthInView + 1, 0);
    earliestDateInView = new Date(earliestYearInView, earliestMonthInView, 1);
    console.log(`Earliest date in view: ${earliestDateInView}`);

    var groupIndex = 1;
    let groupExceedsView;
    uniqueGroups.forEach((group) => {
        // assume group fits on calendar
        groupExceedsView = false;

        // find all members of this group
        const matchedItems = yearFilteredItems.filter(item => item.deliverableType === group);

        // find the earliest date- this is how we set the position against the calendar
        const earliestStartDate = matchedItems.reduce((earliest, currentItem) => {
            const currentItemDate = new Date(currentItem[startDateProp]);
            return currentItemDate < earliest ? currentItemDate : earliest;
        },  new Date(matchedItems[0][startDateProp]));

        console.log(`Earliest start date: ${earliestStartDate}`)

        const latestEndDate = matchedItems.reduce((latest, currentItem) => {
            const currentItemDate = new Date(currentItem[endDateProp]); // Ensure UTC
            return currentItemDate > latest ? currentItemDate : latest;
        },  new Date(matchedItems[0][endDateProp]));

        console.log(`Latest end date: ${latestEndDate}`);

        let startMonth, startMonthNumber, startDay, startDayNumber;
        startMonth = (earliestStartDate.getUTCMonth()); // getMonth returns 0-11 but this is desirable
        startDay = (earliestStartDate.getUTCDate() - 1); // if at start of month, we don't want to add any more margin

        if (earliestStartDate < earliestDateInView) {
            console.log("this group starts before the earliest date in view, position should be 0");
            startMonthNumber = 0;
            startDayNumber = 0;
        } else {
            console.log("start date should be in view.");
            
            startMonthNumber = startMonth;
            startDayNumber = startDay;
            console.log(`Start month number: ${startMonthNumber} || start month (via earliestStartDate): ${startMonth}`)
        }

        // can I game this a bit on quarter view?

        

        // check when the group ends
        let endMonth, endDay;
        if (latestEndDate.getUTCMonth() > lastMonthInView) {
            endMonth = lastMonthInView;
            endDay = new Date(displayYear, lastMonthInView + 1, 0).getUTCDate() + 1;
            groupExceedsView = true;
        } else {
            endMonth = (latestEndDate.getUTCMonth());
            endDay = (latestEndDate.getUTCDate() - 1);
        }

        //const endMonth = (latestEndDate.getUTCMonth());
        //const endDay = (latestEndDate.getUTCDate() - 1);
        
        const startYear = earliestStartDate.getUTCFullYear();
        const totalDaysInMonth = new Date(Date.UTC(startYear, startMonth, 0)).getUTCDate();

        const endYear = latestEndDate.getUTCFullYear();
        const totalDaysInEndMonth = new Date(Date.UTC(endYear, endMonth, 0)).getUTCDate();

        const percentOfStartMonth = (startDayNumber / totalDaysInMonth);
        const percentOfEndMonth = (endDay / totalDaysInEndMonth);
        const dayMargin = (percentOfStartMonth * columnWidth);
        const endDayMargin = (percentOfEndMonth * columnWidth);
        let startPosition = ((startMonthNumber * columnWidth) + dayMargin).toFixed(2);
        let endPosition = ((endMonth * columnWidth) + endDayMargin).toFixed(2);
        

        if (type === "quarter") {
            // offset by a month in quarter view
            startPosition = parseFloat(startPosition) + parseFloat(columnWidth);
            endPosition = parseFloat(endPosition) + parseFloat(columnWidth);
        }
            
        // do a little offset.
        if (endMonth > 9) endPosition = endPosition - 0.35;
        const widthOfGroup = (endPosition - startPosition);
        console.log(`Start position %: ${startPosition} || End position %: ${endPosition} `)
        // calculate the duration of the group as that helps set the width of its members
        const groupDuration = Math.floor((latestEndDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');

        let itemExceedsView;
        matchedItems.forEach((item) => {
            itemExceedsView = false;

            // todo: handle nulls gracefully
            const itemStartDate = new Date(item[startDateProp]);



            // check the "real" end date and if it's beyond the current calendar view, flag it
            // somehow to show that it goes into the next increment
            // in year view, overflow is fine but in quarter view we need the scroll
            let itemEndDate = new Date(item[endDateProp]);
            if (itemEndDate > lastDateInView) {
                itemExceedsView = true;
            }
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);


            if (itemStartDate < earliestDateInView) {
                console.log(`starts before earliest date in view! start date: ${itemStartDate}`);
                console.log(`Group duration: ${groupDuration}`);
                console.log(`Item duration: ${itemDuration}`);
            }



            // Calculate the difference in months and days between earliestDate and anotherDate
            let monthsDifference = (itemStartDate.getUTCFullYear() - earliestStartDate.getUTCFullYear()) * 12 + (itemStartDate.getUTCMonth() - earliestStartDate.getUTCMonth());

            let startDaysDifference = itemStartDate.getUTCDate() - earliestStartDate.getUTCDate();
            let onlyDaysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((onlyDaysDifference / groupDuration) * 100).toFixed(2);
            if (startDaysDifference < 0) {
                monthsDifference -= 1;
                const previousMonth = new Date(Date.UTC(itemStartDate.getUTCFullYear(), itemStartDate.getUTCMonth(), 0));
                startDaysDifference += previousMonth.getUTCDate();
                console.log(`Start days diff less than 0, new days diff: ${startDaysDifference}`)
            }

            const itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.style.marginLeft = startPctDiff + '%';

            itemEl.innerHTML = `
                <div class="color-tab"></div>
                <div class="item-content">
                    <div class="content-row">
                        <div class="info">
                            <div class="thumbnail"></div>
                            <div class="name" title="${item.deliverableName}">${item.deliverableName}</div>
                            <div class="item-status" data-status="${checkBlankString(item.taskStatus)}"></div>
                        </div>
                    </div>
                    <div class="content-row bottom">
                        ${itemStartDate ? '<div class="start-date" title="Task Start Date">' + itemStartDate.toLocaleDateString().split(',')[0] + '</div>' : ''}
                        <div class="link">
                            <a href="${item.reviewLink}">QA Files</a>
                        </div>
                    </div> 
                </div>
            `;

            if (itemExceedsView) {
                // mark the item as exceeding the calendar view
                const arrow = document.createElement('img');
                arrow.src = '/icons/arrowleft.svg';
                itemEl.querySelector('.link').appendChild(arrow);
            } else {
                itemEl.style.width = itemDurationPct + '%';
            }
            itemWrapper.appendChild(itemEl);
        })
        const groupEl = document.createElement('div');
        groupEl.classList.add('calendar-group', `color${groupIndex}`);
        groupEl.style.marginLeft = startPosition + '%';
        groupEl.style.width = widthOfGroup + '%';
        groupEl.innerHTML = `
            <div class="group-header">
                <div class="left-block">
                    <img src="/icons/chevron-right.svg" class="group-expand group-controls inactive"></img>
                    <img src="/icons/chevron-right.svg" class="group-collapse group-controls"></img>
                    <div class="group-heading">${lookupType(group)}</div>
                    <div class="group-count">${matchedItems.length}</div>
                </div>
                <div class="right-block">
                </div>
            </div>
            ${itemWrapper.outerHTML}
        `;

        groupEl.querySelectorAll('.group-controls').forEach((arrow) => {
            arrow.addEventListener('click', showHideGroup);
        });

        if (groupExceedsView) {
            const arrow = document.createElement('img');
            arrow.src = '/icons/arrowleft.svg';
            arrow.classList.add('group-arrow');
            groupEl.querySelector('.group-header > .right-block').appendChild(arrow);
        }

        contentWrapper.appendChild(groupEl);
        groupIndex +=1;
    });
    calendarEl.appendChild(contentWrapper);
    block.querySelectorAll('.year-switch > .year-toggle').forEach((control) => {
        control.removeEventListener('click', changePeriod);
        control.addEventListener('click', changePeriod);
    });
    block.querySelector('.right-controls .today-button').addEventListener('click', () => {
        refreshCalendar({ 'year': new Date().getFullYear(), 'quarter': 1 }, "year");
    })
    block.querySelector('.calendar.tab').appendChild(calendarEl);

    // populate "filter" dropdown
    const filterDropdown = document.createElement('div');
    filterDropdown.classList.add('filter-dropdown-content');
    const uniqueYears = getUniqueYears(deliverables);
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
        yearOption.addEventListener('click', filterDropdownSelection);
        filterDropdown.appendChild(yearOption);
    });
    filterDropdown.appendChild(quarterOptionLabel);
    const quarters = [ 1, 2, 3, 4 ];
    quarters.forEach((quarter) => {
        const quarterOption = document.createElement('div');
        quarterOption.classList.add('filter-option');
        quarterOption.dataset.period = quarter;
        quarterOption.textContent = quarter;
        quarterOption.addEventListener('click', filterDropdownSelection);
        filterDropdown.appendChild(quarterOption);
    })
    
    const filterDropdownWrapper = block.querySelector('.filter-dropdown-wrapper');
    filterDropdownWrapper.appendChild(filterDropdown);
    filterDropdownWrapper.querySelector('.filter-dropdown-button').addEventListener('click', (event) => toggleDropdown(event.target));
    
    // scroll to the right in quarter view
    // this will work once we stop the overflow
    if (type === "quarter") {
        const calendarWrapper = document.querySelector('.calendar-wrapper.quarter-view')
        const scrollPct = ((displayQuarter - 1) * (3 * columnWidth)).toFixed(2);
        const maxScrollLeft = calendarWrapper.scrollWidth;
        const scrollAmt = (maxScrollLeft) * (scrollPct / 100);
        calendarWrapper.scrollLeft = scrollAmt;
    }

    // show the current month if current year chosen
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (displayYear == currentYear) {
        const currentMonth = currentDate.getMonth() + 1;
        
        /* 
        *  calculate the percentage completion of the current month
        *  for the indicator offset
        */
        const totalDaysInMonth = new Date((new Date(currentYear, currentMonth, 1)) - 1).getDate();
        const percentOfMonth = (currentDate.getUTCDate() / totalDaysInMonth).toFixed(2) * 100;

        const monthEl = block.querySelector(`.month[data-num='${currentMonth}']`);
        monthEl.classList.add('current');
        const lineEl = document.createElement('div');
        lineEl.classList.add('calendar-indicator');

        // use direct style for offset
        lineEl.style.marginRight = ((-2 * percentOfMonth) + 100) + '%';
        monthEl.appendChild(lineEl);
    }
    
    // close dropdown listener for clicks outside open dropdown
    document.querySelector('.gmo-program-details.block').addEventListener('click', dismissDropdown);
}

function buildYearCal(displayYear) {
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar-wrapper');
    calendarEl.innerHTML = `
        <div class="calendar-background">
            <div class="header-wrapper">
                <div class="quarter-header"> 
                    <div class="quarter">Q1 ${displayYear}</div>
                    <div class="quarter">Q2 ${displayYear}</div>
                    <div class="quarter">Q3 ${displayYear}</div>
                    <div class="quarter">Q4 ${displayYear}</div>
                </div>
            </div>
            <div class="month-wrapper">
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
            </div>
        </div>
    `;
    return calendarEl;
}

function buildQCal(displayYear) {
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar-wrapper', 'quarter-view');
    calendarEl.innerHTML = `
        <div class="calendar-background quarter-view">
            <div class="header-wrapper">
                <div class="quarter-header"> 
                    <div class="quarter">Q1 ${displayYear}</div>
                    <div class="quarter">Q2 ${displayYear}</div>
                    <div class="quarter">Q3 ${displayYear}</div>
                    <div class="quarter">Q4 ${displayYear}</div>
                </div>
            </div>
            <div class="quarterview-wrapper">
                <div class="month" data-num="12"><div class="label">December Q1</div></div>
                <div class="month" data-num="1"><div class="label">January Q1</div></div>
                <div class="month" data-num="2"><div class="label">February Q1</div></div>
                <div class="month" data-num="3"><div class="label">March Q2</div></div>
                <div class="month" data-num="4"><div class="label">April Q2</div></div>
                <div class="month" data-num="5"><div class="label">May Q2</div></div>
                <div class="month" data-num="6"><div class="label">June Q3</div></div>
                <div class="month" data-num="7"><div class="label">July Q3</div></div>
                <div class="month" data-num="8"><div class="label">August Q3</div></div>
                <div class="month" data-num="9"><div class="label">September Q4</div></div>
                <div class="month" data-num="10"><div class="label">October Q4</div></div>
                <div class="month" data-num="11"><div class="label">November Q4</div></div>
            </div>
        </div>
    `;
    return calendarEl;
}

function getUniqueItems(items, property) {
    return [...new Set(items.flatMap(item => item[property])
        .filter(value => value !== null && value !== undefined)
    )];
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
    newPeriod = { 'year': newYear, 'quarter': newQuarter };
    refreshCalendar(newPeriod, view);
}

function getUniqueYears(items) {
    const yearsSet = new Set();
  
    items.forEach(item => {
      const year = item[startDateProp].split('-')[0];
      yearsSet.add(year); 
    });
  
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

function filterDropdownSelection(event) {
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
    refreshCalendar(period, view);
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

    buildCalendar(deliverables, block, period, view);
    //buildCalendar(testCalendar, block, year);
}

function lookupType(rawText) {
    const typeMatch = deliverableMapping.filter(item => item.value === rawText);
    const typeText =  typeMatch.length > 0 ? typeMatch[0].text : rawText;
    return typeText;
}