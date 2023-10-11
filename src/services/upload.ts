// import { Cookies } from 'react-cookie'
import { get } from './fetcher'
import { MeetingFileType } from '@/constants/meeting'
import { IUploadResponse } from './response.type'
// const cookies = new Cookies()

const serviceUpload = {
    upload: async (
        files: File[],
        fileType: MeetingFileType,
    ): Promise<IUploadResponse> => {
        const response: { data: IUploadResponse } = await get('/s3', {
            meetingFiles: files.map((file) => ({
                fileName: file.name,
                fileType: fileType,
            })),
        })
        return response.data
    },
}

export default serviceUpload
