/*
import {
  createCollection, patchCollection,
} from '../scripts/collections.js';
*/
/*
const {
  createCollection,
  patchCollection,
} = require('../scripts/collections.js');
*/

const sdk = require('@adobe/aio-lib-events');

async function sdkTest() {

  const accessToken='eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDI0OTY5NDI5MTlfZTExNDY2MWItZTJjYi00MDQ0LWJmNGQtNzllNTQwMzliZDE5X3VlMSIsIm9yZyI6IjNFNjkyODE0NjM2QzUzQjYwQTQ5NUVDM0BBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiIxN2FmMjRmYWIxNWQ0NjVjYmU1Njk4NWU2MjA2NTdiZiIsInVzZXJfaWQiOiIxRTAzMUYzQzY0QjE4NUU5MEE0OTVGOUZAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIxRTAzMUYzQzY0QjE4NUU5MEE0OTVGOUZAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiJlOTNlMGIwMSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWRvYmVpb19hcGksb3BlbmlkLHJlYWRfY2xpZW50X3NlY3JldCxBZG9iZUlELGFkZGl0aW9uYWxfaW5mby5yb2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCIsImNyZWF0ZWRfYXQiOiIxNzAyNDk2OTQyOTE5In0.ORFg9nxcxDvLgMxsFujWCYoA9EQ3OI0t5hhjMUpSot8j8PjMFpbuRLG48Ya6XWnBNT00VRPKX2-GpRQDPchUKgJxPOnaSVkuBV7VVDxbnpu1UynKk-pf8KGSJSl5LDsIgeBXSiQUfZJvL5nwb0hqK9LRD8N502--7-ptOTrXOGdFoRenZWg0nnhYMKBFm9noNsUSAMKZX5IZTlDs64iGFu2fyKNn7BOhXaOXRJeVEMAqnYfT76GxvNwwQPY6b9L8NcfvuJfO2dbydLBde7t2jlbenQBlIxCBzdSOB9dJDZvZ5YB2C88p11Dd-RglbwOEAwoqZKQebS8egFCteUrLpg';
  const organizationId='3E692814636C53B60A495EC3@AdobeOrg';
  const xApiKey='a46bc643bcd1464dbac36ac28ea091d7';

  const journalURL='https://events-va6.adobe.io/events/organizations/1145351/integrations/547483/eaae03b1-5b5d-4a50-a227-c200f2befbd5';
  //initialize sdk
  //const client = await sdk.init(organizationId, xApiKey, accessToken, '<httpOptions>');
  const client = await sdk.init(organizationId, xApiKey, accessToken,['timeout:1000','retries:4']);

  console.log('Client');
  console.log(client);

// get the journaling observable
  const journaling = client.getEventsObservableFromJournal(journalURL, 'interval:10');
  // call methods
/*
  const subscription = journaling.subscribe({
    next: (v) => console.log(v), // Action to be taken on event
    error: (e) => console.log(e), // Action to be taken on error
    complete: () => console.log('Complete') // Action to be taken on complete
  });
*/
  const subscription = journaling.subscribe({
    next: (v) => processAsset(v), // Action to be taken on event
    error: (e) => console.log(e), // Action to be taken on error
    complete: () => console.log('Complete') // Action to be taken on complete
  });

  //console.log('subscription');
  //console.log(subscription);

  // To stop receiving events from this subscription based on a timeout
  //setTimeout(() => this.subscription.unsubscribe(), 1000);

}
function displayLine(){
  console.log('####################################################################################################');
}
async function processAsset(object) {
  //kount++;
  console.log('processAsset');
  displayLine();
  console.log('object');
  console.log(object);
  displayLine();
  console.log('object.event');
  console.log(object.event);
  displayLine();
  console.log('object.event.data.assetId');
  console.log(object.event.data.assetId);
  displayLine();
  console.log('object.event.data.assetMetadata');
  console.log(object.event.data.assetMetadata);
};

async function addToCollection()
{
/*

function

patchCollection(collectionId, etag, addOperation = '', deleteOperation = '')

Sample call from blocks/adp-add-to-collection-modal/adp-add-to-collection-modal.js

patchCollection(collectionId, etag, payload);


Collection TyroneQA in QA https://localhost.corp.adobe.com/qa/assets

collectionId
urn:cid:aem:ed65b1b6-b155-4639-ad96-36907e136a4f

etag
"910ac0bb-0000-0100-0000-657b52b80000"

addOperation
[
    {
        "value": {
            "id": "urn:aaid:aem:fedc4b56-99b5-4239-a51f-5aaec20073e8",
            "name": "Inline03_SkyRep_07.png",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    },
    {
        "value": {
            "id": "urn:aaid:aem:febe634d-e1a6-48f1-bb7d-dac60b89beb3",
            "name": "Firefly_Refresh_ref.mp4",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    },
    {
        "value": {
            "id": "urn:aaid:aem:feb1c403-c71f-43b9-8b99-b3bf559918cc",
            "name": "ADOGEN22104273-Social-SushiCat-Static-1080x1350.jpg",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    },
    {
        "value": {
            "id": "urn:aaid:aem:fe9b0a62-f1a8-4047-8e9e-14bb82b09dbc",
            "name": "AdobeFederal_AXSizzle_9x16_JC_090123_v2.mp4",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    },
    {
        "value": {
            "id": "urn:aaid:aem:fe7f6130-2968-47a8-a58e-1d97d82961a9",
            "name": "Jaguar_Pond_Thumb.png",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    }
]

*/

console.log(collectionSdk);

const collectionId ='urn:cid:aem:ed65b1b6-b155-4639-ad96-36907e136a4f';
const etag ='910ac0bb-0000-0100-0000-657b52b80000';
const addOperation =
[
    {
        "value": {
            "id": "urn:aaid:aem:fedc4b56-99b5-4239-a51f-5aaec20073e8",
            "name": "Inline03_SkyRep_07.png",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    },
    {
        "value": {
            "id": "urn:aaid:aem:febe634d-e1a6-48f1-bb7d-dac60b89beb3",
            "name": "Firefly_Refresh_ref.mp4",
            "type": "asset"
        },
        "path": "/items/-",
        "op": "add"
    }
];

//patchCollection(collectionId, etag, payload);
}

//addToCollection();

sdkTest();
