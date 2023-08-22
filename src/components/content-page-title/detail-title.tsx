import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const { Title } = Typography

interface IDetailTitle extends IBaseTitle {}

const DetailTitle = ({ pageName }: IDetailTitle) => {
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
            </div>
        </LayoutTitle>
    )
}

export default DetailTitle
