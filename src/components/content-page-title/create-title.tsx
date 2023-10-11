import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import SaveCreateMeetingButton from '@/views/meeting/meeting-create/save-button'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Title } = Typography

interface ICreateTitle extends IBaseTitle {}

const CreateTitle = ({ pageName }: ICreateTitle) => {
    const router = useRouter()

    // const onSave = () => {

    // }
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
                <SaveCreateMeetingButton />
            </div>
        </LayoutTitle>
    )
}

export default CreateTitle
