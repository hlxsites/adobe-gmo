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
 * A customized error that allows errors generated by fetch to be similar
 * in structure to axios errors.
 *  @private
 */
export default class WrappedFetchError extends Error {
    forceSkip?: boolean;
    isAxiosError: boolean;
    response?: {
        status: boolean;
        headers?: any;
    };
    /**
     * Constructs a new wrapped error from a raw fetch error.
     * @param {*} fetchError Error generated by fetch.
     */
    static fromFetchError(fetchError: any): WrappedFetchError;
    /**
     * Constructs a new error that uses the given values.
     * @param {string} message Message to show with the error.
     * @param {number} [status] Status code of the error.
     * @param {object} [headers] HTTP headers to associate with the error.
     */
    constructor(message: any, status?: boolean, headers?: {});
}
