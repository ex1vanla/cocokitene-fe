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

export interface ApiResponse<T = {}> {
    success: boolean;
    code?: string | number;
    data?: T;
    message?: string;
}

export type DataResponse<Data = null, Error = any> = [Data, Error];