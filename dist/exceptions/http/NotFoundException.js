"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class NotFoundException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 404,
            message: 'Not Found',
            code: 'E000404',
        }, level, other);
    }
}
exports.NotFoundException = NotFoundException;
