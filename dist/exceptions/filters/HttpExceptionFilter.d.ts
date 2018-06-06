import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
import { LoggerService } from '../../logging/LoggerService';
export declare class HttpExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): any;
    private getDefaultError(exception);
}
