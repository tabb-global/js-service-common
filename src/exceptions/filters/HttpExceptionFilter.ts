import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
import { LoggerService } from '../../logging/LoggerService';

@Catch(HttpException)
export class HttpExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    public constructor(
        logger: LoggerService,
    ) {
        super(logger);
    }

    public catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();

        response
            .status(exception.getStatus())
            .send({
                status: 'failed',
                code: exception.getStatus(),
                errors: [
                    exception.message.errorObject || this.getDefaultError(exception),
                ],
            });

        this.log(exception, ctx.getRequest(), 'info');
    }

    private getDefaultError(exception: HttpException) {
        let message;
        if (typeof exception.message === 'string' || exception.message instanceof String)
            message = exception.message;

        return {
            code: `E000${exception.getStatus()}`,
            message: message ? message : `${exception.message.error}: ${exception.message.message ? exception.message.message : null}`,
        };
    }
}