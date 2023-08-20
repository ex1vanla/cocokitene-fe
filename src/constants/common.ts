import {
    DashboardOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'

export interface ISidebarItem {
    icon: any
    label: string
    key: string
}

export const sidebarItems: ISidebarItem[] = [
    {
        icon: DashboardOutlined,
        label: 'DASHBOARD',
        key: '/dashboard',
    },
    {
        icon: UserOutlined,
        label: 'ACCOUNT',
        key: '/account',
    },
    {
        icon: VideoCameraOutlined,
        label: 'MEETING',
        key: '/meeting',
    },
]
