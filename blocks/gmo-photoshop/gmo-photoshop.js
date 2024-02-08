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
    <div class="button remove-bg">
        <span class="button-text">Test Remove Background</span>
    </div>
    <div class="button check-status">
        <span class="button-text">Check Status</span>
    </div>
    <dialog autofocus aria-label="Photoshop" class="ps-workshop">
        <div class="dialog-header">
        </div>
        <div class="dialog-body">
        </div>
    </dialog>`;


    // do more stuff here
    await initAWS();

    const rbgButton = block.querySelector(".remove-bg");
    rbgButton.addEventListener('click', async () => {
        removeBg();
    })
    const statusButton = block.querySelector(".check-status");
    statusButton.addEventListener('click', async () => {
        pollJobStatus();
    })
}

async function initAWS() {
    const s3region = '';
    AWS.config.update({
        accessKeyId: s3key,
        secretAccessKey: s3secret,
        region: s3region
    });
    s3 = new AWS.S3();
}

async function getAssetInfo() {
    assetJSON = await getAssetMetadata(assetId);
    assetName = getAssetName(assetJSON);
    downloadUrl = await getDownloadUrl(assetId, assetName);
    uploadUrl = await getUploadUrl();
}

async function removeBg() {
    await getAssetInfo();
    const token = getPSToken();
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
          'X-Api-Key': psKey,
          Authorization: token,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };

    const responseJson = await fetch(apiUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
}

async function getUploadUrl() {
    const filePath = 'test/psapi.jpg';
    const bucketName = 'psapibucket'; // put actual name here
    if (!s3) {
        await initAWS();
    }
    var params = {
        Bucket: bucketName,
        Key: filePath, //path the uploaded file will live in
        Expires: 60 // expiration time for the presigned URL in seconds
    };
 
    const presignedUrl = await s3.getSignedUrl('putObject', params);
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
    const statusUrl = 'https://image.adobe.io/sensei/status/' + jobId;
    const token = await getPSToken();
    /*
    curl -X GET \
  https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7 \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
  -H "Content-Type: application/json"
  */


    const options = {
        method: 'POST',
        headers: {
            'X-Api-Key': psKey,
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost.corp.adobe.com'
        },
        body: JSON.stringify(inputs),
    };
    const responseJson = await fetch(statusUrl, options).then(response => {
        return response.json();
    });
    console.log(responseJson);
    //const jobStatus = responseJson['access_token'];

}

function openModal() {

}

function closeModal() {

}
