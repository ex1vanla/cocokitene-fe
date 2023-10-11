import BoxArea from '@/components/box-area'
import CreateResolutionItem from '@/components/create-resolution-item'
import { ResolutionType } from '@/constants/meeting'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const AmendmentResolutions = () => {
    const t = useTranslations()

    const [data, setData] = useCreateMeetingInformation()

    const onChange =
        (name: 'title' | 'description', index: number) => (value: string) => {
            const amendmentResolutions = [...data.amendmentResolutions]
            amendmentResolutions[index] = {
                ...amendmentResolutions[index],
                [name]: value,
            }
            setData({
                ...data,
                amendmentResolutions,
            })
        }

    const onDelete = (index: number) => () => {
        setData({
            ...data,
            amendmentResolutions: data.amendmentResolutions.filter(
                (r, i) => i !== index,
            ),
        })
    }

    const onAddNew = () => {
        setData({
            ...data,
            amendmentResolutions: [
                ...data.amendmentResolutions,
                {
                    type: ResolutionType.AMENDMENT_RESOLUTION,
                    title: '',
                    description: '',
                },
            ],
        })
    }

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.amendmentResolutions.map((x, index) => (
                    <CreateResolutionItem
                        key={index}
                        type={ResolutionType.AMENDMENT_RESOLUTION}
                        index={index + 1}
                        title={data.amendmentResolutions[index].title}
                        content={data.amendmentResolutions[index].description}
                        onChangeTitle={onChange('title', index)}
                        onChangeContent={onChange('description', index)}
                        onDelete={onDelete(index)}
                    />
                ))}
            </div>
            <Button onClick={onAddNew} icon={<PlusOutlined />}>
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default AmendmentResolutions
