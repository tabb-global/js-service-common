import { ResponseStatus } from './ResponseStatus';
import { IResponseJson } from './IResponseJson';
import { IPaginatedResponseJson } from './IPaginatedResponseJson';
import { IPaginateResult } from './IPaginateResult';
import { IHasResponseJson } from './IHasResponseJson';
import { IHasResponseData } from './IHasResponseData';
export declare class ResponseFactory {
    static fromPaginatedData(paginatedData: IPaginateResult, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IPaginatedResponseJson;
    static fromArbitraryData(data: any, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
    static fromConvertibleObject(source: IHasResponseJson, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
    static fromConvertibleData(source: IHasResponseData, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
}
