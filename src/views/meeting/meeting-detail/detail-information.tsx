import { LikeIcon, ShareholdersIcon } from '@/components/svgs'
import { Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

const { Text, Title } = Typography

interface IBoxGeneralInformation {
    icon: ReactNode
    title: string
    realNumber: number
    totalNumber: number
}

export const BoxGeneralInformation = ({
    icon,
    title,
    realNumber,
    totalNumber,
}: IBoxGeneralInformation) => {
    return (
        <div className="bg-white p-6">
            <div className="flex items-end justify-between ">
                <div className="flex items-end justify-center gap-2">
                    {icon}
                    <Text className="leading-none">{title}</Text>
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <Title
                            level={2}
                            className="mb-0 font-medium leading-none"
                        >
                            {realNumber}
                        </Title>
                        <Title
                            level={4}
                            className="mb-0 mt-0 font-medium leading-none"
                        >
                            /
                        </Title>
                        <Title
                            level={4}
                            className="mb-0 mt-0 font-medium leading-none"
                        >
                            {totalNumber}
                        </Title>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-right">
                <Text className="font-bold text-polar-green">
                    {Math.round((realNumber * 100) / totalNumber)}%
                </Text>
            </div>
        </div>
    )
}

const DetailInformation = () => {
    const t = useTranslations()
    return (
        <Row gutter={[16, 24]}>
            <Col xs={24} lg={12}>
                <BoxGeneralInformation
                    icon={<LikeIcon fill1="#EFEFFF" fill2="#5151E5" />}
                    title={t('TOTAL_VOTES_BY_SHAREHOLDERS')}
                    realNumber={900}
                    totalNumber={1200}
                />
            </Col>
            <Col xs={24} lg={12}>
                <BoxGeneralInformation
                    icon={<ShareholdersIcon fill1="#EFEFFF" fill2="#5151E5" />}
                    title={t('TOTAL_SHAREHOLDERS_JOINED')}
                    realNumber={1000}
                    totalNumber={1200}
                />
            </Col>
        </Row>
    )
}

export default DetailInformation
