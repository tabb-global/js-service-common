"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class InternalServerErrorException extends TabbException_1.TabbException {
    constructor(level = 'error', other) {
        super({
            status: 500,
            message: 'Internal Server Error',
            code: 'E000500',
        }, level, other);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
