import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import EmptyData from '../service-plan/service-plan-list/empty-plan'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import serviceDashBoard from '@/services/dash-board'
import { ISysNotificationListResponse } from '@/services/response.type'
import { Button } from 'antd'
import { formatDate } from '@/utils/date'

interface DataNotificationSys {
    key: React.Key
    id: number
    title: string
    date: string
}

const NotificationSystem = () => {
    const [dataSysNotification, setDataSysNotification] =
        useState<ISysNotificationListResponse>()
    const [loadingFetchData, setLoadingFetchData] = useState<boolean>(false)
    const t = useTranslations()

    useEffect(() => {
        const fetchData = async () => {
            setLoadingFetchData(true)
            const response = await serviceDashBoard.getSystemNotification({
                page: 1,
                limit: 4,
            })

            if (response) {
                setDataSysNotification(response)
                setLoadingFetchData(false)
            }
        }
        fetchData()
    }, [])

    const handlePageChange = async (pagination: TablePaginationConfig) => {
        setLoadingFetchData(true)
        const response = await serviceDashBoard.getSystemNotification({
            page: pagination.current ?? 1,
            limit: pagination.pageSize ?? 4,
        })
        if (response) {
            setDataSysNotification(response)
            setLoadingFetchData(false)
        }
    }

    let locale = {
        emptyText: <EmptyData />,
    }

    const columns: ColumnsType<DataNotificationSys> = [
        {
            title: t('NO'),
            dataIndex: 'key',
            width: '5%',
            className: 'text-center',
        },
        {
            title: t('DURATION'),
            dataIndex: 'date',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">{record.date}</div>
                )
            },
            width: '30%',
        },
        {
            title: t('TITLE_SYSTEM_NOTI'),
            dataIndex: 'title',
            render: (_, record) => {
                return (
                    <div className="w-[95%] truncate border">
                        {record.title}
                    </div>
                )
            },
            width: '50%',
        },
        {
            render: (_, record) => {
                return (
                    <Button
                        size="small"
                        onClick={() => {
                            console.log('SysNotification Id: ', record.id)
                        }}
                    >
                        {t('BTN_VIEW_DETAIL')}
                    </Button>
                )
            },
            width: '15%',
        },
    ]

    const dataSource = useMemo(() => {
        return dataSysNotification?.items.map((sysNotification, index) => {
            return {
                key:
                    (dataSysNotification.meta.currentPage - 1) *
                        dataSysNotification.meta.itemsPerPage +
                    index +
                    1,
                id: sysNotification.system_notification_id,
                date: formatDate(
                    sysNotification.system_notification_created_at,
                    'YYYY-MM-DD hh:mm',
                ),
                title: sysNotification.system_notification_title,
            }
        })
    }, [dataSysNotification])

    return (
        <div className="flex flex-col gap-3 p-2">
            <span className="text-xl">{t('SYSTEM_NOTIFICATION')}</span>
            <div className="">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: dataSysNotification?.meta.itemsPerPage,
                        total: dataSysNotification?.meta.totalItems,
                    }}
                    size="middle"
                    locale={locale}
                    loading={loadingFetchData}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default NotificationSystem
