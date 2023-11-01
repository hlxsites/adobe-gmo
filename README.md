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

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## Updating Dependencies
To update the dependencies under [scripts/libs](scripts/libs) with newer versions:
1. Delete [scripts/libs](scripts/libs)
2. Update the dependencies in [package.json](package.json) under `dependencies` with the desired versions
3. Update the `copyDependencies` configuration to specify which files from the dependencies to copy.
   * `from` and `to` - patterns for [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/) so ti adheres to that format.
   * `fileInclude` - specifies which file to include as a `script` or `link` tag in [head.html](head.html) 
4. Run `npm run update-dependencies`, this will update the dependencies under [scripts/libs](scripts/libs) and add them to [head.html](head.html)
5. Run `hlx up` and test http://localhost:3000 to make sure everything still works with the updated dependency versions.
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


