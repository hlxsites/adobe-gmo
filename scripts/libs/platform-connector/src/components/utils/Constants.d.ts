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
 * Utility object containing a number of useful constants.
 * <ul>
 *     <li><code>UPLOAD_STATE</code> - Object</li>
 *     <li><code>UPLOAD_BLOCKS</code> - Object</li>
 *     <li><code>DIRECTORY_TYPE</code> - application/vnd.adobecloud.directory+json</li>
 * </ul>
 * @namespace PlatformConnectorConstants
 */
export declare const PlatformConnectorConstants: {
    UPLOAD_STATE: {
        PENDING: string;
        ACTIVE: string;
        PAUSING: string;
        PAUSED: string;
        CANCELING: string;
        CANCELED: string;
        RESUMING: string;
        FINISHED: string;
    };
    UPLOAD_BLOCKS: {
        MIN_FILESIZE_FOR_BLOCKUPLOAD: number;
        UPLOAD_BLOCKSIZE: number;
        MIN_BLOCKSIZE_FOR_UPLOAD: number;
        UPLOAD_BLOCK_RETRY_DEFAULT: number;
    };
    DIRECTORY_TYPE: string;
    RESOURCE_TYPE: string;
    COLLECTION_TYPE: string;
    REPO_PATH: string;
};
