import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from '../../logging/LoggerService';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
export declare class AnyExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    constructor(logger: LoggerService);
    catch(exception: any, host: ArgumentsHost): any;
    private getDefaultError(exception);
}
