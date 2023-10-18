/* eslint-disable */

import {
    DashboardOutlined,
    SettingOutlined,
    TeamOutlined,
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
        icon: VideoCameraOutlined,
        label: 'MEETINGS',
        key: '/meeting',
    },
    {
        icon: UserOutlined,
        label: 'ACCOUNTS',
        key: '/account',
    },
    {
        icon: TeamOutlined,
        label: 'SHAREHOLDERS',
        key: '/shareholder',
    },
    {
        icon: SettingOutlined,
        label: 'SETTING_ROLES',
        key: '/setting-role',
    },
]

export const CONSTANT_EMPTY_STRING : string = ''

export const SIDEBAR_OPEN_WIDTH: number = 208
export const SIDEBAR_CLOSE_WIDTH: number = 80

export enum AvatarBgHexColors {
    GREEK_BLUE = '#2F54EB',
    VOLCANO = '#fa541c',
    CYAN = '#13C2C2',
    GOLDEN_PURPLE = '#722ED1',
}

export enum FETCH_STATUS {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

export const urlRegex =
    /^(https?:\/\/)?((?!\/\/)[\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
