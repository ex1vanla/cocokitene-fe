import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Text } = Typography

export interface IMeetingEmpty {
    NoMeetingsMessage: string
}

const MeetingEmpty = ({ NoMeetingsMessage }: IMeetingEmpty) => {
    const t = useTranslations();
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/images/logo-meeting-past.png"
                alt="service-image-alt"
                width={80}
                height={80}
            />
            <Text className="mt-4 text-xl font-bold text-black/[40%]">
                {t('NO_MEETING')}
            </Text>
            <Text className="mt-3 text-black/[45%]">{NoMeetingsMessage}</Text>
        </div>
    )
}

export default MeetingEmpty
