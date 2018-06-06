"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TabbException_1 = require("../TabbException");
class NotImplementedException extends TabbException_1.TabbException {
    constructor(level = 'info', other) {
        super({
            status: 501,
            message: 'Not Implemented',
            code: 'E000501',
        }, level, other);
    }
}
exports.NotImplementedException = NotImplementedException;
