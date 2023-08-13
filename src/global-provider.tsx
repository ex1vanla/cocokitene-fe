import StyledComponentsRegistry from '@/theme/ant-registry'
import theme from '@/theme/theme-config'
import { ConfigProvider } from 'antd'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { FC, ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
    locale: string
    messages: AbstractIntlMessages
}

const GlobalProvider: FC<ProvidersProps> = ({ children, locale, messages }) => {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ConfigProvider theme={theme}>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </ConfigProvider>
        </NextIntlClientProvider>
    )
}

export default GlobalProvider
