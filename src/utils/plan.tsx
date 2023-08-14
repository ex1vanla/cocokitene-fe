export const getNumberLimitedPlan = (quantity: number): string => {
    return quantity === -1 ? 'UNLIMITED' : String(quantity)
}
