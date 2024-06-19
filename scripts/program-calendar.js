export async function buildCalendar(items, block) {
    //console.log(items);
    const uniqueGroups = getUniqueItems(items, "type");
    //console.log(uniqueGroups);
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('calendar-content-wrapper');
    uniqueGroups.forEach((group) => {
        const matchedItems = items.filter(item => item.type === group);
        //console.log(matchedItems);
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('group-content');
        matchedItems.forEach((item) => {
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
    //block.querySelector('.calendar-wrapper').appendChild(contentWrapper);
    //calendarWrapper.dispatchEvent(new CustomEvent('scroll'));
    
    //setCalendarHeight();
    
    //window.addEventListener('resize', setCalendarHeight);
    //document.addEventListener("load", setCalendarHeight);
    
    //calendarWrapper.addEventListener('mouseenter', setCalendarHeight);
    //calendarWrapper.addEventListener('scroll', setCalendarHeight);
    //calendarWrapper.dispatchEvent(new CustomEvent('wheel', { detail: { deltaY: 1 } }));

    //calendarWrapper.scrollTo(calendarWrapper.scrollX, calendarWrapper.scrollY + 1);

    //var observer = new MutationObserver(setCalendarHeight);
    //observer.observe(parent, { childList: true, subtree: true });
    /*
    let scrollEvt = new Event('scroll', {
        bubbles: true,
        cancelable: true
    });
    calendarWrapper.dispatchEvent(scrollEvt);
    */
}

function getUniqueItems(items, property) {
    return [...new Set(items.flatMap(item => item[property])
        .filter(value => value !== null && value !== undefined)
    )];
}

export function setCalendarHeight() {
    return;
    console.log('setting height');
    const calendarWrapper = document.querySelector('.calendar-wrapper');
    const monthWrapper = document.querySelector('.month-wrapper');
    const calendarContent = document.querySelector('.calendar-content-wrapper');

    console.log(calendarContent);
    console.log(calendarContent.scrollHeight);
    console.log(calendarContent.clientHeight);
    monthWrapper.style.height = calendarContent.offsetHeight + 'px';
    //calendarWrapper.scrollTop = 100;
    //calendarWrapper.dispatchEvent(new CustomEvent('scroll'));
    //calendarWrapper.style.height = calendarWrapper.scrollHeight + 'px';
}