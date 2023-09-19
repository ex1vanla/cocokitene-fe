import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CHAINS } from './chains'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    CHAINS,
    [publicProvider()],
)

const projectId = 'YOUR_PROJECT_ID'

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
