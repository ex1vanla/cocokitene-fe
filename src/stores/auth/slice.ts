import { createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { IAuthState } from './type'
import { getNonceThunk } from './thunk'

const initialState: IAuthState = {
    status: EActionStatus.Idle,
    nonce: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNonceThunk.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getNonceThunk.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.nonce = action.payload
            })
            .addCase(getNonceThunk.rejected, (state) => {
                state.status = EActionStatus.Failed
            })
    },
})

export default authSlice.reducer
