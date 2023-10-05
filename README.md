# Assets Distribution Portal

The Assets Distribution Portal allows authors to create custom yet performant search portals into their assets.  This allows companies to expose assets and their metadata to target users.
It is designed to help users find, download and share assets. Users can browse across assets using our card view and search using facets and filters. The portal is customizable so that companies can configure it with their own branding.

## Environments
- Preview: https://main--assets-distribution-portal--adobe.hlx.page/
- Live: https://main--assets-distribution-portal--adobe.hlx.live/

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

