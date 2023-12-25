import { get } from './fetcher'
import { IGetAllDataReponse, IPermissionResponse } from './response.type'

const serviceSettingRole = {
    getAllPermissions: async (
        page: number,
        limit: number,
    ): Promise<IGetAllDataReponse<IPermissionResponse>> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IPermissionResponse> } =
            await get('/permissions', payload)

        return response.data
    },
}

export default serviceSettingRole
