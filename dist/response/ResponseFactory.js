"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseStatus_1 = require("./ResponseStatus");
class ResponseFactory {
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
    static fromArbitraryData(data, statusCode = 200, responseStatus = ResponseStatus_1.ResponseStatus.SUCCESSFUL, metadata) {
        return {
            data: data,
            code: statusCode,
            status: responseStatus,
            metadata: metadata,
        };
    }
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
    static fromConvertibleData(source, statusCode = 200, responseStatus = ResponseStatus_1.ResponseStatus.SUCCESSFUL, metadata) {
        return this.fromArbitraryData(source.toResponseData(), statusCode, responseStatus, metadata);
    }
}
exports.ResponseFactory = ResponseFactory;
