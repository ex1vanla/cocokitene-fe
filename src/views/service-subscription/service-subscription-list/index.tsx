import {
    PaymentMethodName,
    StatusSubscription,
    StatusSubscriptionColor,
    SubscriptionType,
} from '@/constants/service-subscript'
import { useListServiceSubscription } from '@/stores/service-subscription/hooks'
import { IServiceSubscriptionList } from '@/stores/service-subscription/type'
import EmptyData from '@/views/service-plan/service-plan-list/empty-plan'
import { FormOutlined } from '@ant-design/icons'
import { Button, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const { Text } = Typography

// interface ServiceSubscriptionListProps {
//     data: IServiceSubscriptionList[]
// }

const ServiceSubscriptionList = () => {
    const t = useTranslations()
    const router = useRouter()

    const {
        serviceSubscriptionState,
        getListServiceSubscriptionAction,
        // setFilterAction,
    } = useListServiceSubscription()

    let locale = {
        emptyText: <EmptyData />,
    }

    const columns: ColumnsType<IServiceSubscriptionList> = [
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
            render: (_, record) => {
                return (
                    <div>
                        <Text>{record.companyName}</Text>
                        <Button
                            size="small"
                            className="ml-2 px-[4px]"
                            onClick={() => {
                                router.push(
                                    `/company/${record.companyId}/service-plan`,
                                )
                            }}
                        >
                            {t('DETAIL_SERVICE')}
                        </Button>
                    </div>
                )
            },
            width: '30%',
            className: 'min-w-[248px]',
        },
        {
            title: t('SERVICE_PLAN'),
            dataIndex: 'servicePlan',
            render: (_, record) => {
                return <Text>{record.planName}</Text>
            },
            width: '17%',
            className: 'min-w-[109px] px-2',
        },
        {
            title: `${t('TOTAL_FREE')}(¥)`,
            dataIndex: 'amount',
            width: '10%',
            className: 'px-2 min-w-[78px]',
        },
        {
            title: t('PAYMENT_METHOD'),
            dataIndex: 'paymentMethod',
            render: (_, record) => {
                return <Text>{t(PaymentMethodName[record.paymentMethod])}</Text>
            },
            width: '15%',
            className: 'min-w-[85px]',
        },
        {
            title: t('TYPE'),
            dataIndex: 'type',
            render: (_, record) => {
                return <Text>{t(SubscriptionType[record.type])}</Text>
            },
            width: '10%',
            className: 'px-[6px] max-[470px]:px-0 min-w-[79px]',
        },
        {
            title: t('STATUS'),
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <Text
                        style={{
                            color: StatusSubscriptionColor[record.status],
                        }}
                    >
                        {t(StatusSubscription[record.status])}
                    </Text>
                )
            },
            width: '10%',
            className: 'px-[6px] max-[470px]:px-0 min-w-[79px]',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-3 max-lg:gap-2">
                    <FormOutlined
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(
                                `/service-subscription/detail/${record.id}`,
                            )
                        }}
                    />
                </div>
            ),
            width: '8%',
            className: 'px-3 min-w-[68px]',
        },
    ]

    const handlePageChange = (pageChange: number) => {
        getListServiceSubscriptionAction({
            page: pageChange,
            limit: serviceSubscriptionState.limit,
            filter: { ...serviceSubscriptionState.filter },
        })
    }

    console.log(
        'serviceSubscriptionState.serviceSubList: ',
        serviceSubscriptionState.serviceSubList,
    )

    return (
        <div className="bg-white p-6 max-[470px]:px-1">
            <Table
                columns={columns}
                dataSource={serviceSubscriptionState.serviceSubList}
                rowKey="id"
                pagination={{
                    pageSize: serviceSubscriptionState.limit,
                    defaultCurrent: serviceSubscriptionState.page,
                    total: serviceSubscriptionState.totalServiceSubItem,
                    onChange: handlePageChange,
                }}
                locale={locale}
                scroll={{ x: 845, y: 'calc(100vh - 337px)' }}
            />
        </div>
    )
}

export default ServiceSubscriptionList
