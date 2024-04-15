import { decorateIcons } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    block.innerHTML = `
    <div class="back-button-wrapper">
        <span class="icon icon-back"></span>
        <span>Back</span>
    </div>
    <div class="main-body-wrapper">
        <div class="details-header-wrapper">
            <div class="campaign-img">
            </div>
            <div class="header-title">
                <span>Express Mobile Beta</span>
                <span>IN PROGRESS</span>
                <div class="title-date>
                    <span class="icon icon-calendar"></span>
                    <span>03/07/2024</span>
                </div>
            </div>
        </div>
        <div class="tab-wrapper">
            <div class="tab1">Overview</div>
            <div class="tab2">Deliverables</div>
            <div class="tab3">Calendar</div>
        </div>
        <div class="layout two-column">
            <div class="overview-wrapper">
                <span class="h1">At a Glance</span>
                <span class="h2">Strategy</span>
                <span class="paragraph">
                    Express mobile public beta is not a major at scale marketing moment (due to the limited nature of beta experience) with key audiences of
                    Existing Express users, investors and media. Marketing approach is signaling to the market our continued momentum with the new mobile
                    beta release, focusing efforts on PR, social/community and in-app surfaces.
                </span>
                <div class="button no-bg">Read more</div>
                <div class="kpis-wrapper>
                    <span class="h2">KPIs to Measure Success</span>
                    <ul>
                        <li>PR impressions & dedicated earned stories</li>
                        <li>Mobile exports</li>
                        <li>Community & social interactions</li>
                        <li>100% by EOL</li>
                    </ul>
                </div>
                <div class="use-cases-wrapper>
                    <span class="h2">Hero Use Cases</span>
                    <div class="use-case-tag">Text to Image</div>
                    <div class="use-case-tag">Use Case 2</div>
                </div>
                <div class="links-wrapper>
                    <span class="h2">Links to Important Artifacts</span>
                    Creative architecture
                </div>
            </div>
            <div class="infocards-wrapper>
                cards here
            </div>
        </div>
    </div>
    `;
    /*
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
    */
    decorateIcons(block);
}
