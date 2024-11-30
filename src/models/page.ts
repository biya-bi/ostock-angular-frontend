import { PageRequest } from "./page-request";

export interface Page {
    request: PageRequest;
    total?: number;
}