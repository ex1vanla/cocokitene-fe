import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAuthAdminState, ILoginAdminRequest } from './type'
import { loginAdmin } from './thunk'
import { resetStatus, setUserLogged, signOutSys } from './slice'

type AuthLoginType = {
    authAdminState: IAuthAdminState
    // eslint-disable-next-line
    loginAdminAction: (loginData: ILoginAdminRequest) => void
    logoutAdminAction: () => void
    resetStatusLogin: () => void
    setUserAdminLogged: (isLogged: boolean) => void
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

    const logoutAdminAction = useCallback(() => {
        dispatch(signOutSys())
    }, [dispatch])

    const resetStatusLogin = useCallback(() => {
        dispatch(resetStatus())
    }, [dispatch])

    const setUserAdminLogged = useCallback(
        (isLogged: boolean) => {
            dispatch(setUserLogged({ logged: isLogged }))
        },
        [dispatch],
    )

    return {
        authAdminState,
        loginAdminAction,
        logoutAdminAction,
        resetStatusLogin,
        setUserAdminLogged,
    }
}
