import { HttpException } from '@nestjs/common';
import { ValidationError } from 'joi';

export class JoiRequestValidationException extends HttpException {
    public constructor(payload: ValidationError) {
        super(JoiRequestValidationException.constructErrorResponse(payload), 400);
    }

    private static convertJoiValidationErrors(joiError: ValidationError) {
        return {
            [joiError.details[0].path[0]]: [{
                code: 'E001003',
                message: `Invalid request format: ${joiError.details[0].message}`,
            }],
        };
    }

    private static constructErrorResponse(payload: ValidationError) {
        return {
            status: 'failed',
            code: 400,
            errors: this.convertJoiValidationErrors(payload),
        };
    }
}