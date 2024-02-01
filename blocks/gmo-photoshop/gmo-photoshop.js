import { getAdminConfig } from '../../scripts/site-config.js';

/* photoshop */
const adminConfig = await getAdminConfig();
const psKey = adminConfig.psClientId;
const psSecret = adminConfig.psCS;
let psToken;

// to do:
/*
1. launch from a button on psd files
2. send psd to storage solution
3. store reference to the psd (download url)
4. load psd for editing (how?)
5. 



*/


export default async function decorate(block) {
    block.innerHTML=`<dialog autofocus aria-label="Photoshop" class="ps-workshop">
        <div class="dialog-header">
        </div>
        <div class="dialog-body">
        </div>
    </dialog>`;


    // do more stuff here
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

function openModal() {

}

function closeModal() {

}
