import BoxArea from '@/components/box-area'
import CreateResolutionItem from '@/components/create-resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { IProposalFileMeeting } from '@/stores/meeting/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const AmendmentResolutions = ({
    allowUploadFile,
}: {
    allowUploadFile: boolean
}) => {
    const t = useTranslations()

    const [data, setData] = useCreateMeetingInformation()

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

    const onAddFile = (index: number) => (file: IProposalFileMeeting) => {
        const amendmentResolutions = [...data.amendmentResolutions]
        const oldFiles = amendmentResolutions[index]
            .files as IProposalFileMeeting[]
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

        const oldFiles = amendmentResolutions[index]
            .files as IProposalFileMeeting[]
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
                    <CreateResolutionItem
                        key={index}
                        type={ResolutionType.AMENDMENT_RESOLUTION}
                        index={index + 1}
                        title={data.amendmentResolutions[index].title}
                        content={data.amendmentResolutions[index].description}
                        oldContent={
                            data.amendmentResolutions[index].oldDescription
                        }
                        onChangeOldContent={onChange('oldDescription', index)}
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
                disabled={data.amendmentResolutions.length >= 10}
            >
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default AmendmentResolutions
