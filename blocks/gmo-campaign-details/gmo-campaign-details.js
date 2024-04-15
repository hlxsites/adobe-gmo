import { decorateIcons } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    block.innerHTML = `
    <div class="tab-wrapper">
        tabs here
    </div>
    <div class="layout two-column">
        <div class="overview-wrapper">
            at a glance
            strategy
            stuff
            readmore button
            kpis
            hero use cases
            links
        </div>
        <div class="infocards-wrapper>
            cards here
        </div>
    </div>
    `;
    document.querySelectorAll('.dropdown-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            toggleDropdown(event.target);
        });
    });
    document.querySelectorAll('.dropoption').forEach((button) => {
        button.addEventListener('click', (event) => {
        toggleOption(event.target.dataset.value, event.target.dataset.type);
        });
    });
    document.querySelector('.reset-filters').addEventListener('click', () => {
        resetAllFilters();
    })
    decorateIcons(block);
}
