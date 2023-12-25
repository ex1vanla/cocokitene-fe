import { AvatarBgHexColors } from '@/constants/common'
import { SERVICE_PLAN_ITEMS } from '@/constants/company'
import { useListCompany } from '@/stores/company/hooks'
import { ICompanyList } from '@/stores/company/type'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Badge, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Color from 'color'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const { Text } = Typography

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

interface CompanyListProps {
    data: ICompanyList[]
}

const CompanyList = ({ data }: CompanyListProps) => {
    const t = useTranslations()

    const columns: ColumnsType<ICompanyList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: '60px',
            className: 'text-center',
        },
        {
            title: t('COMPANY_NAME'),
            dataIndex: 'companyName',
        },
        {
            title: t('SERVICE_PLAN'),
            dataIndex: 'servicePlan',
            render: (_, record) => {
                const indexItem = SERVICE_PLAN_ITEMS.find(
                    (item) => item.value === record.servicePlan,
                )
                const planOptions: {
                    [key: number]: { text: string; textColorClass: string }
                } = {
                    1: { text: t('FREE'), textColorClass: 'text-black' },
                    2: { text: t('TRIAL'), textColorClass: 'text-orange-500' },
                    3: {
                        text: t('PAY_OF_MONTH'),
                        textColorClass: 'text-green-500',
                    },
                    4: { text: 'Error', textColorClass: 'text-red-500' },
                }

                const { text, textColorClass } =
                    planOptions[indexItem?.key ?? 4]

                return <span className={textColorClass}>{text}</span>
            },
            width: '10%',
        },
        {
            title: t('REPRESENTATIVE'),
            dataIndex: 'representative',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                                color: AvatarBgHexColors.GOLDEN_PURPLE,
                            }}
                            size="small"
                        >
                            {getFirstCharacterUpperCase(record.representative)}
                        </Avatar>
                        <Text
                            title={record.representative}
                            className="cursor-pointer"
                        >
                            {record.representative}
                        </Text>
                    </div>
                )
            },
            width: '18%',
        },
        {
            title: t('TOTAL_CREATED_ACCOUNT'),
            dataIndex: 'totalCreatedAccount',
            width: '9%',
        },
        {
            title: t('TOTAL_CREATED_MTGS'),
            dataIndex: 'totalCreatedMTGs',
            width: '9%',
        },
        {
            title: t('STATUS'),
            dataIndex: 'status',
            render: (_, record) => (
                <>
                    {record.status && record.status == '0' ? (
                        <Badge status="success" text={t('ACTIVE')} />
                    ) : (
                        <Badge status="error" text={t('INACTIVE')} />
                    )}{' '}
                </>
            ),
            width: '8%',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Link href={`/company/detail/${record.id}`}>
                    {t('SEE_DETAIL')}
                </Link>
            ),
            width: '8%',
        },
    ]
    const { companyState, getListCompanyAction } = useListCompany()
    const handlePageChange = (pageChange: number) => {
        getListCompanyAction({
            page: pageChange,
            limit: companyState.limit,
            filter: { ...companyState.filter },
        })
    }
    return (
        <div className="bg-white p-6 ">
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{
                    pageSize: companyState.limit,
                    defaultCurrent: companyState.page,
                    total: companyState.totalCompanyItem,
                    onChange: handlePageChange
                }}
            />
        </div>
    )
}

export default CompanyList
