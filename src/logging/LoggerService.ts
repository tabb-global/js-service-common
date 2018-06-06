import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { ConfigService } from '../config/ConfigService';
import * as winston from 'winston';
import { Request } from 'express';
import * as util from 'util';

const SlackWebHook = require('winston-slack-webhook').SlackWebHook;

@Injectable()
export class LoggerService implements ILoggerService {
    private mainLogger;

    public constructor(
        private readonly config: ConfigService,
    ) {
        this.setUpMainLogger();
    }

    public error(message: string, trace: string): any {
        console.log(message);
        this.mainLog(message, 'error', null, { trace });
    }

    public log(message: string): any {
        console.log(message);
        this.mainLog(message, 'info');
    }

    public warn(message: string): any {
        console.log(message);
        this.mainLog(message, 'warn');
    }

    public mainLog(
        message: string, level: string, req?: Request, exception?: any, other?: any,
    ) {
        this.mainLogger.log({
            level,
            message,
            exception: this.processExceptionObject(exception),
            request: this.processRequestObject(req),
            other,
        });
    }

    private setUpMainLogger() {
        // noinspection TypeScriptValidateJSTypes
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

            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.printf((info) => {
                    return `${info.timestamp} ${info.level.toUpperCase()} ${info.message} ${util.inspect(info, {
                        showHidden: true,
                        depth: null,
                    })}\n====\n`;
                }),
            ),

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
            // noinspection TypeScriptValidateJSTypes
            this.mainLogger.add(new winston.transports.Console({
                format: winston.format.simple(),
                stderrLevels: ['error', 'crit', 'emerg'],
            }));
        }

        this.setUpSlackLogging();
    }

    private processRequestObject(request: Request): object {
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

    private processExceptionObject(exception): object {
        return {
            baseObject: exception,
            stringifiedBase: exception.toString(),
            stack: exception.stack || null,
            message: exception.message || null,
        };
    }

    private setUpSlackLogging() {
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
}