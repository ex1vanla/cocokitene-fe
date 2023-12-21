import { RoleBgHexColors } from '@/constants/role'
import { Tag } from 'antd'
import React from 'react'

interface IRoleInfo {
    roleName: string
    defaultRoleHashColor?: string
}
const RoleInfo = ({
    roleName,
    defaultRoleHashColor = RoleBgHexColors.DEFAULTCOLOR,
}: IRoleInfo) => {
    return (
        <Tag color={defaultRoleHashColor} className="mr-0 rounded">
            {roleName}
        </Tag>
    )
}
export default RoleInfo
