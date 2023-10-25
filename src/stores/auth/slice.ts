import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { IAuthState, ILoginResponse } from './type'
import { getNonceThunk, login } from './thunk'
import serviceUser from '@/services/user'

const initialState: IAuthState = {
    status: EActionStatus.Idle,
    nonce: '',
    userData: serviceUser.getInfoStorage(),
    isAuthenticated: !!serviceUser.getInfoStorage(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state: IAuthState) => {
            state.isAuthenticated = null
            state.userData = null
            state.nonce = ''
            serviceUser.storeInfo(null)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                login.fulfilled,
                (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
                    state.status = EActionStatus.Succeeded
                    state.userData = action.payload.userData
                    state.isAuthenticated = true
                },
            )
            .addCase(login.rejected, (state: IAuthState) => {
                state.status = EActionStatus.Failed
            })
            .addCase(getNonceThunk.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getNonceThunk.fulfilled, (state: IAuthState, action) => {
                state.status = EActionStatus.Succeeded
                state.nonce = action.payload
            })
            .addCase(getNonceThunk.rejected, (state: IAuthState) => {
                state.status = EActionStatus.Failed
            })
    },
})

export const { signOut } = authSlice.actions

export default authSlice.reducer
