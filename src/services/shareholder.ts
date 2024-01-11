import { IGetAllShareholderQuery } from '@/stores/shareholder/type'
import {
    IGetAllDataReponse,
    IListShareholderResponse,
    IShareholderDetailResponse,
} from '@/services/response.type'
import { get } from '@/services/fetcher'
const serviceShareholder = {
    getAllShareholders: async ({
        page,
        limit,
        filter,
    }: IGetAllShareholderQuery): Promise<
        IGetAllDataReponse<IListShareholderResponse>
    > => {
        const payload = { page, limit, ...filter }
        const response: { data: IGetAllDataReponse<IListShareholderResponse> } =
            await get('/shareholders', payload)
        return response.data
    },
    getDetailShareholder: async (shareholderId: number) => {
        const response = await get<IShareholderDetailResponse>(
            `/shareholders/${shareholderId}`,
        )
        return response.data
    },
}
export default serviceShareholder
