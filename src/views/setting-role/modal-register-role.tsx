import { useSettingRole } from '@/stores/setting-role/hooks'
import { Modal } from 'antd'
import { useState } from 'react'

const ModalRegisterRole = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { settingRoleState, setOpenModal } = useSettingRole()
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setOpenModal(false)
    }
    return (
        <>
            <Modal
                title="Create and account"
                open={settingRoleState.openModalRegisterRole}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                
            </Modal>
        </>
    )
}

export default ModalRegisterRole
