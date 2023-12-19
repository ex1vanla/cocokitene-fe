/* eslint-disable */

export enum RoleId {
    USER = 1,
    ADMIN = 2,
    SHAREHOLDER = 3,
    SUPER_ADMIN = 4,
}

export enum RoleBgHexColors {
    SUPER_ADMIN = '#2F54EB',
    ADMIN = '#fa541c',
    SHAREHOLDER = '#13C2C2',
    USER = '#722ED1',
    DEFAULTCOLOR = '#ed51b4',
}

export const RoleBgColor: {
    [key in number]: string
} = {
    [RoleId.SUPER_ADMIN]: RoleBgHexColors.SUPER_ADMIN,
    [RoleId.ADMIN]: RoleBgHexColors.ADMIN,
    [RoleId.SHAREHOLDER]: RoleBgHexColors.SHAREHOLDER,
    [RoleId.USER]: RoleBgHexColors.USER,
}

export const UserRoleName: {
    [key in number]: string
} = {
    [RoleId.SUPER_ADMIN]: 'SUPER_ADMIN',
    [RoleId.ADMIN]: 'ADMIN',
    [RoleId.SHAREHOLDER]: 'SHAREHOLDER',
    [RoleId.USER]: 'USER',
}
