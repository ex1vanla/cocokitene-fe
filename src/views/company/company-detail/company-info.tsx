import { Col, Row } from 'antd'
import { useTranslations } from 'next-intl'

import BoxArea from '@/components/box-area'
import { InfoType } from '@/constants/company'
import { useCompanyDetail } from '@/stores/company/hooks'
import { IRowInfo, RowInfo } from './row-info'

const CompanyInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()
    const DataCompanyInfo1: IRowInfo[] = [
        {
            label: 'COMPANY_NAME',
            type: InfoType.NORMAL,
            data: {
                content: company?.companyName,
            },
        },
        {
            label: 'COMPANY_INFORMATION',
            type: InfoType.NORMAL,
            data: {
                content: company?.description,
            },
        },

        {
            label: 'DATE_OF_INCORPORATION',
            type: InfoType.NORMAL,
            data: {
                content: company?.dateOfCorporation,
            },
        },
        {
            label: 'BUSINESS_TYPE',
            type: InfoType.NORMAL,
            data: {
                content: company?.businessType,
            },
        },
        {
            label: 'REPRESENTATIVE',
            type: InfoType.AVATAR,
            data: {
                content: company?.representativeUser,
            },
        },
    ]
    const DataCompanyInfo2: IRowInfo[] = [
        {
            label: 'ADDRESS',
            type: InfoType.NORMAL,
            data: {
                content: company?.address,
            },
        },
        {
            label: 'EMAIL',
            type: InfoType.NORMAL,
            data: {
                content: company?.email,
            },
        },
        {
            label: 'PHONE',
            type: InfoType.NORMAL,
            data: {
                content: company?.phone,
            },
        },
        {
            label: 'FAX',
            type: InfoType.NORMAL,
            data: {
                content: company?.fax,
            },
        },
        {
            label: 'STATUS',
            type: InfoType.STATUS,
            data: {
                status: company?.status.status,
            },
        },
        {
            label: 'SERVICE_PLAN',
            type: InfoType.PLAN,
            data: {
                servicePlan: company?.servicePlan.id,
            },
        },
    ]

    return (
        <div>
            <BoxArea title={t('COMPANY_INFORMATION')}>
                <Row gutter={[0, 0]} className="min-w-[1184px]">
                    <Col xs={24} lg={12}>
                        {DataCompanyInfo1.map((item) => {
                            return (
                                <Col xs={24} key={item.label}>
                                    <RowInfo
                                        label={t(item.label)}
                                        type={item.type}
                                        data={item.data}
                                    />
                                </Col>
                            )
                        })}
                    </Col>
                    <Col xs={24} lg={12}>
                        {DataCompanyInfo2.map((item) => {
                            return (
                                <Col xs={24} key={item.label}>
                                    <RowInfo
                                        label={t(item.label)}
                                        type={item.type}
                                        data={item.data}
                                    />
                                </Col>
                            )
                        })}
                    </Col>
                </Row>
            </BoxArea>
        </div>
    )
}

export default CompanyInfo
