import { getNumberLimitedPlan } from '@/utils/plan'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { memo, useState } from 'react'

const { Title, Text } = Typography

export interface IPlanItem {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
    className: string
    isRecommended: boolean
}

const PlanCard = ({
    id,
    planName,
    description,
    maxStorage,
    maxMeeting,
    price,
    maxShareholderAccount,
    className,
    isRecommended,
}: IPlanItem) => {
    const t = useTranslations()
    const router = useRouter()
    const [isBold, setIsBold] = useState(false)
    const hadleEnter = () => {
        setIsBold(true)
    }
    const handleLeave = () => {
        setIsBold(false)
    }

    const quantityTextClass = `text-base font-normal ${
        isBold ? 'text-white' : ''
    }`
    // console.log('planName', planName.toUpperCase())

    return (
        <div
            id="plan-item-wrapper"
            className={` relative flex flex-col border-[1px] border-blue-700 bg-white ${className}`}
            onMouseEnter={hadleEnter}
            onMouseLeave={handleLeave}
        >
            {isRecommended && (
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-primary bg-yellow-sunrise px-4">
                    <Text>{t('RECOMMEND')}</Text>
                </div>
            )}
            <div className="plan-item__title border-b border-neutral/4 py-4 text-center">
                <Title
                    level={4}
                    className={`text-u mb-0 font-medium uppercase ${
                        isBold ? 'text-primary' : ''
                    }`}
                >
                    {t(planName.toUpperCase())}
                </Title>
            </div>
            <div
                className={`plan-item__info flex flex-col gap-8 p-8 ${
                    isBold ? 'bg-primary' : ''
                }`}
            >
                <div className="plan-item__price flex items-end justify-center">
                    <Title
                        className={`font-medium leading-[0] text-primary ${
                            isBold ? 'text-white' : ''
                        }`}
                        level={1}
                    >
                        {price}$
                    </Title>
                    <Text
                        className={`font-medium text-primary ${
                            isBold ? 'text-white' : ''
                        }`}
                    >
                        / {t('MONTH')}
                    </Text>
                </div>
                <div
                    className={`plan-item__detail flex flex-col items-center gap-1 ${
                        isBold ? 'bg-primary' : ''
                    }`}
                >
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxMeeting, t)} {t('MEETINGS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxShareholderAccount, t)}{' '}
                        {t('SHAREHOLDERS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxStorage, t)} {t('GB_STORAGE')}
                    </Text>

                    <Text className={quantityTextClass}>{description}</Text>
                </div>
                <Button
                    size="large"
                    className={`mx-auto w-[80%] text-base font-normal ${
                        isBold ? 'text-primary' : ''
                    }`}
                    //
                    onClick={() => {
                        router.push(`/plan/update/${id}`)
                    }}
                >
                    {t('EDIT')}
                </Button>
            </div>
        </div>
    )
}

export default memo(PlanCard)
