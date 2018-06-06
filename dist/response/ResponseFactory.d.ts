import { ResponseStatus } from './ResponseStatus';
import { IResponseJson } from './IResponseJson';
import { IPaginatedResponseJson } from './IPaginatedResponseJson';
import { IPaginateResult } from './IPaginateResult';
import { IHasResponseJson } from './IHasResponseJson';
import { IHasResponseData } from './IHasResponseData';
/**
 * Static factory class for creating responses.
 *
 * @class ResponseFactory
 */
export declare class ResponseFactory {
    /**
     * Create a response from a paginated model data
     *
     * The paginated model result is abstracted as
     * it was recommenden in `mongoose-paginate` npm package
     *
     * @param {IPaginateResult} paginatedData
     * @param {number} statusCode
     * @param {ResponseStatus} responseStatus
     * @param {any} metadata
     * @returns {IPaginatedResponseJson}
     */
    static fromPaginatedData(paginatedData: IPaginateResult, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IPaginatedResponseJson;
    /**
     * Creates a response from arbitrary uncategorized data
     *
     * The data can be object or an array.
     * No required fields needs to be specified
     *
     * @param data
     * @param {number} statusCode
     * @param {ResponseStatus} responseStatus
     * @param {any} metadata
     * @returns {IResponseJson}
     */
    static fromArbitraryData(data: any, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
    /**
     * Create response from objects that can be converted to response
     * (Objects implementing the IHasResponseJson interface)
     *
     *
     * @param {IHasResponseJson} source
     * @param {number} statusCode
     * @param {ResponseStatus} responseStatus
     * @param metadata
     * @returns {IResponseJson}
     */
    static fromConvertibleObject(source: IHasResponseJson, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
    /**
     * Create response from objects that can produce response-ready data
     * (implements IHasResponseData interface)
     *
     * @param {IHasResponseData} source
     * @param {number} statusCode
     * @param {ResponseStatus} responseStatus
     * @param metadata
     * @returns {IResponseJson}
     */
    static fromConvertibleData(source: IHasResponseData, statusCode?: number, responseStatus?: ResponseStatus, metadata?: any): IResponseJson;
}
