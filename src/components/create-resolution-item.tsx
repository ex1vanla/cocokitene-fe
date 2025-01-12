/* eslint-disable */
import { ACCEPT_FILE_TYPES, MeetingFileType } from '@/constants/meeting'
import { ResolutionTitle, ResolutionType } from '@/constants/resolution'
import { Resolution } from '@/constants/resolution'
import serviceUpload from '@/services/upload'
import { IProposalFile, IProposalFileMeeting } from '@/stores/meeting/types'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Input, Tooltip, Typography, Upload, UploadFile } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useEffect, useState } from 'react'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'

const { Text } = Typography
const { TextArea } = Input

interface ICreateResolutionItem extends Resolution {
    type: ResolutionType
    index: number
    onChangeTitle: (value: string) => void
    onChangeContent: (value: string) => void
    onChangeOldContent?: (value: string) => void
    onAddFile?: (file: IProposalFileMeeting) => void
    onRemoveFile?: (uuid: string) => void
    onDelete: () => void
    allowUploadFile: boolean
}

const CreateResolutionItem = ({
    type,
    index,
    title,
    content,
    oldContent,
    fileList = [],
    onChangeTitle,
    onChangeContent,
    onChangeOldContent,
    onAddFile,
    onRemoveFile,
    onDelete,
    allowUploadFile,
}: ICreateResolutionItem) => {
    const t = useTranslations()

    const onChange =
        (callback: (value: string) => void) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            callback(event.target.value)
        }

    const [fileData, setFileData] = useState<{
        fileList: UploadFile[]
        errorUniqueFile: boolean
        errorWrongFileType?: boolean
        errorFileSize?: boolean
    }>({ fileList: fileList, errorUniqueFile: false })

    useEffect(() => {
        setFileData({
            fileList: fileList,
            errorUniqueFile: false,
        })
    }, [fileList])

    const onUpload = async ({ file }: RcCustomRequestOptions) => {
        try {
            const meetingFileType =
                type == ResolutionType.MANAGEMENT_FINANCIAL
                    ? MeetingFileType.REPORTS
                    : MeetingFileType.PROPOSAL_FILES

            // const res = await serviceUpload.getPresignedUrl(
            //     [file as File],
            //     // MeetingFileType.PROPOSAL_FILES,
            //     meetingFileType,
            // )
            // await serviceUpload.uploadFile(file as File, res.uploadUrls[0])

            onAddFile &&
                onAddFile({
                    file: file,
                    uid: (file as RcFile).uid,
                })
        } catch (error) {}
    }
    const onFileChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
            const url = info.file?.xhr?.responseURL
            if (url) {
                onAddFile &&
                    onAddFile({
                        file: info.file as RcFile,
                        uid: info.file.uid,
                    })
                // const values = data[name]
                // setData({
                //     ...data,
                //     [name]: [
                //         ...values,
                //         {
                //             url: url.split('?')[0],
                //             fileType,
                //             uid: info.file.uid,
                //         },
                //     ],
                // })
            }
        }
        if (info.file.status === 'removed') {
            setFileData({
                fileList: info.fileList,
                errorUniqueFile: false,
            })
            const uid = info.file.uid
            if (uid) {
                onRemoveFile && onRemoveFile(uid)
                // const values = data[name].filter((item) => item.uid !== uid)
                // setData({
                //     ...data,
                //     [name]: values,
                // })
            }
        }
    }

    const validateFile = (file: RcFile, listRcFile: RcFile[]) => {
        // filter unique file
        const listCurrentFileNames = fileData.fileList.map((file) => file.name)

        if (listCurrentFileNames.includes(file.name)) {
            setFileData({
                ...fileData,
                errorUniqueFile: true,
            })
            return false
        }

        const newUploadedFiles = listRcFile.filter(
            (file) => !listCurrentFileNames.includes(file.name),
        )

        setFileData({
            fileList: [...fileData.fileList, ...newUploadedFiles],
            errorUniqueFile: false,
        })

        if (file.size > 20 * (1024 * 1024 * 1024)) {
            setFileData({
                ...fileData,
                errorFileSize: true,
            })
            return false
            // return Upload.LIST_IGNORE
        }
        const extension = file.name.split('.').slice(-1)[0]
        if (!ACCEPT_FILE_TYPES.split(',').includes(`.${extension}`)) {
            setFileData({
                ...fileData,
                errorWrongFileType: true,
            })
            return false
            // return Upload.LIST_IGNORE
        }

        return true
    }

    return (
        <div className="flex flex-row items-start gap-2">
            <div className="flex flex-none max-[470px]:max-w-[100px]">
                <span className="mr-2 pt-2 align-middle text-lg font-medium text-[#ff4d4f]">
                    *
                </span>
                <Text className="leading-10">
                    {t(ResolutionTitle[type])} {index}:
                </Text>
            </div>
            <div className="flex flex-grow flex-col gap-2">
                <Input
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_TITLE')}
                    size="large"
                    value={title}
                    onChange={onChange(onChangeTitle)}
                    maxLength={255}
                />
                <TextArea
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_RESOLUTION_DETAIL')}
                    value={content}
                    onChange={onChange(onChangeContent)}
                    maxLength={255}
                />
                {type === ResolutionType.AMENDMENT_RESOLUTION &&
                    onChangeOldContent && (
                        <TextArea
                            className="placeholder:text-sm"
                            placeholder={t('ENTER_OLD_RESOLUTION_DETAIL')}
                            value={oldContent}
                            onChange={onChange(onChangeOldContent)}
                            maxLength={255}
                        />
                    )}
                {(title || content) && (
                    <>
                        <Upload
                            onChange={onFileChange}
                            fileList={fileData.fileList}
                            // fileList={fileList}
                            beforeUpload={validateFile}
                            // multiple={true}
                            // method="PUT"
                            customRequest={onUpload}
                            accept={ACCEPT_FILE_TYPES}
                            name="proposal-files"
                            disabled={!allowUploadFile}
                        >
                            <Tooltip
                                placement="bottomRight"
                                title={
                                    allowUploadFile
                                        ? ''
                                        : t('UNABLE_TO_CREATE_MORE')
                                }
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    disabled={!allowUploadFile}
                                >
                                    {t('CLICK_TO_UPLOAD')}
                                </Button>
                            </Tooltip>
                        </Upload>
                        <div className="flex flex-col items-start">
                            <Text className="break-words text-black-45">
                                {t('INVITATION_FILE_UPLOAD_NOTICE')}
                            </Text>
                            {fileData.errorUniqueFile && (
                                <Text className="text-dust-red">
                                    {t('UNIQUE_FILE_ERROR_MESSAGE')}
                                </Text>
                            )}
                            {fileData.errorWrongFileType && (
                                <Text className="text-dust-red">
                                    {t('WRONG_FILE_TYPE_ERROR_MESSAGE')}
                                </Text>
                            )}
                            {fileData.errorFileSize && (
                                <Text className="text-dust-red">
                                    {t('FILE_THROUGH_THE_CAPACITY_FOR_UPLOAD')}
                                </Text>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div></div>
            <DeleteOutlined
                // className={`h-10 text-dust-red ${index === 1 && 'invisible'}`}
                className={`h-10 text-dust-red`}
                // disabled={index === 1}
                onClick={onDelete}
            />
        </div>
    )
}

export default CreateResolutionItem
