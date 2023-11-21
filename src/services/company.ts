import {
    IGetAllCompanyQuery,
    IListCompanyResponse,
} from '@/stores/company/type'
import { IGetAllDataReponse } from './response.type'
import { get, post } from './fetcher'
import { ICreateCompanyPayload } from '@/services/request.type'

const serviceCompany = {
    getAllCompanys: async ({
        page,
        limit,
        filter,
    }: IGetAllCompanyQuery): Promise<
        IGetAllDataReponse<IListCompanyResponse>
    > => {
        const payload = { page, limit, ...filter }
        const response: { data: IGetAllDataReponse<IListCompanyResponse> } =
            await get('/system-admin/get-all-companys', payload)

        return response.data
    },

    createCompany: async (payload: ICreateCompanyPayload) => {
        const response = await post<any>('/system-admin/companys', payload)
        return response.data
    },
}

export default serviceCompany
