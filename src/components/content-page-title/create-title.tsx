import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const { Title } = Typography

interface ICreateTitle extends IBaseTitle {
    saveButton: ReactNode
}

const CreateTitle = ({ pageName, saveButton }: ICreateTitle) => {
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
            <div className="flex items-center gap-2">{saveButton}</div>
        </LayoutTitle>
    )
}

export default CreateTitle
