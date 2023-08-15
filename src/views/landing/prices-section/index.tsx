'use client'

import PlanItem, { IPlanItem } from '@/views/landing/prices-section/plan-item'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Title, Text } = Typography

const plansList: IPlanItem[] = [
    {
        title: 'BASIC',
        price: 20,
        meetingsQuantity: 50,
        videosQuantity: 100,
        imagesQuantity: 100,
        storageQuantity: 50,
        isRecommended: false,
        isBold: false,
    },
    {
        title: 'STANDARD',
        price: 50,
        meetingsQuantity: 100,
        videosQuantity: 200,
        imagesQuantity: 200,
        storageQuantity: 100,
        isRecommended: true,
        isBold: true,
    },
    {
        title: 'PREMIUM',
        price: 100,
        meetingsQuantity: -1,
        videosQuantity: -1,
        imagesQuantity: -1,
        storageQuantity: -1,
        isRecommended: false,
        isBold: false,
    },
]

const PricesSection = () => {
    const t = useTranslations()

    return (
        <div id="pricing" className="bg-orange-sunset py-20">
            <div className="pricing-wrapper mx-auto max-w-[1200px]">
                <div id="pricing-title" className="mx-auto mb-10  text-center">
                    <Title level={2} className="font-bold">
                        {t('OUR_PRICING')}
                    </Title>
                    <Text className="font-normal">
                        {t('PRICING_SUB_TITLE')}
                    </Text>
                </div>
                <div id="pricing-list" className="flex justify-center gap-6">
                    {plansList.map((service, index) => (
                        <PlanItem
                            key={index}
                            title={service.title}
                            price={service.price}
                            meetingsQuantity={service.meetingsQuantity}
                            videosQuantity={service.videosQuantity}
                            imagesQuantity={service.imagesQuantity}
                            storageQuantity={service.storageQuantity}
                            isRecommended={service.isRecommended}
                            isBold={service.isBold}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PricesSection
