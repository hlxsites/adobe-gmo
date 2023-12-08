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
/**
 * @module platform-connector
 */
/**
 * Object containing discovery root
 *
 * <p>Can be overwritten/updated by calling PlatformConnector.init</p>
 * <ul>
 *     <li><code>root</code> - discovery</li>
 * </ul>
 * @enum {string}
 * @readonly
 *  @namespace LinkLookup:DISCOVERY
 */
export declare const DISCOVERY: {
    root: string;
};
/**
 * Object map containing the key/value pairs for AEP-CS _links.
 * <p>Possible values include but are not limited to</p>
 * <p>Can be overwritten/updated by calling PlatformConnector.init</p>
 * <ul>
 *     <li><code>page</code> - http://ns.adobe.com/adobecloud/rel/page</li>
 *     <li><code>next</code> - next</li>
 *     <li><code>resolveId</code> - http://ns.adobe.com/adobecloud/rel/resolve/id</li>
 *     <li><code>resolvePath</code> - http://ns.adobe.com/adobecloud/rel/resolve/path</li>
 *     <li><code>ops</code> - http://ns.adobe.com/adobecloud/rel/ops</li>
 *     <li><code>metadata.repo</code> - http://ns.adobe.com/adobecloud/rel/metadata/repository</li>
 *     <li><code>metadata.app</code> - http://ns.adobe.com/adobecloud/rel/metadata/application</li>
 *     <li><code>metadata.embedded</code> - http://ns.adobe.com/adobecloud/rel/metadata/embedded</li>
 *     <li><code>rendition</code> - http://ns.adobe.com/adobecloud/rel/rendition</li>
 *     <li><code>path</code> - http://ns.adobe.com/adobecloud/rel/path</li>
 *     <li><code>acPolicy</code> - http://ns.adobe.com/adobecloud/rel/ac/policy</li>
 *     <li><code>id</code> - http://ns.adobe.com/adobecloud/rel/id</li>
 *     <li><code>acCheck</code> - http://ns.adobe.com/adobecloud/rel/ac/check</li>
 *     <li><code>repository</code> - http://ns.adobe.com/adobecloud/rel/repository</li>
 *     <li><code>primary</code> - http://ns.adobe.com/adobecloud/rel/primary</li>
 *     <li><code>acEffective</code> - http://ns.adobe.com/adobecloud/rel/ac/effective</li>
 *     <li><code>create</code> - http://ns.adobe.com/adobecloud/rel/create</li>
 *     <li><code>directory</code> - http://ns.adobe.com/adobecloud/rel/directory</li>
 *     <li><code>discard</code> - http://ns.adobe.com/adobecloud/rel/discard</li>
 *     <li><code>download</code> - http://ns.adobe.com/adobecloud/rel/download</li>
 *     <li><code>version</code> - version-history</li>
 *     <li><code>blockUploadInit</code> - http://ns.adobe.com/adobecloud/rel/block/init</li>
 *     <li><code>blockTransfer</code> - http://ns.adobe.com/adobecloud/rel/block/transfer</li>
 *     <li><code>blockFinalize</code> - http://ns.adobe.com/adobecloud/rel/block/finalize</li>
 *     <li><code>blockDownload</code> - http://ns.adobe.com/adobecloud/rel/download</li>
 *     <li><code>searchableFields</code> - http://ns.adobe.com/adobeaemcloud/rel/aem/metadata/searchable-fields</li>
 * </ul>
 *
 * @enum {string}
 * @readonly
 * @namespace LinkLookup:LINK_NS
 */
export declare const LINK_NS: {
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
