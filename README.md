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

## Updating Dependencies
To update the dependencies under [scripts/libs](scripts/libs) with newer versions:
1. Delete [scripts/libs](scripts/libs)
2. Update the dependencies in [package.json](package.json) under `dependencies` with the desired versions
3. Update the `copyDependencies` configuration to specify which files from the dependencies to copy.
   * `from` and `to` - patterns for [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/) so ti adheres to that format.
   * `fileInclude` - specifies which file to include as a `script` or `link` tag in [head.html](head.html) 
4. Run `npm run update-dependencies`, this will update the dependencies under [scripts/libs](scripts/libs) and add them to [head.html](head.html)
5. Run `sudo aem up` and test https://localhost.corp.adobe.com/ to make sure everything still works with the updated dependency versions.
6. Run `git add scripts/libs package.json`, `git commit -m "Update dependencies"` to commit the new updated dependencies.

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

* `download`: An asset or rendition has been downloaded.
  * `assetId`: ID of the asset that was downloaded.
  * `assetName`: Name of the asset that was downloaded.
  * `renditionName`: If present, the rendition that was downloaded.

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

* `search`: A search query has been executed.
  * `query`: Full text that was searched.

```
{
  ...
  detail: {
    query: 'adobe logo',
  }
  ...
}
```

* `facet`: Assets have been filtered by one or more facets. Filter information provided in the event's details will be a human-readable description of the facet value.
  * `previous`: Array of facet filters in place before they were changed.
  * `current`: Array of facet filters now in place.

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

* `infinite-scroll`: Additional data has been loaded into the infinite results block. This event does not provide custom details.
* `session-started`: A user has started a new session. "Session" is defined as the browser's session, which is active for as long as a given browser window is
  open. Opening a new browser window or browser tab will trigger a new session.
  * `email`: Email address of the user starting the session.
  * `displayName`: Full display name of the user starting the session.

```
{
  ...
  detail: {
    email: 'noreply@adobe.com',
    displayName: 'Test User',
  }
  ...
}
```


