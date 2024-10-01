import { IGetAllServiceSubscriptionQuery } from "@/stores/service-subscription/type"
import { get, post } from "./fetcher"
import { IGetAllDataReponse, IServicePlanOfCompany, IServiceSubscription } from "./response.type"
import { ISubscriptionServicePlanPayload } from "./request.type"


const companyServicePlan = {
    getServicePlanOfCompany: async() => {
        const response = await get<IServicePlanOfCompany>('/company-service')
    
        return response.data
    },

    getAllServicePlanSubscriptionOfCompany: async({page,limit}:IGetAllServiceSubscriptionQuery) => {
        const payload = {page, limit}
        const response: {data: IGetAllDataReponse<IServiceSubscription>} = await get('/service-subscription',payload)

        return response.data
    },

    subscriptionServicePlanForCompany: async(
        payload: ISubscriptionServicePlanPayload,
    ) => {
        const response = await post<any>('/company-service/subscription' , payload)

        return response.data
    }

}

export default companyServicePlan