import { get } from './fetcher'
import { IGetAllDataReponse, IPermissionResponse, IRoleResponse } from './response.type'

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
    ): Promise<IGetAllDataReponse<IRoleResponse>> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IRoleResponse> } = await get('/roles', payload)

        return response.data
    },
    getCombineRoleWithPermission: async (): Promise<any> => {
        const response = await get('/role-permissions')
        return response
    },
}

export default serviceSettingRole
