import { ICreateMeeting } from '@/stores/meeting/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICreateMeeting = {
    title: '',
    link: '',
}

// export const getLastPriceList = createAsyncThunk<
//     LastPrice[],
//     { chainId: SupportedChainId },
//     {
//         rejectValue: FetchError
//     }
// >('price/getLastPriceList', async ({ chainId }, { rejectWithValue }) => {
//     try {
//         const lastPriceList = await servicePrice.getLastPrice(chainId)
//         return lastPriceList.map((lastPrice) => {
//             const token = getTokenFromLevelKey(lastPrice.token, chainId)
//             return {
//                 token: { ...token },
//                 price: lastPrice.price,
//                 time: lastPrice.time,
//             }
//         })
//     } catch (error) {
//         const err = error as AxiosError
//         return rejectWithValue({
//             errorMessage: err.response?.data.message,
//             errorCode: err.response?.data.code,
//         })
//     }
// })

export const meetingCreateSlice = createSlice({
    name: 'meetingCreateSlice',
    initialState,
    reducers: {
        updateCreateMeetingInformation: (
            state: ICreateMeeting,
            action: PayloadAction<ICreateMeeting>,
        ) => {
            state.title = action.payload.title
            state.link = action.payload.link
        },
    },
})

export const { updateCreateMeetingInformation } = meetingCreateSlice.actions

export default meetingCreateSlice.reducer
