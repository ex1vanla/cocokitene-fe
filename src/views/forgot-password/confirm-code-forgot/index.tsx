import {
    ScreenForgotPassword,
    accessTime,
    linkSignInEmail,
} from '@/constants/forgot-password'
import servicePassword from '@/services/system-admin/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { RedoOutlined } from '@ant-design/icons'
import { Button, Form, Spin, Tooltip, Typography, notification } from 'antd'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Text } = Typography
const ConfirmCodeForgot = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [countdown, setCountdown] = useState(accessTime)
    const { forgotPasswordState, setScreenForgotPassword } = useForgotPassword()

    const t = useTranslations()
    const router = useRouter()

    const onFinish = () => {}

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
        console.log('forgotPasswordState:', forgotPasswordState.email)
        try {
            const response = await servicePassword.sendEmailForgotPassword({
                email: forgotPasswordState?.email || '',
            })
            notification.success({
                message: t('SUCCESS'),
                description: response,
            })
            setCountdown(accessTime)
            setIsLoading(false)
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
        <>
            <div>
                <Text className="text-3xl font-bold">
                    Please check your Email
                </Text>
            </div>
            <div className="mb-8 mt-3 ">
                <div className="flex items-center justify-center">
                    <Text className="text-sm">
                        We have sent a email to{' '}
                        <span className="font-semibold">
                            {forgotPasswordState.email}
                        </span>
                        . Please check your email. It will be valid for 90
                        seconds.
                    </Text>
                </div>

                <div className="text-red-500">
                    {countdown == 0 && 'Link has expired.'}
                </div>
            </div>

            <div className="mb-6">
                <Form
                    name="confirmCodeForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {countdown > 0 ? (
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button
                                onClick={() => {
                                    router.push(linkSignInEmail)
                                }}
                                disabled={countdown == 0}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                            >
                                Go to Gmail
                                {countdown >= 0 && '(' + countdown + ')'}
                            </Button>
                        </Form.Item>
                    ) : (
                        <Spin spinning={isLoading} delay={0}>
                            <Tooltip title="Retry Email">
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
