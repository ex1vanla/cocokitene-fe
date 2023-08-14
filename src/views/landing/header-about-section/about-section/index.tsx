'use client'

import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Title } = Typography

const AboutSection = () => {
    const t = useTranslations()
    return (
        <div
            id="abouts"
            className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
        >
            <Title
                level={1}
                className="max-w-2xl text-center font-medium text-white"
            >
                <span className="text-yellow-sunrise">
                    {t('EFFICIENTLY')} {t('STORE')}
                </span>{' '}
                {t('MEETING')} {t('INFORMATION')} {t('USING')}{' '}
                <span className="text-yellow-sunrise">{t('BLOCKCHAIN')}</span>{' '}
                {t('TECHNOLOGY')}
            </Title>
            <Title level={5} className="text-center font-normal text-white">
                {t('ABOUT_SUB_TITLE')}
            </Title>
        </div>
    )
}

export default AboutSection
