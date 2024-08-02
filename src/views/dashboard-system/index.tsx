import withAuthAdmin from '@/components/component-auth-admin'
import DetailTitle from '@/components/content-page-title/detail-title'
import NotificationSystem from './notificationSys'
import { useTranslations } from 'next-intl'
import StatisticalCompany from './statistical-company'
import CalendarCustom from '../dashboard/calendar'
import { Dayjs } from 'dayjs'

const DashBoardSystem = () => {
    const t = useTranslations()

    const onSelect = (newValue: Dayjs) => {
        console.log(newValue.toDate())
    }

    return (
        <div>
            <DetailTitle urlBack="/" pageName={t('DASHBOARD')} />
            <div className="p-6">
                <div className="flex flex-col gap-10 bg-white p-6 px-6 py-4 shadow-lg">
                    <div className="flex gap-5">
                        <div className="flex-[7_7_0%] border shadow-lg">
                            <NotificationSystem />
                        </div>
                        <div className="min-w-[300px] max-w-[350px] flex-[3_3_0%] border shadow-lg">
                            <CalendarCustom
                                isSupperAdmin={false}
                                onSelectDate={onSelect}
                            />
                        </div>
                    </div>
                    <div>
                        <StatisticalCompany />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuthAdmin(DashBoardSystem)
