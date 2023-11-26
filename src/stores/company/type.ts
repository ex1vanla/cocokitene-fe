import { EActionStatus, FetchError } from '../type'

export interface ICompanyList {
    id: number
    index: number
    companyName: string
    servicePlan: string
    representative: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    status: string
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllCompanyQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface ICompanyState extends IGetAllCompanyQuery, FetchError {
    status: EActionStatus
    companyList: ICompanyList[]
    totalCompanyItem: number
}
