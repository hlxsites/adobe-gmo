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
import HttpHeaders from './HttpHeaders';
/**
 * @module platform-connector
 * @private
 */
/**
 * Represents the response of an HTTP request. Provides various accessors
 * for interacting with the response.
 *
 * Note that of the class's variable values,
 * only "headers" is guaranteed to remain unchanged. This means that, given
 * an HttpResponse instances, it's safe to directly use "httpResponse.headers".
 * @private
 */
export default class HttpResponse {
    rawResponse: any;
    headers: HttpHeaders;
    ok: boolean;
    status: number;
    /**
     * Constructs a new instance that will use the given dependencies to
     * provide its functionality.
     *
     * @param {*} rawResponse Object representing a raw response from the
     *  underlying http module. Is expected to have a "headers" and "data"
     *  field.
     * @private
     */
    constructor(rawResponse: any);
    /**
     * Retrieves the data of the response as JSON.
     * @private
     * @returns {object} Parsed JSON representation of the response's data.
     *  Will be empty (i.e. {}) if the response is not JSON.
     */
    json(): Promise<any>;
    /**
     * Retrieves the data of the response as text.
     * @private
     * @returns {string} Textual representation of the response's data.
     *  Will be empty (i.e. '') if the response is not text.
     */
    text(): Promise<any>;
    /**
     * Retrieves the data of the response as an array buffer.
     * @private
     * @returns {ArrayBuffer} ArrayBuffer representation of the response's data.
     *  Will be empty (i.e. []) if the response is not a buffer.
     */
    arrayBuffer(): Promise<any>;
}
