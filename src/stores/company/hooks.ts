import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { ICompanyState, IGetAllCompanyQuery } from './type'
import { getAllCompany } from './listSlice'

type ListCompanyType = {
    companyState: ICompanyState
    getListCompanyAction: (data: IGetAllCompanyQuery) => void
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

    return {
        companyState,
        getListCompanyAction,
    }
}
