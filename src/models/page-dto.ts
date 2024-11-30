
export interface PageDto<T> {
    _embedded: T;
    number: number;
    size: number;
    totalPages: number;
}