"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const LoggerService_1 = require("../../logging/LoggerService");
const LoggableExceptionFilter_1 = require("../LoggableExceptionFilter");
const MongooseValidationErrorFilter_1 = require("./MongooseValidationErrorFilter");
let AnyExceptionFilter = class AnyExceptionFilter extends LoggableExceptionFilter_1.LoggableExceptionFilter {
    constructor(logger) {
        super(logger);
    }
    catch(exception, host) {
        let error;
        if (exception.name === 'ValidationError') {
            error = MongooseValidationErrorFilter_1.MongooseValidationErrorFilter.processMongooseValidationError(exception);
            exception.message = {
                mesage: exception.message,
                level: 'info',
            };
            exception.statusCode = 422;
        }
        else {
            error = {
                status: 'failed',
                code: exception.statusCode || 500,
                errors: [
                    exception.message.errorObject || this.getDefaultError(exception),
                ],
            };
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(exception.statusCode || 500)
            .send(error);
        this.log(exception, ctx.getRequest());
    }
    getDefaultError(exception) {
        return {
            code: `E000${exception.statusCode ? exception.statusCode : 500}`,
            message: `Internal Server Error`,
        };
    }
};
AnyExceptionFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [LoggerService_1.LoggerService])
], AnyExceptionFilter);
exports.AnyExceptionFilter = AnyExceptionFilter;
