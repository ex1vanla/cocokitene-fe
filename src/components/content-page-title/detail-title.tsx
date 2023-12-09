import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const { Title } = Typography

interface IDetailTitle extends IBaseTitle {
    editButton?: ReactNode
    extraButton?: ReactNode
}

const DetailTitle = ({ pageName, editButton, extraButton }: IDetailTitle) => {
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
                {editButton}
                {extraButton}
            </div>
        </LayoutTitle>
    )
}

export default DetailTitle
