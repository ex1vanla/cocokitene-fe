import { get } from './fetcher'
import { IPermissionResponse, IRoleResponse } from './response.type'

const serviceSettingRole = {
    getAllPermissions: async (
        page: number,
        limit: number,
    ): Promise<IPermissionResponse[]> => {
        const payload = { page, limit }
        const response = await get('/permissions', payload)

        if (response) return response?.data as IPermissionResponse[]
        return []
    },
    getAllRoles: async (
        page: number,
        limit: number,
    ): Promise<IRoleResponse[]> => {
        const payload = { page, limit }
        const response = await get('/roles', payload)
        console.log("check response", response)

        if (response) return response?.data as IRoleResponse[]
        return []
    },
    getCombineRoleWithPermission: async (): Promise<any> => {
        const response = await get('/role-permissions')
        return response
    },
}

export default serviceSettingRole
