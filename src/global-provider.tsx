'use client'
import '@rainbow-me/rainbowkit/styles.css'
import StyledComponentsRegistry from '@/theme/ant-registry'
import theme from '@/theme/theme-config'
import { ConfigProvider } from 'antd'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { FC, ReactNode } from 'react'
import GlobalConnectWalletProvider from './connect-wallet/config'

interface ProvidersProps {
    children: ReactNode
    locale: string
    messages: AbstractIntlMessages
}

const GlobalProvider: FC<ProvidersProps> = ({ children, locale, messages }) => {
    return (
        <GlobalConnectWalletProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ConfigProvider theme={theme}>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </ConfigProvider>
            </NextIntlClientProvider>
        </GlobalConnectWalletProvider>
    )
}

export default GlobalProvider
