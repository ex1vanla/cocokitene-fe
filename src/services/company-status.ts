import { IGetAllDataRequest } from '@/services/request.type'
import { get } from './fetcher'
import { ICompanyStatusResponse, IGetAllDataReponse } from './response.type'

const serviceCompanyStatus = {
    getAllCompanyStatus: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<ICompanyStatusResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<ICompanyStatusResponse> } =
            await get('/system-admin/company-status', payload)

        return response.data.items
    },
}

export default serviceCompanyStatus
