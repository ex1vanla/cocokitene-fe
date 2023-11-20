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
