import { Col, Row } from 'antd'
import { useTranslations } from 'next-intl'

import BoxArea from '@/components/box-area'
import { InfoType } from '@/constants/company'
import { useCompanyDetail } from '@/stores/company/hooks'
import { IRowInfo, RowInfo } from './row-info'

const CompanyInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()
    // console.log(company)
    const DataCompanyInfo1: IRowInfo[] = [
        {
            label: 'Company Name',
            type: InfoType.NORMAL,
            data: {
                content: company?.companyName,
            },
        },
        {
            label: 'Company Infor',
            type: InfoType.NORMAL,
            data: {
                content: company?.description,
            },
        },

        {
            label: 'Date of Incorporation',
            type: InfoType.NORMAL,
            data: {
                content: company?.dateOfCorporation,
            },
        },
        {
            label: 'Business Type',
            type: InfoType.NORMAL,
            data: {
                content: company?.bussinessType,
            },
        },
        {
            label: 'Representative',
            type: InfoType.AVATAR,
            data: {
                content: company?.representativeUser,
                // urlAvatar: '/images/default-avatar.png'
            },
        },
    ]
    const DataCompanyInfo2: IRowInfo[] = [
        {
            label: 'Address',
            type: InfoType.NORMAL,
            data: {
                content: company?.address,
            },
        },
        {
            label: 'Email',
            type: InfoType.NORMAL,
            data: {
                content: company?.email,
            },
        },
        {
            label: 'Phone',
            type: InfoType.NORMAL,
            data: {
                content: company?.phone,
            },
        },
        {
            label: 'Fax',
            type: InfoType.NORMAL,
            data: {
                content: company?.fax,
            },
        },
        {
            label: 'Status',
            type: InfoType.STATUS,
            data: {
                status: company?.status.status,
            },
        },
        {
            label: 'Service Plan',
            type: InfoType.PLAN,
            data: {
                servicePlan: company?.servicePlan.id,
            },
        },
    ]

    return (
        <div className="flex flex-col gap-4 font-[Roboto]">
            <BoxArea title={t('COMPANY_INFO')}>
                <Row gutter={[16, 0]} className="min-w-[1184px]">
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
