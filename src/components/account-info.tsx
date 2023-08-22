'use client'

import React from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Text } = Typography
const AccountInfo = ({ name, avatar }: { name: string; avatar: string }) => {
    const t = useTranslations()

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
                <div className="py-[5px] text-sm leading-[22px]">
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
                        {name}
                    </Text>
                </div>
                <DownOutlined className="h-[10px] w-[10px] text-white" />
            </div>
        </Dropdown>
    )
}

export default AccountInfo
