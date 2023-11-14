import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
    //console.log(location.hostname);
    const href = location.href;
    const redirect = href.substring(0, (href.lastIndexOf("/")) + 1);
    //console.log(redirect);
    const signInMsg = await getSignInMsg(block);
    const config = readBlockConfig(block);
    block.innerHTML=`
    <div class="video-background">
        <video autoplay loop muted playsinline class="desktop">
            <source src="${config.videodesktop}" type="video/mp4">
        </video>
        <video autoplay loop muted playsinline class="mobile">
            <source src="${config.videomobile}" type="video/mp4">
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
            <a id="button" href="${redirect}">
                <span class="button-text">${config.signinbtntext}</span>
            </a>
        </div>
        <div class="signin-notif">
        </div>
    </div>`
    const msgParent = block.querySelector(".signin-notif");
    msgParent.append(signInMsg);
}

async function getSignInMsg(block) {
    let msgDiv;
    block.querySelectorAll(":scope > div").forEach((div) => {
        if (div.innerText.includes("signInNotif")) {
            msgDiv = div.children[1]; 
        }
    });
    return msgDiv;
}