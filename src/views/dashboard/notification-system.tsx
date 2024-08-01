import Table, { ColumnsType } from 'antd/es/table'
import EmptyData from '../service-plan/service-plan-list/empty-plan'
import { useTranslations } from 'next-intl'
import React from 'react'

interface DataNotificationSys {
    key: React.Key
    title: string
    date: string
}

const NotificationSystem = () => {
    const t = useTranslations()

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
            width: '35%',
        },
        {
            title: t('TITLE_SYSTEM_NOTI'),
            dataIndex: 'title',
            render: (_, record) => {
                return <div className="break-words">{record.title}</div>
            },
            width: '60%',
        },
    ]

    const dataSource = Array.from<DataNotificationSys>({
        length: 46,
    }).map<DataNotificationSys>((_, i) => ({
        key: i,
        title: `Title ${i}`,
        date: new Date().toDateString(),
    }))

    return (
        <div className="flex flex-col gap-3 p-2">
            <span className="text-xl">{t('SYSTEM_NOTIFICATION')}</span>
            <div className="">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={dataSource}
                    // dataSource={[]}
                    pagination={{
                        pageSize: 4,
                    }}
                    size="middle"
                    locale={locale}
                />
            </div>
        </div>
    )
}

export default NotificationSystem
