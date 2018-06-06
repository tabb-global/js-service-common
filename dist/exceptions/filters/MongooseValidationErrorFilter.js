"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongooseValidationErrorFilter {
    static processMongooseValidationError(err) {
        let error = {
            status: 'unprocessable',
            code: 422,
            errors: {},
        };
        for (let prop in err.errors) {
            if (err.errors.hasOwnProperty(prop)) {
                let current = err.errors[prop];
                error.errors[current.path] = [
                    {
                        code: current.errorCode ? current.errorCode : 'E001001',
                        message: err.message,
                    },
                ];
            }
        }
        return error;
    }
}
exports.MongooseValidationErrorFilter = MongooseValidationErrorFilter;
