import { useEffect, useState } from 'react'
import { useSettingRoleMtg } from '@/stores/setting-role-mtg/hook'
import { EActionStatus } from '@/stores/type'
import serviceSettingRoleMtg from '@/services/setting-role-mtg'
import { useForm } from 'antd/es/form/Form'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import { AxiosError } from 'axios'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { useTranslations } from 'next-intl'
import { enumToArray } from '@/utils'
import { IRoleMtgForm } from '@/views/setting-role/modal-register-role-mtg'
import Loader from '@/components/loader'

export interface IRoleMtgUpdateForm {
    roleName: string
    description: string
    type: TypeRoleMeeting
}

const ModalUpdateRoleMtg = () => {
    const t = useTranslations()

    const {
        settingRoleMtgState,
        getListRoleMtgAction,
        setOpenModalUpdatedRoleMtg,
        setIdMOpenModalUpdateRoleMtg,
    } = useSettingRoleMtg()
    // const
    const [initStatus, setInitStatus] = useState<EActionStatus>(
        EActionStatus.Idle,
    )
    const [form] = useForm<IRoleMtgUpdateForm>()
    const [initRoleMtg, setInitRoleMtg] = useState<IRoleMtgUpdateForm>()
    const roleMtgId = Number(settingRoleMtgState.id)
    useEffect(() => {
        const fetchData = async () => {
            setInitStatus(EActionStatus.Pending)
            try {
                const res = await serviceSettingRoleMtg.getDetailRoleMtg(
                    roleMtgId,
                )
                if (res) {
                    setInitRoleMtg({
                        roleName: t(res.roleName),
                        description: res.description,
                        type: res.type,
                    })
                }

                setInitStatus(EActionStatus.Succeeded)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: error.response?.data.info.message,
                    })
                }

                setInitStatus(EActionStatus.Failed)
            }
        }
        if (roleMtgId) {
            fetchData()
        }
    }, [roleMtgId])
    useEffect(() => {
        form.setFieldsValue({
            roleName: initRoleMtg?.roleName,
            type: initRoleMtg?.type,
            description: initRoleMtg?.description,
        })
    }, [initRoleMtg])
    const handleOk = () => {}

    const handleCancel = () => {
        form.resetFields()
        setOpenModalUpdatedRoleMtg(false)
        setIdMOpenModalUpdateRoleMtg(0)
        setInitRoleMtg(undefined)
    }
    const onFinish = async (values: IRoleMtgForm) => {
        try {
            const res = await serviceSettingRoleMtg.updateRoleMtg(roleMtgId, {
                roleName: values.roleName,
                description: values.description,
                type: values.type ?? TypeRoleMeeting.SHAREHOLDER_MTG,
            })

            if (res) {
                notification.success({
                    message: t('UPDATED'),
                    description: t('CREATE_UPDATE_ROLE_MTG'),
                })
                form.resetFields()
                setOpenModalUpdatedRoleMtg(false)
                setIdMOpenModalUpdateRoleMtg(0)
                getListRoleMtgAction(settingRoleMtgState)
                setInitRoleMtg(undefined)
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
    if (!initRoleMtg || initStatus === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <Modal
            title={t('TITLE_UPDATE_ROLE_MTG')}
            open={settingRoleMtgState.openModalUpdateRoleMtg}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
        >
            <div className="mb-6">
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={{ ...initRoleMtg }}
                    onFinish={onFinish}
                >
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

export default ModalUpdateRoleMtg
