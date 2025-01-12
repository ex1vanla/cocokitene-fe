import BoxArea from '@/components/box-area'
import UpdateResolutionItem from '@/components/update_resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { IProposalFile } from '@/stores/meeting/types'
import { getShortNameFromUrl } from '@/utils/meeting'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const Resolutions = ({ allowUploadFile }: { allowUploadFile: boolean }) => {
    const t = useTranslations()
    const [data, setData] = useUpdateMeetingInformation()

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

    const onAddFile = (index: number) => (file: IProposalFile) => {
        const resolutions = [...data.resolutions]
        const oldFiles = resolutions[index].files as IProposalFile[]
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

        const oldFiles = resolutions[index].files as IProposalFile[]
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
                    <UpdateResolutionItem
                        key={index}
                        type={ResolutionType.RESOLUTION}
                        index={index + 1}
                        title={data.resolutions[index].title}
                        content={data.resolutions[index].description}
                        fileList={data?.resolutions[index].files?.map(
                            (file, index) => ({
                                // uid: file.id?.toString() || index.toString(),
                                uid: file.uid?.toString() || index.toString(),
                                name: getShortNameFromUrl(file.url) as string,
                                url: file.url,
                                status: 'done',
                            }),
                        )}
                        onChangeTitle={onChange('title', index)}
                        onChangeContent={onChange('description', index)}
                        onAddFile={onAddFile(index)}
                        onRemoveFile={onRemoveFile(index)}
                        onDelete={onDelete(index)}
                        allowUploadFile={allowUploadFile}
                        meetingCode={data.meetingCode}
                    />
                ))}
            </div>
            <Button
                onClick={onAddNew}
                icon={<PlusOutlined />}
                disabled={data.resolutions.length >= 10}
                className="ml-6"
            >
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default Resolutions
