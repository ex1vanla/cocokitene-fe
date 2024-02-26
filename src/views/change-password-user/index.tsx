/* eslint-disable */
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'

import { Button, Form, Input, Typography, notification } from 'antd'
import LayoutTitle from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'
import serviceUser from '@/services/user'

const { Title } = Typography
export interface IPasswordForm {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const ChangeUserPassword = () => {
    const t = useTranslations()
    const router = useRouter()
    const [form] = useForm<IPasswordForm>()
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)

    const validatePassword = (_: any, value: string) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!value) {
            return Promise.reject('Please input your new password!')
        }

        if (!regex.test(value)) {
            return Promise.reject(
                'Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one digit.',
            )
        }

        // Reset confirm password error when password changes
        form.setFields([{ name: 'confirmPassword', errors: [] }])
        setConfirmPasswordError(null)

        return Promise.resolve()
    }

    const onFinish = async (values: any) => {
        // console.log('Value :', values)
        try {
            const response = await serviceUser.changePasswordUser({
                currentPassword: values.currentPassword,
                newPassword: values.confirmPassword,
            })
            notification.success({
                message: t('SUCCESS'),
                description: response,
            })
            router.push('/dashboard')
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: error.response?.data.info.message,
                })
            }
        }
    }

    return (
        <div>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <LayoutTitle>
                    <div className="flex items-center gap-2">
                        <ArrowLeftOutlined
                            onClick={() => {
                                router.back()
                            }}
                        />
                        <Title level={4} className="mb-0 font-medium">
                            {t('CHANGE_PASSWORD')}
                        </Title>
                    </div>
                </LayoutTitle>
                <div className="mx-auto mt-6 flex flex-col justify-center rounded-md bg-white p-8 shadow-lg md:w-[500px] md:max-w-md">
                    <Form.Item
                        className="font-semibold"
                        name="currentPassword"
                        label={t('CURRENT_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    {/* New Password */}
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="newPassword"
                        label={t('NEW_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                validator: validatePassword,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('currentPassword') !==
                                            value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered  must be different from the old password!',
                                        ),
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="confirmPassword"
                        label={t('CONFIRM_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!',
                                        ),
                                    )
                                },
                            }),
                        ]}
                        validateStatus={confirmPasswordError ? 'error' : ''}
                        help={confirmPasswordError}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '24px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('SAVE')}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default withAuth(ChangeUserPassword, Permissions.EDIT_PROFILE)
