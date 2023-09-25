'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { RootState, useAppDispatch } from '@/stores'
import { getNonceThunk } from '@/stores/auth/thunk'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAccount, useSignMessage } from 'wagmi'

const ConnectWallet = () => {
    const {
        data: signMessageData,
        signMessage,
    } = useSignMessage()
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
                message: 'Login ' + auth.nonce
            })
        }
    }, [auth.nonce])
    return (
        <>
            <ButtonConnectWallet
                connectWalletText={t('CONNECT_WALLET')}
                wrongNetworkText={t('WRONG_NETWORK')}
            />
        </>
    )
}

export default ConnectWallet
