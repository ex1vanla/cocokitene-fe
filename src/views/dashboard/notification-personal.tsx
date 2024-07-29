import {
    MeetingStatus,
    MeetingStatusColor,
    MeetingStatusName,
} from '@/constants/meeting'
import { RoleName } from '@/constants/role'
import serviceProfile from '@/services/profile'
import { IUserRole } from '@/services/response.type'
import { useAuthLogin } from '@/stores/auth/hooks'
import { IMeeting } from '@/stores/meeting/types'
import { enumToArray } from '@/utils'
import { calculateTimeDifference, formatTimeMeeting } from '@/utils/date'
import { Spin } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import EmptyData from '../service-plan/service-plan-list/empty-plan'
import serviceDashBoard from '@/services/dash-board'

interface NotificationMeetingUser {
    key: React.Key
    meetingName: string
    duration: string
    takesPlaceAfter: string
    status: MeetingStatus
}

const NotificationUser = ({ date }: { date: Date }) => {
    const t = useTranslations()
    const [dataMeeting, setDataMeeting] = useState<IMeeting[]>([])
    const [loadingFetchData, setLoadingFetchData] = useState<boolean>(true)

    let locale = {
        emptyText: <EmptyData />,
    }

    useEffect(() => {
        const fetchDataMeeting = async () => {
            setLoadingFetchData(true)
            const meetingInDay = await serviceDashBoard.getAllMeetingInDay({
                page: 1,
                limit: 100,
                date: date,
            })
            if (meetingInDay) {
                setDataMeeting(meetingInDay.items)
            }
            setLoadingFetchData(false)
        }
        fetchDataMeeting()
    }, [date])

    const dataColumn: NotificationMeetingUser[] = useMemo(() => {
        console.log('dataMeeting: ', dataMeeting)

        return dataMeeting.map((meeting, i) => {
            const differenceDate = calculateTimeDifference(
                meeting.meetings_start_time,
            )

            console.log('meeting.meetings_status: ', meeting.meetings_status)

            const statusMeeting =
                enumToArray(MeetingStatus).find(
                    (status) => status == meeting.meetings_status,
                ) ?? MeetingStatus.HAPPENING
            return {
                key: i + 1,
                meetingName: meeting.meetings_title,
                duration: formatTimeMeeting(
                    meeting.meetings_start_time.toString(),
                    meeting.meetings_end_time.toString(),
                ),
                takesPlaceAfter: differenceDate
                    ? t('MEETING_START_MESSAGE', {
                          days: differenceDate[0].toString(),
                          hours: differenceDate[1].toString(),
                          minutes: differenceDate[2].toString(),
                      })
                    : t(MeetingStatusName[statusMeeting]),
                status: meeting.meetings_status as MeetingStatus,
            }
        })
    }, [t, dataMeeting])

    const columns: ColumnsType<NotificationMeetingUser> = [
        {
            title: t('NO'),
            dataIndex: 'key',
            width: '5%',
            className: 'text-center',
        },
        {
            title: t('MEETING_NAME'),
            dataIndex: 'meetingName',
            render: (_, record) => {
                return (
                    <div className="flex w-full items-center gap-2 break-words">
                        {record.meetingName}
                    </div>
                )
            },
            width: '45%',
        },
        {
            title: t('MEETING_DURATION'),
            dataIndex: 'title',
            render: (_, record) => {
                return <div className="break-words">{record.duration}</div>
            },
            width: '25%',
        },
        {
            title: t('MEETING_TAKE_PLACE'),
            dataIndex: 'title',
            render: (_, record) => {
                return (
                    <div
                        className="break-words"
                        style={{ color: MeetingStatusColor[record.status] }}
                    >
                        {record.takesPlaceAfter}
                    </div>
                )
            },
            width: '25%',
        },
    ]

    return (
        <div className="flex min-h-[350px] flex-col gap-3  p-2">
            <span className="text-lg">
                {t('MEETING_SCHEDULE', {
                    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                })}
            </span>
            <div className="min-h-[300px]">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={dataColumn}
                    pagination={{
                        pageSize: 7,
                    }}
                    size="middle"
                    bordered
                    locale={locale}
                    loading={loadingFetchData}
                />
            </div>
        </div>
    )
}

interface INotificationPersonal {
    date: Date
}

const NotificationPersonal = ({ date }: INotificationPersonal) => {
    const { authState } = useAuthLogin()

    const [loading, setLoading] = useState<boolean>(true)
    const [roleOfProfile, setRoleOfProfile] = useState<IUserRole[]>([])

    console.log('date: ', date)

    useEffect(() => {
        const fetchProfile = async (id: number) => {
            setLoading(true)
            const detailProfile = await serviceProfile.getDetailProfile(id)
            if (detailProfile) {
                console.log('Role User: ', detailProfile.roles)
                setRoleOfProfile(detailProfile.roles)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }

        if (authState.userData?.id) {
            fetchProfile(authState.userData.id)
        }
    }, [authState.userData?.id])

    const bodyNotificationOfSupperAdmin = useMemo(() => {
        if (
            roleOfProfile.find((role) => role.roleName == RoleName.SUPER_ADMIN)
        ) {
            console.log('User is SupperAdmin!!!!')
            return <div>User is SupperAdmin!!!!</div>
        } else {
            // console.log('User is not SupperAdmin!!!')
            return (
                <div>
                    <NotificationUser date={date} />
                </div>
            )
        }
    }, [roleOfProfile, date])

    if (loading) {
        return (
            <div className="flex justify-center">
                <Spin tip="Loading..." />
            </div>
        )
    }

    return <div className="w-[100%]">{bodyNotificationOfSupperAdmin}</div>
}

export default NotificationPersonal
