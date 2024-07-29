import withAuth from '@/components/component-auth'
import DetailTitle from '@/components/content-page-title/detail-title'
import { Permissions } from '@/constants/permission'
import { useTranslations } from 'next-intl'

import type { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useAuthLogin } from '@/stores/auth/hooks'
import NotificationSystem from './notification-system'
import NotificationPersonal from './notification-personal'
import CalendarCustom from './calendar'

const DashboardView = () => {
    const t = useTranslations()
    const { authState } = useAuthLogin()
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {}, [authState.userData?.id])

    const onSelect = (newValue: Dayjs) => {
        setDate(newValue.toDate())
    }

    const bodyNotifiCationPersonal = useMemo(() => {
        return <NotificationPersonal date={date} />
    }, [date])

    return (
        <div>
            <DetailTitle urlBack="/" pageName={t('DASHBOARD')} />
            <div className="p-6">
                <div className="flex flex-col gap-10 bg-white p-6 px-6 py-4 shadow-01">
                    <div className="flex gap-5">
                        <div className="flex-[7_7_0%]">
                            <NotificationSystem />
                        </div>
                        <div className="min-w-[300px] max-w-[350px] flex-[3_3_0%] border">
                            <CalendarCustom onSelectDate={onSelect} />
                        </div>
                    </div>
                    <div>{bodyNotifiCationPersonal}</div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(DashboardView, Permissions.BASIC_PERMISSION)
