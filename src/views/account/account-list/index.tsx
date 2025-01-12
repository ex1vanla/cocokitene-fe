import { IAccountList } from '@/stores/account/type'
import { useTranslations } from 'next-intl'
import Table, { ColumnsType } from 'antd/es/table'
import { Avatar, Badge, Tag, Tooltip, Typography } from 'antd'
import { useListAccount } from '@/stores/account/hook'
import { UserStatus } from '@/constants/user-status'
import {
    convertSnakeCaseToTitleCase,
    truncateString,
} from '@/utils/format-string'
import Color from 'color'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { AvatarBgHexColors, MAX_DISPLAY_ROLES } from '@/constants/common'
import RoleInfo from '@/components/role-info'
import React from 'react'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { Permissions } from '@/constants/permission'
import EmptyData from '@/views/service-plan/service-plan-list/empty-plan'

const { Text } = Typography

const AccountList = () => {
    const t = useTranslations()
    const router = useRouter()
    const { accountState, getListAccountAction } = useListAccount()

    const { authState } = useAuthLogin()
    const permissionDetail = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.DETAIL_ACCOUNT,
    )

    const permissionEdit = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_ACCOUNT,
    )

    let locale = {
        emptyText: <EmptyData />,
    }

    const columns: ColumnsType<IAccountList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: 55,
            className: 'text-center',
            responsive: ['md'],
        },
        {
            title: t('USER_NAME'),
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record.avatar ? (
                            <Avatar
                                src={
                                    process.env.NEXT_PUBLIC_PRE_URL_S3_LINK +
                                    record.avatar
                                }
                                alt="avatar-alt"
                                size="small"
                                style={{
                                    verticalAlign: 'middle',
                                }}
                            />
                        ) : (
                            <Avatar
                                style={{
                                    backgroundColor: Color(
                                        record?.defaultAvatarHashColor ||
                                            AvatarBgHexColors.GOLDEN_PURPLE,
                                    )
                                        .lighten(0.6)
                                        .hex(),
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
                            // className="cursor-pointer"
                            className="flex-1"
                        >
                            {record.username}
                        </Text>
                    </div>
                )
            },
            width: '26%',
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
            width: '10%',
        },
        {
            title: t('EMAIL'),
            dataIndex: 'email',
            render: (_, record) => {
                return <div className="break-all">{record.email}</div>
            },
            width: '25%',
        },
        {
            title: t('ROLES'),
            dataIndex: 'roles',
            render: (_, record) => {
                const roles = record.role.split(',')
                const displayRoleNames = roles.slice(0, MAX_DISPLAY_ROLES)
                const additionalRoleNames = roles.slice(MAX_DISPLAY_ROLES)
                return (
                    <div className="flex space-x-1">
                        {displayRoleNames.map((item) => {
                            return (
                                <RoleInfo
                                    key={item}
                                    roleName={convertSnakeCaseToTitleCase(item)}
                                />
                            )
                        })}
                        {additionalRoleNames.length > 0 && (
                            <Tooltip
                                color="white"
                                placement="topRight"
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: 'white',
                                        }}
                                        className="space-y-1"
                                    >
                                        {additionalRoleNames.map((item) => (
                                            <RoleInfo
                                                key={item}
                                                roleName={item}
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                <Tag
                                    className="rounded"
                                    style={{
                                        marginLeft: '1px',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        fontWeight: 500,
                                    }}
                                >
                                    +{additionalRoleNames.length}
                                </Tag>
                            </Tooltip>
                        )}
                    </div>
                )
            },
            width: '20%',
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
            width: '12%',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-3">
                    {permissionEdit && !authState.serviceIsExpired && (
                        <EditTwoTone
                            style={{ fontSize: '18px' }}
                            twoToneColor="#5151e5"
                            onClick={() => {
                                router.push(`/account/update/${record.id}`)
                            }}
                        />
                    )}
                    {permissionDetail && (
                        <EyeTwoTone
                            style={{ fontSize: '18px' }}
                            twoToneColor="#5151e5"
                            onClick={() => {
                                router.push(`/account/detail/${record.id}`)
                            }}
                        />
                    )}
                </div>
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
                dataSource={accountState.accountList.map((account, index) => {
                    return {
                        ...account,
                        index:
                            accountState.limit * (accountState.page - 1) +
                            index +
                            1,
                    }
                })}
                rowKey="id"
                pagination={{
                    pageSize: accountState.limit,
                    defaultCurrent: accountState.page,
                    total: accountState.totalAccountItem,
                    onChange: handlePageChange,
                }}
                locale={locale}
                scroll={{ x: 845, y: 'calc(100vh - 337px)' }}
            />
        </div>
    )
}

export default AccountList
