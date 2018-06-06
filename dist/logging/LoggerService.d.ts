import { LoggerService as ILoggerService } from '@nestjs/common';
import { ConfigService } from '../config/ConfigService';
import { Request } from 'express';
export declare class LoggerService implements ILoggerService {
    private readonly config;
    private mainLogger;
    constructor(config: ConfigService);
    error(message: string, trace: string): any;
    log(message: string): any;
    warn(message: string): any;
    mainLog(message: string, level: string, req?: Request, exception?: any, other?: any): void;
    private setUpMainLogger();
    private processRequestObject(request);
    private processExceptionObject(exception);
    private setUpSlackLogging();
}
