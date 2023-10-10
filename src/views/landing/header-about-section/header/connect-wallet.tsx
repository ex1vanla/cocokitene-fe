'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { RootState, useAppDispatch } from '@/stores'
import { getNonceThunk, login } from '@/stores/auth/thunk'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAccount, useSignMessage } from 'wagmi'

const ConnectWallet = () => {
    const { data: signMessageData, signMessage } = useSignMessage()
    const t = useTranslations()
    const { isConnected, address } = useAccount()
    const dispatch = useAppDispatch()
    const auth = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if (isConnected) {
            dispatch(getNonceThunk(address ?? '') as any)
        }
    }, [dispatch, isConnected])

    useEffect(() => {
        if (auth.nonce != '') {
            signMessage({
                message: 'Please confirm to login - nonce:' + auth.nonce,
            })
        }
    }, [auth.nonce])

    useEffect(() => {
        if (signMessageData && signMessageData != null) {
            dispatch(
                login({
                    walletAddress: address ?? '',
                    signature: signMessageData,
                }),
            )
        }
    }, [signMessageData])
    return (
        <>
            <ButtonConnectWallet
                connectWalletText={t('CONNECT_WALLET')}
                wrongNetworkText={t('WRONG_NETWORK')}
                isAuthenticated={auth.isAuthenticated}
            />
        </>
    )
}

export default ConnectWallet
