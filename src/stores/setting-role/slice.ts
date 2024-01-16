import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettingRole, ISettingRoleState } from './type'
import { EActionStatus, FetchError } from '../type'
import serviceSettingRole from '@/services/setting-role'
import { AxiosError } from 'axios'
import { IGetAllDataReponse } from '@/services/response.type'
import { IGetAllMeetingQuery } from '../meeting/types'

const initialState: ISettingRoleState = {
    status: EActionStatus.Idle,
    openModalRegisterRole: false,
    permissionRoleList: undefined,
}

export const getCombineRoleWithPermission = createAsyncThunk<
    IGetAllDataReponse<ISettingRole>,
    null,
    {
        rejectValue: FetchError
    }
>('meeting/getPassMeetingAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceSettingRole.getCombineRoleWithPermission()
        return { items: data.data } as IGetAllDataReponse<ISettingRole>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const settingRoleSlice = createSlice({
    name: 'settingRoleSlice',
    initialState,
    reducers: {
        setOpenModalRegisterRole(
            state,
            action: PayloadAction<{ isOpenModal: boolean }>,
        ) {
            state.openModalRegisterRole = action.payload.isOpenModal
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCombineRoleWithPermission.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                getCombineRoleWithPermission.fulfilled,
                (state, action) => {
                    state.status = EActionStatus.Succeeded
                    state.permissionRoleList = action.payload?.items ?? []
                },
            )
            .addCase(getCombineRoleWithPermission.rejected, (state, action) => {
                state.status = EActionStatus.Failed
            })
    },
})

export const { setOpenModalRegisterRole } = settingRoleSlice.actions

export default settingRoleSlice.reducer
