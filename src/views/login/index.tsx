import { useNotification } from '@/hooks/use-notification'
import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { EActionStatus } from '@/stores/type'
import { Button, Form, Input, Typography } from 'antd'
import Image from 'next/image'
import { useEffect } from 'react'
const { Text } = Typography

const Login = () => {
    const { authAdminState, loginAdminAction } = useAuthAdminLogin()
    const { openNotification, contextHolder } = useNotification()
    const onFinish = (values: any) => {
        loginAdminAction({ email: values.email, password: values.password })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    useEffect(() => {
        if (authAdminState.status === EActionStatus.Succeeded) {
            openNotification({
                message: 'Login Successfully!',
                placement: 'topRight',
                type: 'success',
            })
        }

        if (authAdminState.status === EActionStatus.Failed) {
            openNotification({
                message: authAdminState.errMessage,
                placement: 'topRight',
                type: 'error',
            })
        }
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
                    <Text className="text-3xl font-bold">Cocokitene</Text>
                </div>
                <div className="mb-10 mt-3 flex items-center justify-center">
                    <Text className="text-sm">
                        General meeting management support system
                    </Text>
                </div>

                <div className="mb-6">
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            label={'Email'}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={'Password'}
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
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
