import { ResponseStatus } from './ResponseStatus';
export interface IResponseData {
    type: ResponseType;
    statusCode: number;
    data: any;
    status: ResponseStatus;
    paginationData?: any;
    errors?: any[];
}
