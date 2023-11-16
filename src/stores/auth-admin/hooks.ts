import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAuthAdminState, ILoginAdminRequest } from './type'
import { loginAdmin } from './thunk'

type AuthLoginType = {
    authAdminState: IAuthAdminState
    // eslint-disable-next-line
    loginAdminAction: (loginData: ILoginAdminRequest) => void
}

export const useAuthAdminLogin = (): AuthLoginType => {
    const dispatch = useAppDispatch()
    const authAdminState = useAppSelector((state: RootState) => state.authAdmin)

    const loginAdminAction = useCallback(
        (loginData: ILoginAdminRequest) => {
            dispatch(loginAdmin(loginData))
        },
        [dispatch],
    )

    return { authAdminState, loginAdminAction }
}
