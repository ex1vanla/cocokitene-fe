import { AvatarBgHexColors } from '@/constants/common'
import { SERVICE_PLAN_ITEMS } from '@/constants/company'
import { useListCompany } from '@/stores/company/hooks'
import { ICompanyList } from '@/stores/company/type'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Badge, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Color from 'color'

const { Text } = Typography

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

const columns: ColumnsType<ICompanyList> = [
    {
        title: 'No.',
        dataIndex: 'id',
        width: '56px',
    },
    {
        title: 'Company Name',
        dataIndex: 'companyName',
    },
    {
        title: 'Service Plan',
        dataIndex: 'servicePlan',
        render: (_, record) => {
            const indexItem = SERVICE_PLAN_ITEMS.find(
                (item) => item.value === record.servicePlan,
            )
            const planOptions: {
                [key: number]: { text: string; textColorClass: string }
            } = {
                1: { text: 'Free', textColorClass: 'text-black' },
                2: { text: 'Trial', textColorClass: 'text-orange-500' },
                3: { text: 'Pay of month', textColorClass: 'text-green-500' },
                4: { text: 'Error', textColorClass: 'text-red-500' },
            }

            const { text, textColorClass } = planOptions[indexItem?.key ?? 4]

            return <span className={textColorClass}>{text}</span>
        },
        width: '10%',
    },
    {
        title: 'Representative',
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
        title: 'Total Created Account',
        dataIndex: 'totalCreatedAccount',
        width: '9%',
    },
    {
        title: 'Total Created MTGs',
        dataIndex: 'totalCreatedMTGs',
        width: '9%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (_, record) => (
            <>
                {record.status ? (
                    <Badge status="success" text="Active" />
                ) : (
                    <Badge status="error" text="Inactive" />
                )}{' '}
            </>
        ),
        width: '8%',
    },
    {
        title: '',
        key: 'action',
        render: () => <a>See Detail</a>,
        width: '8%',
    },
]

interface CompanyListProps {
    data: ICompanyList[]
}

const CompanyList = ({ data }: CompanyListProps) => {
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
                    onChange: handlePageChange,
                }}
            />
        </div>
    )
}

export default CompanyList
