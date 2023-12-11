import { useAccountDetail } from '@/stores/account/hook'
import { useTranslations } from 'next-intl'
import { IRowAccountInfo, RowAccountInfo } from './account-rowinfo'
import { Avatar, Col, Row } from 'antd'
import { UserStatus } from '@/constants/user-status'
import { truncateString } from '@/utils/format-string'
import { useParams } from 'next/navigation'
import Color from 'color'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

const AccountInfo = () => {
    const t = useTranslations()
    const params = useParams()
    const [{ account }] = useAccountDetail()
    const locale = params.locale

    const dataAccountDetailLeft: IRowAccountInfo[] = [
        {
            label: 'COMPANY',
            content: (
                <p className="truncate hover:text-clip">
                    {account?.companyName || ''}
                </p>
            ),
            lg: locale == 'en' ? 3 : 3,
        },
        {
            label: 'USERNAME',
            content: account?.userName && (
                <div
                    className={`mt-[-3px] flex flex-wrap content-start items-center gap-[4px]`}
                >
                    {account?.avatar ? (
                        <Avatar
                            src={account.avatar}
                            alt="avatar-alt"
                            size="small"
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                            }}
                        />
                    ) : (
                        <Avatar
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                                color: AvatarBgHexColors.GOLDEN_PURPLE,
                            }}
                            size="small"
                        >
                            {getFirstCharacterUpperCase(account.userName)}
                        </Avatar>
                    )}
                    <span>{account.userName}</span>
                </div>
            ),
            lg: locale == 'en' ? 3 : 3,
        },
        {
            label: 'ROLE',
            content: (
                <div className="truncate hover:text-clip">
                    {account?.roleName.map((item) => t(item)).join(', ')}
                </div>
            ),
            lg: locale == 'en' ? 3 : 3,
        },
    ]

    const dataAccountDetailRight: IRowAccountInfo[] = [
        {
            label: 'WALLET_ADDRESS',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {truncateString({
                        text: String(account?.walletAddress),
                        start: 5,
                        end: 3,
                    }) || ''}
                </p>
            ),
            lg: locale == 'en' ? 4 : 6,
        },
        {
            label: 'EMAIL',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {account?.email || ''}
                </p>
            ),
            lg: locale == 'en' ? 4 : 6,
        },
        {
            label: 'STATUS',
            content: (
                <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-black/[85%]">
                    <div
                        className={`h-[6px] w-[6px] rounded-full  ${
                            account?.userStatus == UserStatus.ACTIVE
                                ? 'bg-green-300'
                                : account?.userStatus == UserStatus.INACTIVE
                                ? 'bg-red-500'
                                : null
                        } `}
                    ></div>
                    <p>
                        {account?.userStatus == UserStatus.ACTIVE
                            ? t('ACTIVE')
                            : account?.userStatus == UserStatus.INACTIVE
                            ? t('INACTIVE')
                            : null}
                    </p>
                </div>
            ),
            lg: locale == 'en' ? 4 : 6,
        },
    ]

    return (
        <div className="bg-white p-6 px-6 py-4 shadow-01">
            <Row gutter={[0, 0]} className="min-w-[1184px]">
                <Col xs={24} lg={12}>
                    {dataAccountDetailLeft.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowAccountInfo
                                    label={t(item.label)}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
                <Col xs={24} lg={12}>
                    {dataAccountDetailRight.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowAccountInfo
                                    label={t(item.label)}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default AccountInfo
