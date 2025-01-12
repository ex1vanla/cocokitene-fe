import { EActionStatus } from '../type'

export interface IAuthState {
    status: EActionStatus
    nonce: any
    isAuthenticated: boolean | null
    userData: IAccount | null
    serviceIsExpired: boolean
    errorMessage: string
    errorCode: string
}

export interface ILoginRequest {
    walletAddress: string
    signature: string
}

export interface ILoginResponse {
    accessToken: string
    refreshToken: string
    userData: IAccount
    serviceIsExpired: boolean
}

export interface IAccount {
    id: number
    walletAddress: string
    username: string
    email: string
    companyId: number
    companyName: string
    avatar: string
    permissionKeys: string[]
    defaultAvatarHashColor: string
}

export interface ILoginEmailRequest {
    taxOfCompany: string
    email: string
    password: string
}
