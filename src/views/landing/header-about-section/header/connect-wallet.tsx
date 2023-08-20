'use client'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import React from 'react'

const ConnectWallet = () => {
    const t = useTranslations()

    return (
        <Button
            type="default"
            size="large"
            className="text-base font-normal text-primary"
        >
            {t('CONNECT_WALLET')}
        </Button>
    )
}

export default ConnectWallet
