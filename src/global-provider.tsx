'use client'
import '@rainbow-me/rainbowkit/styles.css'
import StyledComponentsRegistry from '@/theme/ant-registry'
import theme from '@/theme/theme-config'
import { ConfigProvider } from 'antd'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { FC, ReactNode } from 'react'
import GlobalConnectWalletProvider from '@/connect-wallet/config'
import { Provider } from 'react-redux'
import store from './stores'

interface ProvidersProps {
    children: ReactNode
    locale: string
    messages: AbstractIntlMessages
}

const GlobalProvider: FC<ProvidersProps> = ({ children, locale, messages }) => {
    return (
        <Provider store={store}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ConfigProvider theme={theme}>
                    <StyledComponentsRegistry>
                        <GlobalConnectWalletProvider>
                            {children}
                        </GlobalConnectWalletProvider>
                    </StyledComponentsRegistry>
                </ConfigProvider>
            </NextIntlClientProvider>
        </Provider>
    )
}

export default GlobalProvider
