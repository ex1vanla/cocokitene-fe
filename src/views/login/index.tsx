import { useNotification } from '@/hooks/use-notification'
import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { EActionStatus } from '@/stores/type'
import { Button, Form, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const { Text } = Typography

const Login = () => {
    const t = useTranslations()

    const { authAdminState, loginAdminAction, resetStatusLogin } =
        useAuthAdminLogin()
    const { openNotification, contextHolder } = useNotification()
    const onFinish = (values: any) => {
        loginAdminAction({ email: values.email, password: values.password })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    const router = useRouter()

    useEffect(() => {
        ;(async () => {
            if (authAdminState.status === EActionStatus.Succeeded) {
                await openNotification({
                    message: 'Login Successfully!',
                    placement: 'topRight',
                    type: 'success',
                })
                resetStatusLogin()
                await new Promise((resolve) => setTimeout(resolve, 1000))
                await router.push('/company')
            }

            if (authAdminState.status === EActionStatus.Failed) {
                openNotification({
                    message: authAdminState.errMessage,
                    placement: 'topRight',
                    type: 'error',
                })
            }
        })()
    }, [authAdminState.status])

    return (
        <div className="flex min-h-screen bg-login-bg bg-cover bg-center">
            {contextHolder}
            <div className="mx-auto flex flex-col justify-center sm:py-12 md:w-full md:max-w-md">
                <div className="flex items-center justify-center gap-5">
                    <Image
                        src={'/images/logo-icon.png'}
                        alt={''}
                        width={48}
                        height={48}
                    />
                    <Text className="text-3xl font-bold">{t('COCOKITENE')}</Text>
                </div>
                <div className="mb-10 mt-3 flex items-center justify-center">
                    <Text className="text-sm">{t('TITLE_SYSTEM_LOGIN')}</Text>
                </div>

                <div className="mb-6">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            label={t('EMAIL')}
                            rules={[{ required: true, type: 'email' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={t('PASSWORD')}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                            >
                                {t('SUBMIT')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
