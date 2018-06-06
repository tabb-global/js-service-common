"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseStatus_1 = require("./ResponseStatus");
/**
 * Static factory class for creating responses.
 *
 * @class ResponseFactory
 */
class ResponseFactory {
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
    static fromPaginatedData(paginatedData, statusCode = 200, responseStatus = ResponseStatus_1.ResponseStatus.SUCCESSFUL, metadata) {
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
    static fromArbitraryData(data, statusCode = 200, responseStatus = ResponseStatus_1.ResponseStatus.SUCCESSFUL, metadata) {
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
    static fromConvertibleObject(source, statusCode, responseStatus, metadata) {
        let result = source.toResponseJson();
        if (statusCode)
            result.code = statusCode;
        if (responseStatus)
            result.status = responseStatus;
        if (metadata)
            result.metadata = metadata;
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
    static fromConvertibleData(source, statusCode = 200, responseStatus = ResponseStatus_1.ResponseStatus.SUCCESSFUL, metadata) {
        return this.fromArbitraryData(source.toResponseData(), statusCode, responseStatus, metadata);
    }
}
exports.ResponseFactory = ResponseFactory;
