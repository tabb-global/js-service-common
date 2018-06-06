import { IResponseJson } from "./IResponseJson";

export interface IPaginatedResponseJson extends IResponseJson{
    from?: number;
    to?: number;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;

    path?: string;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string;
    prev_page_url?: string;
}