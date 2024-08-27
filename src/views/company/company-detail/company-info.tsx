import { Avatar, Col, Row } from 'antd'
import { useTranslations } from 'next-intl'
import Color from 'color'

import BoxArea from '@/components/box-area'
import { useCompanyDetail } from '@/stores/company/hooks'
import { IRowInfo, RowInfo } from './row-info'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { CompanyStatus } from '@/constants/company-status'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

const CompanyInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()

    const dataCompanyInfoLeft: IRowInfo[] = [
        {
            label: 'COMPANY_NAME',
            content: (
                <p className="flex-1 break-words">{company?.companyName}</p>
            ),
        },
        {
            label: 'COMPANY_INFORMATION',
            content: (
                <p className="flex-1 break-words">{company?.description}</p>
            ),
        },

        {
            label: 'DATE_OF_INCORPORATION',
            content: (
                <p className="flex-1 break-words">
                    {company?.dateOfCorporation}
                </p>
            ),
        },
        {
            label: 'FAX',
            content: <p className="flex-1 break-words">{company?.fax}</p>,
        },
        {
            label: 'REPRESENTATIVE',
            content: (
                <div
                    className={`flex flex-nowrap content-start items-center gap-[4px]`}
                >
                    <Avatar
                        style={{
                            backgroundColor: backgroundAvatarColor,
                            verticalAlign: 'middle',
                            color: AvatarBgHexColors.GOLDEN_PURPLE,
                        }}
                        size="small"
                    >
                        {company?.representativeUser &&
                            getFirstCharacterUpperCase(
                                company?.representativeUser,
                            )}
                    </Avatar>
                    <p className="flex-1">{company?.representativeUser}</p>
                </div>
            ),
        },
        {
            label: 'TOTAL_CREATED_ACCOUNT',
            content: (
                <p className=" truncate hover:text-clip">
                    {company?.totalCreatedAccount || ''}
                </p>
            ),
        },
        {
            label: 'TOTAL_CREATED_MTGS',
            content: (
                <p className=" truncate hover:text-clip">
                    {company?.totalCreateMeeting || ''}
                </p>
            ),
        },
    ]
    const dataCompanyInfoRight: IRowInfo[] = [
        {
            label: 'ADDRESS',
            content: <p className=" flex-1 break-words">{company?.address}</p>,
        },
        {
            label: 'EMAIL',
            content: <p className="flex-1 break-all">{company?.email}</p>,
        },
        {
            label: 'PHONE',
            content: <p className="flex-1 break-all">{company?.phone}</p>,
        },
        {
            label: 'TAX_OF_COMPANY',
            content: (
                <p className="flex-1 break-words">{company?.taxCompany}</p>
            ),
        },
        {
            label: 'STATUS',
            content: (
                <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-black/[85%]">
                    <div
                        className={`h-[6px] w-[6px] rounded-full  ${
                            company?.status.status == CompanyStatus.ACTIVE
                                ? ' bg-green-500'
                                : company?.status.status ==
                                  CompanyStatus.INACTIVE
                                ? ' bg-red-500'
                                : null
                        } `}
                    ></div>
                    <p>
                        {company?.status.status == CompanyStatus.ACTIVE
                            ? t('ACTIVE')
                            : company?.status.status == CompanyStatus.INACTIVE
                            ? t('INACTIVE')
                            : null}
                    </p>
                </div>
            ),
        },
        {
            label: 'SERVICE_PLAN',
            content: (
                <p className=" truncate hover:text-clip">
                    {convertSnakeCaseToTitleCase(
                        company?.servicePlan.planName || '',
                    )}
                </p>
            ),
        },
        {
            label: 'BUSINESS_TYPE',
            content: (
                <p className="flex-1 break-words">{company?.businessType}</p>
            ),
        },
    ]

    return (
        <div className="w-full">
            <BoxArea title={t('COMPANY_INFORMATION')}>
                <Row gutter={[{ xs: 0, lg: 32 }, 0]}>
                    <Col md={24} lg={12} className="" span={24}>
                        {dataCompanyInfoLeft.map((item) => {
                            return (
                                <Col key={item.label} className="max-sm:px-0">
                                    <RowInfo
                                        label={t(item.label)}
                                        content={item.content}
                                    />
                                </Col>
                            )
                        })}
                        {/* <div className="h-52 w-full "></div> */}
                    </Col>
                    <Col md={24} lg={12} className="" span={24}>
                        {dataCompanyInfoRight.map((item) => {
                            return (
                                <Col key={item.label} className="max-sm:px-0">
                                    <RowInfo
                                        label={t(item.label)}
                                        content={item.content}
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
