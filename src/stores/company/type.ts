import { EActionStatus, FetchError } from '../type'

export interface ICompanyList {
    id: number
    companyName: string
    servicePlan: string
    representative: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    status: string
}

export interface IListCompanyResponse {
    companys_id: number
    companys_company_name: string
    planName: string
    companys_representative_user: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    companyStatus: string
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
