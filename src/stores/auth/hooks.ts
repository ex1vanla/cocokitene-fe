import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAuthState, ILoginRequest } from './type'
import { signOut, updateAuthLogin } from './slice'
import { getNonceThunk, login } from './thunk'

type AuthLoginType = {
    authState: IAuthState
    loginAction: (loginData: ILoginRequest) => void
    getNonceAction: (walletAddress: string) => void
    logoutAction: () => void
}

export const useAuthLogin = (): AuthLoginType => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state: RootState) => state.auth)

    const loginAction = useCallback(
        (loginData: ILoginRequest) => {
            dispatch(login(loginData))
        },
        [dispatch],
    )

    const getNonceAction = useCallback(
        (walletAddress: string) => {
            dispatch(getNonceThunk(walletAddress))
        },
        [dispatch],
    )

    const logoutAction = useCallback(() => {
        dispatch(signOut())
    }, [dispatch])

    return { authState, loginAction, getNonceAction, logoutAction }
}