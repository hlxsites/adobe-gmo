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
 * Determines if an error qualifies for a retry.
 * @private
 * @param {*} e The error to examine.
 * @returns {boolean} True if a retry should occur, false otherwise.
 */
export declare function isRetryError(e: any): boolean;
/**
 * Converts an error from the underlying http module into a simple object
 * containing status code, message, and request id information.
 * @private
 * @param {*} e Error information to convert.
 * @returns {object} Simple object containing a "status", "statusText",
 *  and optional "requestId" element.
 */
export declare function getHttpErrorInfo(e: any): {
    status: number;
    statusText: string;
};
export declare type SubmitHttpRequestOptions = {
    retryCount?: number;
    retryDelay?: number;
    retryFunction?: Function | boolean;
};
/**
 * Generic method that submits an HTTP request. Has built-in functionality
 * for automatically retrying the request if it fails. Retries will back
 * off exponentially.
 * @private
 * @param {object} httpOptions Will be passed through as-is to the underlying
 *  HTTP module (axios).
 * @param {SubmitHttpRequestOptions} [options] Control how the method behaves.
 * @param {number} [options.retryCount] The number of times that the method will
 *  retry an HTTP request if it fails. Minimum value is 1, and indicates
 *  that requests should not be retried. Default: 3.
 * @param {number} [options.retryDelay] The amount of time, in milliseconds, that
 *  the method will exponentially back off after each retry. Default: 1000.
 * @param {function} [retryOptions.retryFunction] If provided, will be called with a single status code argument whenever the request fails. If
 *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
 *  the error. Default: not provided.
 */
export declare function submitHttpRequest(httpOptions: any, options?: SubmitHttpRequestOptions): Promise<any>;
