"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoggableExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    log(e, r, defaultLevel) {
        let message;
        let level;
        let other;
        //Parse message
        if (!e.message && !e.name)
            message = 'Unknown Exception';
        else if (typeof e.message === 'string' || e.message instanceof String)
            message = e.message;
        else if (e.name)
            message = e.name;
        else if (e.message.errorObject)
            message = e.message.errorObject.message;
        else if (e.message.message && (typeof e.message.message === 'string' || e.message.message instanceof String))
            message = e.message.message;
        //Parse level
        if (e.message && e.message instanceof Object && e.message.level)
            level = e.message.level;
        else
            level = defaultLevel || 'error';
        if (e.message && e.message instanceof Object && e.message.other)
            other = e.message.other;
        this.logger.mainLog(message, level, r, e, other);
    }
}
exports.LoggableExceptionFilter = LoggableExceptionFilter;
