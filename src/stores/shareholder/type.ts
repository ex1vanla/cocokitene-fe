import { IAccountList } from '@/stores/account/type'
import { EActionStatus, FetchError } from '@/stores/type'

export interface IShareholderList extends Omit<IAccountList, 'role'> {
    shareQuantity: number
}

export interface IGetAllShareholderQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface IShareholderState extends IGetAllShareholderQuery, FetchError {
    status: EActionStatus
    shareholderList: IShareholderList[]
    totalShareholderItem: number
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}
