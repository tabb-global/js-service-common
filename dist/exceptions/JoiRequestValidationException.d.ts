import { HttpException } from '@nestjs/common';
import { ValidationError } from 'joi';
export declare class JoiRequestValidationException extends HttpException {
    constructor(payload: ValidationError);
    private static convertJoiValidationErrors(joiError);
    private static constructErrorResponse(payload);
}
