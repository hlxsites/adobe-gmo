import { readBlockConfig } from '../../scripts/lib-franklin.js';

async function waitForVideoLoad() {
    const video = document.querySelector('.desktop');
    return new Promise((resolve) => {
        video.oncanplaythrough = () => {
            resolve();
        };
    });
}

async function getVideoColor(){
    const video = document.querySelector('.desktop');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    await waitForVideoLoad();
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let hexColorOld = null;

    // Capture the video frame and extract the color information at the specified interval
    setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const pixelData = context.getImageData(10, 10, canvas.width, canvas.height).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];
        const hexColor = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);

        if (hexColorOld !== hexColor) {
            hexColorOld = hexColor; 
            let linkActive = document.querySelector('.gmo-landing-page p a');
            if (hexColor == '#000000') {
                return linkActive.style.color = '#72B7F9';
            } 
                linkActive.style.color = '#035FE6';
        }   
    }, 500);
}

export default async function decorate(block) {
    const host = location.origin;
    const signInMsg = getSignInMsg(block);
    const config = readBlockConfig(block);
    const redirect = config?.redirect ?? (host + config?.mainpage);

    block.innerHTML=`
    <div class="video-background">
        <video autoplay loop muted playsinline class="desktop" crossorigin="anonymous">
            <source src="${config.videodesktop}" type="video/mp4">
            
        </video>
        <video autoplay loop muted playsinline class="mobile" crossorigin="anonymous">
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
    getVideoColor();
}

function getSignInMsg(block) {
    let msgDiv;
    block.querySelectorAll(":scope > div").forEach((div) => {
        if (div.innerText.includes("signInNotif")) {
            msgDiv = div.children[1]; 
        }
    });
    return msgDiv;
}

