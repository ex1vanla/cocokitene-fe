import { ScreenForgotPassword } from '@/constants/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { Button, Form, Input, Typography } from 'antd'
import { useState } from 'react'
const { Text } = Typography
const ResetPassword = () => {
    const [form] = Form.useForm()
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)

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

    const validateConfirmPassword = async (_: any, value: string) => {
        await form.validateFields(['password']) // Make sure password field is validated

        const password = form.getFieldValue('password')
        if (password !== value) {
            setConfirmPasswordError('Passwords do not match')
            return Promise.reject('Passwords do not match')
        }

        setConfirmPasswordError(null)
        return Promise.resolve()
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">Reset password</Text>
            </div>
            <div className="mb-8 mt-3 flex items-center justify-center">
                <Text className="text-sm">
                    Please enter the email address you'd like your password
                    reset information sent to.
                </Text>
            </div>
            <div className="mb-6">
                <Form
                    name="resetPassword"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="password"
                        label={'New Password'}
                        rules={[
                            {
                                validator: validatePassword,
                            },
                        ]}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="confirmPassword"
                        label={'Confirm Password'}
                        rules={[
                            {
                                validator: validateConfirmPassword,
                            },
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
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default ResetPassword
