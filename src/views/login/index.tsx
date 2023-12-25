import { useNotification } from '@/hooks/use-notification'
import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { EActionStatus } from '@/stores/type'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
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
        // eslint-disable-next-line
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
                    message: t('MSG_ERR_SYSTEM_ADMIN_00000'),
                    placement: 'topRight',
                    type: 'error',
                })
            }
        })()
        // eslint-disable-next-line
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
                    <Text className="text-3xl font-bold">
                        {t('COCOKITENE')}
                    </Text>
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
                            className="font-bold"
                            name="email"
                            label={t('EMAIL')}
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input size="large" className="font-normal" />
                        </Form.Item>
                        <Form.Item
                            className="font-bold"
                            name="password"
                            label={t('PASSWORD')}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                            style={{ marginBottom: '10px' }}
                        >
                            <Input.Password
                                size="large"
                                className="font-normal"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '10px' }}>
                            <a className="login-form-forgot" href="">
                                Forgot password?
                            </a>
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

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{' '}
                            <a
                                href="#"
                                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
