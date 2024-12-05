import { PageRequest } from "./page-request";

export interface Page {
    request: PageRequest;
    totalPages?: number;
    numberOfElements?: number;
    totalElements?: number;
    from?: number;
    to?: number;
}