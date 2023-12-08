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
import { XHRResponse } from '../utils/utils';
/**
 * Private Actions
 * DO NOT Export outside of api.
 * @private
 */
declare const actions: {
    /**
     * Sends a request using an HTTP client and the given parameters to build it.
     * @param {String} method - the request method (GET, POST etc)
     * @param {String} url - the URL where the request will be sent to
     * @param {Object} params - parameters for template
     * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
     * @param {Object} body - the body of the request
     * @param {Number} retryCount - the number of times the request should be retried before giving up. Minimum value is 1, and indicates
     *  that requests should not be retried. Default: 1.
     * @param {Function} retryFunction - if provided, will be called with a single status code argument whenever the request fails. If
     *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
     *  the error. Default: not provided.
     * @param {Object} customOptions - if provided, additional raw HTTP options to pass to the http client.
     * @returns {Promise<*>}
     */
    doFetchWithOptions: (method: string | undefined, url: string, params?: {}, customHeaders?: {}, body?: any, retryCount?: number, retryFunction?: Function, customOptions?: {}) => Promise<any>;
    /**
     * Sends a request using an HTTP client and the given parameters to build it.
     * @param {String} method - the request method (GET, POST etc)
     * @param {String} url - the URL where the request will be sent to
     * @param {Object} ims object with token and apiKey
     * @param {Object} params - parameters for template
     * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
     * @param {String}cacheMode - the cache mode to be used (default, no-cache, reload, force-cache, only-if-cached)
     * @param {Object} body - the body of the request
     * @param {Number} retryCount - the number of times the request should be retried before giving up. Minimum value is 1, and indicates
     *  that requests should not be retried. Default: 1.
     * @param {Function} retryFunction - if provided, will be called with a single status code argument whenever the request fails. If
     *  the function returns true then the process will continue retrying the request; otherwise it will stop retrying and throw
     *  the error. Default: not provided.
     * @returns {Promise<*>}
     */
    doFetch: (method: string | undefined, url: any, ims: any, params?: {}, customHeaders?: {}, body?: any, cacheMode?: string, retryCount?: number, retryFunction?: Function) => Promise<any>;
    doGet: (url: any, ims: any, params?: {}, customHeaders?: {}, cacheMode?: string, retryCount?: number, retryFunction?: () => void) => Promise<any>;
    doHead: (url: any, ims: any, params?: {}, customHeaders?: {}) => Promise<any>;
    doPost: (url: any, ims: any, params?: {}, customHeaders?: {}, payload?: any, cacheMode?: string, retryCount?: number, retryFunction?: Function | undefined) => Promise<any>;
    /**
     * handles usecase https://git.corp.adobe.com/pages/caf/api-spec/chapters/advanced/asynchronous_invocation.html
     */
    /**
     * @description: Do poll
     * @param {String} url - the URL where the request will be sent to
     * @param {Object} ims object with token and apiKey
     * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
     */
    doPoll: (url: any, ims: any, customHeaders?: {}) => Promise<any>;
    /**
     * handles usecase https://git.corp.adobe.com/pages/caf/api-spec/chapters/advanced/asynchronous_invocation.html
     */
    doPostAsync: (url: any, ims: any, params?: {}, customHeaders?: {}, payload?: any) => Promise<any>;
    doDelete: (url: any, ims: any, params?: {}, customHeaders?: {}, payload?: any) => Promise<any>;
    doPut: (url: any, ims: any, params?: {}, customHeaders?: {}, payload?: any) => Promise<any>;
    doPatch: (url: any, ims: any, params?: {}, customHeaders?: {}, payload?: any) => Promise<any>;
    /**
     * XHR POST call
     * @param {string} url
     * @param {Object} ims object with token and apiKey
     * @param {Object} params parameters for template
     * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
     * @param {ArrayBuffer} payload
     * @param {UploadOptions} options and callbacks for upload
     * @returns {Promise<*>}
     */
    doXhrPost: (url: any, ims: any, params: {} | undefined, customHeaders: {} | undefined, payload: null | undefined, options: any) => Promise<unknown>;
    /**
     * XHR POST call
     * @param {string} url
     * @param {Object} ims object with token and apiKey
     * @param {Object} params parameters for template
     * @param {Object} customHeaders - allow custom header for caller to be passed - i.e. content-type for different type of POST
     * @param {ArrayBuffer} payload
     * @param {Object} options and callbacks for upload
     * @returns {Promise<XHRResponse>}
     */
    doXhrPut: (url: any, ims: any, params: {} | undefined, customHeaders: {} | undefined, payload: null | undefined, options: any) => Promise<XHRResponse>;
};
export default actions;
