import { testCalendar } from '../../scripts/shared-program.js';

export async function buildCalendar(items, block, displayYear) {
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
                <div class="month">Jan</div>
                <div class="month">Feb</div>
                <div class="month">Mar</div>
                <div class="month">Apr</div>
                <div class="month">May</div>
                <div class="month">Jun</div>
                <div class="month">Jul</div>
                <div class="month">Aug</div>
                <div class="month">Sep</div>
                <div class="month">Oct</div>
                <div class="month">Nov</div>
                <div class="month">Dec</div>
            </div>
        </div>
    `
    const monthWidth = 8.315;
    //todo: determine the year based on dropdown selection

    // filter by chosen displayYear
    // todo populate dropdown with options based on unique years
    const yearFilteredItems = items.filter(item => item.startDate.includes(displayYear));
    yearFilteredItems.forEach((item) => {
        //console.log('Matched item. Start date: ' + item.startDate);
    })

    // get unique groupings
    const uniqueGroups = getUniqueItems(yearFilteredItems, "type");

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');
    var groupIndex = 1;
    uniqueGroups.forEach((group) => {
        // find all members of this group
        const matchedItems = yearFilteredItems.filter(item => item.type === group);

        // find the earliest date- this is how we set the position against the calendar
        const earliestStartDate = matchedItems.reduce((earliest, current) => {
            const currentDate = new Date(current.startDate + 'T00:00:00Z');
            return currentDate < earliest ? currentDate : earliest;
        },  new Date(matchedItems[0].startDate + 'T00:00:00Z'));

        const latestEndDate = matchedItems.reduce((latest, current) => {
            const currentDate = new Date(current.endDate + 'T00:00:00Z'); // Ensure UTC
            return currentDate > latest ? currentDate : latest;
        },  new Date(matchedItems[0].endDate + 'T00:00:00Z'));


        const startMonth = (earliestStartDate.getUTCMonth() ); // getMonth returns 0-11 but this is desirable
        const startDay = (earliestStartDate.getUTCDate() - 1); // if at start of month, we don't want to add any more margin
        const endMonth = (latestEndDate.getUTCMonth());
        const endDay = (latestEndDate.getUTCDate() - 1);
        
        const startYear = earliestStartDate.getUTCFullYear();
        const totalDaysInMonth = new Date(Date.UTC(startYear, startMonth, 0)).getUTCDate();

        const endYear = latestEndDate.getUTCFullYear();
        const totalDaysInEndMonth = new Date(Date.UTC(endYear, endMonth, 0)).getUTCDate();

        const percentOfStartMonth = (startDay / totalDaysInMonth);
        const percentOfEndMonth = (endDay / totalDaysInEndMonth);
        const dayMargin = (percentOfStartMonth * monthWidth);
        const endDayMargin = (percentOfEndMonth * monthWidth);
        const startPosition = ((startMonth * monthWidth) + dayMargin).toFixed(2);
        let endPosition = ((endMonth * monthWidth) + endDayMargin).toFixed(2);
        
        // do a little offset.
        if (endMonth > 9) endPosition = endPosition - 0.35;
        const widthOfGroup = (endPosition - startPosition);

        // calculate the duration of the group as that helps set the width of its members
        const groupDuration = Math.floor((latestEndDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');
        matchedItems.forEach((item) => {
            const itemStartDate = new Date(item.startDate + 'T00:00:00Z');
            const itemEndDate = new Date(item.endDate + 'T00:00:00Z');
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);

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
            itemEl.style.width = itemDurationPct + '%';
            itemEl.innerHTML = `
                <div class="color-tab"></div>
                <div class="item-content"> 
                    <div class="info">
                        <div class="thumbnail"></div>
                        <div class="name">${item.name}</div>
                        <div class="item-status" data-status="${item.status}"></div>
                    </div>
                    <div class="link">
                        <a href="${item.link}">Final Asset</a>
                    </div>
                </div>
            `;
            itemWrapper.appendChild(itemEl);
        })
        const groupEl = document.createElement('div');
        groupEl.classList.add('calendar-group', `color${groupIndex}`);
        groupEl.style.marginLeft = startPosition + '%';
        groupEl.style.width = widthOfGroup + '%';
        groupEl.innerHTML = `
            <div class="group-header">
                <img src="/icons/chevron-right.svg" class="group-expand group-controls inactive"></img>
                <img src="/icons/chevron-right.svg" class="group-collapse group-controls"></img>
                <div class="group-heading">${group}</div>
                <div class="group-count">${matchedItems.length}</div>
            </div>
            ${itemWrapper.outerHTML}
        `;

        groupEl.querySelectorAll('.group-controls').forEach((arrow) => {
            arrow.addEventListener('click', showHideGroup);
        });
        contentWrapper.appendChild(groupEl);
        groupIndex +=1;
    });
    calendarEl.appendChild(contentWrapper);
    block.querySelectorAll('.year-switch > .year-toggle').forEach((control) => {
        control.removeEventListener('click', changeYear);
        control.addEventListener('click', changeYear);
    });
    block.querySelector('.calendar.tab').appendChild(calendarEl);
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

function changeYear(event) {
    const arrow = event.target;
    const direction = arrow.dataset.direction;
    const wrapper = arrow.closest('.inc-dec-wrapper');
    const yearEl = wrapper.querySelector('.current-year');
    const currentYear = parseInt(yearEl.textContent);
    const newYear = (direction == 'right') ? (currentYear + 1) : (currentYear - 1);
    yearEl.textContent = newYear;

    // get the block so we can re-call the build function
    const block = document.querySelector('.gmo-program-details.block');
    block.querySelector('.calendar-wrapper').remove();
    buildCalendar(testCalendar, block, newYear);
}