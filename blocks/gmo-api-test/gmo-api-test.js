import { getAdminConfig } from '../../scripts/site-config.js';

let bearerToken;
const adminConfig = await getAdminConfig();

/* new */
const apiKey = adminConfig.fireflyClientId;
const secret = adminConfig.fireflyCS;

/* photoshop */
const psKey = adminConfig.psClientId;
const psSecret = adminConfig.psCS;
let psToken;

// gen fill selection vars
let origin, selection = null;
let selectionHovered = false;
let edgeHovered, interaction, ox, oy = null;

export default async function decorate(block) {
    block.innerHTML=`
    <div class="toggle">
        <div id="toggle-text2image" data-switch="text2image" class="toggle-text2image togglebtn"></div>
        <div id="toggle-genfill" data-switch="genfill" class="toggle-genfill togglebtn"></div>
        <div id="toggle-genexpand" data-switch="genexpand" class="toggle-genexpand togglebtn"></div>
    </div>
    <div class="sidepanel">
        <div class="formwrapper">
            <div class="mode" data-mode="text2image">Text to Image</div>
            <form class="ff-form" id="config">
                <div class="config">
                    <div class="config-count-wrapper">
                        <label for="count">Number of Images</label>
                        <input type="range" id="config-count" name="count" min="1" max="4" value="1" step="1"></input>
                    </div>
                    <label for="size">Size</label>
                    <select name="size" id="size">
                        <option value="" disabled selected>Choose an image size</option>
                        <option id="landscape" name="size" value="1408x1024">Landscape (4:3)</option>
                        <option id="portrait" name="size" value="1024x1408">Portrait (3:4)</option>
                        <option id="square" name="size" value="1024x1024">Square (1:1)</option>
                        <option id="widescreen" name="size" value="1792x1024">Widescreen (16:9)</option>
                        <option id="vertical" name="size" value="1024x1792">Vertical (9:16)</option>
                    </select>
                    <label for="class">Content Class</label>
                    <select name="class" id="class">
                        <option value="" disabled selected>Choose the content class</option>
                        <option id="photo" value="photo">Photorealistic</option>
                        <option id="art" value="art">Artistic</option>
                    </select>
                    <label for="style">Style</label>
                    <select name="style" id="style">
                        <option value="" disabled selected>Choose a style</option>
                        <option value="concept art">Concept Art</option>
                        <option value="painting">Painting</option>
                    </select>
                </div>
                <textarea id="imageRef" name="imageRef" role="genFill" class="input" maxlength="100" placeholder="Supply an image reference"></textarea>
                <textarea id="maskRef" name="maskRef" role="genFill" class="input" maxlength="100" placeholder="Supply a mask reference"></textarea>
                <textarea id="input" name="input" role="text2image" class="input" maxlength="1024" placeholder="Add your text prompt here"></textarea>
                <div class="filedrop hide" id="filedrop">
                    <p>Upload multiple images with the file dialog or by dragging and dropping images into the dashed region.</p>
                    <input type="file" id="fileElem" multiple accept="image/*">
                    <label class="button" for="fileElem">Select images</label>
                    <div id="gallery"></div>
                </div>
                <div class="controls">
                    <div class="button generate">
                        <span class="button-text">Generate</span>
                    </div>
                    <div class="button clear">
                        <span class="button-text">Clear</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="workarea">
        <div class="canvas-wrapper" id="canvas-wrapper">
        </div>
        <div class="canvas-controls">
            <div class="button gen-expand hide">
                <span class="button-text">Gen Expand</span>
            </div>
            <div class="button genfill hide">
                <span class="button-text">Gen Fill</span>
            </div>
            <div class="button genfillpremasked hide">
                <span class="button-text">Gen Fill (premasked)</span>
            </div>
            <div class="button genfill clear hide">
                <span class="button-text">Clear</span>
            </div>
            <div class="button genfill dl-mask hide">
                <span class="button-text">Download Mask</span>
            </div>
        </div>
        <div class="canvas" id="display-area">
            <div class="image-hero"></div>
            <div class="image-root"></div>
        </div>
    </div>`;
// make the images display in a carousel below a canvas that has the currently selected image
    const ffButton = block.querySelector(".generate");
    ffButton.addEventListener('click', async () => {
        chooseAPI();
    })
    const dragArea = block.querySelector("#filedrop");

    ['dragenter','dragover','dragleave','drop'].forEach(eventName => {
        dragArea.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter','dragover'].forEach(eventName => {
        dragArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave','drop'].forEach(eventName => {
        dragArea.addEventListener(eventName, unHighlight, false);
    });

    dragArea.addEventListener('drop', handleDrop, false);

    const gfButton = block.querySelector(".genfill");
    gfButton.addEventListener('click', async () => {
        genFill();
    })

    const gfpmButton = block.querySelector(".genfillpremasked");
    gfpmButton.addEventListener('click', async () => {
        genFillPreMasked();
    })

    const geButton = block.querySelector(".gen-expand");
    geButton.addEventListener('click', async () => {
        genExpand();
    })

    const dlMaskButton = block.querySelector(".dl-mask");
    dlMaskButton.addEventListener('click', () => {
        if (selection) dlMask(selection);
    })

    const toggleBtns = block.querySelectorAll(".togglebtn");
    toggleBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            changeMode(event);
        });
    })

    const clearButton = block.querySelector(".button.clear");
    clearButton.addEventListener('click', () => {
        clearAll();
    })
};

function clearAll() {
    document.querySelector('.image-hero').innerHTML = '';
    document.querySelector('.image-root').innerHTML = '';
    document.getElementById('canvas-wrapper').innerHTML = '';
}

function changeMode(click) {
    const button = click.target;
    const newMode = button.dataset.switch;
    const modeElem = document.querySelector(".mode");
    const currentMode = modeElem.dataset.mode;

    if (newMode === currentMode) {
        return;
    }

    switch (newMode) {
        case 'text2image':
            modeElem.dataset.mode = 'text2image';
            modeElem.textContent = 'Text to Image';
            document.querySelector('.filedrop').classList.add('hide');
            break;
        case 'genfill':
            modeElem.dataset.mode = 'genfill';
            modeElem.textContent = 'Generative Fill';
            document.querySelector('.filedrop').classList.remove('hide');
            break;
        case 'genexpand':
            modeElem.dataset.mode = 'genexpand';
            modeElem.textContent = 'Generative Expand';
            document.querySelector('.filedrop').classList.remove('hide');
            break;
        default:
            console.log('invalid mode');
    }
}

function chooseAPI() {
    const modeElem = document.querySelector(".mode");
    const mode = modeElem.dataset.mode;

    switch (mode) {
        case 'text2image':
            textToImage();
            break;
        case 'genfill':
            genFill();
            break;
        case 'genexpand':
            genExpand();
            break;
        default:
            console.log('invalid mode');
    }
}

async function getFFToken() {
    if (!bearerToken) {
        const imsURL = `https://ims-na1.adobelogin.com/ims/token/v3?client_id=${apiKey}`;
        const scope = 'openid,AdobeID,firefly_api';
        const options = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com,https://ims-na1.adobelogin.com',
                'Access-Control-Request-Method': 'POST,OPTIONS',
                'Access-Control-Request-Headers': 'access-control-allow-origin'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_secret': secret,
                'scope': scope,
                'redirect_uri': 'https://localhost.corp.adobe.com/drafts/mdickson/api-test'
            })
        };


        const responseJson = await fetch(imsURL, options).then(response => {
            return response.json();
        });

        bearerToken = responseJson['access_token'];
        return bearerToken;
    } else {
        return bearerToken;
    }
}

async function getPSToken() {
    if (!psToken) {
        const imsURL = `https://ims-na1.adobelogin.com/ims/token/v3?client_id=${psKey}`;
        const scope = 'openid,AdobeID,read_organizations';
        const options = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com,https://ims-na1.adobelogin.com',
                'Access-Control-Request-Method': 'POST,OPTIONS',
                'Access-Control-Request-Headers': 'access-control-allow-origin'
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
                'client_secret': psSecret,
                'scope': scope,
                'redirect_uri': 'https://localhost.corp.adobe.com/drafts/mdickson/api-test'
            })
        };

        const responseJson = await fetch(imsURL, options).then(response => {
            return response.json();
        });
        psToken = responseJson['access_token'];
        return psToken;
    } else {
        return psToken;
    }
}

async function psMask() {
    const url = ' https://image.adobe.io/sensei/mask';
    const params = '';
    const storageType = '';

    const inputs = {
        'input': {
            'storage': storageType,
            'href': 'imagehref'
        },
        'options': {
            'optimize': 'performance'
        },
        'output': {
            'storage': storageType,
            'href': 'place2putoutput'
        }
    };

    const options = {
        method: 'POST',
        headers: {
          'X-Api-Key': psKey,
          Authorization: psToken,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };

}

async function signedUrl() {
    const expiration = 604800;
    const folder = '';
    const object = '';
    const method = 'GET';
    const key = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDm56jsSZarSSLs\nD/4Y0Yp+YK/XWBQioxvZU5Nk71H+rPMHmVvTNz452wjDn8C+0+HZ4ph4+V5u0fZS\n1+LwAQt1YzivSJyP+adea09IZ3O+yhe62ZFQ9Y8XyxA2XOcgdWEot1JbQ3dctfeT\nYUqJ+w9bcowrWSkCjwtWxz4HiPS9aAWPKflr3YlPY5C4VA+iPKswYr4jX200NUCF\n+2CClGLHioMgyTPrXI4pMDWgfT1Dc98UdkOEYCmWRqzpo0MobZ3vmIVtEcWAWS8N\ngPR0eqWLAYCPPXPY9xHIkv/6BGlVEW7wgpm3bEgpTB9PM7b0w4rlMrqo1Z7m2CYQ\nv/okapc1AgMBAAECggEAKJd3AbraCth7lCYnlDNZ9meG4gNw3rnvzl+73JWZw3yh\n6KcUFmhyvvb7bnBqEOHspUIJbdLgv/iXJe8fzPNSEVvU/jN0mnbX7mhM8ryFA3hB\nfa57tlDEy/j9q6DfXLxlzSOVDcgpdpnioP0Mfn8tLvVPINu2suV0p9e01txDsfv+\n6e3qBElqZGGDGJB6HWUNSGX2Ey7DZbaQxT9fU0A9WAuwIBcH/YCH+gUz0YBp6qtS\nQ8S0Ei0KGbmpHQflv3GSKZTOnZrm0UAYxkOn5RCrLFhDKm+Bx8Ts8IOwBBVN5tLc\n/hMoDPwx5CjQX6RLjxF0AttlyavYQWqAOHcWhJoxTQKBgQD1Kp1UbRsmRcJYsRIm\n6rRWQ4a/MLp2iWPOY5LMEOqEzFd70uyADojpmvu4Tx+1ZdmK7M/aDMEEG/tNTnHS\nB12lTozli/9uUg/14Gs2frQQw0Gq9jKoeaHLti0ryAZmQbrItePzHTe/QsJh3uYv\nq9iUxPhySa9BzkJwA/i4XxWwYwKBgQDxG7cQcrH5I+VyYIxPSeTXjF+YnsQxQGfu\n4h89e22MSwlAJgo1PVFgddNNMfwyUM9NqiDZcCGHaGPi0uvgBebwZ3kqjAA4vFHu\n4rnsm03rcGn2vChSBW+zOvr1r7UhOcM4xfAKerxew1NPhuiCswqrA7AO4uFCmojU\n2RZLfOwRhwKBgEnh68PTlYj1INplkljUBkCw3NylLKwoP0GlVEnXFzWp9vtD1y3I\nM45ivFUQ0zdxWBu7ve+yRECexh7H8xkeSyRUBbXveKygYlrwpJ6plE4w6YtB4oZP\nEWk4n2hAQV1zlXyDBAzx0yj6T2X7LFdVbFF5An4+omgsZm0nZT76uKiNAoGADnCf\nfR+xYv9wXXJE1PbS+snQa96OV3jJALiQMGl0/SL9Udc1Y0zh08oatpPYy9alI7yd\nrQgXKfnpiYsiT09rLli0HAU4ei1lJs5zXiVK/F/GKN3J+GeU8gIFR7OXQH8qHvtT\nzfzdzTsbgTbONA2vBOD6qVmTLh79NOoveKPpq38CgYEAskfk40pYlfnuXMMdyrHn\nBlxLHgnz/p3Ps5TmaJ9C6MY0a3ulhpDkeEw+NRQPAn7u4GxSbHd8wjLDpjfg7LXD\nxDrgTRSjuEVO9xVBEaDOe6SqisTWDOLvHF/Wd9ZruWcKB+uElMpNoS0MKgRPg2eK\nJSWNtNyjYn/g31qMXYzWWkE=\n-----END PRIVATE KEY-----\n';
    const email = 'uploader@sixth-zoo-411617.iam.gserviceaccount.com';
}

async function textToImage() {
    const url = 'https://firefly-beta.adobe.io/v1/images/generations';
    const params = document.forms["config"];
    const defaultPrompt = 'rat in a dress';

    let newToken = await getFFToken();
    const inputs = {
        'prompt': params.input.value || defaultPrompt,
        'size': params.size.value || '1024x1024',
        'n': params.count.value || 4,
        'contentClass': params.class.value || 'photo',
        'styles': ["concept art"]
    };
    const options = {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        Authorization: newToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json+base64',
        'x-accept-mimetype': 'image/jpeg',
        'x-api-variant': 'v1',
        'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
      },
      body: JSON.stringify(inputs),
    };
    
    //console.log(options);
    const response = await fetch(url, options);
    const responseJson = await response.json();

    appendResults(params.input.value, responseJson, "image/jpeg");
}

async function genExpand() {
    const url = 'https://firefly-beta.adobe.io/v1/images/expand'
    const params = document.forms["config"];
    const defaultPrompt = 'rave party with a dj and bubbles floating around';

    const baseImage = document.getElementById('genfill-base');
    const baseRef = baseImage.dataset.reference;

    let newToken = await getFFToken();

    const inputs = {
        'prompt': params.input.value || defaultPrompt,
        'n': params.count.value || 4,
        'size': params.size.value || '1024x1024',
        'image': {
            'id': baseRef
        }
    };

    const options = {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          Authorization: newToken,
          'Content-Type': 'application/json',
          'x-accept-mimetype': 'image/jpeg',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(url, options);
      const responseJson = await response.json();
      //console.log(responseJson);
      
      appendResults(params.input.value, responseJson);
}

async function genFill() {
    if (!(selection)) {
        return;
    } 

    const url = 'https://firefly-beta.adobe.io/v1/images/fill';
    const params = document.forms["config"];
    const defaultPrompt = 'rat in a dress';
    const baseImage = document.getElementById('genfill-base');
    let newToken = await getFFToken();

    const imageSrc = baseImage.src;
    const imageType = imageSrc.substring(imageSrc.indexOf('data:') + 5,imageSrc.indexOf(';base64'));
    let baseRef = baseImage.dataset.reference;

    if (baseRef === "undefined") {
        //do upload
        //in this case we're using a generated image. convert the image src to blob first
        const baseString = imageSrc.slice(imageSrc.indexOf(';base64') + 8, imageSrc.length);
        const blob = await b64toBlob(baseString, imageType);
        baseRef = await uploadImage(blob, imageType);
    }

    const mask = await processMask(selection, imageType);
    const maskRef = await uploadImage(mask, imageType);

    const inputs = {
        'prompt': params.input.value || defaultPrompt,
        'n': params.count.value || 3,
        'image': {
            'id': baseRef
        },
        'mask': {
            'id': maskRef
        }
    };

    const options = {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          Authorization: newToken,
          'Content-Type': 'application/json',
          'x-accept-mimetype': imageType,
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(url, options);
      const responseJson = await response.json();
      //console.log(responseJson);
      appendResults(params.input.value, responseJson, imageType);
}

function appendResults(prompt, responseJson, imageType) {
    const imageRoot = document.querySelector(".image-root");
    const capturePrompt = document.createElement('div');
    capturePrompt.classList.add('image-prompt');
    capturePrompt.innerHTML = `<span>${prompt || 'rat in a dress'}</span>`
    imageRoot.appendChild(capturePrompt);
    const carousel = document.createElement('div');
    carousel.classList.add('image-carousel');
    responseJson.images.forEach((image) => {
        carousel.appendChild(appendImages(image, imageType));
    })
    imageRoot.appendChild(carousel);
}

async function genFillPreMasked() {
    const url = 'https://firefly-beta.adobe.io/v1/images/fill';
    const params = document.forms["config"];
    const defaultPrompt = 'draw a beard on the cat';
    let newToken = await getFFToken();

    const baseRef = params.imageRef.value || 'd3e50624-b1b9-4961-9a45-ad583e378933';
    const maskRef = params.maskRef.value || '1324d3b4-815e-4dc1-9cf5-3ef576ac7d8a';

    const inputs = {
        'prompt': params.input.value || defaultPrompt,
        'n': params.count.value || 3,
        'image': {
            'id': baseRef
        },
        'mask': {
            'id': maskRef
        }
    };

    const options = {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
          Authorization: newToken,
          'Content-Type': 'application/json',
          'x-accept-mimetype': 'image/jpeg',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
      };
      const response = await fetch(url, options);
      const responseJson = await response.json();
      console.log(responseJson);
}

async function processMask({ top, left, width, height }, imageType) {
    const canvas = document.getElementById('genfill');

    let canvasHeight = canvas.getAttribute('height');
    let canvasWidth = canvas.getAttribute('width');
    const factor = canvas.dataset.scaling;
    if (canvasWidth.includes('px')) {
        canvasWidth = canvasWidth.replace('px','');
    }
    if (canvasHeight.includes('px')) {
        canvasHeight = canvasHeight.replace('px', '');
    }

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = canvasWidth * factor;
    shadowCanvas.height = canvasHeight * factor;
    shadowCanvas.style.height = canvasHeight + 'px';
    shadowCanvas.style.width = canvasWidth + 'px';
    const shadowContext = shadowCanvas.getContext('2d');
    shadowContext.scale(factor, factor);
    shadowContext.fillStyle = 'black';
    shadowContext.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
    shadowContext.fillStyle = 'white';
    shadowContext.fillRect(left, top, width, height);

    const img = shadowContext.getImageData(0,0,canvasWidth * factor,canvasHeight * factor);
    // this is probably causing issues re: having/not having 'px'
    shadowCanvas.width = canvasWidth * factor;
    shadowCanvas.height = canvasHeight * factor;
    shadowContext.putImageData(img, 0, 0);
    
    
    const blob = await new Promise(resolve => shadowCanvas.toBlob(resolve, imageType, 1));
    return blob;

}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
      
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

function dlMask({ top, left, width, height }) {
    const canvas = document.getElementById('genfill');
    let canvasHeight = canvas.getAttribute('height');
    let canvasWidth = canvas.getAttribute('width');
    const factor = canvas.dataset.scaling;

    if (canvasWidth.includes('px')) {
        canvasWidth = canvasWidth.replace('px','');
    }
    if (canvasHeight.includes('px')) {
        canvasHeight = canvasHeight.replace('px', '');
    }

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = canvasWidth * factor;
    shadowCanvas.height = canvasHeight * factor;
    shadowCanvas.style.height = canvasHeight + 'px';
    shadowCanvas.style.width = canvasWidth + 'px';
    const shadowContext = shadowCanvas.getContext('2d');
    shadowContext.scale(factor, factor);
    shadowContext.fillStyle = 'black';
    shadowContext.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
    shadowContext.fillStyle = 'white';
    shadowContext.fillRect(left, top, (width) , (height));

    const img = shadowContext.getImageData(0,0,canvasWidth * factor,canvasHeight * factor);
    shadowContext.putImageData(img, 0, 0);

    const image = shadowCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    let dlElem = document.createElement('a');
    const filename = "mask.jpeg";
    dlElem.setAttribute('href', image);
    dlElem.setAttribute('download', filename);
    dlElem.click();
    shadowCanvas.remove();
}

function appendImages(response, imageType) {

    //console.log(response);
    const imageEl = document.createElement('div');

    if ((response.base64) === undefined) {
        imageEl.innerHTML = `<img class="generated" src="` + response.image.presignedUrl + `"/>`;
    } else {
        imageEl.innerHTML = `<img class="generated" src="data:` + imageType + `;base64,` + response.base64 + `"/>`;
    }

    imageEl.classList.add('image-block');
    imageEl.addEventListener('click', showHero);
    return imageEl;
}

function showHero(e) {

    const heroDiv = document.querySelector(".image-hero");
    heroDiv.classList.remove('hide');
    if (heroDiv.hasChildNodes()) {
        heroDiv.removeChild(heroDiv.childNodes[0]);
    }

    const newImg = e.target.cloneNode();
    newImg.addEventListener('click', (event) => {
        initCanvas(event.target);
        document.querySelector('.image-hero').classList.add('hide');
    }); 
    
    heroDiv.appendChild(newImg);

}

function handleFiles(files) {
    //console.log('handle files');
    files = [...files];
    files.forEach(processImages);
}

async function processImages(image) {
    let base64 = await base64Encode(image);
    let imageRef = await uploadImage(image);
    previewImage(imageRef, base64);
}

async function base64Encode(image) {
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.onloadend = () => { resolve(fr.result); };
      fr.readAsDataURL(image);
    });
}

async function uploadImage(image, imageType) {
    const url = 'https://firefly-beta.adobe.io/v2/storage/image';
    const token = await getFFToken();
    if (imageType === undefined) {
        imageType = image.type;
    }

    const options = {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            Authorization: token,
            'Content-Type': imageType
        },
        body: image
    };
    const response = await fetch(url, options);
    const responseJson = await response.json();

    return responseJson.images[0].id;

}

function handleDrop(event) {
    let dt = event.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}
function preventDefaults(event) {

    event.preventDefault();
    event.stopPropagation();
}
function highlight(event) {

    this.classList.add('highlight');
}
function unHighlight(event) {

    this.classList.remove('highlight');
}
function previewImage(ref, base64) {

    let img = new Image();
    img.src = base64;
    img.setAttribute('data-reference', ref);
    document.getElementById('gallery').appendChild(img);

    //attach event listener
    img.addEventListener('click', (e) => {
        initCanvas(e.target);
    });
}

function clearCanvas() {
    const canvasWrapper = document.getElementById('canvas-wrapper');
    if (canvasWrapper.hasChildNodes()) {
        canvasWrapper.innerHTML = '';
    }
    selection = null;
    //clear selection also
}

function initCanvas(img) {
    //check first if a canvas exists, if so clear it out
    clearCanvas();
    const maxHeight = 500;
    const maxWidth = 500;
    const imgHeight = img.naturalHeight;
    const imgWidth = img.naturalWidth;
    let factor, canvasHeight, canvasWidth;

    if ((imgHeight > imgWidth) && (imgHeight > maxHeight)) {
        factor = ((imgHeight / maxHeight));
        canvasHeight = '500';
        canvasWidth = ((imgWidth / factor));
    } else if ((imgWidth > imgHeight) && (imgWidth > maxWidth)) {
        factor = ((imgWidth / maxWidth));
        canvasWidth = '500';
        canvasHeight = ((imgHeight / factor));
    } else {
        factor = ((imgHeight / maxHeight));
        canvasHeight = '500';
        canvasWidth = ((imgWidth / factor));
    }

    const image = new Image();
    image.src = img.src;
    image.style.height = canvasHeight + 'px';
    image.style.width = canvasWidth + 'px';
    image.setAttribute('data-reference', img.dataset.reference);
    image.id = 'genfill-base';
    document.getElementById('canvas-wrapper').appendChild(image);
    const canvas = document.createElement('canvas');
    canvas.style.height = canvasHeight + 'px';
    canvas.style.width = canvasWidth + 'px';

    canvas.width = canvasWidth; 
    canvas.height = canvasHeight;
    canvas.classList.add('genfill');
    canvas.id = 'genfill';
    canvas.setAttribute('data-scaling', factor);
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasHeight + 'px');
    const context = canvas.getContext('2d');
    document.getElementById('canvas-wrapper').appendChild(canvas);


    // drawing event listeners
    canvas.addEventListener('mousedown', (e) => {
        canvasMouseDown(e);
    });
    canvas.addEventListener('mouseup', (e) => {
        canvasMouseUp();
    });
    canvas.addEventListener('mousemove', (e) => {
        canvasMouseMove(e);
    });

}

function canvasMouseDown(e) {
    origin = { 
        x: e.offsetX,
        y: e.offsetY
    };

    if (edgeHovered === "left") {
        origin = { x: selection.left + selection.width, y: selection.top };
        interaction = "MAKE_SELECTION";
      } else if (edgeHovered === "right") {
        origin = { x: selection.left, y: selection.top };
        interaction = "MAKE_SELECTION";
      } else if (edgeHovered === "top") {
        origin = { x: selection.left, y: selection.top + selection.height };
        interaction = "MAKE_SELECTION";
      } else if (edgeHovered === "bottom") {
        origin = { x: selection.left, y: selection.top };
        interaction = "MAKE_SELECTION";
      } else if (selectionHovered) {
        interaction = "MOVE_SELECTION";
        ox = selection.left;
        oy = selection.top;
      } else {
        interaction = "MAKE_SELECTION";
      }    
}

function canvasMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!interaction) {
     selectionHovered = (
        selection &&
        x >= selection.left &&
        x <= selection.left + selection.width &&
        y >= selection.top &&
        y <= selection.top + selection.height
      );
      
      if (
        selection &&
        x >= selection.left - 5 &&
        x <= selection.left + 5 && 
        y >= selection.top &&
        y <= selection.top + selection.height
      ) {
        edgeHovered = "left";
      } else if (
        selection &&
        x >= selection.left + selection.width - 5 &&
        x <= selection.left + selection.width + 5 && 
        y >= selection.top &&
        y <= selection.top + selection.height
      ) {
        edgeHovered = "right";
      } else if (
        selection &&
        y >= selection.top - 5 &&
        y <= selection.top + 5 && 
        x >= selection.left &&
        x <= selection.left + selection.width
      ) {
        edgeHovered = "top";
      } else if (
        selection &&
        y >= selection.top + selection.height - 5 &&
        y <= selection.top + selection.height + 5 && 
        x >= selection.left &&
        x <= selection.left + selection.width
      ) {
        edgeHovered = "bottom";
      } else {
        edgeHovered = null;
      }
    } else {
      const dx = origin.x - x;
      const dy = origin.y - y;
  
      // Update
      switch (interaction) {
        case "MOVE_SELECTION":
          selection.left = ox - dx;
          selection.top = oy - dy;
  
          break;
        case "MAKE_SELECTION":
          selection = {
            left:   Math.min(x, origin.x),
            top:    Math.min(y, origin.y),
            width:  ((edgeHovered === "top") || (edgeHovered === "bottom")) ? selection.width : Math.abs(dx),
            height: ((edgeHovered === "left") || (edgeHovered === "right")) ? selection.height : Math.abs(dy)
          }
          break
        default:
          // Do nothing
      }
  
      // Set selectionHovered
      if (selection) {
  
      } else {
        selectionHovered = false;
      }
    }
  
    // Draw
    if (selection) { 
        drawSelection(selection, e);
    }
}

function drawSelection({ top, left, width, height }, e) {
    const canvas = e.target;
    const context = canvas.getContext('2d');

    
    // Draw rect
    context.strokeStyle = "black";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    context.fillRect(left, top, width, height); 
    context.stroke(); 

    
    // Set mouse 
    if ((edgeHovered == "left") || (edgeHovered == "right"))
        canvas.style.cursor = "ew-resize";
    else if ((edgeHovered == "top") || (edgeHovered == "bottom"))
        canvas.style.cursor = "ns-resize";
    else if (selectionHovered)
        canvas.style.cursor = "move";
    else
        canvas.style.cursor = "crosshair";
}

function canvasMouseUp() {
    //console.log('mouse up')
    interaction = null;
    origin = null;
    //console.log(selection);
}