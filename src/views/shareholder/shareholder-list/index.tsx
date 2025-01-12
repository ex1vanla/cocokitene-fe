import { useTranslations } from 'next-intl'
import { useListShareholder } from '@/stores/shareholder/hook'
import Table, { ColumnsType } from 'antd/es/table'
import { IShareholderList } from '@/stores/shareholder/type'
import { Avatar, Badge, Typography } from 'antd'
import Color from 'color'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { truncateString } from '@/utils/format-string'
import React from 'react'
import { UserStatus } from '@/constants/user-status'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { Permissions } from '@/constants/permission'
import EmptyData from '@/views/service-plan/service-plan-list/empty-plan'
const { Text } = Typography

const ShareholderList = () => {
    const t = useTranslations()
    const router = useRouter()
    const { shareholderState, getListShareholderAction } = useListShareholder()

    const { authState } = useAuthLogin()
    const permissionDetail = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.DETAIL_SHAREHOLDERS,
    )

    const permissionEdit = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_SHAREHOLDERS,
    )

    let locale = {
        emptyText: <EmptyData />,
    }

    const columns: ColumnsType<IShareholderList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: 55,
            className: 'text-center',
            responsive: ['md'],
        },
        {
            title: t('SHAREHOLDER_NAME'),
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record?.avatar ? (
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
                            className="flex-1 cursor-pointer"
                        >
                            {record.username}
                        </Text>
                    </div>
                )
            },
            width: '25%',
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
            width: '15%',
        },
        {
            title: t('EMAIL'),
            dataIndex: 'email',
            render: (_, record) => {
                return <div className="flex-1 break-all">{record.email}</div>
            },
            width: '25%',
        },
        {
            title: t('SHARES_QUANTITY'),
            dataIndex: 'shareQuantity',
            width: '17%',
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
                // <Link href={`/shareholder/detail/${record.id}`}>
                //     {t('SEE_DETAIL')}
                // </Link>
                <div className="flex gap-3">
                    {permissionEdit && !authState.serviceIsExpired && (
                        <EditTwoTone
                            style={{ fontSize: '18px' }}
                            twoToneColor="#5151e5"
                            onClick={() => {
                                router.push(`/shareholder/update/${record.id}`)
                            }}
                        />
                    )}
                    {permissionDetail && (
                        <EyeTwoTone
                            style={{ fontSize: '18px' }}
                            twoToneColor="#5151e5"
                            onClick={() => {
                                router.push(`/shareholder/detail/${record.id}`)
                            }}
                        />
                    )}
                </div>
            ),
            width: '7%',
        },
    ]
    const handlePageChane = (pageChange: number) => {
        getListShareholderAction({
            page: pageChange,
            limit: shareholderState.limit,
            filter: { ...shareholderState.filter },
        })
    }

    return (
        <div className="bg-white p-6">
            <Table
                columns={columns}
                dataSource={shareholderState.shareholderList.map(
                    (shareholder, index) => ({
                        ...shareholder,
                        index:
                            shareholderState.limit *
                                (shareholderState.page - 1) +
                            index +
                            1,
                    }),
                )}
                rowKey="id"
                pagination={{
                    pageSize: shareholderState.limit,
                    defaultCurrent: shareholderState.page,
                    total: shareholderState.totalShareholderItem,
                    onChange: handlePageChane,
                }}
                locale={locale}
                scroll={{ x: 845, y: 'calc(100vh - 337px)' }}
            />
        </div>
    )
}
export default ShareholderList
