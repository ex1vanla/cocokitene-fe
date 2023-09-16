import StyledComponentsRegistry from '@/theme/ant-registry'
import theme from '@/theme/theme-config'
import '@rainbow-me/rainbowkit/styles.css'
import { ConfigProvider } from 'antd'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { FC, ReactNode } from 'react'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { chains, wagmiConfig } from './connect-wallet/wagmi'

interface ProvidersProps {
    children: ReactNode
    locale: string
    messages: AbstractIntlMessages
}

const GlobalProvider: FC<ProvidersProps> = ({ children, locale, messages }) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ConfigProvider theme={theme}>
                        <StyledComponentsRegistry>
                            {children}
                        </StyledComponentsRegistry>
                    </ConfigProvider>
                </NextIntlClientProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default GlobalProvider
