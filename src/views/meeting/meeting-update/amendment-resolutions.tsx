import BoxArea from '@/components/box-area'
import UpdateResolutionItem from '@/components/update_resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { IProposalFile } from '@/stores/meeting/types'
import { getShortNameFromUrl } from '@/utils/meeting'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const AmendmentResolutions = ({
    allowUploadFile,
}: {
    allowUploadFile: boolean
}) => {
    const t = useTranslations()

    const [data, setData] = useUpdateMeetingInformation()

    const onChange =
        (name: 'title' | 'description' | 'oldDescription', index: number) =>
        (value: string) => {
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

    const onAddFile = (index: number) => (file: IProposalFile) => {
        const amendmentResolutions = [...data.amendmentResolutions]
        const oldFiles = amendmentResolutions[index].files as IProposalFile[]
        amendmentResolutions[index] = {
            ...amendmentResolutions[index],
            files: [...oldFiles, file],
        }
        setData({
            ...data,
            amendmentResolutions,
        })
    }

    const onRemoveFile = (index: number) => (uid: string) => {
        const amendmentResolutions = [...data.amendmentResolutions]

        const oldFiles = amendmentResolutions[index].files as IProposalFile[]
        const newFiles = oldFiles.filter((file) => file.uid !== uid)

        amendmentResolutions[index] = {
            ...amendmentResolutions[index],
            files: newFiles,
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
                    oldDescription: '',
                    files: [],
                },
            ],
        })
    }

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.amendmentResolutions.map((x, index) => (
                    <UpdateResolutionItem
                        key={index}
                        type={ResolutionType.AMENDMENT_RESOLUTION}
                        index={index + 1}
                        title={data.amendmentResolutions[index].title}
                        content={data.amendmentResolutions[index].description}
                        oldContent={
                            data.amendmentResolutions[index].oldDescription
                        }
                        fileList={data?.amendmentResolutions[index].files?.map(
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
                        onChangeOldContent={onChange('oldDescription', index)}
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
                disabled={data.amendmentResolutions.length >= 10}
                className="ml-6"
            >
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default AmendmentResolutions
