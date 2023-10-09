// import { Cookies } from 'react-cookie'
import { get } from './fetcher'
import { MeetingFileType } from '@/constants/meeting'
import { UploadResponse } from './response.type'
// const cookies = new Cookies()

const serviceUpload = {
    upload: async (files: File[], fileType: MeetingFileType): Promise<UploadResponse> => {
        const response: { data: UploadResponse } = await get('/s3', {
            meetingFiles: files.map(file => ({
                fileName: file.name,
                fileType: fileType,
            }))
        })
        return response.data
    },
}

export default serviceUpload;
