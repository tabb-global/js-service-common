"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class JoiRequestValidationException extends common_1.HttpException {
    constructor(payload) {
        super(JoiRequestValidationException.constructErrorResponse(payload), 400);
    }
    static convertJoiValidationErrors(joiError) {
        return {
            [joiError.details[0].path[0]]: [{
                    code: 'E001003',
                    message: `Invalid request format: ${joiError.details[0].message}`,
                }],
        };
    }
    static constructErrorResponse(payload) {
        return {
            status: 'failed',
            code: 400,
            errors: this.convertJoiValidationErrors(payload),
        };
    }
}
exports.JoiRequestValidationException = JoiRequestValidationException;
