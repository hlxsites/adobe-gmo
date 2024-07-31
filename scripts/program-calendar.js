import { testCalendar } from '../../scripts/shared-program.js';
import { checkBlankString } from './shared-program.js';
import { searchAsset } from '../../scripts/assets.js';

let deliverables, deliverableMapping;
const startDateProp = 'deliverableProjectStartDate';
const endDateProp = 'deliverableProjectEndDate';

export async function buildCalendar(dataObj, block, period, type, mappingArray) {
    //if (!deliverables) deliverables = dataObj;
    if (!deliverables) deliverables = dataObj.data.deliverableList.items;
    if (!deliverableMapping) deliverableMapping = await mappingArray;
    const displayYear = period.year;
    const displayQuarter = period.quarter;
    const columnWidth = 8.315;

    // get start of the view
    const viewStart = getTimeBounds(deliverables, "start", startDateProp);
    const viewStartYear = viewStart.getUTCFullYear();
    // get end of the view
    const viewEnd = getTimeBounds(deliverables, "end", endDateProp);
    const viewEndYear = viewEnd.getUTCFullYear();

    // get array of all years to be included
    let years = calendarYears(viewStartYear, viewEndYear);

    // build the calendar background here as we already know the period and style
    let calendarEl;
    if (type === "year") {
        calendarEl = newBuildYearCal(years);
    } else {
        // if the last item ends in December we need another year to catch the Q1 n+1 finish
        if (viewEnd.getUTCMonth = 11) {
            years.push(viewEndYear + 1);
        }
        calendarEl = newBuildQuarterCal(years);
    }
    // get unique deliverable types
    const uniqueGroups = getUniqueItems(deliverables, "deliverableType");

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
    uniqueGroups.forEach((group) => {
        // find all members of this group
        const matchedItems = deliverables.filter(item => item.deliverableType === group);

        // find the earliest date- this is how we set the position for the group against the calendar
        const earliestStartDate = getTimeBounds(matchedItems, "start", startDateProp);
        const latestEndDate = getTimeBounds(matchedItems, "end", endDateProp);

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
/*
        matchedItems.forEach((item) => {
            const itemStartDate = new Date(item[startDateProp]);
            const itemEndDate = new Date(item[endDateProp]);
            const itemEndDateStr = itemEndDate ? itemEndDate.toLocaleDateString().split(',')[0] : null;
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);

            let daysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((daysDifference / groupDuration) * 100).toFixed(2);
            const itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.style.marginLeft = startPctDiff + '%';

            // Create a placeholder for the thumbnail
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
                        ${itemEndDateStr ? '<div class="start-date" title="Task End Date: ' + itemEndDateStr + '">End Date: ' + itemEndDateStr + '</div>' : ''}
                        <div class="link">
                            <a href="${item.reviewLink}">QA Files</a>
                        </div>
                    </div>
                </div>
            `;
            itemEl.style.width = itemDurationPct + '%';
            itemWrapper.appendChild(itemEl);

            const thumbnailDiv = itemEl.querySelector('.thumbnail');
            // Fetch the thumbnail using the searchAsset function and update the placeholder
            console.log(`Fetching thumbnail for Program: ${item.programName}, Campaign: ${item.campaignName}`);
            searchAsset(item.programName, item.campaignName).then(imageObject => {
                if (imageObject && imageObject.imageUrl) {

                    const imgElement = document.createElement('img');
                    imgElement.src = imageObject.imageUrl;
                    imgElement.alt = imageObject.imageAltText;
                    imgElement.loading = 'lazy';
                    imgElement.style.display = 'block'; // Ensure the image is displayed as a block element
                    thumbnailDiv.appendChild(imgElement);
                    console.log(`Thumbnail added for Program: ${item.programName}, Campaign: ${item.campaignName}`);
                    console.log(`Thumbnail div after appending image: `, thumbnailDiv);

                } else {
                    console.error("Image Object does not have a valid imageUrl");
                }
            }).catch(error => {
                console.error("Failed to load thumbnail image:", error);
            });

        });

*/
        matchedItems.forEach((item) => {
            const itemStartDate = new Date(item[startDateProp]);
            const itemEndDate = new Date(item[endDateProp]);
            const itemEndDateStr = itemEndDate ? itemEndDate.toLocaleDateString().split(',')[0] : null;
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);

            let daysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((daysDifference / groupDuration) * 100).toFixed(2);
            let itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.style.marginLeft = startPctDiff + '%';

            // Create a placeholder for the thumbnail
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
                        ${itemEndDateStr ? '<div class="start-date" title="Task End Date: ' + itemEndDateStr + '">End Date: ' + itemEndDateStr + '</div>' : ''}
                        <div class="link">
                            <a href="${item.reviewLink}">QA Files</a>
                        </div>
                    </div>
                </div>
            `;
            itemEl.style.width = itemDurationPct + '%';

            // Call the new function to fetch and add the thumbnail
            addThumbnailToItem(itemEl, item.programName, item.campaignName);
            itemWrapper.appendChild(itemEl);

        });

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
        `;
        groupEl.appendChild(itemWrapper);
        groupEl.querySelectorAll('.group-controls').forEach((arrow) => {
            arrow.addEventListener('click', showHideGroup);
        });

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

    // scroll to the right
    const calendarWrapper = document.querySelector('.calendar-wrapper')
    const yearDiff = displayYear - viewStartYear;

    const yearWidthOffsetPct = (((yearDiff / years.length)) * 100);
    let scrollPct;
    if (type === "quarter") {
        scrollPct = ((yearWidthOffsetPct) + ((displayQuarter - 1) * ((1 / years.length) / 4)) * 100).toFixed(2)
    } else {
        scrollPct = (yearWidthOffsetPct).toFixed(2);
    }
    document.addEventListener('DOMContentLoaded', scrollOnInit(calendarWrapper, scrollPct));

    // show the current month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (displayYear == currentYear) {
        const currentMonth = currentDate.getMonth() + 1;

        // calculate the percentage completion of the current month for the indicator offset
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


// Add the new async function
async function addThumbnailToItem(itemEl, programName, campaignName) {
    try {
        console.log(`Fetching thumbnail for Program: ${programName}, Campaign: ${campaignName}`);
        const imageObject = await searchAsset(programName, campaignName);
        console.log('Image Object:', imageObject);
        if (imageObject && imageObject.imageUrl) {
            const thumbnailDiv = itemEl.querySelector('.thumbnail');
            thumbnailDiv.textContent = 'hello2';
            console.log('Adding image to thumbnail div');
            const imgElement = document.createElement('img');
            imgElement.src = imageObject.imageUrl;
            imgElement.alt = imageObject.imageAltText;
            imgElement.loading = 'lazy';
            imgElement.style.display = 'block'; // Ensure the image is displayed as a block element
            thumbnailDiv.textContent = ''; // Clear "hello" text before adding the image
            thumbnailDiv.appendChild(imgElement);
            console.log(`Thumbnail added for Program: ${programName}, Campaign: ${campaignName}`);
            console.log(`Thumbnail div after appending image: `, thumbnailDiv);
        } else {
            console.error("Image Object does not have a valid imageUrl");
        }
    } catch (error) {
        console.error("Failed to load thumbnail image:", error);
    }
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
        const startDate = item[startDateProp];
        if (startDate) {
            const year = startDate.split('-')[0];
            yearsSet.add(year);
        }
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

    //buildCalendar(deliverables, block, period, view);
    //buildCalendar(testCalendar, block, year);
    buildCalendar(deliverables, block, period, view);
}

function lookupType(rawText) {
    const typeMatch = deliverableMapping.filter(item => item.value === rawText);
    const typeText =  typeMatch.length > 0 ? typeMatch[0].text : rawText;
    return typeText;
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

function calendarYears(startYear, endYear) {
    let years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
}

function newBuildYearCal(years) {
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

function newBuildQuarterCal(years) {
    const calendarEl = document.createElement('div');
    calendarEl.classList.add('calendar-wrapper', 'quarter-view');
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
    const calendarWrapper = element;
    // Function to scroll to a specific position
    const scrollToPosition = () => {
        const maxScrollLeft = calendarWrapper.scrollWidth;
        const scrollAmt = (maxScrollLeft) * (scrollPct / 100);
        calendarWrapper.scrollTo({
            left: scrollAmt, // Replace with desired position
            behavior: 'smooth' // Optional: for smooth scrolling
        });
    };

    // Observer to detect when the element becomes visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resizeGroups();
                scrollToPosition();
                observer.disconnect(); // Stop observing after scrolling
            }
        });
    });

    // Start observing the element
    observer.observe(calendarWrapper);
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