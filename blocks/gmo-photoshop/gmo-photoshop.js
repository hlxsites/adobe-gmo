import { getAdminConfig } from '../../scripts/site-config.js';
import { getDownloadUrl, getAssetMetadata } from '../../scripts/polaris.js';
import { getAssetName } from '../../scripts/metadata.js';

/* photoshop */
const adminConfig = await getAdminConfig();
const psKey = adminConfig.psClientId;
const psSecret = adminConfig.psCS;
const s3key = adminConfig.s3key;
const s3secret = adminConfig.s3secret;
let psToken;
let s3;
let assetJSON, assetName;
let downloadUrl, uploadUrl;

//testing purposes
const assetId = 'urn:aaid:aem:84da1fe2-3e89-4cd0-a9e5-4171af8ea6ed'; //should I remove the urn:aaid:aem: ?

// to do:
/*
1. launch from a button on psd files
2. send psd to storage solution
3. store reference to the psd (download url)
4. load psd for editing (how?)
5. 



*/


export default async function decorate(block) {
    block.innerHTML=`hello
    <div class="button show-modal">
        <span class="button-text">Show Modal</span>
    </div>
    <dialog class="ps-workshop ps-dialog">
        <div autofocus aria-label="Photoshop">
            <div class="ps-dialog-area ps-dialog-header">
                <span class="dialog-title">Title Here</span>
            </div>
            <div class="ps-dialog-area ps-dialog-body">
                <span>Image goes here</span>
            </div>
            <div class="ps-dialog-area ps-dialog-orig">
            </div>
            <div class="ps-dialog-area ps-dialog-controls">
                <div class="button remove-bg">
                    <span class="button-text">Remove BG</span>
                </div>
                <div class="button check-status">
                    <span class="button-text">Check Status</span>
                </div>
            </div>
        </div>
    </dialog>`;


    // do more stuff here
    await initAWS();
    await getAssetInfo();

    const rbgButton = block.querySelector(".remove-bg");
    rbgButton.addEventListener('click', async () => {
        removeBg();
    })
    const statusButton = block.querySelector(".check-status");
    statusButton.addEventListener('click', async () => {
        pollJobStatus();
    })
    const showButton = block.querySelector(".show-modal");
    showButton.addEventListener('click', () => {
        openModal(downloadUrl);
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
    assetJSON = await getAssetMetadata(assetId);
    assetName = getAssetName(assetJSON);
    downloadUrl = await getDownloadUrl(assetId, assetName);
    uploadUrl = await getPresignedURL('putObject');
}

async function removeBg() {
    //await getAssetInfo();
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/sensei/cutout';
    const storageType = 'external';
    console.log(uploadUrl);
    const inputs = {
        'input': {
            'storage': storageType,
            'href': downloadUrl // must be public
        },
        'output': {
            'storage': storageType,
            'href': uploadUrl
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
}

async function getPresignedURL(type) {
    const filePath = 'psapi.jpg'; //this needs to match the name of the output file
    const bucketName = 'psapibucket'; // put actual name here
    if (!s3) {
        await initAWS();
    }
    var params = {
        Bucket: bucketName,
        Key: filePath, //path the uploaded file will live in
        Expires: 3600 // expiration time for the presigned URL in seconds
    };
 
    const presignedUrl = await s3.getSignedUrl(type, params);
    //console.log(presignedUrl);
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

async function psMask(downloadURL, uploadURL) {
    const url = ' https://image.adobe.io/sensei/mask';
    const params = '';
    const storageType = '';

    const inputs = {
        'input': {
            'storage': storageType,
            'href': downloadURL // must be public
        },
        'options': {
            'optimize': 'performance'
        },
        'output': {
            'storage': storageType,
            'href': uploadURL
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

async function pollJobStatus(jobId) {
    //const statusUrl = 'https://image.adobe.io/sensei/status/' + jobId;
    const statusUrl = document.querySelector(".check-status").dataset.status;
    const token = await getPSToken();
    /*
    curl -X GET \
  https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7 \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json"
  */


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
    console.log(responseJson);
    if (responseJson.status == 'succeeded') {
        console.log(`job's done`);
        shrinkOriginal();
        //const resultUrl = responseJson.output.href;
        const result = await getPresignedURL('getObject');
        const responseBlob = await fetch(result).then(response => {
            return response.blob();
        });
        const resultImg = await base64Encode(responseBlob);
        
        //appendImgToRoot(resultUrl);
        //need a presigned get URL for the object it created
        appendImgToRoot(resultImg);
        // next, move original image element to some 'holding area' or w/e
        // then show results as the big image
    }
    //const jobStatus = responseJson['access_token'];

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
    console.log(origFileArea.hasChildNodes());
    if (origFileArea.childNodes.length <= 1) {
        const origImg = document.querySelector(".orig-asset");
        origImg.classList.add("shrink");
        origFileArea.appendChild(origImg);
    }
}

function appendImgToRoot(imageUrl) {
    const imageRoot = document.querySelector('.ps-dialog-body');
    const imageEl = document.createElement('div');
    imageEl.innerHTML = `<img class="orig-asset" src="` + imageUrl + `"/>`;
    //dialog.classList.add("show-dialog");
    imageRoot.appendChild(imageEl);
}

function openModal(imageUrl) {
    document.body.classList.add('no-scroll');
    const dialog = document.querySelector('.gmo-photoshop.block dialog');
    appendImgToRoot(imageUrl);
    /*const imageRoot = dialog.querySelector('.ps-dialog-body');
    const imageEl = document.createElement('div');
    imageEl.innerHTML = `<img class="orig-asset" src="` + imageUrl + `"/>`;
    //dialog.classList.add("show-dialog");
    imageRoot.appendChild(imageEl);*/
    dialog.showModal();
}

function closeModal() {

}
