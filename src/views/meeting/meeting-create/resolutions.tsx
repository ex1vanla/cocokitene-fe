import BoxArea from '@/components/box-area'
import CreateResolutionItem from '@/components/create-resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { IProposalFileMeeting } from '@/stores/meeting/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const Resolutions = ({ allowUploadFile }: { allowUploadFile: boolean }) => {
    const t = useTranslations()
    const [data, setData] = useCreateMeetingInformation()

    const onChange =
        (name: 'title' | 'description', index: number) => (value: string) => {
            const resolutions = [...data.resolutions]
            resolutions[index] = {
                ...resolutions[index],
                [name]: value,
            }
            setData({
                ...data,
                resolutions,
            })
        }

    const onAddFile = (index: number) => (file: IProposalFileMeeting) => {
        const resolutions = [...data.resolutions]
        const oldFiles = resolutions[index].files as IProposalFileMeeting[]
        resolutions[index] = {
            ...resolutions[index],
            files: [...oldFiles, file],
        }
        setData({
            ...data,
            resolutions,
        })
    }

    const onRemoveFile = (index: number) => (uid: string) => {
        const resolutions = [...data.resolutions]

        const oldFiles = resolutions[index].files as IProposalFileMeeting[]
        const newFiles = oldFiles.filter((file) => file.uid !== uid)

        resolutions[index] = {
            ...resolutions[index],
            files: newFiles,
        }
        setData({
            ...data,
            resolutions,
        })
    }

    const onDelete = (index: number) => () => {
        setData({
            ...data,
            resolutions: data.resolutions.filter((r, i) => i !== index),
        })
    }

    const onAddNew = () => {
        setData({
            ...data,
            resolutions: [
                ...data.resolutions,
                {
                    type: ResolutionType.RESOLUTION,
                    title: '',
                    description: '',
                    files: [],
                },
            ],
        })
    }

    return (
        <BoxArea title={t('RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.resolutions.map((x, index) => (
                    <CreateResolutionItem
                        key={index}
                        type={ResolutionType.RESOLUTION}
                        index={index + 1}
                        title={data.resolutions[index].title}
                        content={data.resolutions[index].description}
                        onChangeTitle={onChange('title', index)}
                        onChangeContent={onChange('description', index)}
                        onAddFile={onAddFile(index)}
                        onRemoveFile={onRemoveFile(index)}
                        onDelete={onDelete(index)}
                        allowUploadFile={allowUploadFile}
                        // @ts-ignore
                        fileList={x.files?.map((file) => file.file)}
                    />
                ))}
            </div>
            <Button
                onClick={onAddNew}
                icon={<PlusOutlined />}
                className="ml-[24px]"
                disabled={data.resolutions.length >= 10}
            >
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default Resolutions
