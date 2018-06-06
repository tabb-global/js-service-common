"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class ConflictException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 409,
            message: 'Conflict',
            code: 'E000409',
        }, level, other);
    }
}
exports.ConflictException = ConflictException;
