import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    //block.innerHTML = `<div class="gmo-landing-page-test">test</div>`
    //console.log(block.children);
    //console.log(readBlockConfig(block));
    const config = readBlockConfig(block);
    console.log(config);
    block.innerHTML=`
    <div class="video-background">
        <video autoplay loop muted playsinline>
            <source src="${config.videodesktop}" type="video/mp4">
        </video>
    </div>
    <div class="video-overlay">
        <div class="logo">
            <img src="${config.logo}" alt="Adobe Marketing Hub logo">
        </div>
        <div class="hero-text">
            <span>${config.herotext}</span>
        </div>
        <div class="button sign-in">
            <a id="button" href="${config.signinbuttonlink}">
                <span class="button-text">${config.signinbtntext}</span>
            </a>
        </div>
        <div class="signin-notif">
            <span>${config.signinnotif[0]}</span><br>
            <span>${config.signinnotif[1]} 
                <a href="mailto:${config.signincontact}">
                    ${config.signincontact}
                </a>
            </span>
        </div>
    </div>`
}