import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataReponse } from '@/services/response.type'
import {
    IAccountList,
    IAccountState,
    IGetAllAccountQuery,
    ListParamsFilter,
} from '@/stores/account/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { AxiosError } from 'axios/index'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { SORT } from '@/constants/meeting'
import serviceAccount from '@/services/account'

const initialState: IAccountState = {
    status: EActionStatus.Idle,
    accountList: [],
    totalAccountItem: 0,
    page: 1,
    limit: 1000,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
        sortOrder: SORT.DESC,
    },
    errorCode: '',
    errorMessage: '',
}
export const getAllAccount = createAsyncThunk<
    IGetAllDataReponse<IAccountList>,
    IGetAllAccountQuery,
    {
        rejectValue: FetchError
    }
>('users/getUserAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceAccount.getAllUsers(param)
        const mappedData = data.items.map((item, index) => {
            return {
                id: item.id,
                index: index + 1,
                username: item.username,
                avatar: item.avatar,
                email: item.email,
                defaultAvatarHashColor: item.defaultAvatarHashColor,
                walletAddress: item.walletAddress,
                status: item.userStatus.status,
                companyId: item.companyId,
                role: item.userRole,
            }
        }) as unknown as IAccountList[]
        return {
            ...data,
            items: mappedData,
        } as unknown as IGetAllDataReponse<IAccountList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const accountListSlice = createSlice({
    name: 'accountListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAccount.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllAccount.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.accountList = action.payload?.items ?? []
                state.totalAccountItem = action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllAccount.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = accountListSlice.actions
export default accountListSlice.reducer
