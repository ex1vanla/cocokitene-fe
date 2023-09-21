import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CHAINS } from '@/connect-wallet/chains'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    CHAINS,
    [publicProvider()],
)

const projectId = 'a0b1a5cdc30d5cefee76a1037d04102a'

const { wallets } = getDefaultWallets({
    appName: 'Cocokitene',
    projectId,
    chains,
})

export const connectors = connectorsForWallets([...wallets])

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})
