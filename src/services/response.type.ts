export interface IMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IGetAllDataReponse<T> {
    items: T[];
    meta: IMeta;
}