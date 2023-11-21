/* eslint-disable */

export enum UserStatus {
    INACTIVE = '0',
    ACTIVE = '1',
}

export const UserStatusColor: {
    [key in UserStatus]: string
} = {
    [UserStatus.ACTIVE]: 'green',
    [UserStatus.INACTIVE]: 'red',
}

export const UserStatusName: {
    [key in UserStatus]: string
} = {
    [UserStatus.ACTIVE]: 'ACTIVE',
    [UserStatus.INACTIVE]: 'INACTIVE',
}
