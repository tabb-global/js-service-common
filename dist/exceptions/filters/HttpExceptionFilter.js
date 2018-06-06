"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const LoggableExceptionFilter_1 = require("../LoggableExceptionFilter");
let HttpExceptionFilter = class HttpExceptionFilter extends LoggableExceptionFilter_1.LoggableExceptionFilter {
    constructor(logger) {
        super(logger);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(exception.getStatus())
            .send({
            status: 'failed',
            code: exception.getStatus(),
            errors: [
                exception.message.errorObject || this.getDefaultError(exception),
            ],
        });
        this.log(exception, ctx.getRequest(), 'info');
    }
    getDefaultError(exception) {
        let message;
        if (typeof exception.message === 'string' || exception.message instanceof String)
            message = exception.message;
        return {
            code: `E000${exception.getStatus()}`,
            message: message ? message : `${exception.message.error}: ${exception.message.message ? exception.message.message : null}`,
        };
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
