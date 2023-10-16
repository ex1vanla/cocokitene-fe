import serviceUser from '@/services/user'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginRequest, ILoginResponse } from './type'
import { AxiosError } from 'axios'
import { FetchError } from '../type'

export const getNonceThunk = createAsyncThunk(
    'auth/getNonce',
    async (walletAddress: string) => {
        const nonce = await serviceUser.getNonce(walletAddress)
        return nonce
    },
)

export const login = createAsyncThunk<
    ILoginResponse | undefined,
    {param: ILoginRequest},
    {
        rejectValue: FetchError
    }
>('auth/login', async ({param}, { rejectWithValue }) => {
    try {
        const loginResponse: ILoginResponse | undefined = await serviceUser.login(param)
        if (loginResponse) {
            const { userData, accessToken, refreshToken } = loginResponse;
            serviceUser.storeInfo(userData);
            serviceUser.storeAccessToken(accessToken);
            serviceUser.storeRefreshToken(refreshToken);

            return loginResponse
        } else {
            throw new Error('Login failed.')
        }
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})
