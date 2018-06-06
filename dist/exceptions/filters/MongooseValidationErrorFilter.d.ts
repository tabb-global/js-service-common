export declare class MongooseValidationErrorFilter {
    static processMongooseValidationError(err: any): {
        status: string;
        code: number;
        errors: {};
    };
}
