import { useSettingRoleMtg } from '@/stores/setting-role-mtg/hook'
import { useTranslations } from 'next-intl'
import { useForm } from 'antd/es/form/Form'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { useEffect, useMemo } from 'react'
import { enumToArray } from '@/utils'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import { AxiosError } from 'axios'
import serviceSettingRoleMtg from '@/services/setting-role-mtg'

export interface IRoleMtgForm {
    roleName: string
    description: string
    type?: TypeRoleMeeting | null
}

const ModalRegisterRoleMtg = () => {
    const t = useTranslations()
    const [form] = useForm<IRoleMtgForm>()

    const { settingRoleMtgState, getListRoleMtgAction, setOpenModalRoleMtg } =
        useSettingRoleMtg()

    // const [selectedItem, setSelectedItem] = useState<TypeSelectTypeRoleMtg>()

    const handleOk = () => {}

    const handleCancel = () => {
        form.resetFields()
        setOpenModalRoleMtg(false)
    }

    const typeRoleMtgDefalt = useMemo(() => {
        const enumArray = enumToArray(TypeRoleMeeting)
        const defaultValue = enumArray.find(
            (item) => item === TypeRoleMeeting.SHAREHOLDER_MTG,
        )
        return defaultValue || null
    }, [enumToArray(TypeRoleMeeting)])

    useEffect(() => {
        form.setFieldsValue({
            type: typeRoleMtgDefalt,
        })
    }, [typeRoleMtgDefalt])
    const onFinish = async (values: IRoleMtgForm) => {
        try {
            const res = await serviceSettingRoleMtg.createRoleMtg({
                roleName: values.roleName,
                description: values.description,
                type: values.type ?? TypeRoleMeeting.SHAREHOLDER_MTG,
            })
            if (res) {
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATE_NEW_ROLE'),
                })
                form.resetFields()
                setOpenModalRoleMtg(false)
                getListRoleMtgAction(settingRoleMtgState)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: error?.response?.data.info.message,
                })
            }
        }
    }

    return (
        <Modal
            title={t('TITLE_CREATE_ROLE_MTG')}
            open={settingRoleMtgState.openModalRegisterRoleMtg}
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
                        label={t('ROLE_MTG_NAME')}
                        rules={[
                            {
                                required: true,
                                message: t('PLEASE_INPUT_YOUR_ROLE_MTG_NAME'),
                            },
                        ]}
                    >
                        <Input size="large" placeholder={t('ROLE_MTG_NAME')} />
                    </Form.Item>
                    <Form.Item name="description" label={t('DESCRIPTION')}>
                        <Input size="large" placeholder={t('DESCRIPTION')} />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label={t('SELECT_TYPE_ROLE_MTG')}
                        rules={[
                            {
                                required: true,
                                message: t('PLEASE_INPUT_YOUR_TYPE'),
                            },
                        ]}
                    >
                        <Select
                            placeholder={t('TYPE')}
                            style={{ width: '100%' }}
                            size="large"
                            options={enumToArray(TypeRoleMeeting).map(
                                (type) => ({
                                    value: type,
                                    label: <span>{t(type)}</span>,
                                }),
                            )}
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
                            {t('CANCEL')}
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

export default ModalRegisterRoleMtg
