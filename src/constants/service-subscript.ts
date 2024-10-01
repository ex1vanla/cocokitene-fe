/* eslint-disable */

export enum SubscriptionEnum {
    EXTEND = '0',
    UPGRADE = '1',
    CHANGE_SERVICE= '2'
}

export const SubscriptionType: {
    [key in SubscriptionEnum]: string
} = {
    [SubscriptionEnum.EXTEND]: 'EXTEND',
    [SubscriptionEnum.UPGRADE]: 'UPGRADE',
    [SubscriptionEnum.CHANGE_SERVICE]: 'CHANGE_SERVICE',
}

export enum PaymentMethod {
    DIRECT_PAYMENT = '0',
    BANK_TRANSFER = '1',
}

export const PaymentMethodName: {
    [key in PaymentMethod]:string
} = { 
    [PaymentMethod.DIRECT_PAYMENT] : 'DIRECT_PAYMENT',
    [PaymentMethod.BANK_TRANSFER] : 'BANK_TRANSFER',
}

export enum StatusSubscriptionEnum {
    PENDING = '0',
    CONFIRMED = '1',
    CANCEL = '2',
}

export const StatusSubscription: {
    [key in StatusSubscriptionEnum]: string
} = {
    [StatusSubscriptionEnum.PENDING] : 'WAITING',
    [StatusSubscriptionEnum.CONFIRMED] : 'APPROVED',
    [StatusSubscriptionEnum.CANCEL] : 'CANCEL',
}

export const StatusSubscriptionColor: {
    [key in StatusSubscriptionEnum]: string
} = {
    [StatusSubscriptionEnum.PENDING] : '#f7b243',
    [StatusSubscriptionEnum.CONFIRMED] : '#158504',
    [StatusSubscriptionEnum.CANCEL] : '#c4253b',
}

export const ACCEPT_IMG_TYPES = '.jpg,.jpeg,.png'
export const MAX_FILE_SIZE = 20

export const FileBillToFolderName = 'bill'