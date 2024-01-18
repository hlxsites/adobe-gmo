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
    
    console.log('waiting for video load');
    await waitForVideoLoad();
    console.log('video loaded');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Set the interval for capturing the video frame
    const interval = 500; // .5 seconds

    let videoColor = null;

    // Capture the video frame and extract the color information at the specified interval
    setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const pixelData = context.getImageData(10, 10, canvas.width, canvas.height).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];
        const hexColor = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);

        if (videoColor !== hexColor) { 
            let linkActive = document.querySelector('.gmo-landing-page p a');
            // let linkHover = document.querySelector('.gmo-landing-page p a:hover');
            // let linkAnyLink = document.querySelector('.gmo-landing-page a:any-link');
            if (hexColor == '#000000') {
                linkActive.style.color = '#AEDBFE';
                // linkHover.style.color = '#8FCAFC';
                // linkAnyLink.style.color = '#72B7F9';
            } else {
                linkActive.style.color = '#035fe6';
                // linkHover.style.color = '#136ff6';
                // linkAnyLink.style.color = '#035fe6';
            }
            console.log(`background color has changed`);
            return (videoColor = hexColor)
        } else {
            console.log('background color has not changed');
        }    
    }, interval);
}

export default async function decorate(block) {
    const host = location.origin;
    const signInMsg = getSignInMsg(block);
    const config = readBlockConfig(block);
    const redirect = host + config?.mainpage;

    block.innerHTML=`
    <div class="video-background">
        <video autoplay loop muted playsinline class="desktop" crossorigin="Anonymous">
            <source src="${config.videodesktop}" type="video/mp4">
            
        </video>
        <video autoplay loop muted playsinline class="mobile" crossorigin="Anonymous">
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

