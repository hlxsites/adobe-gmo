export async function buildCalendar(items, block) {
    const monthWidth = 8.315;
    const displayYear = 2024;
    //todo: determine the year based on dropdown selection


    //console.log(items);
    const uniqueGroups = getUniqueItems(items, "type");
    //console.log(uniqueGroups);
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');
    var groupIndex = 1;
    uniqueGroups.forEach((group) => {
        const matchedItems = items.filter(item => item.type === group);
        //console.log(matchedItems);

        //find the earliest date- this is how we set the position against the calendar
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
        console.log(`Percent of end month that has passed: ${percentOfEndMonth}`);

        const dayMargin = (percentOfStartMonth * monthWidth);
        const endDayMargin = (percentOfEndMonth * monthWidth);

        console.log(`The earliest startDate is: ${earliestStartDate.toISOString().split('T')[0]}`);
        console.log(`The latest endDate is: ${latestEndDate.toISOString().split('T')[0]}`);
        console.log(`The two-digit month of the earliest startDate is: ${startMonth}`);
        console.log(`The day of the earliest startDate is: ${startDay}`);
        console.log(`The two-digit month of the latest endDate is: ${endMonth}`);
        console.log(`The day of the earliest endDate is: ${endDay}`);

        //console.log(`Percentage of the month that has passed: ${percentOfMonth.toFixed(2)}%`);
        //console.log(`Percentage of the month that has passed: ${percentOfMonth}%`);
        //console.log(`Additional margin needed: ${dayMargin}`);

        const startPosition = ((startMonth * monthWidth) + dayMargin).toFixed(2);
        //const startPosition = ((startMonth * monthWidth) + dayMargin) + '%';
        console.log(`Start position: ${startPosition}`);
        let endPosition = ((endMonth * monthWidth) + endDayMargin).toFixed(2);
        
        // do a little offset.
        // todo: make the adjustment in day margin

        if (endMonth > 9) endPosition = endPosition - 0.35;
        console.log(`End position: ${endPosition}`);
        const widthOfGroup = (endPosition - startPosition);
        console.log(`Width of this group is ${widthOfGroup}%`);
        //console.log(`Position of this group would be: ${position}`);
        // end margin calculation code


        // todo: we'll need to calculate the end date also as that will set the total width. maybe
        // we'll give the group a total days length and use that difference to calculate where in the group
        // each item should start

        const groupDuration = Math.floor((latestEndDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
        console.log(`Day duration of all items in this group: ${groupDuration}`);
        console.log('----------------');

        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');
        matchedItems.forEach((item) => {
            console.log('----- ITEM LOG -----');
            console.log(item.startDate);
            const itemStartDate = new Date(item.startDate + 'T00:00:00Z');
            const itemEndDate = new Date(item.endDate + 'T00:00:00Z');
            const itemDuration = Math.floor((itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const itemDurationPct = ((itemDuration / groupDuration) * 100).toFixed(2);
            console.log(`Duration of item as a percent of the group duration: ${itemDurationPct}`);

            // begin date difference per item calculation
            // Calculate the difference in months and days between earliestDate and anotherDate
            let monthsDifference = (itemStartDate.getUTCFullYear() - earliestStartDate.getUTCFullYear()) * 12 + (itemStartDate.getUTCMonth() - earliestStartDate.getUTCMonth());

            let startDaysDifference = itemStartDate.getUTCDate() - earliestStartDate.getUTCDate();
            let onlyDaysDifference = Math.floor((itemStartDate.getTime() - earliestStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const startPctDiff = ((onlyDaysDifference / groupDuration) * 100).toFixed(2);

            //console.log(`Months and days difference between this and earliestDate: ${monthsDifference} months, ${daysDifference} days`)
            console.log(`Days difference between this and earliestDate: ${onlyDaysDifference}`)
            console.log(`Percent of total duration of group passed by this item's start: ${startPctDiff}`)
            if (startDaysDifference < 0) {
                monthsDifference -= 1;
                const previousMonth = new Date(Date.UTC(anotherDate.getUTCFullYear(), anotherDate.getUTCMonth(), 0));
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
            console.log('----- END ITEM LOG -----');
        })
        const groupEl = document.createElement('div');
        groupEl.classList.add('calendar-group', `color${groupIndex}`);
        //groupEl.id = `group${groupIndex}`;
        groupEl.style.marginLeft = startPosition + '%';
        groupEl.style.width = widthOfGroup + '%';
        groupEl.innerHTML = `
            <div class="group-header">
                <img src="/icons/chevron-right.svg" class="group-expand group-controls"></img>
                <img src="/icons/chevron-right.svg" class="group-collapse group-controls inactive"></img>
                <div class="group-heading">${group}</div>
                <div class="group-count">${matchedItems.length}</div>
            </div>
            ${itemWrapper.outerHTML}
        `;
        contentWrapper.appendChild(groupEl);
        groupIndex +=1;
    });
    const calendarWrapper = block.querySelector('.calendar-wrapper');
    calendarWrapper.appendChild(contentWrapper);
}

function getUniqueItems(items, property) {
    return [...new Set(items.flatMap(item => item[property])
        .filter(value => value !== null && value !== undefined)
    )];
}