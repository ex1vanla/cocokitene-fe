import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { loginAdmin } from './thunk'
import { IAuthAdminState, ILoginAdminResponse } from './type'

const initialState: IAuthAdminState = {
    status: EActionStatus.Idle,
    isAuthenticated: null,
    userAdminInfo: null,
    errCode: '',
    errMessage: '',
}

const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state: IAuthAdminState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                loginAdmin.fulfilled,
                (
                    state: IAuthAdminState,
                    action: PayloadAction<ILoginAdminResponse>,
                ) => {
                    state.status = EActionStatus.Succeeded
                    state.userAdminInfo = action.payload.systemAdminData
                    state.isAuthenticated = true
                },
            )
            .addCase(loginAdmin.rejected, (state: IAuthAdminState, action) => {
                state.status = EActionStatus.Failed
                state.errCode = action.payload?.errorCode ?? ''
                state.errMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export default authAdminSlice.reducer
