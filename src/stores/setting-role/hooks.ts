import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { ISettingRoleState } from './type'
import { getCombineRoleWithPermission, setOpenModalRegisterRole } from './slice'

type SettingRoleType = {
    settingRoleState: ISettingRoleState
    // eslint-disable-next-line
    setOpenModal: (isOpenModal: boolean) => void
    getAllCombineRoleWithPermission: () => void
}

export const useSettingRole = (): SettingRoleType => {
    const dispatch = useAppDispatch()
    const settingRoleState = useAppSelector(
        (state: RootState) => state.settingRole,
    )

    const setOpenModal = useCallback(
        (isOpenModal: boolean) => {
            dispatch(setOpenModalRegisterRole({ isOpenModal }))
        },
        [dispatch],
    )

    const getAllCombineRoleWithPermission = useCallback(() => {
        dispatch(getCombineRoleWithPermission(null))
    }, [dispatch])

    return {
        settingRoleState,
        setOpenModal,
        getAllCombineRoleWithPermission,
    }
}
