import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Title } = Typography

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
                className="mx-auto sm:mb-10"
            />
            <div>
                <Title
                    level={4}
                    className="mx-auto mb-3 font-medium sm:max-w-[200px] sm:text-center"
                >
                    {t(serviceTitle)}
                </Title>
                <p className="mx-auto text-center text-sm font-normal text-black/[45%] sm:mb-4">
                    {t(serviceSubtitle)}
                </p>
            </div>
        </div>
    )
}

export default ServiceItem
