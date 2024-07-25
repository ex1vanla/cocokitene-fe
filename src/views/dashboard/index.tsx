import withAuth from '@/components/component-auth'
import DetailTitle from '@/components/content-page-title/detail-title'
import { Permissions } from '@/constants/permission'
import { Calendar, CalendarProps, theme } from 'antd'
import { useTranslations } from 'next-intl'

import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useAuthLogin } from '@/stores/auth/hooks'
import NotificationSystem from './notification-system'
import NotificationPersonal from './notification-personal'
import { CalendarMode } from 'antd/es/calendar/generateCalendar'

const DashboardView = () => {
    const t = useTranslations()
    const { authState } = useAuthLogin()

    const [modeCalendar, setModeCalendar] = useState<CalendarMode>('month')

    useEffect(() => {}, [authState.userData?.id])

    const onPanelChange = (
        value: Dayjs,
        mode: CalendarProps<Dayjs>['mode'],
    ) => {
        console.log('onPanelChange: ')
        console.log(value.format('YYYY-MM-DD'))
        console.log('mode: ', mode)
        mode && setModeCalendar(mode)
    }

    const onSelect = (newValue: Dayjs) => {
        console.log('mode: ', modeCalendar)
        console.log(
            `day:${newValue.date()} - month:${
                newValue.month() + 1
            } - year:${newValue.year()} `,
        )
    }

    return (
        <div>
            <DetailTitle urlBack="/" pageName={t('DASH_BOARD')} />
            <div className="p-6">
                <div className="flex flex-col gap-10 bg-white p-6 px-6 py-4 shadow-01">
                    This is DashBoard
                    <div className="flex gap-5">
                        <div className="flex-[7_7_0%] border border-red-500">
                            <NotificationSystem />
                        </div>
                        <div className="min-w-[300px] flex-[3_3_0%] border border-blue-500">
                            <Calendar
                                fullscreen={false}
                                onPanelChange={onPanelChange}
                                onSelect={onSelect}
                            />
                        </div>
                    </div>
                    <NotificationPersonal modeCalendar={modeCalendar} />
                </div>
            </div>
        </div>
    )
}

export default withAuth(DashboardView, Permissions.BASIC_PERMISSION)
