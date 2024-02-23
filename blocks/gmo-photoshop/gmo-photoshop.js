import { getAdminConfig } from '../../scripts/site-config.js';
import { getDownloadUrl, getAssetMetadata } from '../../scripts/polaris.js';
import { getAssetName, getAssetTitle } from '../../scripts/metadata.js';

/* photoshop */
const psAdminConfig = await getAdminConfig();
const psKey = psAdminConfig.psClientId;
const psSecret = psAdminConfig.psCS;
const s3key = psAdminConfig.s3key;
const s3secret = psAdminConfig.s3secret;
let psToken;
let s3;
let psAssetJSON, psAssetName, psAssetTitle, psAssetId;
let downloadUrl, psUploadUrl;

export default async function decorate(block) {
    block.innerHTML=`
    <dialog class="ps-workshop ps-dialog">
        <div aria-label="Controls" class="control-rail">
            <div class="ps-dialog-apis-buttons">
                <div id="toggle-removeBg" data-switch="removeBg" class="toggle-removeBg togglebtn" title="Remove Background"></div>
                <div id="toggle-imageMask" data-switch="imageMask" class="toggle-imageMask togglebtn" title="Generate Mask"></div>
                <div id="toggle-renditions" data-switch="renditions" class="toggle-renditions togglebtn" title="Generate Renditions"></div>
                <div id="toggle-crop" data-switch="crop" class="toggle-crop togglebtn" title="Product Crop"></div>
            </div>
            <div class="ps-dialog-close-button">
                <div id="ps-dialog-close-modal" class="ps-dialog-close-modal">X</div>
            </div>
        </div>
        <div autofocus aria-label="Photoshop">
            <div class="ps-dialog-area ps-dialog-header">
                <span class="dialog-title" id="ps-dialog-title"></span>
            </div>
            <div class="ps-dialog-area ps-dialog-body"></div>
            <div class="ps-dialog-area ps-dialog-image-holder">
                <div class="ps-dialog-orig-wrapper">
                    <div class="ps-dialog-orig-header hidden">
                        Original Image
                    </div>
                    <div class="ps-dialog-orig">
                    </div>
                </div>
                <div class="ps-dialog-results-wrapper">
                    <div class="ps-dialog-results-header hidden">
                        Results
                    </div>
                    <div class="ps-dialog-results">
                    </div>
                </div>
            </div>
            <div class="ps-dialog-area ps-dialog-controls">
                <div class="button check-status">
                    <span class="button-text">Check Status</span>
                </div>
            </div>
        </div>
    </dialog>`;


    // do more stuff here
    await initAWS();


    const statusButton = block.querySelector(".check-status");
    statusButton.addEventListener('click', async () => {
        pollJobStatus();
    });
    const renditionBtn = block.querySelector(".toggle-renditions");
    renditionBtn.addEventListener('click', () => {
        renditions();
    });
    const cropBtn = block.querySelector(".toggle-crop");
    cropBtn.addEventListener('click', () => {
        productCrop();
    });
    const maskBtn = block.querySelector(".toggle-imageMask");
    maskBtn.addEventListener('click', () => {
        imageMask();
    });
    const rbgBtn = block.querySelector(".toggle-removeBg");
    rbgBtn.addEventListener('click', async () => {
        removeBg();
    });
    const closeModalBtn = block.querySelector(".ps-dialog-close-modal");
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    })
}

async function initAWS() {
    const s3region = 'us-east-1';
    AWS.config.update({
        accessKeyId: s3key,
        secretAccessKey: s3secret,
        region: s3region
    });
    s3 = new AWS.S3({apiVersion: '2006-03-01', signatureVersion: 'v4'});
}

async function getAssetInfo() {
    psAssetJSON = await getAssetMetadata(psAssetId);
    psAssetName = getAssetName(psAssetJSON);
    psAssetTitle = getAssetTitle(psAssetJSON);
    document.querySelector("#ps-dialog-title").textContent = psAssetTitle;
    downloadUrl = await getDownloadUrl(psAssetId, psAssetName);
    psUploadUrl = await getPresignedURL('putObject');
}

//actual api calls start here -----
async function removeBg() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/sensei/cutout';
    const storageType = 'external';
    console.log(psUploadUrl);
    const inputs = {
        'input': {
            'storage': storageType,
            'href': downloadUrl // must be public
        },
        'output': {
            'storage': storageType,
            'href': psUploadUrl
        }
    };
    const options = {
        method: 'POST',
        headers: {
          'x-api-key': psKey,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };

    const responseJson = await fetch(apiUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
    console.log(responseJson._links.self.href);
    const checkBtn = document.querySelector(".check-status");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "removeBg";
    checkBtn.dataset.completed = "false";
}

async function renditions() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/pie/psdService/renditionCreate';
    const storageType = 'external';
    const inputs = {
        'inputs': [{
            'storage': storageType,
            'href': downloadUrl
        }],
        'outputs': [{
            'href': psUploadUrl,
            'width': 4120,
            'storage': storageType,
            'type': 'image/jpeg'
        }]
    };
    const options = {
        method: 'POST',
        headers: {
          'x-api-key': psKey,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };
    const responseJson = await fetch(apiUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
    console.log(responseJson._links.self.href);

    const checkBtn = document.querySelector(".check-status");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "renditions";
    checkBtn.dataset.completed = "false";
}

async function productCrop() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/pie/psdService/productCrop';
    const storageType = 'external';
    const inputs = {
        'inputs': [{
            'storage': storageType,
            'href': downloadUrl
        }],
        'options': {
            "unit": "Pixels",
            "width": 10,
            "height": 10
        },
        'outputs': [{
            'href': psUploadUrl,
            'storage': storageType,
            'type': 'image/jpeg'
        }]
    };
    const options = {
        method: 'POST',
        headers: {
          'x-api-key': psKey,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };
    const responseJson = await fetch(apiUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
    console.log(responseJson._links.self.href);
    const checkBtn = document.querySelector(".check-status");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "crop";
    checkBtn.dataset.completed = "false";
}

async function imageMask() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/sensei/mask';
    const storageType = 'external';
    console.log(psUploadUrl);
    const inputs = {
        'input': {
            'storage': storageType,
            'href': downloadUrl // must be public
        },
        'output': {
            'storage': storageType,
            'href': psUploadUrl,
            'mask': {
                'format': 'soft'
            }
        }
    };
    const options = {
        method: 'POST',
        headers: {
          'x-api-key': psKey,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };

    const responseJson = await fetch(apiUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
    console.log(responseJson._links.self.href);
    const checkBtn = document.querySelector(".check-status");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "mask";
    checkBtn.dataset.completed = "false";
}

async function getPresignedURL(type) {
    const filePath = 'psapi.jpg'; 
    const bucketName = 'psapibucket'; 
    if (!s3) {
        await initAWS();
    }
    var params = {
        Bucket: bucketName,
        Key: filePath, //path the uploaded file will live in
        Expires: 3600 // expiration time for the presigned URL in seconds
    };
 
    const presignedUrl = await s3.getSignedUrl(type, params);
    return presignedUrl;
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
                'redirect_uri': 'https://localhost.corp.adobe.com/drafts/mdickson/psapi'
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

async function pollJobStatus() {
    const statusBtn = document.querySelector(".check-status");
    if (statusBtn.dataset.completed == "true") {
        return
    }
    const statusUrl = statusBtn.dataset.status;
    const operation = statusBtn.dataset.operation;
    const token = await getPSToken();

    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': psKey,
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        }
    };
    const responseJson = await fetch(statusUrl, options).then(response => {
        return response.json();
    });

    if (operation == "mask" || operation == "removeBg") {
        if (responseJson.status == 'succeeded') {
            shrinkOriginal();
            const result = await getPresignedURL('getObject');
            const responseBlob = await fetch(result).then(response => {
                return response.blob();
            });
            const resultImg = await base64Encode(responseBlob);
            appendImgToRoot(resultImg, true);
            statusBtn.dataset.completed = "true";
        }
    }

    if (operation == "renditions" || operation == "crop") {
        if (responseJson.outputs[0].status == 'succeeded') {
            shrinkOriginal();
            const result = await getPresignedURL('getObject');
            const responseBlob = await fetch(result).then(response => {
                return response.blob();
            })
            const resultImg = await base64Encode(responseBlob);
            appendImgToRoot(resultImg, true);
            statusBtn.dataset.completed = "true";
        }
    }

}

async function base64Encode(image) {
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.onloadend = () => { resolve(fr.result); };
      fr.readAsDataURL(image);
    });
}

function shrinkOriginal() {
    const origFileArea = document.querySelector(".ps-dialog-orig");
    if (origFileArea.childNodes.length <= 1) {
        const origImg = document.querySelector(".orig-asset");
        origImg.classList.add("shrink");
        origFileArea.appendChild(origImg);
        const origHeader = document.querySelector(".ps-dialog-orig-header");
        origHeader.classList.remove("hidden");
    }
}

function appendImgToRoot(imageUrl, isGenerated) {
    moveResults();
    const imageRoot = document.querySelector('.ps-dialog-body');
    const imageEl = document.createElement('div');
    imageEl.innerHTML = `<img class="orig-asset" src="` + imageUrl + `"/>`;
    imageRoot.replaceChildren();
    imageRoot.appendChild(imageEl);
    if (isGenerated) {
        imageEl.classList.add('generated-big');
    }
}

function moveResults() {
    const resultsArea = document.querySelector('.ps-dialog-results');
    const previousResult = document.querySelector('.generated-big');
    if (previousResult === null) {
        return;
    }
    previousResult.classList.remove('generated-big');
    previousResult.classList.add('generated');
    previousResult.classList.add('shrink');
    resultsArea.appendChild(previousResult);
    const resultsHeader = document.querySelector(".ps-dialog-results-header");
    resultsHeader.classList.remove("hidden");
}

export async function openModal(assetId) {
    psAssetId = assetId;
    await getAssetInfo();
    document.body.classList.add('no-scroll');
    const dialog = document.querySelector('.gmo-photoshop.block dialog');
    appendImgToRoot(downloadUrl, false);
    dialog.showModal();
}

function closeModal() {
    const dialog = document.querySelector('.gmo-photoshop.block dialog');
    dialog.close();
}