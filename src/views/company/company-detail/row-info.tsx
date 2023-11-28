import { InfoType } from '@/constants/company'
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export interface IRowInfo {
    label: string
    type: InfoType
    data: {
        content?: string | null
        urlAvatar?: string
        status?: string
        servicePlan?: number
    }
}

export const RowInfo = ({ label, type, data }: IRowInfo) => {
    const t = useTranslations()
    const getContent = () => {
        switch (type) {
            case InfoType.NORMAL:
                return (
                    <p className="max-w-[415px] truncate hover:text-clip">
                        {data?.content}
                    </p>
                )
                // eslint-disable-next-line
                break
            case InfoType.AVATAR:
                return (
                    <div
                        className={`flex flex-wrap content-start items-center gap-[4px] ${
                            data?.urlAvatar ? 'mt-[-7px]' : null
                        }`}
                    >
                        {data?.urlAvatar ? (
                            <Image
                                loader={() => data.urlAvatar || ''}
                                src={data?.urlAvatar}
                                alt="Avatar"
                                className="rounded-full"
                                width={32}
                                height={32}
                            />
                        ) : null}
                        <p>{data?.content}</p>
                    </div>
                )
                // eslint-disable-next-line
                break
            case InfoType.STATUS:
                return (
                    <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-[#000000D9]">
                        <div
                            className={`h-[6px] w-[6px] rounded-full  ${
                                data?.status == '0'
                                    ? 'bg-[#52C41A]'
                                    : data?.status == '1'
                                    ? 'bg-[#FF4D4F]'
                                    : null
                            } `}
                        ></div>
                        <p>
                            {data?.status == '0'
                                ? t('ACTIVE')
                                : data?.status == '1'
                                ? t('INACTIVE')
                                : null}
                        </p>
                    </div>
                )
                // eslint-disable-next-line
                break
            case InfoType.PLAN:
                if (data?.servicePlan == 0) {
                    return (
                        <p className="text-sm text-[#FA8C16]">{t('TRIAL')}</p>
                    )
                } else if (data?.servicePlan == 1) {
                    return (
                        <div className="flex flex-col items-start">
                            <div className="h-[30px] text-sm">
                                <span className="mr-1 text-[#000000D9]">
                                    {t('FREE')}
                                </span>
                                <span className="text-[#FA8C16]">
                                    ({t('TRIAL_HAS_EXPIRED')})
                                </span>
                            </div>
                            <Button className="h-[32px] border-[1px] border-[#5151E5] bg-[#5151E5] px-4 py-1 text-[#FFFFFF] shadow-[0px_2px_0px_0px_#0000000B] hover:cursor-pointer">
                                {t('UPGRADE_PLAN')}
                            </Button>
                        </div>
                    )
                } else if (data?.servicePlan == 2) {
                    return (
                        <p className="text-sm text-[#52C41A]">
                            {t('PAY_OF_MONTH')}
                        </p>
                    )
                }
                break
            default:
                break
        }
    }
    return (
        <Row gutter={[16, 8]} className="min-h-[38px] min-w-[556px]">
            <Col
                xs={8}
                lg={8}
                className="mr-2 h-[22px] max-w-[140px] whitespace-nowrap"
            >
                {label && <p className="text-sm text-[#00000073]">{label}:</p>}
            </Col>
            <Col xs={16} lg={16} className="text-sm text-[#000000D9]">
                {getContent()}
            </Col>
        </Row>
    )
}
