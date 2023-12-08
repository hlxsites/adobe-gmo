/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2022 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/
import { XHRResponse } from './utils/utils';
/**
 * CreateResourceOptions
 * @typedef {Object} CreateResourceOptions - options
 * @property {boolean} intermediates - intermediates to add to url param
 * @property {string} respondsWith - option for responds with to add to url param
 * @property {string} contentType - content type to add to custom header
 */
declare type CreateResourceOptions = {
    intermediates?: boolean;
    respondWith?: string;
    contentType?: string;
};
declare type CacheMode = 'default' | 'force-cache';
/**
 * @class
 * @public
 * @description This is the primary export object for utilities methods accessing discovery, resolved resources (by path / id), paginated resource list,
 * permission, etc.<br/>NOTE: All methods take in an array of links, which are returned from the platform "_links". Then, the method grabs a necessary link based on
 * the look-up to access the proper resource based on HAL setup.<br/>
 * @example <caption>Use as a single connector</caption>
 * PlatformConnector.init({imsAccessToken, apiKey, platformUrl});
 * const discoveryData = PlatformConnector.getDiscovery();
 * @example <caption>Use as a single connector with extra header to be passed to platform for every call</caption>
 * PlatformConnector.init({imsAccessToken, apiKey, platformUrl, {x-special-header:'some-value'}});
 * const discoveryData = PlatformConnector.getDiscovery();
 * @example <caption>Use as a scoped object in case of multiple platform access</caption>
 * const myPlatform = PlatformConnector.init({imsAccessToken, apiKey, platformUrl});
 * const discoveryData = myPlatform.getDiscovery();
 */
export declare const PlatformConnector: {
    /**
     * Initialized the PlatformConnector ims object with necessary authorization details
     * @param {string} accessToken - An ims accesstoken from authentication. Basic Authorization header values are also supported.
     * @param {string} apiKey - A unique identifyer per application.
     * @param {string} platformUrl - Platform URL for entry point
     * @param {string} discoveryRoot - discovery root - pass null for default
     * @param {object} [linkNS={}] - link namespace for lookup - this can be partially overwritten.
     * @param {object} customHeader - extra header to be passed with every call except discovery
     * @param {object} logger - optional logger used throughout various PlatformConnector methods. The supplied logger
     *  must define methods info(), debug(), warn(), and error(). By default if no logger is supplied, logging output
     *  will be ignored.
     * @return {object} cloned object of PlatformConnector
     */
    init: ({ accessToken, apiKey, platformUrl, discoveryRoot, linkNS, customHeader, logger, }: {
        accessToken: any;
        apiKey: any;
        platformUrl: any;
        discoveryRoot: any;
        linkNS?: {} | undefined;
        customHeader?: {} | undefined;
        logger: any;
    }) => any;
    /**
     * @private
     */
    _ims: {
        accessToken: undefined;
        apiKey: undefined;
        platformUrl: undefined;
    };
    /**
     * @private
     */
    _discoveryRoot: string;
    /**
     * @private
     */
    _linkNS: {
        page: string;
        next: string;
        resolveId: string;
        resolvePath: string;
        ops: string;
        metadata: {
            repo: string;
            app: string;
            embedded: string;
            asset: string;
        };
        query: string;
        rendition: string;
        path: string;
        acPolicy: string;
        id: string;
        acCheck: string;
        repository: string;
        primary: string;
        acEffective: string;
        create: string;
        directory: string;
        discard: string;
        restore: string;
        download: string;
        version: string;
        blockUploadInit: string;
        blockTransfer: string;
        blockFinalize: string;
        blockDownload: string;
        searchableFields: string;
        collections: string;
    };
    /**
     * Base URL to resolve all relative links extracted from discovery
     * @private
     */
    _baseURL: string;
    /**
     * Custom Header to be passed with all calls except discovery
     * @private
     */
    _customHeader: {};
    /**
     * Format the ifMatch param based on asset type
     * @param source
     * @private
     */
    _formatIfMatch: (source: any) => {
        'if-match': any;
    } | {
        'if-match'?: undefined;
    };
    /**
     * Get initial discovery object (entry point)
     * @return {object} response JSON of discovery
     * @public
     */
    getDiscovery: () => Promise<any>;
    /**
     * Get federated discovery
     * @param discoveryJSON JSON from getDiscovery()
     * @param repoId ID of selected repo to perform further discovery
     * @returns {object} JSON for federated discovery if the link is available; otherwise, return the original discovery object
     */
    getFederatedDiscovery: (discoveryJSON: any, repoId: any) => Promise<any>;
    /**
     * Get resource from primary link
     * @param {object[]} link - links from base asset
     * @param {object} params - parameter based on template
     * @param {string} cacheMode - default or force-cache
     * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
     * @public
     */
    getResource: (link: any, params: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Get resource from resolvePath link
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object} params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
     * @param {string} cacheMode - default or force-cache
     * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
     */
    getResourceByPath: (discoveryLink: any, params: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Get resource from resolveId link
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object} params - parameter based on template for resolveId - do getDiscovery to check link template
     * @param {string} cacheMode - default or force-cache
     * @return {(object | binary)} Returns JSON response for folders. Returns binary data for Files & Composites
     */
    getResourceById: (discoveryLink: any, params: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Get the links for a resource via its path
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
     * @return {object} - Object containing all the resouce links
     */
    getLinksByPath: (discoveryLink: any, params: any) => Promise<any>;
    /**
     * Get the links for a resource via its id
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param params - parameter based on template for resolveId - do getDiscovery to check link template ?repositoryId,id,rel_type
     * @return {object} - Object containing all the resouce links
     */
    getLinksById: (discoveryLink: any, params: any) => Promise<{}>;
    /**
     * Get the unaltered response for a head call at path
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
     * @return {object} - Unaltered Head response.
     */
    getHeadByPath: (discoveryLink: any, params: any) => Promise<any>;
    /**
     * @deprecated on 8/18/2022 v2.0.1
     * Duplicate implementation {@see getHeadByPath}
     *
     * Checks if a Resource Exists by its path
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param params - parameter based on template for resolvePath - ?repositoryId,path,rel_type
     * @return {object} - Object containing all the resouce links
     */
    checkResourceExistsByPath: (discoveryLink: any, params: any) => Promise<any>;
    /**
     * Checks if a Resource Exists by its id
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param params - parameter based on template for resolveId - do getDiscovery to check link template ?repositoryId,id,rel_type
     * @return {object} - Object containing all the resouce links
     */
    checkResourceExistsById: (discoveryLink: any, params: any) => Promise<any>;
    /**
     * Expose templating logic for client use.
     * @param {string} linkHrefWithTemplate - Url with a template. See https://datatracker.ietf.org/doc/html/rfc6570
     * @param {object} templateParams - object containing the values to fill in for the template ie.  {includeCreatedByMe: true}
     * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'HEAD'} [method]
     * @param {object} [customHeaders] - additional headers to apply
     * @param {object} [payload] - the body of the request
     * @returns {Promise<object>} - Promise of response object from fetch
     */
    applyLinkTemplate: (linkHrefWithTemplate: any, templateParams: any, method: string | undefined, customHeaders: any, payload: any) => Promise<any>;
    /**
     * Get pagination list of child resource under this resource (typically folder)
     * @param {object[]} link - links of the current resource to get child resource list
     * @param {object} params - parameters to be used to fill template (see platform doc)
     * @param {boolean} first - true for first page
     * @param {string} cacheMode - default or force-cache
     * @return {Promise<object>} Response for page call
     */
    getPage: (link: any, params?: {}, first?: boolean, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Get permission based on resource link
     * @param {object[]} link - links from base asset
     * @return {object} JSON representing permission
     */
    getPermission: (link: any) => Promise<any>;
    /**
     * Fetch a rendition of an asset. Convert binary into an ObjectUrl the client can use.
     * @param {object[]} link - links from base asset
     * @param {Object} params based on template {;page size type}
     * @param {boolean} [isBlockURL=false] - true if it is uses rendition block URL
     * @param {string} cacheMode - :default or force-cache
     * @return {string} - a url the client can use to render rendition
     */
    getRendition: (link: any, params: any, cacheMode?: CacheMode, isBlockURL?: boolean) => Promise<string>;
    /**
     * Fetch an asset repository metadata
     * @param {object[]} link - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - json object containing the assets repo metadata
     */
    getRepoMetadata: (link: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * @deprecated since version 2.9.0 use {@link #getAssetMetadata} instead
     * Fetch an asset embedded metadata
     * @param {object[]} link - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - response of this asset application embedded request
     */
    getEmbeddedMetadata: (link: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * @deprecated since version 2.9.0 use {@link #getAssetMetadata} instead
     * Fetch an asset application metadata
     * @param {object[]} link - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - response of this asset application metadata request
     */
    getApplicationMetadata: (link: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Fetch an asset metadata: including application metadata and embedded metadata
     * @param {object[]} link - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - response of this asset application metadata request
     */
    getAssetMetadata: (link: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * @deprecated since version 2.9.0 use {@link #setAssetMetadata} instead
     * Sets the value of an application metadata with given name for a specific asset.
     * The etag of the application metadata resource is required.
     * @param {Object} links - links from base asset
     * @param {string} name - the name of the application metadata to set
     * @param {string|Array<string>} value - the new value of the given application metadata, can be an array of strings as well
     * @param {string} etag - the application metadata resource etag
     * @return {Response} platform's response to the set app metadata request
     * @throws exception when the response status code is >=400
     */
    setApplicationMetadata: (links: any, name: any, value: any, etag: any) => Promise<any>;
    /**
     * @deprecated since version 2.9.0 use {@link #setAssetMetadataBulkOperation} instead
     * Sets multiple metadata values of an application metadata with given name for a specific asset.
     * The etag of the application metadata resource is required.
     * @param {Object} links - links from base asset
     * @param {Object[]} changes - array of changes with name, and value
     * @param {string} etag - the application metadata resource etag
     * @return {Response} platform's response to the set app metadata request
     * @throws exception when the response status code is >=400
     */
    setApplicationMetadataBulkOperation: (links: any, changes: any, etag: any) => Promise<any>;
    /**
     * Sets the value of an asset application metadata or embedded metadata.
     * The etag of the application metadata resource is required.
     * @param {Object} links - links from base asset
     * @param {string} name - the name of the application metadata to set
     * @param {string|Array<string>} value - the new value of the given application metadata, can be an array of strings as well
     * @param {string} etag - the application metadata resource etag
     * @return {Response} platform's response to the set app metadata request
     * @throws exception when the response status code is >=400
     */
    setAssetMetadata: (links: any, name: any, value: any, etag: any) => Promise<any>;
    /**
     * Sets an asset multiple application metadata and/or embedded metadata.
     * The etag of the application metadata resource is required.
     * @param {Object} links - links from base asset
     * @param {Object[]} changes - array of changes with name, and value
     * @param {string} etag - the application metadata resource etag
     * @return {Response} platform's response to the set app metadata request
     * @throws exception when the response status code is >=400
     */
    setAssetMetadataBulkOperation: (links: any, changes: any, etag: any) => Promise<any>;
    /**
     * add assets to a collection
     * @param {Object} links - links from base asset
     * @param {Array<string>} assetPaths - list of assetPaths
     * @return {Response} platform's response to the adding to collection
     * @throws exception when the response status code is >=400
     */
    addToCollection: (links: any, assetPaths: any) => Promise<any>;
    /**
     * remove assets from a collection
     * @param {Object} links - links from base asset
     * @param {Array<string>} assetPaths - list of assetPaths
     * @return {Response} platform's response to removing from collection
     * @throws exception when the response status code is >=400
     */
    removeFromCollection: (links: any, assetPaths: any) => Promise<any>;
    /**
     * Get the response of an embedded query
     * @param {object[]} links - links from base asset
     * @param {object} params - parameter based on template
     * @param {string} cacheMode - default or force-cache
     * @return {object} JSON object of the response of the embedded resources
     * @private
     */
    query: (links: any, params?: {}, cacheMode?: CacheMode) => Promise<any>;
    /**
     * @deprecated since version 3.1.0 use {@link #getMetadata} instead
     * Fetch all types of metadata of an asset using the query relation
     * @param {object[]} links - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - JSON object containing all types of assets metadata
     */
    getAllMetadata: (links: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Fetch all types of metadata of an asset using the query relation
     * @param {object[]} links - links from base asset
     * @param {string} cacheMode - default or force-cache
     * @return {object} - JSON object containing all types of assets metadata
     */
    getMetadata: (links: any, cacheMode?: CacheMode) => Promise<any>;
    /**
     * Fetch the version history for an asset
     * @param {object[]} link - links from base asset
     * @return {string} - JSON representation of the versions
     */
    getVersions: (link: any) => Promise<any>;
    /**
     * Fetch the searchable fields by AEM
     * @param {object[]} link - links from base asset
     * @return {string} - JSON representation of the searchable fields
     */
    getSearchableFields: (link: any) => Promise<any>;
    /**
     * Copy 1 or more resource(s) to a target folder
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object[]} sources - an array of source asset information with minimal format {repo:path [,repo:etag]}
     * @param {object} target - an object containing all the asset(directory) information from the platform
     * @param {string} repositoryId - repository ID
     * @return {object} JSON represent copy
     */
    copyResources: (discoveryLink: any, sources: any, target: any, repositoryId: any) => Promise<any>;
    /**
     * Rename 1 asset to a new name
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object[]} source - a single source asset information with minimal format {repo:path [,repo:etag]}
     * @param {string} newName to assign to asset
     * @param {string} repositoryId - repository ID
     * @return {object} JSON representing rename response
     */
    renameSingleResource: (discoveryLink: any, source: any, newName: any, repositoryId: any) => Promise<any>;
    /**
     * Move 1 or more resource(s) to a target folder
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object[]} sources - an array of source asset informaton with minimal format {repo:path [,repo:etag]}
     * @param {object} target - an object containing all the asset(directory) information from the platform
     * @param {string} repositoryId - repository ID
     * @returns {object} JSON represent move
     */
    moveResources: (discoveryLink: any, sources: any, target: any, repositoryId: any) => Promise<any>;
    /**
     * @description Poll for async processing process status until it is done
     * @param {string} uri - uri used to poll for checking processing status
     * @returns {Promise<Object>}
     */
    pollForProcessed: (uri: any) => Promise<any>;
    /**
     * @description Move 1 or more resource(s) to a target folder.
     * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
     * @param {object[]} discoveryLinks - links from discovery including operation URI
     * @param {object[]} sources - an array of source assets with metadata like {repo:path [,repo:etag]}
     * @param {object} target - an object containing the target asset(directory) information
     * @param {string} repositoryId - repository ID
     * @returns {Promise<Object>}
     */
    move: (discoveryLinks: any, sources: any, target: any, repositoryId: any) => Promise<any>;
    /**
     * @description Copy 1 or more resource(s) to a target folder
     * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object[]} sources - an array of source asset information with minimal format {repo:path [,repo:etag]}
     * @param {object} target - an object containing all the asset(directory) information from the platform
     * @param {string} repositoryId - repository ID
     * @return {object} JSON represent copy
     */
    copy: (discoveryLinks: any, sources: any, target: any, repositoryId: any) => Promise<any>;
    /**
     * @description Discard 1 or more resource(s) - These can be restored via the api:restore link.
     * The POST response as 200 or 202 will be passed to the client to handle to suit their need.
     * @param {object[]} discoveryLinks - links from discovery including operation URI
     * @param {object[]} targets - an array of target assets with metadata like {repo:assetId [,repo:etag]}
     * @param {string} repositoryId - repository ID
     * @param {boolean} forceOperation - set true to discard the asset even if published or referenced
     * @returns {Promise<Object>}
     */
    discard: (discoveryLinks: any, targets: any, repositoryId: any, forceOperation?: boolean) => Promise<any>;
    /**
     * Discard a single resource - It can be restored via the api:restore link.
     * @param {Object} links - links from base resource
     * @param {string} repositoryId - repository ID
     * @return {Response} platform's response to the discard request
     * @throws exception when the response status code is >=400
     */
    discardSingleResource: (links: any, repositoryId: any) => Promise<any>;
    /**
     * Discard 1 or more resource(s) - These can be restored via the api:restore link.
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
     * @param {string} repositoryId - repository ID
     * @param {boolean} forceOperation - set true to discard the asset even if published or referenced
     * @return {JSON} represent discard
     */
    discardResources: (discoveryLink: any, targets: any, repositoryId: any, forceOperation?: boolean) => Promise<any>;
    /**
     * Delete 1 or more resource(s) - These can NOT be restored.
     * @param {object} discoveryLink - links from discovery for ops
     * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
     * @param {string} repositoryId - repository ID
     * @param {boolean} optionalPayload.recursive - specify whether deletion will recursively delete a folders with children
     * @param {boolean} optionalPayload.forceOperation - set true to discard the asset even if published or referenced
     * @return {JSON} represent discard
     */
    deleteResources: (discoveryLink: any, targets: any, repositoryId: any, recursive?: boolean, forceOperation?: boolean) => Promise<any>;
    /**
     * Restore 1 or more resource(s)
     * @param {object} discoveryLink - links from discovery for ops
     * @param {object[]} targets - an array of objects containing all assets information from the platform {repo:assetId [,repo:etag]}
     * @param {string} repositoryId - repository ID
     * @return {Response} api response
     */
    restoreResources: (discoveryLink: any, targets: any, repositoryId: any) => Promise<any>;
    /**
     * Generate packages(s) for the selected assets
     * @param {object[]} discoveryLink - links from discovery for ops
     * @param {string} repositoryId - repository ID
     * @param {object[]} resources - an array of resource asset information with minimal format {repo:path}
     * @param {string} packageName - a preferred package name. Default is null
     * @return {object} JSON represent package response
     */
    packageResources: (discoveryLink: any, repositoryId: any, resources: any, packageName?: string | undefined) => Promise<any>;
    /**
     * Create folder as a child of current node
     * @param {object[]} link - links from current node
     * @param {string} path - path to be created (/ can be used as a delimiter for creating nested folders)
     * @return {object} response object
     */
    createFolder: (link: any, path: any) => Promise<any>;
    /**
     * Create a resource as a child of current node with a given string payload.
     * The current use case for this is for creating settings like metadata forms.
     * @param {object[]} links - links from current node
     * @param {string} path - path to be created (/ can be used as a delimiter for creating nested folders)
     * @param {any} payload - body content for POST request
     * @param {CreateResourceOptions} options - optional headers and query parameters
     * @return {object} response object
     */
    createResource: (links: any, path: any, payload: any, options?: CreateResourceOptions) => Promise<any>;
    /**
     * Updates a resource's content to a given string payload.
     * The current use case for this is for updating already existing settings like metadata forms.
     * @param {object[]} links - links from the resource node
     * @param {any} payload - the resource's new content json object
     * @return {object} response object
     */
    updateResource: (links: any, payload: any) => Promise<any>;
    /**
     * UploadOptions
     * @typedef {Object} module:platform-connector.UploadOptions - options
     * @property {string} targetDirectory - path to the target dir: e.g. '/content/dam/uploadFolder'
     * @property {string} relativeTargetDirectory - relative path to the target dir: e.g. 'uploadFolder'
     * @property {string} type - File type, ie image/png
     * @property {number} blockSize - Optional param to set size of binary block for large uploads. If omitted, each block size is 5242880 bytes
     * @property {number} blockRetries  - Number of retries to perform on a filed block upload.  Default is 3
     * @property {function} onProgress - Callback function to monitor the upload's progress
     * @property {function} onPause - Callback for when an upload is puased (note, the pausing of an item happens in the BlockTransfers.pauseBlockUpload public method
     * @property {function} onCancel - Callback for when an upload is canceled (note, the canceling of an item happen in the BlockTransfers.cancelBlockUpload
     * @property {function} onResume - Callback for when an upload is resumed (note, the resuming of an item happens in the BlockTransfers.resumeBlockUpload
     * @property {function} onAbortUpload - Callback for when an upload is cancelled or failed for any reasons
     * @property {boolean} update - True if updating an asset, ie creating a new version.
     * @property {Object} [blockUploadPayloadForRelType] - json object containing the payload format for "reltype".
     * @property {module:platform-connector.UpdateOptions} updateOptions - Required set of options when doing updates to files. ie creating a new version.
     */
    /**
     * UpdateOptions
     * @typedef {object} module:platform-connector.UpdateOptions - options
     * @property {string} ifMatch - an assets etag
     * @property {string} type - mimeType
     * @property {number} byteLength - the file size
     * @property {string} updateName - new name for the update
     * @property {object} links - asset links for the asset to update
     */
    /**
     * Entry to begin uploading a file.  This has various subroutines depending on `UploadOptions` and the
     * size of the file.  Files smaller then 5242880 will be uploaded directly.  Files larger will be uploaded in segments called blockUpload.
     * This system first creates a zero-byte file as a placeholder, and then subsequently uploads blocks of data to that placeholder until completion.
     * There are also callbacks in the UploadOptions for pausing, cancelling, and handling duplication.
     * @param {Object} links  links from base folder
     * @param {File} file - an actual File. ie https://developer.mozilla.org/en-US/docs/Web/API/File
     * @param {module:platform-connector.UploadOptions} options - Options for upload including callbacks for in-progress, canceling, pausing,
     * and necessary metadata in order to perform the upload
     * @return {Object } object with path.  If options.verbose is set to true, return response data.
     */
    uploadFile: (links: any, file: any, options: any) => Promise<{
        blockTransferResponses: XHRResponse[];
        finalizeResponse: undefined;
        path: any;
    } | {
        path?: string | undefined;
        createResponse?: any;
        initResponse?: any;
        transferDocument?: any;
        blockTransferResponses?: any;
        finalizeResponse?: any;
    } | undefined>;
    /**
     * @private
     * @param {module:platform-connector.UploadOptions} options
     * @return {Object} preparedPayloadOnOptions
     */
    _prepareBlockUploadPayloadOnOptions: (options: any) => any;
    /**
     * BlockUploadInstance
     * @typedef {Object}  module:platform-connector.BlockUploadInstance - instance data
     * @property {string} id - unique id per block upload
     * @property {string} etag - the assets etag
     * @property {string} state - current state of the upload instance: PENDING, ACTIVE, PAUSING, PAUSED, CANCELING, CANCELED, RESUMING, FINISHED
     * @property {number} completedBlocks - number of successful upload blocks
     * @property {number} bytesRemaining - amount of bytes still remaining to be uploaded
     * @property {string} fileName - name of file
     * @property {number} blockSize - size of block
     * @property {Object} links - object of links
     * @property {module:platform-connector.UploadOptions} options - upload options
     * @property {string} discardAsset - a href to delete the asset if need. ie' canceled upload.
     */
    /**
     * @private
     * @param {string} createUrl
     * @param {object} file - A File object.
     * @param {module:platform-connector.UploadOptions} options
     * @return {module:platform-connector.BlockUploadInstance}
     */
    _blockUploadInit: (createUrl: any, file: any, options: any) => Promise<{
        id: string;
        etag: any;
        state: string;
        completedBlocks: number;
        bytesRemaining: any;
        fileName: any;
        blockSize: any;
        links: any;
        options: any;
        discardAsset: any;
        createResponse: any;
        initResponse: any;
        transferDocument: any;
    }>;
    /**
     * Execute block upload - This can be used to resume suspended upload
     * @param { module:platform-connector.BlockUploadInstance} blockUploadInstance - the specific upload instance
     * @return {Promise<Object>}
     */
    execBlockUpload: (blockUploadInstance: any) => Promise<{
        blockTransferResponses: XHRResponse[];
        finalizeResponse: undefined;
        path: any;
    } | undefined>;
    /**
     * @param {object[]} links - links for the asset to be downloaded
     * @returns {String} A download URL
     */
    downloadSingleResource: (links: any) => Promise<any>;
    /**
     * Retrieve an Asset's Access Control List (ACL)
     * @param {Object} links -  links from base folder
     */
    getACLPolicy: (links: any) => Promise<any>;
    /**
     * Update an Asset's Access Control List (ACL).  This is done with two operations. 1. merge 2. remove.
     * A list of valid principals needs to be provided.  A principal is a user or group id.
     * @param {Object} links  links from base folder
     * @param {Object[]} principals - A principal is a user or group that we will be updating there ACLs on.
     * @param {Object} principals[].id - The ims id of the user or group
     * @param {'read' | 'modify' | 'full' } permission - Three possible permissions
     * @param {'merge'|'remove'} op - Two possible operations.  'merge' or 'remove'.  Default 'merge'
     * @return {Promise<void>}
     */
    updateACLPolicy: (links: any, principals: any, permission: any, op?: string) => Promise<any>;
    /**
     * Checks whether the current user has the requested Privilege on the specified Resource of an Asset.
     * @param {Object} links
     * @param {Object} queryParams
     * @param {'read' | 'write' | 'delete' | 'ack' } queryParams.privilege - Required wich privilege to check.
     * @param {string} [queryParams.relation] - A relation can be specified to narrow down the check.  ie http://ns.adobe.com/adobecloud/rel/primary
     * @return {Promise<any>}
     */
    checkACL: (links: any, queryParams: any) => Promise<any>;
    /**
     * Returns the effective ACL for the currently logged in user.
     * @param {Object}links
     * @return {Promise<Object>} - An example would be {
     *   "*": ["ack", "read", "write"]
     * }
     */
    getACLEffective: (links: any) => Promise<any>;
};
export {};
