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
export interface XHRResponse {
    ok: boolean;
    json: () => any;
    headers: Headers;
    redirected: boolean;
    status: any;
    statusText: string;
    trailer: null;
    type: null;
    url: string;
    clone: null;
    body: null;
    bodyUsed: boolean;
    arrayBuffer: null;
    blob: null;
    text: () => Promise<string>;
    formData: null;
}
/**
 * Private utilities
 * DO NOT export
 * @private
 */
declare const utils: {
    /**
     *
     * @param {Object} ims
     * @return {{authorization: string, "x-api-key": *}}
     * @private
     */
    getAuthHeader: (ims: any) => {
        authorization: string;
        'x-api-key': any;
    };
    getHeader: (extraHeader: any, ims: any) => any;
    /**
     * Extends an existing URL's template so that it includes all parameters
     * in an object. Note that THIS IS A BAD PRACTICE. We're modifying a URL
     * provided by an API, which is explicitly forbidden. If a URL is missing
     * a supported parameter, _that is a bug in the API and should be fixed_.
     *
     * The only reason we're attempting to do this here is to support older
     * implementations of the API that were missing supported parameters in
     * templates.
     *
     * The method will assume that missing parameters should be added as
     * query parameters. If there is already a query parameter template,
     * missing parameters will be added to it; if there is no query
     * parameter template, one will be appended.
     *
     * @param {String} url URL whose template will be extended.
     * @param {object} params JSON object whose keys are the parameter names to
     *  be added.
     * @returns {String} Extended version of the URL.
     */
    extendTemplate: (url: any, param?: {}) => any;
    /**
     * Populates URL template parameters from a given URL.
     * @param {String} url URL whose template will be filled, if present.
     * @param {object} params JSON object of parameters to fill the template
     * @returns {String} URL with filled template
     * @private
     */
    fillTemplate: (url: any, params?: {}) => any;
    /**
     * Convert link from headers into _links format returned by GET to AEP resource
     * @param headers from HEAD call
     * @private
     */
    extractLinksFromHeaders: (headers: any) => {};
    /**
     * Find URL base on look-up key
     * @param link whole link map
     * @param key look-up key
     * @param baseURL to resolve relative link path
     * @returns {string} URL
     * @private
     */
    findLink: (link: any, key: any, baseURL?: string) => any;
    extractFileName: (path: any) => any;
    formatDirectoryPath: (path: any) => any;
    getErrorFromResponse: (response: any) => {
        status: any;
        statusText: any;
    };
    waitFor: (delay: any) => Promise<unknown>;
    returnXHRResponse: (xhr: any, method: any, resolve: any, reject: any, filledTemplate: any) => any;
};
export default utils;
