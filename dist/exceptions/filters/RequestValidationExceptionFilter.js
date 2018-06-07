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
const JoiRequestValidationException_1 = require("../JoiRequestValidationException");
const LoggableExceptionFilter_1 = require("../LoggableExceptionFilter");
const LoggerService_1 = require("../../logging/LoggerService");
let RequestValidationExceptionFilter = class RequestValidationExceptionFilter extends LoggableExceptionFilter_1.LoggableExceptionFilter {
    constructor(logger) {
        super(logger);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(400)
            .json(exception.getResponse());
        this.log(exception, ctx.getRequest(), 'info');
    }
};
RequestValidationExceptionFilter = __decorate([
    common_1.Catch(JoiRequestValidationException_1.JoiRequestValidationException),
    __metadata("design:paramtypes", [LoggerService_1.LoggerService])
], RequestValidationExceptionFilter);
exports.RequestValidationExceptionFilter = RequestValidationExceptionFilter;
