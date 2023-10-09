import { ICreateMeeting, IMeetingResolution } from '@/stores/meeting/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ICreateMeeting = {
    title: "",
    meetingLink: "",
    startTime: "",
    endTime: "",
    meetingReports: [],
    meetingInvitations: [],
    resolutions: [
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        }
    ],
    amendmentResolutions: [
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        },
        {
            title: '',
            description: '',
            type: ''
        }
    ],
    hosts: [],
    controlBoards: [],
    directors: [],
    administrativeCouncils: [],
    shareholders: [],
};

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
            // state.title = action.payload.title
            // state.link = action.payload.link]
            return action.payload
        },

        updateCreateMeetingResolution: (
            state: ICreateMeeting,
            action: PayloadAction<{ data: IMeetingResolution, index: number }>,
        ) => {
            // state.title = action.payload.title
            // state.link = action.payload.link]
            state.resolutions[action.payload.index] = action.payload.data
        }
    },
})

export const { updateCreateMeetingInformation, updateCreateMeetingResolution } = meetingCreateSlice.actions

export default meetingCreateSlice.reducer
