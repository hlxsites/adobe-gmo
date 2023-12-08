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
 * Client for managing HTTP interactions. Most notably, provides capabilities
 * for submiting HTTP requests and retrieving responses.
 * @private
 */
export default class HttpClient {
    /**
     * Submits an HTTP request, using the given options. They will
     * be passed as-is to the underlying http module.
     * @param {object} options Options for controlling how the request will
     *  behave.
     * @param {object} [retryOptions] Control how the method behaves.
     * @param {number} [retryOptions.retryCount] The number of times that the method will
     *  retry an HTTP request if it fails. Minimum value is 1, and indicates
     *  that requests should not be retried. Default: 1.
     * @param {number} [retryOptions.retryDelay] The amount of time, in milliseconds, that
     *  the method will exponentially back off after each retry.
     * @param {function} [retryOptions.retryFunction] If provided, will be called with a single status code argument whenever the request fails. If
     *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
     *  the error. Default: not provided.
     * @returns {HttpResponse} The response that the target server provided for
     * the request.
     */
    submitRequest(options: any, retryOptions?: {
        retryCount: number;
        retryFunction: Function;
    }): Promise<any>;
}
