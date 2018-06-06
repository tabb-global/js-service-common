import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { JoiRequestValidationException } from '../JoiRequestValidationException';
import { Response } from 'express';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
import { LoggerService } from '../../logging/LoggerService';

@Catch(JoiRequestValidationException)
export class RequestValidationExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    public constructor(
        logger: LoggerService,
    ) {
        super(logger);
    }

    catch(exception: JoiRequestValidationException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();

        response
            .status(400)
            .json(exception.getResponse());

        this.log(exception, ctx.getRequest(), 'info');
    }
}