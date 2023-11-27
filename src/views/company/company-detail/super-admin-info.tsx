import { Col, Row } from 'antd'
import { useTranslations } from 'next-intl'

import BoxArea from '@/components/box-area'
import { InfoType } from '@/constants/company'
import { useCompanyDetail } from '@/stores/company/hooks'
import { truncateString } from '@/utils/format-string'
import { IRowInfo, RowInfo } from './row-info'

const SuperAdminInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()

    const DataSuperAdminInfo: IRowInfo[] = [
        {
            label: 'User Name',
            type: InfoType.AVATAR,
            data: {
                content: company?.superAdminInfo?.username,
                // urlAvatar: company?.superAdminInfo?.avatar
            },
        },
        {
            label: 'Wallet Address',
            type: InfoType.NORMAL,
            data: {
                content: truncateString({
                    text: String(company?.superAdminInfo?.walletAddress),
                    start: 5,
                    end: 3,
                }),
            },
        },
        {
            label: 'Status',
            type: InfoType.STATUS,
            data: {
                status: company?.superAdminInfo?.userStatus?.status,
            },
        },
        {
            label: 'Email',
            type: InfoType.NORMAL,
            data: {
                content: company?.superAdminInfo?.email,
            },
        },
    ]

    return (
        <div>
            <BoxArea title={t('SUPER_ADMIN_INFO')}>
                <Row gutter={[16, 0]} className="min-w-[1184px]">
                    {DataSuperAdminInfo.map((item) => {
                        return (
                            <Col xs={24} lg={12} key={item.label}>
                                <RowInfo
                                    label={item.label}
                                    type={item.type}
                                    data={item.data}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </BoxArea>
        </div>
    )
}

export default SuperAdminInfo
