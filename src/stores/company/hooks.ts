import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { ICompanyState, IGetAllCompanyQuery, ListParamsFilter } from './type'
import { getAllCompany, setFilter } from './listSlice'

type ListCompanyType = {
    companyState: ICompanyState
    getListCompanyAction: (data: IGetAllCompanyQuery) => void
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListCompany = (): ListCompanyType => {
    const dispatch = useAppDispatch()
    const companyState = useAppSelector((state: RootState) => state.companyList)

    const getListCompanyAction = useCallback(
        (data: IGetAllCompanyQuery) => {
            dispatch(getAllCompany(data))
        },
        [dispatch],
    )

    const setFilterAction = useCallback(
        (data: ListParamsFilter) => {
            dispatch(setFilter(data))
        },
        [dispatch],
    )

    return {
        companyState,
        getListCompanyAction,
        setFilterAction
    }
}
