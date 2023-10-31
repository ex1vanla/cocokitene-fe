import { EActionStatus, FetchError } from '../type'

export interface ICompany {
    id: number
    companyName: string
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
    companyList: ICompany[]
    totalCompanyItem: number
}
