'use client'

import LocaleSwitcher from '@/components/local-switcher'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home() {
    const t = useTranslations()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Hello <h1>{t('HELLO')}</h1>
            <LocaleSwitcher />
            <Link href="dashboard">Go</Link>
        </main>
    )
}
