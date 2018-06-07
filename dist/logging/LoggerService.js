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
const ConfigService_1 = require("../config/ConfigService");
const winston = require("winston");
const util = require("util");
const SlackWebHook = require('winston-slack-webhook').SlackWebHook;
let LoggerService = class LoggerService {
    constructor(config) {
        this.config = config;
        this.setUpMainLogger();
    }
    error(message, trace) {
        console.log(message);
        this.mainLog(message, 'error', null, { trace });
    }
    log(message) {
        console.log(message);
        this.mainLog(message, 'info');
    }
    warn(message) {
        console.log(message);
        this.mainLog(message, 'warn');
    }
    mainLog(message, level, req, exception, other) {
        this.mainLogger.log({
            level,
            message,
            exception: this.processExceptionObject(exception),
            request: this.processRequestObject(req),
            other,
        });
    }
    setUpMainLogger() {
        this.mainLogger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'debug',
            levels: {
                emerg: 0,
                crit: 1,
                error: 2,
                warn: 3,
                info: 4,
                debug: 5,
            },
            format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.printf((info) => {
                return `${info.timestamp} ${info.level.toUpperCase()} ${info.message} ${util.inspect(info, {
                    showHidden: true,
                    depth: null,
                })}\n====\n`;
            })),
            transports: [
                new winston.transports.File({
                    filename: `${this.config.get('LOG_DIR')}/error.log`,
                    level: 'error',
                }),
                new winston.transports.File({
                    filename: `${this.config.get('LOG_DIR')}/combined.log`,
                }),
            ],
        });
        if (process.env.NODE_ENV !== 'testing') {
            this.mainLogger.add(new winston.transports.Console({
                format: winston.format.simple(),
                stderrLevels: ['error', 'crit', 'emerg'],
            }));
        }
        this.setUpSlackLogging();
    }
    processRequestObject(request) {
        let result = {
            headers: Object.assign({}, request.headers),
            body: Object.assign({}, request.body),
            params: Object.assign({}, request.params),
            url: request.url,
            query: Object.assign({}, request.query),
        };
        delete result.headers['Authorization'];
        return result;
    }
    processExceptionObject(exception) {
        return {
            baseObject: exception,
            stringifiedBase: exception.toString(),
            stack: exception.stack || null,
            message: exception.message || null,
        };
    }
    setUpSlackLogging() {
        if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
            this.mainLogger.add(new SlackWebHook({
                level: 'error',
                webhookUrl: this.config.get('SLACK_ERROR_HOOK'),
                channel: '#errors',
                username: 'TABB',
                iconEmoji: ':tabb:',
            }));
        }
    }
};
LoggerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [ConfigService_1.ConfigService])
], LoggerService);
exports.LoggerService = LoggerService;
