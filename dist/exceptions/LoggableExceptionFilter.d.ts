import { Request } from 'express';
import { LoggerService } from '../logging/LoggerService';
export declare class LoggableExceptionFilter {
    protected readonly logger: LoggerService;
    constructor(logger: LoggerService);
    protected log(e: any, r: Request, defaultLevel?: string): void;
}
