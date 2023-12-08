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
 * Provides operations for interacting with the headers of an HTTP response.
 */
export default class HttpHeaders {
    rawHeaders: any;
    /**
     * Constructs a new instance that will use the given parameters to
     * provide its functionality.
     * @private
     * @param {object} rawHeaders Raw headers, where keys are header names
     *  and values are header values.
     */
    constructor(rawHeaders: any);
    /**
     * Retrieves the value of a given header.
     *
     * @param {string} headerName The name of the header (case insensitive)
     *  to retrieve.
     * @returns {string} The value of the header, or an empty string if the
     *  header does not exist.
     */
    get(headerName: any): any;
    /**
     * Retrieves a value indicating whether a given header exists.
     *
     * @param {string} headerName The name of the header (case insensitive)
     *  to test.
     * @returns {boolean} True if the header is present, false otherwise.
     */
    has(headerName: any): boolean;
}
