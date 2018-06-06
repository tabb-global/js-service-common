"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class ForbiddenException extends TabbException_1.TabbException {
    constructor(level = 'error', other) {
        super({
            status: 403,
            message: 'Forbidden',
            code: 'E000403',
        }, level, other);
    }
}
exports.ForbiddenException = ForbiddenException;
