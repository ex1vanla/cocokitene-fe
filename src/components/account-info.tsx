'use client'

import { useAuthLogin } from '@/stores/auth/hooks'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDisconnect } from 'wagmi'

const { Text } = Typography
const AccountInfo = ({ name, avatar }: { name: string; avatar: string }) => {
    const router = useRouter()
    const t = useTranslations()
    const { disconnect } = useDisconnect()
    const {authState, logoutAction} = useAuthLogin();
    const handleLogout = () => {
        logoutAction();
        disconnect();
        router.push('/en');
    }

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <Link
                    className="py-[5px] text-sm leading-[22px]"
                    rel="noopener noreferrer"
                    href="/dashboard"
                >
                    {t('DASHBOARD')}
                </Link>
            ),
        },
        {
            key: '1',
            label: (
                <Link
                    className="py-[5px] text-sm leading-[22px]"
                    rel="noopener noreferrer"
                    href="/role"
                >
                    {t('ROLE')}
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    className="py-[5px] text-sm  leading-[22px]"
                    rel="noopener noreferrer"
                    href="/profile"
                >
                    {t('MY_PROFILE')}
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    className="py-[5px] text-sm  leading-[22px]"
                    rel="noopener noreferrer"
                    href="/reset-password"
                >
                    {t('RESET_PASSWORD')}
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <div
                    className="py-[5px] text-sm leading-[22px]"
                    onClick={() => handleLogout()}
                >
                    {t('LOGOUT')}
                </div>
            ),
        },
    ]

    return (
        <Dropdown
            arrow={true}
            menu={{ items }}
            placement="bottomLeft"
            overlayStyle={{ borderRadius: '2px' }}
            className="cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image src={avatar} alt={'avatar'} width={24} height={24} />
                    <Text className="text-sm leading-[22px] text-white">
                        {authState.userData?.username ?? "Unknow"}
                    </Text>
                </div>
                <DownOutlined className="h-[10px] w-[10px] text-white" />
            </div>
        </Dropdown>
    )
}

export default AccountInfo
