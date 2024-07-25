import Loader from '@/components/loader'
import { RoleName } from '@/constants/role'
import serviceProfile from '@/services/profile'
import { IUserRole } from '@/services/response.type'
import { useAuthLogin } from '@/stores/auth/hooks'
import { Spin } from 'antd'
import { CalendarMode } from 'antd/es/calendar/generateCalendar'
import { useEffect, useMemo, useState } from 'react'

interface INotificationPersonal {
    modeCalendar: CalendarMode
}

const NotificationPersonal = ({ modeCalendar }: INotificationPersonal) => {
    const { authState } = useAuthLogin()

    const [status, setStatus] = useState<boolean>(true)
    const [roleOfProfile, setRoleOfProfile] = useState<IUserRole[]>([])

    console.log('modeCalendar: ', modeCalendar)
    if (modeCalendar == 'month') {
        console.log('Yesss node Month!!!!')
    }

    useEffect(() => {
        const fetchProfile = async (id: number) => {
            setStatus(true)
            const detailProfile = await serviceProfile.getDetailProfile(id)
            if (detailProfile) {
                console.log('Role User: ', detailProfile.roles)
                setRoleOfProfile(detailProfile.roles)
                setTimeout(() => {
                    setStatus(false)
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
            console.log('User is not SupperAdmin!!!')
            return <div>User is not SupperAdmin!!!</div>
        }
    }, [roleOfProfile])

    if (status) {
        return <Spin tip="Loading..." />
    }

    return (
        <div className="w-[100%] border border-black">
            <div>Notification of Personal</div>
            {bodyNotificationOfSupperAdmin}
        </div>
    )
}

export default NotificationPersonal
