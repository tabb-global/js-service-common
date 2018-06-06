"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("./TabbException");
class BadRequestException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 400,
            message: 'Bad Request',
            code: 'E000400',
        }, level, other);
    }
}
exports.BadRequestException = BadRequestException;
