# Assets Distribution Portal

The Assets Distribution Portal allows authors to create custom yet performant search portals into their assets.  This allows companies to expose assets and their metadata to target users.
It is designed to help users find, download and share assets. Users can browse across assets using our card view and search using facets and filters. The portal is customizable so that companies can configure it with their own branding.

## Environments
- Preview: https://main--adobe-gmo--hlxsites.hlx.page/
- Live: https://main--adobe-gmo--hlxsites.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm test
```

## Local development setup

> **_NOTE:_** Users should be on Adobe Corp network for local development.

# macOS Instructions

1. Install the AEM cli `npm install -g @adobe/aem-cli`
    * If command fails with `EEXIST: file already exists`, then run `npm install -g --force @adobe/aem-cli`
2. Update your `/etc/hosts` file.  Add `localhost.corp.adobe.com` to the localhost line:
   ```
   127.0.0.1       localhost localhost.corp.adobe.com
   ```
3. Create a self-signed certificate:
   ```
   mkdir env
   openssl req -x509 -out env/server.crt -keyout env/server.key \
    -newkey rsa:2048 -nodes -sha256 \
    -subj '/CN=localhost.corp.adobe.com' -extensions EXT -config <( \
    printf "[dn]\nCN=localhost.corp.adobe.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost.corp.adobe.com\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
   ```
4. Open **Keychain Access** on the Mac, select **System** -> **Certificates** and drag and drop the `server.crt` file you created in the last step
   ![image](https://github.com/adobe/assets-distribution-portal/assets/2372994/4ed62c98-01de-4cc6-b14c-8cb4b837a7b7)
5. Double-click the cert in the list -> expand **Trust** and select "When using this certificate:" **Always Trust**
   ![image](https://github.com/adobe/assets-distribution-portal/assets/2372994/d6375f2d-8ffd-4636-aa1a-91f62b8dd76d)
6. Close **Keychain Access** so it saves the configurations
7. Create a file in the root of this project's directory called `.env`:
   ```bash
   AEM_TLS_CERT=env/server.crt
   AEM_TLS_KEY=env/server.key
   AEM_OPEN=/
   AEM_PORT=443
   ```
8. Now start the local aem cli (helix-cli) - note we use sudo so we can use port 443
   ```bash
   sudo aem up
   ```
9. Using Chrome browser, go to [https://localhost.corp.adobe.com](https://localhost.corp.adobe.com)
10. If you would also like to use Mozilla Firefox instead of Chrome then:
    1. Open Firefox
    2. Enter `about:config` in the address bar, hit `[Enter]`
    3. Click **Accept the Risk and Continue**
    4. In the search, enter `security.enterprise_roots.enabled` and set the value to true
    5. Restart Firefox and navigate to [https://localhost.corp.adobe.com](https://localhost.corp.adobe.com)

# Windows 11 Instructions

> **_NOTE:_** Ensure you have Git and Node.js installed before proceeding. Open CMD and enter `git --version` and `node --version` to verify intallation.

1. Open GitBash, and install the AEM cli `npm install -g @adobe/aem-cli`
    * If command fails with `EEXIST: file already exists`, then run `npm install -g --force @adobe/aem-cli`
2. Update your `C:\Windows\System32\drivers\etc\hosts` file using a text editor with administrator privileges.  Add `localhost.corp.adobe.com` to the localhost line:
   ```
   127.0.0.1       localhost localhost.corp.adobe.com
   ```
3. Create a self-signed certificate by entering the following four commands into GitBash:
   ```
   mkdir env

   printf "[dn]\nCN=localhost.corp.adobe.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost.corp.adobe.com\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth" > ext.conf

   openssl req -x509 -out env/server.crt -keyout env/server.key \
   -newkey rsa:2048 -nodes -sha256 \
   -subj "//CN=localhost.corp.adobe.com" -extensions EXT -config ext.conf \
   -days 1826

   rm ext.conf
   ```
   This will create the directory `C:\Users\(username)\env` that contains `server.crt` and `server.key`. Move the `env` folder to the root of this project's directory.
4. In the Start Menu, type `Manage computer certificates` and click to open the Local computer certificates storehouse. You will need admin permission to complete the process.
5. Navigate to Certificates – Local Computer > Personal > Certificates. This place stores all the local certificate that is created on the computer. Find the certificate you have created that contains `localhost.corp.adobe.com` in the `Issued To` and `Issued From` columns.
6. Next, on the left panel, expand Trusted Root Certification Authorities > Certificates. Drag and drop the local certificate and drop into this folder. You can also copy and paste it.
7. Create a file in the root of this project's directory called `.env` and use a text editor to modify its contents to the following:
   ```
   AEM_TLS_CERT=env/server.crt
   AEM_TLS_KEY=env/server.key
   AEM_OPEN=/
   AEM_PORT=443
   ```
8. Create a batch file to start the local aem cli (helix cli). Create a file on the desktop with the file extention `.bat` and use a text editor to modify its contents with the following, while making sure to change the directory in the `cd` command to the root directory of the project:
   ```
   @echo off
   %SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe -Command "Start-Process PowerShell -Verb RunAs -ArgumentList '-NoProfile', '-ExecutionPolicy Bypass', '-Command', 'cd Change-me-to-the-Root-Directory-of-the-Project; aem up --tls-cert env/server.crt --tls-key env/server.key'"
   ```
   Test your batch file. If all has been configured correctly, User Account Control prompt for permission to open Powershell as Administrator. Click yes. Powershell should then open and start the local aem cli.
9. Using Chrome browser, go to [https://localhost.corp.adobe.com](https://localhost.corp.adobe.com)
10. If you would also like to use Mozilla Firefox instead of Chrome then:
    1. Open Firefox
    2. Enter `about:config` in the address bar, hit `[Enter]`
    3. Click **Accept the Risk and Continue**
    4. In the search, enter `security.enterprise_roots.enabled` and set the value to true
    5. Restart Firefox and navigate to [https://localhost.corp.adobe.com](https://localhost.corp.adobe.com)

## Updating Dependencies
To update the dependencies under [scripts/libs](scripts/libs) with newer versions:
1. Delete [scripts/libs](scripts/libs)
2. Update the dependencies in [package.json](package.json) under `dependencies` with the desired versions
3. Update the `copyDependencies` configuration to specify which files from the dependencies to copy:
   * `from`, `to`, and `globOptions` - patterns for [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/) so it adheres to that format.
   * `fileIncludes` - specifies which js or css file(s) to include in [dependencies.json)[scripts/dependencies.json] - these get processed and loaded
   `script` or `link` tags during page load.
4. Update the `externalDependencies` configuration in [package.json](package.json) to specify external dependencies - supports js or css file urls to load
5. Run `npm run update-dependencies`, this will update the dependencies under [scripts/libs](scripts/libs) and add them to [dependencies.json)
6. Run `sudo aem up` and test https://localhost.corp.adobe.com/ to make sure everything still works with the updated dependency versions.
7. Run `git add scripts/libs package.json`, `git commit -m "Update dependencies"` to commit the new updated dependencies.

## Authentication
By default, users are redirected for IMS authentication. e.g. when you visit the base URL you will be prompted for IMS auth. e.g. https://main--assets-distribution-portal--adobe.hlx.page

## Events

The core portal code will emit certain events depending on user actions. When an event fires, it will invoke a provided callback with a single parameter:
javascript event information. The event data will contain a `detail` property with custom additional information for the event. There are two ways that
consumers can listen for these events:

1. (Recommended) Use the core library's functions and constants:

```
import { EventNames, addEventListener } from '/libs/scripts/events.js';

addEventListener(EventNames.DOWNLOAD, (e) => {
  console.log('Received download event with details', e.detail);
});
```

2. Without the core library's functions, if they're not available:

```
document.addEventListener('download', (e) => {
  console.log('Received download event with details', e.detail);
});
```

### Event Names

The following are valid event names, along with the `detail` data for each:

* `download`: One or more asset(s) or rendition(s) have been downloaded.
  * `downloads`: An array of information about each downloaded item. Each item in the array will have these properties:
    * `assetId`: ID of the asset that was downloaded.
    * `assetName`: Name of the asset that was downloaded.
    * `renditionName`: If present, the rendition that was downloaded.

```
{
  ...
  detail: {
    downloads: [{
      assetId: 'id-of-an-asset',
      assetName: 'My test asset.jpg',
    }, {
      assetId: 'id-of-another-asset',
      assetName: 'My other asset.jpg',
      renditionName: 'original'
    }]
  }
  ...
}
```

* `search`: A search query has been executed.
  * `query`: Full text that was searched.
  * `pageResultCount`: The number of results that are in the first page.
  * `pageIndex`: 0-index based number of the page, which will always be 0 (indicating the first page).
  * `pageSize`: The maximum number of results that are included on each page.
  * `totalResultCount`: The total number of results across all pages.

```
{
  ...
  detail: {
    query: 'adobe logo',
    pageResultCount: 19,
    pageIndex: 0,
    pageSize: 20,
    totalResultCount: 19,
  }
  ...
}
```

* `facet`: Assets have been filtered by one or more facets. Filter information provided in the event's details will be a human-readable description of the facet value.
  * `previous`: Array of facet filters in place before they were changed. Each item in the array will contain these properties:
    * `facet`: The name of the facet being filtered.
    * `value`: Value by which the facet is being filtered.
    * `label`: Human-readable label describing the facet filter, as it appears in the portal's UI.
    * `operator`: If present, the operator for the filter. For example, it might be `>=` or `<=` for date range filters.
  * `current`: Array of facet filters now in place. Each item in the array will contain the same properties as the `previous` property.

```
{
  ...
  detail: {
    previous: [
      'Tags - Wildlife Photography',
      'Modified >= 2023-10-23',
      'Modified <= 2023-10-26',
    ],
    current: [
      'Tags - Wildlife Photography',
      'Asset ID - asset-id',
      'Modified >= 2023-10-23',
      'Modified <= 2023-10-26',
    ],
  }
  ...
}
```

* `asset-quick-preview`: The dialog for quick viewing an asset's information has been opened.
  * `assetId`: ID of the asset that was previewed.
  * `assetName`: Name of the asset that was previewed.

```
{
  ...
  detail: {
    assetId: 'id-of-an-asset',
    assetName: 'My test asset.jpg',
  }
  ...
}
```

* `asset-detail`: The modal for an asset's full detail has been opened.
  * `assetId`: ID of the asset that was viewed.
  * `assetName`: Name of the asset that was viewed.

```
{
  ...
  detail: {
    assetId: 'id-of-an-asset',
    assetName: 'My test asset.jpg',
  }
  ...
}
```

* `search-paged`: An additional page worth of data has been loaded into the app's search results.
  * `pageResultCount`: The number of results that are in the new page.
  * `pageIndex`: 0-index based number of the page. For example, the first page is index 0, second page is index 1, etc.
  * `pageSize`: The maximum number of results that are included on each page.
  * `totalResultCount`: The total number of results across all pages.

```
{
  ...
  detail: {
    pageResultCount: 19,
    pageIndex: 5,
    pageSize: 20,
    totalResultCount: 59,
  }
  ...
}
```

* `session-started`: **_WARNING_: This event's detail contains Personally Identifiable Information (PII); please use care when consuming this event.** A user has started a new session. "Session" is defined as the browser's session, which is active for as long as a given browser window is
  open. Opening a new browser window or browser tab will trigger a new session.
  * `email`: Email address of the user starting the session.
  * `displayName`: Full display name of the user starting the session.
  * `authId`: Authorization ID of the user, as provided by IMS.

```
{
  ...
  detail: {
    email: 'noreply@adobe.com',
    displayName: 'Test User',
    authId: '1234567@AdobeID'
  }
  ...
}
```

* `share-link`: Sent whenever user clicks on Copy share Link.
  * `shares`: An array of information about each shared item. Each item in the array will have these properties:
    * `assetId`: ID of the asset that was shared.
    * `assetName`: Name of the asset that was shared.
```
{
  ...
  detail: {
    shares:[{
      assetId: 'id-of-an-asset',
      assetName: 'My test asset.jpg',
    }, {
      assetId: 'id-of-another-asset',
      assetName: 'My other asset.jpg',
    }]
  }
}

```
* `create-collection`: Sent when assets are added to new collection.    
   * `collectionName` : Collection name
   * `collectionId` : Collection Id
   * `assets` : Array of the collections assets. Each item in the array will contain the following:
        * `assetId`: ID of the asset that was shared.
        * `assetName`: Name of the asset that was shared.
```
{
  ...
  detail: {
    collectionName: 'Name of Collection',
    collectionId: 'id-of-collection',
    assets:[{
      assetId: 'id-of-an-asset',
      assetName: 'My test asset.jpg',
    }, {
      assetId: 'id-of-another-asset',
      assetName: 'My other asset.jpg',
    }]
  }
}

```
* `add-to-collection`: Sent when assets are added to an existing collection.    
   * `collectionName` : Collection name
   * `collectionId` : Collection Id
   * `assets` : Array of the assets that were added to the collection. Each item in the array will contain the following:
        * `assetId`: ID of the asset that was shared.
        * `assetName`: Name of the asset that was shared.
```
{
  ...
  detail: {
    collectionName: 'Name of Collection',
    collectionId: 'id-of-collection',
    assets:[{
      assetId: 'id-of-an-asset',
      assetName: 'My test asset.jpg',
    }, {
      assetId: 'id-of-another-asset',
      assetName: 'My other asset.jpg',
    }]
  }
}
```

* `delete-from-collection`: Sent when assets are deleted from an existing collection.    
   * `collectionName` : Collection name
   * `collectionId` : Collection Id
   * `assets` : Array of the assets that were deleted from the collection. Each item in the array will contain the following:
        * `assetId`: ID of the asset that was shared.
        * `assetName`: Name of the asset that was shared.
```
{
  ...
  detail: {
    collectionName: 'Name of Collection',
    collectionId: 'id-of-collection',
    assets:[{
      assetId: 'id-of-an-asset',
      assetName: 'My test asset.jpg',
    }, {
      assetId: 'id-of-another-asset',
      assetName: 'My other asset.jpg',
    }]
  }
}
```

* `delete-collection`: Sent when a collection is deleted.    
   * `collectionName` : Collection name
   * `collectionId` : Collection Id
```
{
  collectionName:'collection name',
  collectionId:'collection Id',
}
```


* `page-view`: A page has loaded on the site. This will be triggered by any action that loads a portal URL, including but not limited to: users typing one of the site's URLs into the browser address bar,
 users clicking links, users navigating to browser favorites, redirects to the site, etc. The event will be fired for _any_ page on the portal, including pages from individual implementations.
  * `url`: Full URL of the page that was loaded.

```
{
  ...
  detail: {
    url: 'https://main--adobe-gmo--hlxsites.hlx.page/#assetId=urn%3Aaaid%3Aaem%3Affe954d3-2a18-4c09-90ff-78e2973da522'
  }
  ...
}
```

* `select-all-items`: Sent whenever a user selects all asset items via the "Select All" checkbox. Only the loaded asset items (non-placeholders) contained in the infinite results container are selected.
  * `selection`: An array containing information of each item selected. Each item in the array will have the property:
    * `assetId`: ID of the asset that was selected.

```
{
  ...
  detail: {
    selections: {
      selectedItems: [
        assetId: 'id-of-an-asset'
      ]
    }
  }
  ...
}
```

* `deselect-all-items`: Sent whenever a user deselects all asset items via the "Select All" checkbox.
  * `selection`: An array containing information of each item still selected. Each item in the array will have the property:
    * `assetId`: ID of the asset that was selected.

```
{
  ...
  detail: {
    selections: {
      selectedItems: [
        assetId: 'id-of-an-asset'
      ]
    }
  }
  ...
}
```
