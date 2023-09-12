import { ResolutionType } from '@/constants/meeting'
import { Resolution } from '@/constants/resolution'
import { DeleteOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Text } = Typography
const { TextArea } = Input

interface ICreateResolutionItem extends Resolution {
    type: ResolutionType
    index: number
    onChangeTitle: () => void
    onChangeContent: () => void
    onDelete: () => void
}

const CreateResolutionItem = ({
    type,
    index,
    title,
    content,
    onChangeTitle,
    onChangeContent,
    onDelete,
}: ICreateResolutionItem) => {
    const t = useTranslations()

    return (
        <div className="flex flex-row items-start gap-2">
            <Text className="leading-10">
                {t(type)} {index}:
            </Text>
            <div className="flex flex-grow flex-col gap-2">
                <Input
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_TITLE')}
                    size="large"
                    value={title}
                    onChange={onChangeTitle}
                />
                <TextArea
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_RESOLUTION_DETAIL')}
                    value={content}
                    onChange={onChangeContent}
                />
            </div>
            <div></div>
            <DeleteOutlined className="h-10 text-dust-red" onClick={onDelete} />
        </div>
    )
}

export default CreateResolutionItem
