"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class UnauthorizedException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 401,
            message: 'Unauthorized',
            code: 'E000401',
        }, level, other);
    }
}
exports.UnauthorizedException = UnauthorizedException;
