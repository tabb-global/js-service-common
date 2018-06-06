import { HttpException } from '@nestjs/common';
import { IErrorObject } from './IErrorObject';
export declare class TabbException extends HttpException {
    constructor(errorObject: IErrorObject, level?: string, other?: any);
}
