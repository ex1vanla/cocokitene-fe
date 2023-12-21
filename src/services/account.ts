import { IGetAllAccountQuery } from '@/stores/account/type'
import {
    IGetAllDataReponse,
    IListAccountResponse,
} from '@/services/response.type'
import { get } from '@/services/fetcher'

const serviceAccount = {
    getAllUsers: async ({
        page,
        limit,
        filter,
    }: IGetAllAccountQuery): Promise<
        IGetAllDataReponse<IListAccountResponse>
    > => {
        const payload = { page, limit, ...filter }
        const response: { data: IGetAllDataReponse<IListAccountResponse> } =
            await get('/users', payload)
        return response.data
    },
}
export default serviceAccount
