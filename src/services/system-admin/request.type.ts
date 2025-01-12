import { PaymentMethod, StatusSubscriptionEnum, SubscriptionEnum } from "@/constants/service-subscript"

export interface IGetAllDataRequest {
    page: number
    limit: number
}

export interface ICreateCompanyPayload {
    companyName: string
    description?: string
    address: string
    companyShortName?: string
    email: string
    dateOfCorporation: string
    phone: string
    fax?: string
    taxNumber: string
    businessType?: string
    representativeUser: string
    statusId: number
    planId: number
    superAdminCompany: {
        username: string
        walletAddress?: string
        email: string
        statusId: number
    }
}

export interface IUpdateCompanyPayload {
    companyName: string
    description?: string
    address: string
    companyShortName: string
    email: string
    dateOfCorporation: string
    phone: string
    fax?: string
    taxNumber: string
    businessType: string
    representativeUser: string
    statusId: number
    planId: number
}

export interface IUpdateSuperAdminPayload {
    username: string
    walletAddress: string
    email: string
    statusId: number
}

export interface ICreateServiceSubscriptionPayload {
    companyId: number
    planId: number
    amount: number
    type: SubscriptionEnum
    paymentMethod: PaymentMethod
    status: StatusSubscriptionEnum
    activationDate: string
    expirationDate: string
    note?: string
}

export interface IUpdateServiceSubscriptionPayload extends ICreateServiceSubscriptionPayload{}
 