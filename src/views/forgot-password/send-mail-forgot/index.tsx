import { ScreenForgotPassword } from '@/constants/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { Button, Form, Input, Typography } from 'antd'
import Link from 'next/link'

const { Text } = Typography
const SendMailForgot = () => {
    const {
        forgotPasswordState,
        setScreenForgotPassword,
        setEmailForgotPassword,
    } = useForgotPassword()

    const onFinish = (values: any) => {
        setEmailForgotPassword(values?.email)
        setScreenForgotPassword(ScreenForgotPassword.CONFIRM_CODE)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">Forgot your password</Text>
            </div>
            <div className="mb-8 mt-3 flex items-center justify-center">
                <Text className="text-sm">
                    Please enter the email address you'd like your password
                    reset information sent to.
                </Text>
            </div>
            <div className="mb-6">
                <Form
                    name="sendMailForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ email: forgotPasswordState.email ?? null }}
                >
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="email"
                        label={'Enter email address'}
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            className="font-normal"
                            placeholder="abc@gmail.com"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '24px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            Request password reset
                        </Button>
                    </Form.Item>

                    <Link
                        href="/login"
                        className="text-primary-600 flex items-center justify-center font-medium hover:underline"
                    >
                        Back To Login
                    </Link>
                </Form>
            </div>
        </>
    )
}

export default SendMailForgot
