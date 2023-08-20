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

export const SIDEBAR_ITEMS: ISidebarItem[] = [
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

export const SIDEBAR_OPEN_WIDTH: number = 208
export const SIDEBAR_CLOSE_WIDTH: number = 80
