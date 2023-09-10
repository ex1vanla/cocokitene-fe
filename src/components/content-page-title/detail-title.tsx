import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const { Title } = Typography

interface IDetailTitle extends IBaseTitle {
    extraButton?: ReactNode
}

const DetailTitle = ({ pageName, extraButton }: IDetailTitle) => {
    const t = useTranslations()
    const router = useRouter()

    return (
        <LayoutTitle>
            <div className="flex items-center gap-2">
                <ArrowLeftOutlined
                    onClick={() => {
                        router.back()
                    }}
                />
                <Title level={4} className="mb-0 font-medium">
                    {pageName}
                </Title>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    icon={<EditOutlined />}
                    type="default"
                    size="large"
                    onClick={() => {}}
                >
                    {t('EDIT')}
                </Button>
                {extraButton}
            </div>
        </LayoutTitle>
    )
}

export default DetailTitle
