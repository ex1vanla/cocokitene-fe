/* eslint-disable */
export interface MasterDataItem {
    key: number
    value: string
}

export const SERVICE_PLAN_ITEMS: MasterDataItem[] = [
    {
        key: 1,
        value: 'free',
    },
    {
        key: 2,
        value: 'trial',
    },
    {
        key: 3,
        value: 'pay_of_month',
    },
]

export enum ServicePlan {
    FREE = 1,
    TRIAL = 2,
    PAY_OF_MONTH = 3,
}

export const ServicePlanName: {
    [key in ServicePlan]: string
} = {
    [ServicePlan.FREE]: 'Free',
    [ServicePlan.TRIAL]: 'Trial',
    [ServicePlan.PAY_OF_MONTH]: 'Pay of month',
}

export const ServicePlanColor: {
    [key in ServicePlan]: string
} = {
    [ServicePlan.FREE]: 'black',
    [ServicePlan.TRIAL]: 'orange',
    [ServicePlan.PAY_OF_MONTH]: 'green',
}

