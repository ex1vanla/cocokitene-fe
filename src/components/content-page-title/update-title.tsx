import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { useTranslations } from 'next-intl'

const { Title } = Typography

interface IUpdateTitle extends IBaseTitle {
    saveButton: ReactNode
}

const UpdateTitle = ({ pageName, saveButton }: IUpdateTitle) => {
    const router = useRouter()
    const t = useTranslations()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        router.back()
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <LayoutTitle>
                <div className="flex items-center gap-2">
                    <ArrowLeftOutlined
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                    />
                    <Title level={4} className="mb-0 font-medium">
                        {pageName}
                    </Title>
                </div>
                <div className="flex items-center gap-2">{saveButton}</div>
            </LayoutTitle>
            <Modal
                title={t('TITLE_CONFIRM_BACK')}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={t('CONFIRM')}
                cancelText={t('BTN_CANCEL')}
                closable={false}
            >
                <p>{t('CONTENT_CONFIRM_BACK')}</p>
            </Modal>
        </>
    )
}

export default UpdateTitle
