'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { signMessage } from 'wagmi/actions'

const ConnectWallet = () => {
    const [signature, setSignature] = useState<string | null>(null);
    const t = useTranslations()
    const { isConnected, address } = useAccount()
    const {authState, loginAction, getNonceAction} = useAuthLogin()
    useEffect(() => {
        if (isConnected && !authState.isAuthenticated) {
            getNonceAction(address ?? '')
        }
    }, [isConnected])

    useEffect(() => {
        (async () => {
            if (authState.nonce) {
                const sign = await signMessage({
                    message: 'Please confirm to login - nonce:' + authState.nonce,
                });
                if (sign) setSignature(sign);
            }
        })();
    }, [authState.nonce])

    useEffect(() => {
        if (signature) {
            loginAction({
                walletAddress: address ?? CONSTANT_EMPTY_STRING,
                signature: signature,
            })
        }
    }, [signature])
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
