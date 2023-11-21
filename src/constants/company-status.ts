/* eslint-disable */

export enum CompanyStatus {
    ACTIVE = '0',
    INACTIVE = '1',
}

export const CompanyStatusColor: {
    [key in CompanyStatus]: string
} = {
    [CompanyStatus.ACTIVE]: 'green',
    [CompanyStatus.INACTIVE]: 'red',
}

export const CompanyStatusName: {
    [key in CompanyStatus]: string
} = {
    [CompanyStatus.ACTIVE]: 'ACTIVE',
    [CompanyStatus.INACTIVE]: 'INACTIVE',
}
