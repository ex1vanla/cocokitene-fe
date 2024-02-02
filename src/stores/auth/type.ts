import { EActionStatus } from '../type'

export interface IAuthState {
    status: EActionStatus
    nonce: any
    isAuthenticated: boolean | null
    userData: IAccount | null
}

export interface ILoginRequest {
    walletAddress: string
    signature: string
}

export interface ILoginResponse {
    accessToken: string
    refreshToken: string
    userData: IAccount
}

export interface IAccount {
    id: number
    walletAddress: string
    username: string
    email: string
    companyId: number,
    avatar: string,
    permissionKeys: string[]
}

export interface ILoginEmailRequest {
    companyName : string
    email : string
    password :  string
}