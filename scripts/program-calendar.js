export async function buildCalendar(items, block) {
    const monthWidth = 8.32;
    const displayYear = 2024;
    //todo: determine the year based on dropdown selection


    //console.log(items);
    const uniqueGroups = getUniqueItems(items, "type");
    //console.log(uniqueGroups);
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');
    uniqueGroups.forEach((group) => {
        const matchedItems = items.filter(item => item.type === group);
        //console.log(matchedItems);

        //find the earliest date- this is how we set the position against the calendar
        const earliestDate = matchedItems.reduce((earliest, current) => {
            const currentDate = new Date(current.startDate + 'T00:00:00Z');
            return currentDate < earliest ? currentDate : earliest;
          }, new Date(matchedItems[0].startDate + 'T00:00:00Z'));
        const month = (earliestDate.getUTCMonth() + 1); // getMonth returns 0-11, so add 1
        const day = (earliestDate.getUTCDate() - 1); // if at start of month, we don't want to add any more margin
        
        const year = earliestDate.getUTCFullYear();
        const totalDaysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

        const percentOfMonth = (day / totalDaysInMonth);
        const dayMargin = (percentOfMonth * monthWidth);
        //console.log(`The earliest startDate is: ${earliestDate.toISOString().split('T')[0]}`);
        //console.log(`The two-digit month of the earliest startDate is: ${month}`);
        //console.log(`The day of the earliest startDate is: ${day}`);

        //console.log(`Percentage of the month that has passed: ${percentOfMonth.toFixed(2)}%`);
        //console.log(`Percentage of the month that has passed: ${percentOfMonth}%`);
        //console.log(`Additional margin needed: ${dayMargin}`);

        const position = ((month * monthWidth) + dayMargin) + '%';
        //console.log(`Position of this group would be: ${position}`);
        // end margin calculation code


        // todo: we'll need to calculate the end date also as that will set the total width. maybe
        // we'll give the group a total days length and use that difference to calculate where in the group
        // each item should start



        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');
        matchedItems.forEach((item) => {
            console.log(item.startDate);
            const itemDate = new Date(item.startDate + 'T00:00:00Z');
            // begin date difference per item calculation
            // Calculate the difference in months and days between earliestDate and anotherDate
            let monthsDifference = (itemDate.getUTCFullYear() - earliestDate.getUTCFullYear()) * 12 + (itemDate.getUTCMonth() - earliestDate.getUTCMonth());

            let daysDifference = itemDate.getUTCDate() - earliestDate.getUTCDate();

            console.log(`Months difference between this and earliestDate: ${monthsDifference}`)
            console.log(`Days difference between this and earliestDate: ${daysDifference}`)
            if (daysDifference < 0) {
                monthsDifference -= 1;
                const previousMonth = new Date(Date.UTC(anotherDate.getUTCFullYear(), anotherDate.getUTCMonth(), 0));
                daysDifference += previousMonth.getUTCDate();
                console.log(`Days diff less than 0, new days diff: ${daysDifference}`)
            }




            const itemEl = document.createElement('div');
            itemEl.classList.add('item');
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
        groupEl.classList.add('calendar-group');
        groupEl.id = 'group1';
        groupEl.style.marginLeft = position;
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
    });
    const calendarWrapper = block.querySelector('.calendar-wrapper');
    calendarWrapper.appendChild(contentWrapper);
}

function getUniqueItems(items, property) {
    return [...new Set(items.flatMap(item => item[property])
        .filter(value => value !== null && value !== undefined)
    )];
}