import { MeetingFileType } from '@/constants/meeting'

export const getShortNameFromUrl = (url: string) => {
    const splitUrl = url.split('/')

    if (
        splitUrl.some((text) =>
            Object.values(MeetingFileType).includes(text as MeetingFileType),
        )
    ) {
        const shortName = url.split('/').at(-1)
        return decodeURI(shortName as string)
    }

    return decodeURI(url)
}
