'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { useTranslations } from 'next-intl'

const ConnectWallet = () => {
    const t = useTranslations()

    return (
        <ButtonConnectWallet
            connectWalletText={t('CONNECT_WALLET')}
            wrongNetworkText={t('WRONG_NETWORK')}
        />
    )
}

export default ConnectWallet
