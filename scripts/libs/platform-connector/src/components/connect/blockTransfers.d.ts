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
declare type BlockUploadOptions = {
    onAbortUpload?: Function;
    onCancel?: Function;
};
declare type BlockUpload = {
    state: string;
    options: BlockUploadOptions;
    id: string;
    discardAsset: string;
};
declare type XhrPut = {
    path: string;
    xhr: any;
};
/**
 *
 * Public class that manages Block Transfer state and xhr progress
 * for things like pause, resume, & cancel.
 * @public
 * @class
 *
 */
declare class BlockTransfers {
    _blockUploads: Array<BlockUpload>;
    xhrPuts: Array<XhrPut>;
    constructor();
    /**
     * Get the array of current block uploads (both active and paused)
     * @returns {module:platform-connector.BlockUploadInstance[]}
     */
    get blockUploads(): BlockUpload[];
    /**
     * Internal method to append a blockUploadInstance to the class array
     * @param {module:platform-connector.BlockUploadInstance} jobProps The object containing the properties for the job to resume (completed blocks, block transfer links, etc)
     * @returns {number} The index of the added job properties in the array
     */
    addBlockUpload(jobProps: any): number;
    /**
     * @param {Object} xhrWrapper Object with identifier and XMLHttpRequest
     * @param {string} xhrWrapper.path
     * @property {XMLHttpRequest} - xhrWrapper.xhr actual xhr call
     */
    addXhrPut(xhr: any): void;
    removeXhrPut(path: any): void;
    /**
     * Get the job properties for s submitted block upload
     * @param {string | number} identifier or array index of the job
     * @returns {module:platform-connector.BlockUploadInstance} The job properties for the specified job via defined interface
     */
    getBlockUpload(identifier: any): BlockUpload | null;
    /**
     * Returns whether the specified block upload is in a specified state
     * @param {string | number} identifier or array index of the job
     * @param {string} state string representation of the BlockUploadInstance state property
     * @returns {boolean} true if the job's state is PAUSED false for any other state value
     */
    blockUploadState(identifier: any, state: any): boolean;
    /**
     * Public method to initiate pausing a block upload job.
     * @param {string | number} id unique identifier for the upload job
     * @returns {boolean} true if the job is found, active and paused successfully
     */
    pauseBlockUpload(id: any): Promise<boolean>;
    /**
     * Public method to initiate resuming a block upload job
     * @param {string} id unique identifier for the upload job
     * @param {module:platform-connector.BlockUploadInstance} jobProps unique identifier for the upload job
     * @returns {Promise<IAsset>}
     */
    resumeBlockUpload(id: any, jobProps: any): Promise<{
        blockTransferResponses: import("../utils/utils").XHRResponse[];
        finalizeResponse: undefined;
        path: any;
    } | undefined>;
    /**
     * Public method to initiate cancelling a block upload
     * @param {string} id unique identifier for the upload job
     * @returns {boolean} true if the specified job was found and could be cancelled
     */
    cancelBlockUpload(id: any): Promise<boolean>;
    /**
     * Internal method to pause an upload quickly by interrupting the current block upload and immediately calling the onpause callback provided in the blockUploadInstance
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to pause
     * @returns {void}
     */
    _fastPauseUpload(blockUploadInstance: any): void;
    /**
     * Internal method to resume an upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to resume
     * @returns {Promise<Object>} the finalized asset once completed, or the partially uploaded asset if paused or interrupted
     */
    _resumeUpload(blockUploadInstance: any): Promise<{
        blockTransferResponses: import("../utils/utils").XHRResponse[];
        finalizeResponse: undefined;
        path: any;
    } | undefined>;
    /**
     * Internal method to get the array index of an upload job from it's unique identifier
     * @private
     * @param {string} id the identifier of the job to return position
     * @returns {number} the index position of the BlockUploadInstance with the matching identifer, -1 if not found
     */
    _getBlockUploadIndex(id: any): number;
    /**
     * Internal method to get the transfer link currently inflight for a block upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to check
     * @returns {string} the transfer link currently being uploaded against (null if not found)
     */
    _getBlockUploadUrl(blockUploadInstance: any): any;
    /**
     * Internal method to cancel an upload
     * @private
     * @param {module:platform-connector.BlockUploadInstance} blockUploadInstance reference to the BlockUploadInstance object in the internal array to cancel
     * @returns {boolean} Whether the job was successfully cancelled
     */
    _cancelUpload(blockUploadInstance: any): Promise<true | undefined>;
    /**
     * Internal method to validate a block upload object passed in matches implementation
     * @private
     * @param {object} obj to validate
     * @returns {boolean} Whether the object matches the implementation for BlockUpload interface
     */
    _validBlockUploadInstance(obj: any): boolean;
    /**
     * Remove an element from the internal array for job options
     * @private
     * @param {String} id of the job to cancel
     * @returns {number} the index position of the BlockUploadInstance with the matching identifer, -1 if not found
     */
    _removeBlockUploadById(id: any): boolean;
    /**
     * Remove an element from the internal array for job options
     * @private
     * @param {number} index the array index of the job to cancel
     * @returns {boolean} whether the index was valid and could the element in the array could be removed
     */
    _removeBlockUpload(index: any): boolean;
}
export declare const blockTransfers: BlockTransfers;
export {};
