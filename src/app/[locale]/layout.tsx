import './globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Cocokitene Application',
    description:
        'Cocokitene Application manage meetings of company by blockchain technology',
}

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ja' }]
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: {
        locale: string
    }
}) {
    let messages
    try {
        messages = (await import(`../../locales/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
