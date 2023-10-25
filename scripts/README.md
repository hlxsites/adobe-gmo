# Scripts

## [collections.js](collections.js)
Example Polaris collections API usage:

Get:
```javascript
const collection = await getCollection('urn:cid:aem:994e4577-8a43-492d-ae98-05e33cb56e49');
console.log('Collection retrieved: ', collection);
```

List:
```javascript
const list = await listCollection();
console.log('Collection list: ', list);
```

Create:
```javascript
const items = [
  {
    id: 'urn:aaid:aem:1a034bee-ebda-4787-bad3-f924d0772b75',
    type: 'asset',
  },
  {
    id: 'urn:cid:aem:1a034bee-ebda-4787-bad3-f924d0772b75',
    type: 'collection',
  },
];
const createdCollection = await createCollection('Sample collection 71', 'Sample description 71', items);
console.log('Collection created: ', createdCollection);
```
Patch:
```javascript
const getCreatedCollection = await getCollection(createdCollection.id);
const path = '/items';
const value = [
  { id: 'urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123136', type: 'asset' },
  { id: 'urn:cid:aem:adc3c44e-224f-4fcd-92d1-8431537d385f', type: 'collection' },
];
const addOperation = { path, value };
await patchCollection(createdCollection.id, getCreatedCollection.etag, addOperation);
const patchedCollection = await getCollection(createdCollection.id);
console.log('patchedCollection retrieved: ', patchedCollection);
```

Delete:
```javascript
await deleteCollection(createdCollection.id);
```

## [link-share.js](link-share.js)
Example code:
```javascript
await getLink(linkId);
const requestBody = {
  assets: [{
    assetId: 'urn:aaid:aem:7590e3e3-77de-414d-b504-7d161a9598b6',
  }],
  collections: [{
    collectionId: 'urn:cid:aem:7590e3e3-77de-414d-b504-7d161a9598b6',
  }],
  title: 'Sample link',
  access: 'restricted',
};
await createLink(requestBody);
await listLinks();
```