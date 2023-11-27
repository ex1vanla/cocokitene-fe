import { EActionStatus, FetchError } from '../type'

export interface ICompanyDetail {
    id: number
    companyName: string | null
    address: string
    description: string
    email: string
    dateOfCorporation: string
    phone: string
    fax: string
    bussinessType: string
    status: {
        id: number
        status: string
    }
    representativeUser: string
    servicePlan: {
        id: number
        planName: string
    }
    superAdminInfo: {
        id: number
        username: string
        walletAddress: string
        avatar: string
        userStatus: {
            id: number
            status: string
        }
        email: string
    }
}

export interface IDetailCompanyState {
    status: EActionStatus
    company?: ICompanyDetail
    error?: FetchError
}
