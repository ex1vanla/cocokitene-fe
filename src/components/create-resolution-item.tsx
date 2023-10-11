/* eslint-disable */
import { ResolutionType } from '@/constants/resolution'
import { Resolution } from '@/constants/resolution'
import { DeleteOutlined } from '@ant-design/icons'
import { Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { ChangeEvent } from 'react'

const { Text } = Typography
const { TextArea } = Input

interface ICreateResolutionItem extends Resolution {
    type: ResolutionType
    index: number
    onChangeTitle: (value: string) => void
    onChangeContent: (value: string) => void
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

    const onChange =
        (callback: (value: string) => void) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            callback(event.target.value)
        }

    return (
        <div className="flex flex-row items-start gap-2">
            <Text className="leading-10">
                {t(type.toUpperCase())} {index}:
            </Text>
            <div className="flex flex-grow flex-col gap-2">
                <Input
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_TITLE')}
                    size="large"
                    value={title}
                    onChange={onChange(onChangeTitle)}
                />
                <TextArea
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_RESOLUTION_DETAIL')}
                    value={content}
                    onChange={onChange(onChangeContent)}
                />
            </div>
            <div></div>
            <DeleteOutlined
                className={`h-10 text-dust-red ${index === 1 && 'invisible'}`}
                disabled={index === 1}
                onClick={onDelete}
            />
        </div>
    )
}

export default CreateResolutionItem
