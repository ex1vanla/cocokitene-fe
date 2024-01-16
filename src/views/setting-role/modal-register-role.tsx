import { IPermissionResponse } from '@/services/response.type'
import serviceSettingRole from '@/services/setting-role'
import { useSettingRole } from '@/stores/setting-role/hooks'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { Button, Form, Input, Modal, Select, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

interface TypeSelect {
    value: number
    label: string
}

export interface IRoleForm {
    roleName: string
    description: string
    permissions: string[]
}

const ModalRegisterRole = () => {
    const t = useTranslations()
    const [form] = useForm<IRoleForm>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { settingRoleState, setOpenModal } = useSettingRole()
    const [selectedItems, setSelectedItems] = useState<TypeSelect[]>([])
    const [permissions, setPermissions] = useState<TypeSelect[]>([])

    const filteredOptions = useMemo(
        () => permissions.filter((o) => !selectedItems.includes(o)),
        [selectedItems, permissions],
    )

    useEffect(() => {
        ;(async () => {
            try {
                const result = await serviceSettingRole.getAllPermissions(
                    1,
                    100,
                )
                const data = result.map((item) => ({
                    value: item.id,
                    label: convertSnakeCaseToTitleCase(item.key),
                }))
                setPermissions(data)
            } catch (error) {
                console.log('error', error)
                notification.error({
                    message: 'error',
                })
            }
        })()
    }, [])

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        form.resetFields()
        setOpenModal(false)
    }

    const onFinish = async (values: IRoleForm) => {
        console.log('values', values)
    }
    return (
        <Modal
            title="Create role permission"
            open={settingRoleState.openModalRegisterRole}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
        >
            <div className="mb-6">
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name="roleName"
                        label="Role Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Role Name!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Role Name" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input size="large" placeholder="Description" />
                    </Form.Item>

                    <Form.Item
                        name="permissions"
                        label="Select Permissions"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Permissions!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Permissions"
                            value={selectedItems}
                            onChange={setSelectedItems}
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="label"
                            size="large"
                            options={filteredOptions.map((item) => ({
                                value: item.value,
                                label: item.label,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 24 }}
                        className="mt-10 flex justify-center"
                    >
                        <Button
                            size="large"
                            className="bg-#5151E5 rounded text-center text-sm font-semibold shadow-sm transition duration-200 hover:border-white hover:bg-[#e9eaeb] hover:text-black"
                            style={{ marginRight: '30px' }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('SUBMIT')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalRegisterRole
