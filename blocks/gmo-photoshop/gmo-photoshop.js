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
let psAssetJSON, psAssetName, psAssetTitle, psAssetId, psAssetFormat;
let downloadUrl, psUploadUrl;

const testPsd = 'newtestpsd.psd';

export default async function decorate(block) {

    // image block
    block.innerHTML=`
    <dialog class="ps-workshop ps-dialog">
        <div class="image-functions hidden">
            <div aria-label="Controls" class="control-rail">
                <div class="ps-dialog-apis-buttons">
                    <div id="removeBg" class="button api">
                        <span class="button-text">Remove BG</span>
                    </div>
                    <div id="imageMask" class="button api">
                        <span class="button-text">Image Mask</span>
                    </div>
                    <div id="renditions" class="button api">
                        <span class="button-text">Rendition</span>
                    </div>
                    <div id="crop" class="button api">
                        <span class="button-text">Crop</span>
                    </div>
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
        </div>
        <div class="psd-functions hidden">
            <div class="loader">
            </div>
            <div aria-label="Controls" class="control-rail hidden">
                <div class="ps-dialog-apis-buttons">
                    <div id="psdtest" class="button api psdtest">
                        <span class="button-text">PSD Presigned Get</span>
                    </div>
                    <div id="psdlayers" class="button api psdlayer">
                        <span class="button-text">PSD Layer Info</span>
                    </div>
                    <div id="textedit" class="button api textedit">
                        <span class="button-text">Test Text Edit</span>
                    </div>
                </div>
                <div class="ps-dialog-close-button">
                    <div id="ps-dialog-close-modal" class="ps-dialog-close-modal">X</div>
                </div>
            </div>
            <div id="psd-wrapper">
                <div id="psd-col1" class="column1">
                    <div id="text-adjust"></div>
                </div>
                <div id="psd-col2" class="column2">
                    <div id="background-replace"></div>
                </div>
            </div>
            <div class="ps-dialog-area ps-dialog-controls">
                <div id="psdstatus" class="button psdstatus">
                    <span class="button-text">Check PSD Status</span>
                </div>
            </div>    
        </div>
    </dialog>`;


    // do more stuff here
    await initAWS();

    // image actions
    const statusButton = block.querySelector(".check-status");
    statusButton.addEventListener('click', async () => {
        pollJobStatus();
    });
    const renditionBtn = block.querySelector("#renditions");
    renditionBtn.addEventListener('click', () => {
        renditions();
    });
    const cropBtn = block.querySelector("#crop");
    cropBtn.addEventListener('click', () => {
        productCrop();
    });
    const maskBtn = block.querySelector("#imageMask");
    maskBtn.addEventListener('click', () => {
        imageMask();
    });
    const rbgBtn = block.querySelector("#removeBg");
    rbgBtn.addEventListener('click', async () => {
        removeBg();
    });
    const closeModalBtn = block.querySelector(".ps-dialog-close-modal");
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    })
    // end image actions

    const psdTestBtn = block.querySelector("#psdtest");
    psdTestBtn.addEventListener('click', async () => {
        const presigned = await getPresignedURL('getObject', testPsd);
        console.log(presigned);
    });
    const editTextBtn = block.querySelector("#textedit");
    editTextBtn.addEventListener('click', async () => {
        editTextLayer();
    });
    const psdLayerBtn = block.querySelector("#psdlayers");
    psdLayerBtn.addEventListener('click', async () => {
        getLayerInfo();
    });
    const psdStatusBtn = block.querySelector("#psdstatus");
    psdStatusBtn.addEventListener('click', () => {
        checkLayerInfoStatus();
    });
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
    //console.log(psAssetJSON);
    //console.log(psAssetJSON.repositoryMetadata);
    psAssetFormat = psAssetJSON.repositoryMetadata['dc:format'];
    // --> image/vnd.adobe.photoshop
    psAssetName = getAssetName(psAssetJSON);
    psAssetTitle = getAssetTitle(psAssetJSON);
    document.querySelector("#ps-dialog-title").textContent = psAssetTitle;
    downloadUrl = await getDownloadUrl(psAssetId, psAssetName);
    psUploadUrl = await getPresignedURL('putObject', 'psapi.jpg');

    //get asset type and adjust what loads
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

async function getPresignedURL(type, fileName) {
    //const filePath = 'psapi.jpg'; 

    const bucketName = 'psapibucket'; 
    if (!s3) {
        await initAWS();
    }
    var params = {
        Bucket: bucketName,
        Key: fileName, //path the uploaded file will live in
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
            const result = await getPresignedURL('getObject', 'psapi.jpg');
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
            const result = await getPresignedURL('getObject', 'psapi.jpg');
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
    //if (psAssetFormat == "image/vnd.adobe.photoshop") {
    // testing
    const testFormat = "image/vnd.adobe.photoshop";
    if (testFormat == "image/vnd.adobe.photoshop") {
        dialog.querySelector(".psd-functions").classList.remove('hidden');
        await getLayerInfo();

    } else {
        dialog.querySelector(".image-functions").classList.remove('hidden');
        appendImgToRoot(downloadUrl, false);
    }
    dialog.showModal();
}

function closeModal() {
    const dialog = document.querySelector('.gmo-photoshop.block dialog');
    // clear stuff here
    dialog.close();
}

async function getLayerInfo() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/pie/psdService/documentManifest';
    const storageType = 'external';
    //console.log(psUploadUrl);
    const getPsdURL = await getPresignedURL('getObject', testPsd);
    //const putPsdURl = await getPresignedURL('putObject', '')
    const inputs = {
        'inputs': [
            {
            'storage': storageType,
            'href': getPsdURL // must be public
            }
        ],
        'options': {
            'thumbnails': {
                'type': 'image/jpeg'
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
    const checkBtn = document.querySelector("#psdstatus");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "layerinfo";
    checkBtn.dataset.completed = "false";
}

async function checkLayerInfoStatus() {
    const statusBtn = document.querySelector("#psdstatus");
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
    const output = responseJson.outputs[0];
    console.log(output.status);
    console.log(output.layers);
    output.layers.forEach((layer) => {
        console.log("layer name: " + layer.name)
        console.log("layer thumbnail: " + layer.thumbnail)
        console.log("layer children: " + layer.children)
        // get the thumbnail for a child's smart object?
        // get any text layers and display. how do we do textupdate?
    
    })
    

    if (operation == "layerinfo") {
        if (output.status == 'succeeded') {
            //shrinkOriginal();
            //const result = await getPresignedURL('getObject', 'psapi.jpg');
            //const responseBlob = await fetch(result).then(response => {
            //    return response.blob();
            //});
            //const resultImg = await base64Encode(responseBlob);
            //appendImgToRoot(resultImg, true);
            statusBtn.dataset.completed = "true";
            console.log('good result');
            document.querySelector(".loader").classList.add('hidden');
            document.querySelector(".psd-functions .control-rail.hidden").classList.remove('hidden');
            document.querySelector("#psd-wrapper").classList.remove('hidden');

            output.layers.forEach((layer) => {
                console.log("layer name: " + layer.name)
                console.log("layer thumbnail: " + layer.thumbnail)
                console.log("layer children: " + layer.children)
                // get the thumbnail for a child's smart object?
                // get any text layers and display. how do we do textupdate?
                // handle text layer manipulation
                const textEditArea = document.querySelector('#text-adjust');
                const bgEditArea = document.querySelector('#background-replace');
                const textLayers = layer.children.filter(child => child.type === "textLayer");
                const smartObjLayers = layer.children.filter(child => child.type === "smartObject");
                console.log(textLayers);

                smartObjLayers.forEach((layer) => {
                    console.log(layer.name);
                    //<textarea id="newtext" name="newtext" role="text2image" class="input" maxlength="1024" placeholder="Add your new text here"></textarea>
                    
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('thumbnail-wrapper');
                    wrapper.dataset.name = layer.name;
                    const buttonWrapper = document.createElement('div');
                    buttonWrapper.className = ('thumbnail-control-wrapper');
                    const uploadBtn = document.createElement('div');
                    uploadBtn.className = ('button upload-img');
                    uploadBtn.dataset.name = layer.name;
                    uploadBtn.dataset.action = "change";
                    uploadBtn.textContent = "Upload";
                    uploadBtn.addEventListener('click', (event) => {
                        console.log(event.target);
                        changeThumbnail(event.target);
                    })
                    const deleteBtn = document.createElement('div');
                    deleteBtn.className = ('button delete-img');
                    deleteBtn.dataset.name = layer.name;
                    deleteBtn.dataset.action = "delete";
                    deleteBtn.textContent = "Delete" // this isn't actually deleting, the layer is being hidden
                    deleteBtn.addEventListener('click', (event) => {
                        console.log(event.target);
                        deleteThumbnail(event.target);
                    })
                    const thumbnail = document.createElement('img');
                    thumbnail.src = layer.thumbnail;
                    thumbnail.id = layer.name;
                    thumbnail.name = layer.name;
                    wrapper.appendChild(thumbnail);
                    buttonWrapper.appendChild(deleteBtn);
                    buttonWrapper.appendChild(uploadBtn);
                    wrapper.appendChild(buttonWrapper);
                    bgEditArea.appendChild(wrapper);
                    /*const textInput = document.createElement('textarea');
                    textInput.id = layer.name;
                    textInput.name = layer.name;
                    textInput.classList.add('textinput');
                    textInput.placeholder = layer.text.content;
                    textInput.dataset.original = layer.text.content;
                    textEditArea.appendChild(textInput);
                    */
                })

                textLayers.forEach((layer) => {
                    //<textarea id="newtext" name="newtext" role="text2image" class="input" maxlength="1024" placeholder="Add your new text here"></textarea>
                    const textInput = document.createElement('textarea');
                    textInput.id = layer.name;
                    textInput.name = layer.name;
                    textInput.classList.add('textinput');
                    textInput.placeholder = layer.text.content;
                    textInput.dataset.original = layer.text.content;
                    textEditArea.appendChild(textInput);
                })
            })
        }
    }
}

async function updateSmartObject() {
    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/pie/psdService/text';
    const storageType = 'external';
    const timestamp = Date.now();
    const resultFileName = 'textedit-' + timestamp + '.psd'
    const getPsdURL = await getPresignedURL('getObject', testPsd);
    const putPsdURL = await getPresignedURL('putObject', resultFileName)
    let layers = [];
    let count = 0;
    const imgInputs = document.querySelectorAll('.thumbnail-wrapper');
    console.log(imgInputs.length);
    imgInputs.forEach((input) => {
        const imgHide = input.dataset.delete; // dummy value
        if (imgHide) {

        }
        layers[count] = {
            'name': input.name,
            'text': {
                'content': input.value
            }
        }
        count++;
    })
    const inputs = {
        'inputs': [
            {
            'storage': storageType,
            'href': getPsdURL // must be public
            }
        ],
        'options': { layers },
        'outputs': [
            {
              'href': putPsdURl,
              'storage': storageType,
              'type': 'vnd.adobe.photoshop'
            }
        ]
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
}

async function deleteThumbnail() {
    //move up to wrpaper level
    const wrapper = '';
    wrapper.dataset.action = "delete";

}

async function changeThumbnail() {
    
    //update image source to new image
    //move up to wrpaper level
    const wrapper = '';
    wrapper.dataset.action = "change";


}

async function editTextLayer() {
    // get new text for each layer

    const token = await getPSToken();
    const apiUrl = 'https://image.adobe.io/pie/psdService/text';
    const storageType = 'external';
    //console.log(psUploadUrl);
    const timestamp = Date.now();
    const resultFileName = 'textedit-' + timestamp + '.psd'
    const getPsdURL = await getPresignedURL('getObject', testPsd);
    const putPsdURl = await getPresignedURL('putObject', resultFileName)
    // count # of text layers
    const textInputs = document.querySelectorAll('.textinput');
    console.log(textInputs.length);
    let layers = [];
    let count = 0;
    textInputs.forEach((input) => {
        layers[count] = {
            'name': input.name,
            'text': {
                'content': input.value
            }
        }
        count++;
    })
    console.log(layers);

    /*
        'options': {
            'layers':[
              {
                'name': "Sleepy Cats",
                "text": {
                    "content": "CHANGED TO NEW TEXT"
                }
              }
            ]
        },
    */
    const inputs = {
        'inputs': [
            {
            'storage': storageType,
            'href': getPsdURL // must be public
            }
        ],
        'options': { layers },
        'outputs': [
            {
              'href': putPsdURl,
              'storage': storageType,
              'type': 'vnd.adobe.photoshop'
            }
        ]
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
    const checkBtn = document.querySelector("#psdstatus");
    checkBtn.dataset.status = responseJson._links.self.href;
    checkBtn.dataset.operation = "layerinfo";
    checkBtn.dataset.completed = "false";
}