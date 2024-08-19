import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Title, Text } = Typography

export interface IServiceItem {
    serviceImage: string
    serviceTitle: string
    serviceSubtitle: string
}

const ServiceItem = ({
    serviceImage,
    serviceTitle,
    serviceSubtitle,
}: IServiceItem) => {
    const t = useTranslations()

    return (
        <div
            id="service-item-wrapper"
            className="flex items-center border-solid border-neutral/5 p-5 max-[639px]:gap-3 sm:flex-col sm:border"
        >
            <Image
                src={serviceImage}
                alt="service-image-alt"
                width={150}
                height={150}
                className="sm:mb-10"
            />
            <div>
                <Title
                    level={4}
                    className="mb-4 font-medium sm:max-w-[200px] sm:text-center"
                >
                    {t(serviceTitle)}
                </Title>
                <Text className="text-center font-normal text-black/[45%] sm:mb-4">
                    {t(serviceSubtitle)}
                </Text>
            </div>
        </div>
    )
}

export default ServiceItem
