import { AvatarBgHexColors } from '@/constants/common'
import { truncateString } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { Avatar, Badge, Space, Tag, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Color from 'color'

const { Text } = Typography

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

interface DataType {
    id: number
    companyName: string
    servicePlan: number
    representative: string
    totalAccount: number
    totalMTGs: number
    status: boolean
}

const columns: ColumnsType<DataType> = [
    {
        title: 'No.',
        dataIndex: 'id',
        key: 'id',
        width: '56px'
    },
    {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
    },
    {
        title: 'Service Plan',
        dataIndex: 'servicePlan',
        key: 'servicePlan',
        render: (_, record) => {
            const planOptions: {
                [key: number]: { text: string; textColorClass: string }
            } = {
                0: { text: 'Pay of month', textColorClass: 'text-green-500' },
                1: { text: 'Trial', textColorClass: 'text-orange-500' },
                2: { text: 'Free', textColorClass: 'text-black' },
            }

            const { text, textColorClass } =
                planOptions[record.servicePlan] || planOptions[2]

            return <span className={textColorClass}>{text}</span>
        },
        width: '10%'
    },
    {
        title: 'Representative',
        dataIndex: 'representative',
        key: 'representative',
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
        width: '18%'
    },
    {
        title: 'Total Created Account',
        dataIndex: 'totalAccount',
        key: 'totalAccount',
        width: '9%'
    },
    {
        title: 'Total Created MTGs',
        dataIndex: 'totalMTGs',
        key: 'totalMTGs',
        width: '9%'
    },
    {
        title: 'Status',
        key: 'status',
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
        width: '8%'
    },
    {
        title: '',
        key: 'action',
        render: () => <a>See Detail</a>,
        width: '8%'
    },
]

const data: DataType[] = [
    {
        id: 1,
        companyName: 'United Motor Service Center, Inc.',
        servicePlan: 0,
        representative: 'Tanaka',
        totalAccount: 6,
        totalMTGs: 1,
        status: true,
    },
    {
        id: 2,
        companyName: 'Legacy Mechanics',
        servicePlan: 1,
        representative: 'Williamson',
        totalAccount: 3,
        totalMTGs: 11,
        status: true,
    },
    {
        id: 3,
        companyName: 'Midtown Center Auto Repair',
        servicePlan: 2,
        representative: 'Kathryn Murphy',
        totalAccount: 8,
        totalMTGs: 15,
        status: false,
    },
]

const CompanyList = () => {
    return (
        <div className="bg-white p-6 ">
            <Table columns={columns} dataSource={data} />;
        </div>
    )
}

export default CompanyList
