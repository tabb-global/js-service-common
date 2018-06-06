export interface IPaginateResult {
    docs: any[];
    total: number;
    limit: number;
    page?: number;
    pages?: number;
    offset?: number;
}
