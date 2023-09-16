import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CHAINS } from './chains'
import { alchemyProvider } from 'wagmi/dist/providers/alchemy'
import { publicProvider } from 'wagmi/dist/providers/public'
import { configureChains, createConfig } from 'wagmi'

export const { chains, publicClient } = configureChains(CHAINS, [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? '' }),
    publicProvider(),
])

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
    },
})

export const wagmiConfig = createConfig({
    autoConnect: false,
    publicClient,
    connectors: [metaMaskConnector],
})
