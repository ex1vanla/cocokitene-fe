'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

const ConnectWallet = () => {
    const { data: signMessageData, signMessage } = useSignMessage()
    const t = useTranslations()
    const { isConnected, address } = useAccount()
    const {authState, loginAction, getNonceAction} = useAuthLogin()
    useEffect(() => {
        if (isConnected) {
            getNonceAction(address ?? '')
        }
    }, [isConnected])

    useEffect(() => {
        if (authState.nonce != '') {
            signMessage({
                message: 'Please confirm to login - nonce:' + authState.nonce,
            })
        }
    }, [authState.nonce])

    useEffect(() => {
        if (signMessageData && signMessageData != null) {
            loginAction({
                walletAddress: address ?? CONSTANT_EMPTY_STRING,
                signature: signMessageData,
            })
        }
    }, [signMessageData])
    return (
        <>
            <ButtonConnectWallet
                connectWalletText={t('CONNECT_WALLET')}
                wrongNetworkText={t('WRONG_NETWORK')}
                isAuthenticated={authState.isAuthenticated}
            />
        </>
    )
}

export default ConnectWallet
