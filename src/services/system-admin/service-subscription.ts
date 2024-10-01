import { ICreateServiceSubscriptionPayload } from './request.type';
import { IGetAllServiceSubscriptionQuery } from "@/stores/service-subscription/type";
import { IGetAllDataReponse, IListServiceSubscription, IServiceSubscriptionDetailResponse } from "./response.type";
import { get, patch, post } from "./fetcher-system";
import { StatusSubscriptionEnum } from '@/constants/service-subscript';



const serviceSubscriptionService = {
    getAllCompanyOption: async ():Promise<{id:number,companyName:string}[]> =>{
        const response: { data: {id:number,companyName:string}[]} = await get('/system-admin/get-all-option-company')

        return response.data
    },

    getAllServicePlanOption: async ():Promise<{id:number, planName:string,prince:number}[]>  => {
        const response: { data: {id:number, planName:string,prince:number}[]} = await get('/system-admin/get-all-option-plan')
        return response.data
    },

    getAllServiceSubscription: async ({
        page,
        limit,
        filter,
    }: IGetAllServiceSubscriptionQuery): Promise<IGetAllDataReponse<IListServiceSubscription>> => {
        const payload = { page, limit, ...filter }
        const response: {data: IGetAllDataReponse<IListServiceSubscription>} = 
            await get('/system-admin/service-subscription',payload)

        return response.data
    },

    createServiceSubscription: async (
        payload: ICreateServiceSubscriptionPayload
    ) => {
        const response = await post<any>('/system-admin/service-subscription', payload)

        return response.data
    },

    getDetailServiceSubscription: async (
        serviceSubscriptionId: number
    ) => {
        const response = await get<IServiceSubscriptionDetailResponse>(
            `/system-admin/service-subscription/${serviceSubscriptionId}`
        )

        return response.data
    },

    updateStatusServiceSubscription: async (
        id: number,
        payload: {status: StatusSubscriptionEnum}
    ) => {
        const response = await patch<any>(`/system-admin/service-subscription/${id}`,
            payload
        )
        return response.data
    },

    applyServiceSubscriptionNow: async (
        id: number,
        payload: {status: StatusSubscriptionEnum}
    ) => {
        const response = await patch<any>(`/system-admin/service-subscription/${id}/apply-now`,
            payload
        )
        return response.data
    }

}

export default serviceSubscriptionService