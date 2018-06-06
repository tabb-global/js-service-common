import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../../logging/LoggerService';
import { LoggableExceptionFilter } from '../LoggableExceptionFilter';
import { MongooseValidationErrorFilter } from './MongooseValidationErrorFilter';

@Catch()
export class AnyExceptionFilter extends LoggableExceptionFilter implements ExceptionFilter {
    public constructor(
        logger: LoggerService,
    ) {
        super(logger);
    }

    public catch(exception: any, host: ArgumentsHost): any {
        let error;

        //This is here because type check for mongoose's ValidationError interface is not possible
        if (exception.name === 'ValidationError') {
            error = MongooseValidationErrorFilter.processMongooseValidationError(exception);
            exception.message = {
                mesage: exception.message,
                level: 'info',
            };
            exception.statusCode = 422;
        } else {
            error = {
                status: 'failed',
                code: exception.statusCode || 500,
                errors: [
                    exception.message.errorObject || this.getDefaultError(exception),
                ],
            };
        }


        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();

        response
            .status(exception.statusCode || 500)
            .send(error);

        this.log(exception, ctx.getRequest());
    }

    private getDefaultError(exception: any) {
        return {
            code: `E000${exception.statusCode ? exception.statusCode : 500}`,
            message: `Internal Server Error`,
        };
    }
}