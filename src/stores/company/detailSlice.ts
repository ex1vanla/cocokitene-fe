import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { EActionStatus, FetchError } from '../type'
import { IDetailCompanyState, ICompanyDetail } from './type'
import serviceCompany from '@/services/company'

const initialState: IDetailCompanyState = {
    status: EActionStatus.Idle,
    company: undefined,
    error: undefined,
}

export const getCompanyDetail = createAsyncThunk<
    ICompanyDetail,
    number,
    {
        rejectValue: FetchError
    }
>('company/getCompanyDetail', async (companyId, { rejectWithValue }) => {
    try {
        const CompanyDetail = await serviceCompany.getDetailCompany(companyId)
        return {
            id: CompanyDetail?.id,
            companyName: CompanyDetail?.companyName,
            address: CompanyDetail?.address,
            description: CompanyDetail?.description,
            email: CompanyDetail?.email,
            dateOfCorporation: CompanyDetail?.dateOfCorporation,
            phone: CompanyDetail?.phone,
            fax: CompanyDetail?.taxNumber,
            businessType: CompanyDetail?.businessType,
            status: {
                id: CompanyDetail?.companyStatus?.id,
                status: CompanyDetail?.companyStatus?.status,
            },
            representativeUser: CompanyDetail?.representativeUser,
            servicePlan: {
                id: CompanyDetail?.servicePlan?.id,
                planName: CompanyDetail?.servicePlan?.planName,
            },
            superAdminInfo: {
                id: CompanyDetail?.superAdminInfo?.id,
                username: CompanyDetail?.superAdminInfo?.username,
                walletAddress: CompanyDetail?.superAdminInfo?.walletAddress,
                avatar: CompanyDetail?.superAdminInfo?.avatar,
                email: CompanyDetail?.superAdminInfo?.email,
                userStatus: {
                    id: CompanyDetail?.superAdminInfo?.userStatus?.id,
                    status: CompanyDetail?.superAdminInfo?.userStatus?.status,
                },
            },
        } as ICompanyDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

const companyDetailSlice = createSlice({
    name: 'companyDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getCompanyDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.company = action.payload
            })
            .addCase(getCompanyDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export default companyDetailSlice.reducer
