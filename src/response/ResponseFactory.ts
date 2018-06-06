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
export class ResponseFactory {
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
    public static fromPaginatedData(
        paginatedData: IPaginateResult,
        statusCode: number = 200,
        responseStatus: ResponseStatus = ResponseStatus.SUCCESSFUL,
        metadata?: any,
    ): IPaginatedResponseJson {
        return {
            code: statusCode,
            data: paginatedData.docs,
            status: responseStatus,

            total: paginatedData.total,
            current_page: paginatedData.page,
            from: paginatedData.page ? ((paginatedData.page - 1) * paginatedData.limit) + 1 : paginatedData.offset + 1,
            to: paginatedData.page ? (paginatedData.page * paginatedData.limit) : paginatedData.offset + paginatedData.limit,
            per_page: paginatedData.limit,

            metadata: metadata,
        };
    }

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
    public static fromArbitraryData(
        data: any,
        statusCode: number = 200,
        responseStatus: ResponseStatus = ResponseStatus.SUCCESSFUL,
        metadata?: any,
    ): IResponseJson {
        return {
            data: data,
            code: statusCode,
            status: responseStatus,

            metadata: metadata,
        };
    }

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
    public static fromConvertibleObject(
        source: IHasResponseJson,
        statusCode?: number,
        responseStatus?: ResponseStatus,
        metadata?: any,
    ): IResponseJson {
        let result = source.toResponseJson();

        if (statusCode) result.code = statusCode;
        if (responseStatus) result.status = responseStatus;

        if (metadata) result.metadata = metadata;

        return result;
    }

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
    public static fromConvertibleData(
        source: IHasResponseData,
        statusCode: number = 200,
        responseStatus: ResponseStatus = ResponseStatus.SUCCESSFUL,
        metadata?: any,
    ): IResponseJson {
        return this.fromArbitraryData(source.toResponseData(), statusCode, responseStatus, metadata);
    }
}