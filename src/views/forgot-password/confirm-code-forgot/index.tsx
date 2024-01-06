import { ScreenForgotPassword } from '@/constants/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { RedoOutlined } from '@ant-design/icons'
import {
    Button,
    Form,
    Input,
    Spin,
    Tooltip,
    Typography,
    notification,
} from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Text } = Typography
const ConfirmCodeForgot = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [countdown, setCountdown] = useState(10)
    const { forgotPasswordState, setScreenForgotPassword } = useForgotPassword()

    const onFinish = (values: any) => {
        setScreenForgotPassword(ScreenForgotPassword.RESET_PASSWORD)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) =>
                prevCountdown > 0 ? prevCountdown - 1 : 0,
            )
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleRetryCode = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 5000))
        notification.success({
            message: 'Successfully',
        })
        setCountdown(10)
        setIsLoading(false)
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">Verification Code</Text>
            </div>
            <div className="mb-8 mt-3 ">
                <div className="flex items-center justify-center">
                    <Text className="text-sm">
                        We have sent a verification code to your{' '}
                        <span className="font-semibold">
                            {forgotPasswordState.email}
                        </span>
                        . Please enter the code in the textbox below. Code will
                        be valid for 90 seconds.
                    </Text>
                </div>

                <div className="text-red-500">
                    {countdown == 0 && 'Code has expired.'}
                </div>
            </div>

            <div className="mb-6">
                <Form
                    name="confirmCodeForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="email"
                        label={'Enter verification code'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your verification code!',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            className="font-normal"
                            placeholder="Hju7HX"
                        />
                    </Form.Item>

                    {countdown > 0 ? (
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button
                                disabled={countdown == 0}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                            >
                                Confirm Code{' '}
                                {countdown >= 0 && '(' + countdown + ')'}
                            </Button>
                        </Form.Item>
                    ) : (
                        <Spin spinning={isLoading} delay={0}>
                            <Tooltip title="Retry Code">
                                <div className="mb-5 flex justify-center">
                                    <RedoOutlined
                                        className="text-xl text-[#1677ff] hover:cursor-pointer hover:text-[#6087b1]"
                                        onClick={handleRetryCode}
                                    />
                                </div>
                            </Tooltip>
                        </Spin>
                    )}

                    <Text
                        className="flex cursor-pointer items-center justify-center font-medium text-[#1677ff] hover:text-[#6087b1] hover:underline"
                        onClick={() =>
                            setScreenForgotPassword(
                                ScreenForgotPassword.SEND_MAIL,
                            )
                        }
                    >
                        Back to Previous Page
                    </Text>
                </Form>
            </div>
        </>
    )
}

export default ConfirmCodeForgot
