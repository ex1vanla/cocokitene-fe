import { ParamsFilter } from '@/stores/setting-role/type'
import { get, patch, post } from './fetcher'
import { ICreateRolePayload, IUpdatePermissionRole } from './request.type'
import {
    IPermissionResponse,
    IRoleResponse,
} from './response.type'

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
        const response = await get('/roles/internal-role', payload)

        if (response) return response?.data as IRoleResponse[]
        return []
    },
    getCombineRoleWithPermission: async (
        payload?: ParamsFilter,
    ): Promise<any> => {
        const response = await get('/role-permissions', {
            searchQuery: payload?.searchQuery,
        })
        return response
    },
    updateRolePermissions: async (payload: IUpdatePermissionRole[]) => {
        const response = await patch<any>('role-permissions', {
            assignmentRoleOfPermission: payload,
        })
        return response.data
    },
    createRole: async (payload: ICreateRolePayload) => {
        const response = await post<any>('/roles', payload)
        return response.data
    },
}

export default serviceSettingRole
