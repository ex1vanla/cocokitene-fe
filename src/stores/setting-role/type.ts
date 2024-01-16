import { EActionStatus } from '../type'

export interface ISettingRoleState {
    status: EActionStatus
    openModalRegisterRole: boolean
    permissionRoleList?: ISettingRole[]
}

export interface ISettingRole {
    [key: string]: IRolePermission
}

export interface IRolePermission {
    [key: string]: number
}
