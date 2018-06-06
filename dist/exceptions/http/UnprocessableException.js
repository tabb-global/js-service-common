"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class UnprocessableException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 422,
            message: 'Unprocessable',
            code: 'E000422',
        }, level, other);
    }
}
exports.UnprocessableException = UnprocessableException;
