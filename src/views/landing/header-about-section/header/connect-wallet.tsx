'use client'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

const ConnectWallet = () => {
    const t = useTranslations()

    return (
        <Button type="default" className="h-10 rounded-sm px-6 py-[7px]">
            <Text className="text-base font-normal text-primary">
                {t('CONNECT_WALLET')}
            </Text>
        </Button>
    )
}

export default ConnectWallet
