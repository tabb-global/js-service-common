import { ResponseStatus } from './ResponseStatus';
export interface IResponseJson {
    data?: any;
    status: ResponseStatus;
    code: number;
    errors?: any[];
    metadata?: any;
}
