import { AvatarBgHexColors } from '@/constants/common'
import { useListCompany } from '@/stores/company/hooks'
import { ICompanyList } from '@/stores/company/type'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import EmptyData from '@/views/service-plan/service-plan-list/empty-plan'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { Avatar, Badge, Grid, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Color from 'color'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const { Text } = Typography
const { useBreakpoint } = Grid

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

interface CompanyListProps {
    data: ICompanyList[]
}

const CompanyList = ({ data }: CompanyListProps) => {
    const t = useTranslations()
    const router = useRouter()
    const screens = useBreakpoint()

    let locale = {
        emptyText: <EmptyData />,
    }

    const columns: ColumnsType<ICompanyList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: 55,
            className: 'text-center',
            responsive: ['md'],
        },
        {
            title: t('COMPANY_NAME'),
            dataIndex: 'companyName',
            width: '40%',
        },
        {
            title: t('SERVICE_PLAN'),
            dataIndex: 'servicePlan',
            width: screens.lg ? '20%' : 110,
        },
        {
            title: t('REPRESENTATIVE'),
            dataIndex: 'representative',
            render: (_, record) => {
                return (
                    <div className="flex flex-wrap items-center gap-2">
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
            width: screens.xl ? '20%' : 128,
        },
        {
            title: t('TOTAL_CREATED_ACCOUNT'),
            dataIndex: 'totalCreatedAccount',
            width: '20%',
            // responsive: ['lg'],
            className: 'px-2',
        },
        {
            title: t('TOTAL_CREATED_MTGS'),
            dataIndex: 'totalCreatedMTGs',
            width: '20%',
            // responsive: ['lg'],
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
            width: screens.xl ? '20%' : 80,
            className: 'px-[6px] max-[470px]:px-0',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-3 max-lg:gap-2">
                    <EditTwoTone
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(`/company/update/${record.id}`)
                        }}
                    />
                    <EyeTwoTone
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(`/company/detail/${record.id}`)
                        }}
                    />
                </div>
            ),
            width: screens.xl ? '15%' : 70,
            className: 'px-3',
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

    const dataFinal = data.map((item) => ({
        ...item,
        servicePlan: convertSnakeCaseToTitleCase(item.servicePlan),
    }))

    return (
        <div className="bg-white p-6 max-[470px]:px-1">
            {/* <div className="overflow-x-auto"> */}
            <Table
                columns={columns}
                dataSource={dataFinal}
                rowKey="id"
                pagination={{
                    pageSize: companyState.limit,
                    defaultCurrent: companyState.page,
                    total: companyState.totalCompanyItem,
                    onChange: handlePageChange,
                }}
                locale={locale}
                scroll={{ x: 845 }}
                // style={{ minWidth: '845px' }}
            />
            {/* </div> */}
        </div>
    )
}

export default CompanyList
