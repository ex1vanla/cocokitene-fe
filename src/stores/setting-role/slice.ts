import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettingRoleState } from './type'

const initialState: ISettingRoleState = {
    openModalRegisterRole: false,
}

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
})

export const { setOpenModalRegisterRole } = settingRoleSlice.actions

export default settingRoleSlice.reducer
