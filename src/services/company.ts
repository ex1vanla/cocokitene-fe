import {
    ICreateCompanyPayload,
    IUpdateCompanyPayload,
    IUpdateSuperAdminPayload,
} from '@/services/request.type'
import { IGetAllCompanyQuery } from '@/stores/company/type'
import { get, patch, post } from './fetcher'
import {
    ICompanyDetailResponse,
    IGetAllDataReponse,
    IListCompanyResponse,
} from './response.type'

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

    getDetailCompany: async (companyId: number) => {
        const response = await get<ICompanyDetailResponse>(
            `/system-admin/company/${companyId}`,
        )
        return response.data
    },

    updateCompany: async (
        companyId: number,
        payload: IUpdateCompanyPayload,
    ) => {
        const response = await patch<any>(
            `/system-admin/company/${companyId}`,
            payload,
        )
        return response.data
    },

    updateSuperAdmin: async (
        companyId: number,
        superAdminId: number,
        payload: IUpdateSuperAdminPayload,
    ) => {
        const response = await patch<any>(
            `/system-admin/company/${companyId}/superadmin/${superAdminId}`,
            payload,
        )
        return response.data
    },

    getCompanyDetail: async (companyId: number) => {
        const response = await get<ICompanyDetailResponse>(
            `system-admin/company/${companyId}`,
        )
        return response.data
    },
}

export default serviceCompany
