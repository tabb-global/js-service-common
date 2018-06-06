import { HttpException } from '@nestjs/common';
import { IErrorObject } from './IErrorObject';

export class TabbException extends HttpException {
    public constructor(errorObject: IErrorObject, level = 'info', other?: any) {
        super({
            errorObject,
            level,
            other,
        }, errorObject.status);
    }
}