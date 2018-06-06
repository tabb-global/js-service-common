import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { JoiRequestValidationException } from '../JoiRequestValidationException';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
import { LoggerService } from '../../logging/LoggerService';
export declare class RequestValidationExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    constructor(logger: LoggerService);
    catch(exception: JoiRequestValidationException, host: ArgumentsHost): any;
}
