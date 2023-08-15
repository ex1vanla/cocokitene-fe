import React from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { Typography } from 'antd'

const { Text } = Typography
const Account = ({ name, avatar }: { name: string; avatar: string }) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link
                    className="py-[5px] text-sm leading-[22px]"
                    rel="noopener noreferrer"
                    href="/role"
                >
                    Role
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
                    My Profile
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
                    Reset Password
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <div className="py-[5px] text-sm leading-[22px]">Logout</div>
            ),
        },
    ]

    return (
        <Dropdown
            arrow={true}
            menu={{ items }}
            placement="bottomLeft"
            overlayStyle={{ borderRadius: '2px' }}
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

export default Account
