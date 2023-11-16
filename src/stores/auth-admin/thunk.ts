import { createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginAdminRequest, ILoginAdminResponse } from './type'
import { FetchError } from '../type'
import { AxiosError } from 'axios'
import serviceUser from '@/services/user'

export const loginAdmin = createAsyncThunk<
    ILoginAdminResponse,
    ILoginAdminRequest,
    {
        rejectValue: FetchError
    }
>('auth/login-admin', async (loginData, { rejectWithValue }) => {
    try {
        const loginResponse: ILoginAdminResponse = await serviceUser.loginAdmin(
            loginData,
        )
        return loginResponse
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info.message,
            errorCode: responseData?.code,
        })
    }
})
