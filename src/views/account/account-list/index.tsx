import { IAccountList } from '@/stores/account/type'
import { useTranslations } from 'next-intl'
import Table, { ColumnsType } from 'antd/es/table'
import { Avatar, Badge, Tooltip, Typography } from 'antd'
import Link from 'next/link'
import { useListAccount } from '@/stores/account/hook'
import { UserStatus } from '@/constants/user-status'
import { truncateString } from '@/utils/format-string'
import Color from 'color'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { AvatarBgHexColors, MAX_DISPLAY_ROLES } from '@/constants/common'

const { Text } = Typography
const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()
const AccountList = () => {
    const t = useTranslations()
    const { accountState, getListAccountAction } = useListAccount()

    const columns: ColumnsType<IAccountList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: '5%',
            className: 'text-center',
        },
        {
            title: t('USER_NAME'),
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record.avatar ? (
                            <Avatar
                                src={record.avatar}
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
                                {getFirstCharacterUpperCase(record?.username)}
                            </Avatar>
                        )}
                        <Text
                            title={record.username}
                            className="cursor-pointer"
                        >
                            {record.username}
                        </Text>
                    </div>
                )
            },
            width: '33%',
        },
        {
            title: t('WALLET_ADDRESS'),
            dataIndex: 'walletAddress',
            render: (_, record) => {
                return (
                    <>
                        {truncateString({
                            text: record.walletAddress,
                            start: 5,
                            end: 3,
                        })}
                    </>
                )
            },
            width: '33%',
        },
        {
            title: t('ROLES'),
            dataIndex: 'roles',
            render: (_, record) => {
                const roleNames = record.role.map((item) =>
                    t(item.role.roleName),
                )
                const displayRoleNames = roleNames.slice(0, MAX_DISPLAY_ROLES)
                const additionalRoleNames = roleNames.slice(MAX_DISPLAY_ROLES)
                if (additionalRoleNames.length > 0) {
                    displayRoleNames.push(`+${additionalRoleNames.length}`)
                }
                return (
                    <Tooltip
                        placement="topLeft"
                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {roleNames.map((role, index) => (
                                    <span key={index}>{role}</span>
                                ))}
                            </div>
                        }
                        color={'rgba(81, 81, 229, 1)'}
                    >
                        <div className="flex">
                            {displayRoleNames.map((item, index) => {
                                return (
                                    <p
                                        key={index}
                                        style={{
                                            position: 'relative',
                                            zIndex:
                                                displayRoleNames.length - index,
                                            marginLeft:
                                                index > 0 ? '-6px' : '0',
                                        }}
                                    >
                                        <Avatar
                                            style={{
                                                backgroundColor:
                                                    backgroundAvatarColor,
                                                verticalAlign: 'middle',
                                                color: 'white',
                                                border: '2px solid white',
                                            }}
                                            className="flex h-8 w-8 cursor-pointer items-center pt-[-3px]"
                                            size="small"
                                        >
                                            {item.length > 2
                                                ? getFirstCharacterUpperCase(
                                                      item,
                                                  )
                                                : item}
                                        </Avatar>
                                    </p>
                                )
                            })}
                        </div>
                    </Tooltip>
                )
            },
            width: '11%',
        },
        {
            title: t('STATUS'),
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <>
                        {record.status && record.status == UserStatus.ACTIVE ? (
                            <Badge status="success" text={t('ACTIVE')} />
                        ) : (
                            <Badge status="error" text={t('INACTIVE')} />
                        )}{' '}
                    </>
                )
            },
            width: '11%',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Link href={`/account/detail/${record.id}`}>
                    {t('SEE_DETAIL')}
                </Link>
            ),
            width: '7%',
        },
    ]
    const handlePageChange = (pageChange: number) => {
        getListAccountAction({
            page: pageChange,
            limit: accountState.limit,
            filter: { ...accountState.filter },
        })
    }
    return (
        <div className="bg-white p-6">
            <Table
                columns={columns}
                dataSource={accountState.accountList}
                rowKey="id"
                pagination={{
                    pageSize: accountState.limit,
                    defaultCurrent: accountState.page,
                    total: accountState.totalAccountItem,
                    onChange: handlePageChange,
                }}
            />
        </div>
    )
}

export default AccountList
