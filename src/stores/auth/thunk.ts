import serviceUser from '@/services/user'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginRequest, ILoginResponse } from './type'

export const getNonceThunk = createAsyncThunk(
    'auth/getNonce',
    async (walletAddress: string) => {
        const nonce = await serviceUser.getNonce(walletAddress)
        return nonce
    },
)

export const login = createAsyncThunk(
    'auth/login',
    async (parameter: ILoginRequest) => {
        const loginResponse: ILoginResponse | undefined = await serviceUser.login(parameter)
        if (loginResponse) {
            const { userData, accessToken, refreshToken } = loginResponse;
            serviceUser.storeInfo(userData);
            serviceUser.storeAccessToken(accessToken);
            serviceUser.storeRefreshToken(refreshToken);

            return loginResponse
        } else {
            throw new Error('Login failed.')
        }
    },
)
