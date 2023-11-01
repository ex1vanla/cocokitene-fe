import { Button, Modal, Spin, Typography } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { LogoAppIcon } from '../svgs'
import { useAuthLogin } from '@/stores/auth/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const { Text } = Typography

const ConnectWallet = dynamic(
    () =>
        import(
            '../../views/landing/header-about-section/header/connect-wallet'
        ),
    {
        loading: () => <Spin />,
        ssr: false,
    },
)

const Page401 = () => {
    const { authState } = useAuthLogin()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(!authState.isAuthenticated)

    return (
        <div className="grid h-[calc(100vh-3rem)] place-content-center px-4">
            {isModalOpen && (
                <div className="h-modal fixed inset-0 left-0 right-0 top-0 z-50 grid h-full w-full place-items-center items-center justify-center backdrop-blur-sm">
                    <div className="container relative m-auto px-6">
                        <div className="m-auto md:w-7/12">
                            <div className="rounded-xl bg-white shadow-xl ">
                                <div className="p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={'/images/logo-icon.png'}
                                                alt={''}
                                                width={32}
                                                height={32}
                                            />
                                            <Text className="text-lg font-bold text-cyan-900">
                                                Cocokitene
                                            </Text>
                                        </div>
                                        <h2 className="mb-8 text-2xl font-bold text-cyan-900 ">
                                            Connect Wallet to unlock the best of
                                            Cocokitene.
                                        </h2>
                                    </div>
                                    <div className="mt-10 flex justify-center gap-2">
                                        <Button
                                            onClick={() => {
                                                router.push('/')
                                            }}
                                            type="default"
                                            size="large"
                                            className="rounded bg-indigo-600 text-base text-sm font-medium font-normal text-white"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Go Back Home
                                        </Button>
                                        <ConnectWallet />
                                    </div>
                                    <div className="mt-10 space-y-4 py-3 text-center text-gray-600 ">
                                        <p className="text-xs">
                                            By proceeding, you agree to our{' '}
                                            <a
                                                href="/privacy-policy/"
                                                className="underline"
                                            >
                                                Terms of Use{' '}
                                            </a>
                                            and confirm you have read our{' '}
                                            <a
                                                href="/privacy-policy/"
                                                className="underline"
                                            >
                                                Privacy and Cookie Statement
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page401
