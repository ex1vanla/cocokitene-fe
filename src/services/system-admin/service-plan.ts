import { IGetAllPlanQuery } from "@/stores/service-plan/type";
import { ICreatePlan, IGetAllDataReponse, IListPlanResponse } from "./response.type";
import { get ,post} from '@/services/system-admin/fetcher-system'



const servicePlan = {
    getAllPlans :async ({
        page,
        limit,
        filter
    }:IGetAllPlanQuery): Promise<IGetAllDataReponse<IListPlanResponse>> => {
        const payload = { page , limit , ...filter }
        const response : {data: IGetAllDataReponse<IListPlanResponse>} = await get('/system-admin/plans',payload)

        return response.data
    },
    
    createPlan :async (payload:ICreatePlan) => {
        const response = await post<any>('/system-admin/plan',payload)
        return response.data
    }
}

export default servicePlan