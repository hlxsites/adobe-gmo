/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2023 Adobe
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
 * LogLevel controls the output level.
 * This enum is exported and the consumers have to follow the log levels defined in this enum
 * @public
 */
export declare enum LogLevel {
    /**
     Defines the value of the type property of NONE. Use this level to suppress log messages.
     */
    NONE = -1,
    /**
     Defines the value of the type property of SEVERE. Use this level to log exceptions and other fatal errors.
     */
    SEVERE = 0,
    /**
     Defines the value of the type property of WARNING.
     */
    WARNING = 1,
    /**
     Defines the value of the type property of INFO.
     */
    INFO = 2,
    /**
     Defines the value of the type property of DEBUG.
     */
    DEBUG = 3,
    /**
     Defines the value of the type property of CONFIG. Use this level to log component creation.
     */
    CONFIG = 4,
    /**
     Defines the value of the type property of FINE. Use this level to log all calls to component public APIs.
     */
    FINE = 5,
    /**
     Defines the value of the type property of FINER. Use this level to log internal events like pinchToZoom and zoomIn, and warning messages for low level rendering or input handling.
     */
    FINER = 6,
    /**
     Defines the value of the type property of FINEST. Use this level to log rendering, mouse handling and other events which occur frequently.
     */
    FINEST = 7
}
/**
 * RequestDetailsForLoggerTemplate Interface . Interface for defining the shape of the <code>messageInfo</code> param
 * supplied to the Logger.log method
 */
interface RequestDetailsForLoggerTemplate {
    requestMethod: string;
    requestUrl: string;
    message: string;
    xRequestId?: string;
    responseStatus?: number;
    filledTemplate?: any;
}
/**
 * LoggerTemplate Interface . Interface for type checking the custom logger object supplied to the PC.init method
 * It checks if the custom logger object is an object and implements the log method .
 */
interface LoggerTemplate<T extends {
    message: string;
}> {
    log(level: LogLevel, messageInfo: T): void;
}
export declare const Logger: {
    /**
     * Logger type predicate . Type checking to check if the logger object has the log method implemented
     * @param {Object} value - Logger object
     * @private
     */
    isLogger: (value: any) => value is LoggerTemplate<RequestDetailsForLoggerTemplate>;
    /**
     *  Logger object
     *  It is set to the default no-op logger by default
     * @private
     */
    _logger: {
        log: (logLevel: LogLevel, messageInfo: RequestDetailsForLoggerTemplate) => void;
    };
    /**
     * Sets the logger that will capture/write logging output.
     * @param {LoggerTemplate<RequestDetailsForLoggerTemplate>} logger - logger object has implementation for method
     * <code>log(logLevel, messageInfo)</code> which accepts two parameters .
     * The param <code>logLevel</code> will follow the shape of the logLevel enum
     * and the <code>messageInfo</code> param follows the shape defined by the interface <code>RequestDetailsForLoggerTemplate</code>
     * @public
     */
    setLogger: (logger: LoggerTemplate<RequestDetailsForLoggerTemplate>) => void;
    /**
     * Logs based on the log method implementation of <code>Logger._logger</code>
     * @param {LogLevel} level The level of logging to output this trace at. For example: <code>Logger.INFO</code>.
     * It will follow the shape of the logLevel enum
     * @param {RequestDetailsForLoggerTemplate} messageInfo This contains info about the request details, and it's shape
     * is defined by the interface <code>RequestDetailsForLoggerTemplate</code>
     * @public
     */
    log: (level: LogLevel, messageInfo: RequestDetailsForLoggerTemplate) => void;
};
/**
 * @class
 *
 * <p>The Console Logger console logs events based on the logging level. LogLevel on the console logger is
 * set via the traceLevel param passed while instantiating the ConsoleLogger class. The Console Logger
 * can be used as the logger object by the consumer while initializing PlatformConnector</p>
 *
 * <p>The current traceLevel values are supported:</p>
 * <ul>
 * <li><code>NONE</code> - Suppresses the logging output.</li>
 * <li><code>SEVERE</code> - Logs exceptions and other fatal errors (any error that may mess up the output or render the viewer unusable).</li>
 * <li><code>WARNING</code> - Logs image load failures and other errors and alerts.</li>
 * <li><code>INFO</code> - Logs image load successes.</li>
 * <li><code>CONFIG</code> - Logs component creation.</li>
 * <li><code>FINE</code> - Logs all calls to component public APIs.</li>
 * <li><code>FINER</code> - Logs internal events like pinchToZoom and zoomIn, and warning messages for low level rendering or input handling.</li>
 * <li><code>FINEST</code> - Logs rendering, mouse handling and other events which occur frequently.</li>
 * </ul>
 *
 **/
export declare class ConsoleLogger {
    /**
    The current traceLevel of the ConsoleLogger class. For example: <code>Logger.INFO</code>.
     @private
     */
    traceLevel: number;
    constructor(traceLevel: any);
    /**
     * Outputs a string to the browser debug console at runtime if the specified loglevel is less than the current traceLevel
     *
     * @public
     *
     * @param {LogLevel} level The level of logging to output this trace at. For example: <code>Logger.INFO</code>.
     * It will follow the shape of the <code>LogLevel</code> enum
     * @param {Object} messageInfo This contains info about the log message
     * <p>
     *     messageInfo objects have properties:
     * </p>
     * <ul>
     *     <li>message - the log message supplied</li>
     * </ul>
     */
    log(level: LogLevel, messageInfo: {
        message: string;
    }): void;
}
export {};
