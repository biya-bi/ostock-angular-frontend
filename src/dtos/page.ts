
export interface Page<T> {
    _embedded: T;
    number: number;
    size: number;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
}