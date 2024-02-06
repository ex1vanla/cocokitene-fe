import { useNotification } from '@/hooks/use-notification'
import { useAuthLogin } from '@/stores/auth/hooks'
import { EActionStatus } from '@/stores/type'
import { DownOutlined } from '@ant-design/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Form, Input, Modal, Typography } from 'antd'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const { Text } = Typography
interface IButtonProp {
    connectWalletText: string
    wrongNetworkText: string
    isAuthenticated: boolean | null
}

const ButtonConnectWallet = ({
    connectWalletText,
    wrongNetworkText,
    isAuthenticated,
}: IButtonProp) => {
    const t = useTranslations()
    const { openNotification, contextHolder } = useNotification()
    const { authState, loginByEmailAction } = useAuthLogin()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (authState.isAuthenticated) {
            setIsModalOpen(false)
        }
    }, [authState])

    const onFinish = async (values: any) => {
        //Call Api
        loginByEmailAction(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            if (
                authState.status === EActionStatus.Succeeded &&
                authState.userData
            ) {
                await openNotification({
                    message: 'Login Successfully!!!!',
                    placement: 'topRight',
                    type: 'success',
                })
                // await new Promise((resolve) => setTimeout(resolve, 1000))
                // await router.push('/dashboard')
            }

            if (authState.status === EActionStatus.Failed) {
                openNotification({
                    message: t('MSG_ERR_USER_LOGIN_00000'),
                    placement: 'topRight',
                    type: 'error',
                })
            }
        })()
        // eslint-disable-next-line
    }, [authState.status])

    return (
        <div>
            {contextHolder}
            <ConnectButton.Custom>
                {({ chain, openChainModal, openConnectModal, mounted }) => {
                    const ready = mounted
                    const connected = ready

                    return (
                        <div>
                            <Modal
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                {(() => {
                                    return (
                                        <div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Image
                                                    src={
                                                        '/images/logo-icon.png'
                                                    }
                                                    alt={''}
                                                    width={48}
                                                    height={48}
                                                />
                                                <Text className="text-3xl font-bold">
                                                    {t('LOGIN')}
                                                </Text>
                                            </div>
                                            <div className="mb-4 mt-3 flex items-center justify-center">
                                                <Text className="text-sm">
                                                    {t('TITLE_SYSTEM_LOGIN')}
                                                </Text>
                                            </div>
                                            <div className="flex flex-col text-center ">
                                                <Button
                                                    onClick={openConnectModal}
                                                    type="default"
                                                    size="large"
                                                    className="mx-auto mb-4 text-base font-normal text-primary"
                                                >
                                                    {connectWalletText}
                                                </Button>
                                                <div className="mb-2 text-2xl font-bold">
                                                    {t('OR')}
                                                </div>
                                                <div className="mb-6">
                                                    <Form
                                                        layout="vertical"
                                                        onFinish={onFinish}
                                                        onFinishFailed={
                                                            onFinishFailed
                                                        }
                                                    >
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="companyName"
                                                            label={t(
                                                                'COMPANY_NAME',
                                                            )}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        'Please input your company!',
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="email"
                                                            label={t('EMAIL')}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    type: 'email',
                                                                    message:
                                                                        'Please input your Email!',
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="password"
                                                            label={t(
                                                                'PASSWORD',
                                                            )}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    whitespace:
                                                                        true,
                                                                    message:
                                                                        'Please input your Password!',
                                                                },
                                                            ]}
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Input.Password
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Link
                                                                className="login-form-forgot"
                                                                href="/forgot-password"
                                                            >
                                                                {t(
                                                                    'FORGOT_PASSWORD',
                                                                )}
                                                            </Link>
                                                        </Form.Item>

                                                        <Form.Item
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Button
                                                                size="large"
                                                                type="primary"
                                                                htmlType="submit"
                                                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                                                            >
                                                                {t('SIGN_IN')}
                                                            </Button>
                                                        </Form.Item>

                                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                            {t(
                                                                'DONT_HAVE_AN_ACCOUNT_YET',
                                                            )}{' '}
                                                            <Link
                                                                href="#"
                                                                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                                                            >
                                                                {t('SIGN_UP')}
                                                            </Link>
                                                        </p>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </Modal>
                            {(() => {
                                if (
                                    (isAuthenticated == null ||
                                        isAuthenticated === false) &&
                                    connected
                                ) {
                                    return (
                                        <Button
                                            onClick={showModal}
                                            type="default"
                                            size="large"
                                            className="text-base font-normal text-primary "
                                        >
                                            {t('LOGIN')}
                                        </Button>
                                    )
                                }

                                if (chain && chain.unsupported) {
                                    return (
                                        <Button
                                            onClick={openChainModal}
                                            type="default"
                                            size="large"
                                            className="flex items-center text-base font-normal "
                                            danger
                                        >
                                            {wrongNetworkText}
                                            <DownOutlined
                                                style={{ marginLeft: '8px' }}
                                            />
                                        </Button>
                                    )
                                }

                                return (
                                    <div>
                                        <button
                                            onClick={openChainModal}
                                            className="flex items-center gap-2 py-1 text-sm text-white"
                                            type="button"
                                        >
                                            {chain && chain.iconUrl && (
                                                <Image
                                                    src={chain.iconUrl}
                                                    alt={
                                                        chain.name ??
                                                        'Chain icon'
                                                    }
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {chain && chain.name}
                                            <DownOutlined className="h-[10px] w-[10px] text-white" />
                                        </button>
                                    </div>
                                )
                            })()}
                        </div>
                    )
                }}
            </ConnectButton.Custom>
        </div>
    )
}

export default ButtonConnectWallet
