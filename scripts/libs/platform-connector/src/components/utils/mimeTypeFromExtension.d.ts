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
 * Utility function to get a mimetype based on the file extension
 * <p>For example.</p>
 * <ul>
 *     <li>jpg ->  image/jpeg</li>
 *     <li>png -> image/png</li>
 *     <li>mp4 -> video/mp4</li>
 * </ul>
 * @param {string} ext
 * @return {string}
 */
export declare function getMimeTypeFromExtension(ext: any): string;
