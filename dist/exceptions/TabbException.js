"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class TabbException extends common_1.HttpException {
    constructor(errorObject, level = 'info', other) {
        super({
            errorObject,
            level,
            other,
        }, errorObject.status);
    }
}
exports.TabbException = TabbException;
