/* eslint-disable */

import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Tooltip,
    Typography,
    Upload,
} from 'antd'
import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import { useState } from 'react'
import { UploadFile } from 'antd/es/upload/interface'
import BoxArea from '@/components/box-area'
import { urlRegex } from '@/constants/common'
import { ACCEPT_FILE_TYPES, MeetingFileType } from '@/constants/meeting'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import serviceUpload from '@/services/upload'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'

const { Text } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const BoardMeetingInformation = ({
    allowUploadFile,
}: {
    allowUploadFile: boolean
}) => {
    const t = useTranslations()
    const params = useParams()
    const locale = params.locale
    const [data, setData] = useCreateBoardMeetingInformation()

    const [fileData, setFileData] = useState<{
        [key in 'meetingInvitations' | 'meetingMinutes']: {
            fileList: UploadFile[]
            errorUniqueFile: boolean
            errorWrongFileType?: boolean
            errorFileSize?: boolean
        }
    }>({
        meetingInvitations: {
            fileList: [],
            errorUniqueFile: false,
            errorWrongFileType: false,
            errorFileSize: false,
        },
        meetingMinutes: {
            fileList: [],
            errorUniqueFile: false,
            errorWrongFileType: false,
            errorFileSize: false,
        },
    })

    const onUpload =
        (
            name: 'meetingInvitations' | 'meetingMinutes',
            fileType: MeetingFileType,
        ) =>
        async ({ file }: RcCustomRequestOptions) => {
            try {
                // console.log('upload file board mtg-----')
                // const res = await serviceUpload.getPresignedUrl(
                //     [file as File],
                //     fileType,
                // )
                // await serviceUpload.uploadFile(file as File, res.uploadUrls[0])
                // const values = data[name]
                // setData({
                //     ...data,
                //     [name]: [
                //         ...values,
                //         {
                //             url: res.uploadUrls[0].split('?')[0],
                //             fileType,
                //             uid: (file as RcFile).uid,
                //         },
                //     ],
                // })
                const values = data[name]
                setData({
                    ...data,
                    [name]: [
                        ...values,
                        {
                            file: file,
                            fileType,
                            uid: (file as RcFile).uid,
                        },
                    ],
                })
            } catch (error) {}
        }

    const onFileChange =
        (
            name: 'meetingInvitations' | 'meetingMinutes',
            fileType: MeetingFileType,
        ) =>
        (info: UploadChangeParam<UploadFile>) => {
            if (info.file.status === 'done') {
                const url = info.file?.xhr?.responseURL
                if (url) {
                    const values = data[name]
                    setData({
                        ...data,
                        [name]: [
                            ...values,
                            {
                                url: url.split('?')[0],
                                fileType,
                                uid: info.file.uid,
                            },
                        ],
                    })
                }
            }
            if (info.file.status === 'removed') {
                setFileData({
                    ...fileData,
                    [name]: {
                        fileList: info.fileList,
                        errorUniqueFile: false,
                        errorWrongFileType: false,
                        errorFileSize: false,
                    },
                })
                const uid = info.file.uid
                if (uid) {
                    const values = data[name].filter((item) => item.uid !== uid)
                    setData({
                        ...data,
                        [name]: values,
                    })
                }
            }
        }

    const validateFile =
        (name: 'meetingInvitations' | 'meetingMinutes') =>
        (file: RcFile, listRcFile: RcFile[]) => {
            const extension = file.name.split('.').slice(-1)[0]
            if (!ACCEPT_FILE_TYPES.split(',').includes(`.${extension}`)) {
                setFileData({
                    ...fileData,
                    [name]: {
                        ...fileData[name],
                        errorWrongFileType: true,
                    },
                })
                return false
                // return Upload.LIST_IGNORE
            }
            // filter unique file
            const listCurrentFileNames = fileData[name].fileList?.map(
                (file) => file.name,
            )
            if (listCurrentFileNames.includes(file.name)) {
                setFileData({
                    ...fileData,
                    [name]: {
                        ...fileData[name],
                        errorUniqueFile: true,
                    },
                })
                return false
            }
            const newUploadedFiles = listRcFile.filter(
                (file) => !listCurrentFileNames.includes(file.name),
            )
            setFileData({
                ...fileData,
                [name]: {
                    fileList: [...fileData[name].fileList, ...newUploadedFiles],
                    errorUniqueFile: false,
                },
            })
            if (file.size > 20 * (1024 * 1024 * 1024)) {
                setFileData({
                    ...fileData,
                    [name]: {
                        ...fileData[name],
                        errerrorFileSize: true,
                    },
                })
                return false
                // return Upload.LIST_IGNORE
            }

            return true
        }
    const onChangeDateTime = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        const dt = { ...data }
        if (dateString.length === 2) {
            if (dateString[0]) {
                dt.startTime = new Date(dateString[0]).toISOString()
                if (dt.startTime > dt.endVotingTime) {
                    //TH EndVotingTime < StartTime => EndVotingTime = StartTime
                    dt.endVotingTime = new Date(dateString[0]).toISOString()
                }
            }
            if (dateString[1]) {
                dt.endTime = new Date(dateString[1]).toISOString()
            }
        } else {
            if (dateString) {
                dt.endVotingTime = new Date(dateString as string).toISOString()
            }
        }
        setData(dt)
    }
    const onOkDateTime = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
    ) => {
        // console.log('onOk: ', value)
    }

    const onChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value,
        })
    }
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs(data.startTime)
    }

    return (
        <BoxArea title={t('BOARD_MEETING_INFORMATION')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="title"
                            label={t('BOARD_MEETING_NAME')}
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: t('REQUIRE_MEETING_NAME'),
                                },
                            ]}
                            className="mb-0"
                            // initialValue={data.title}
                        >
                            <Input
                                name="title"
                                size="large"
                                value={data.title}
                                onChange={onChange}
                                maxLength={100}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="meetingLink"
                            label={t('BOARD_MEETING_LINK')}
                            className="mb-0"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: t('REQUIRE_MEETING_LINK'),
                                },
                                {
                                    pattern: urlRegex,
                                    message: t('INVALID_LINK_ERROR_MESSAGE'),
                                },
                            ]}
                            // initialValue={data.meetingLink}
                        >
                            <Input
                                size="large"
                                name="meetingLink"
                                addonBefore="https://"
                                value={data.meetingLink}
                                onChange={onChange}
                                maxLength={100}
                            />
                        </Form.Item>
                    </Form>
                </Col>

                <Col xs={24} lg={12}>
                    <Form layout="horizontal">
                        <Form.Item
                            name="invitation"
                            label={
                                <div
                                    className={`${
                                        locale == 'ja' ? 'w-20' : 'w-40'
                                    }`}
                                >
                                    {t('BOARD_MEETING_INVITATION')}
                                </div>
                            }
                            className="mb-0"
                            labelAlign="left"
                        >
                            <Upload
                                onChange={onFileChange(
                                    'meetingInvitations',
                                    MeetingFileType.MEETING_INVITATION,
                                )}
                                fileList={fileData.meetingInvitations.fileList}
                                beforeUpload={validateFile(
                                    'meetingInvitations',
                                )}
                                accept={ACCEPT_FILE_TYPES}
                                customRequest={onUpload(
                                    'meetingInvitations',
                                    MeetingFileType.MEETING_INVITATION,
                                )}
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
                                <Text className="text-black-45">
                                    {t('INVITATION_FILE_UPLOAD_NOTICE')}
                                </Text>
                                {fileData.meetingInvitations
                                    .errorUniqueFile && (
                                    <Text className="text-dust-red">
                                        {' '}
                                        {t('UNIQUE_FILE_ERROR_MESSAGE')}
                                    </Text>
                                )}
                                {fileData.meetingInvitations
                                    .errorWrongFileType && (
                                    <Text className="text-dust-red">
                                        {t('WRONG_FILE_TYPE_ERROR_MESSAGE')}
                                    </Text>
                                )}
                                {fileData.meetingInvitations.errorFileSize && (
                                    <Text className="text-dust-red">
                                        {t(
                                            'FILE_THROUGH_THE_CAPACITY_FOR_UPLOAD',
                                        )}
                                    </Text>
                                )}
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="horizontal">
                        <Form.Item
                            name="invitation"
                            label={
                                <div
                                    className={`${
                                        locale == 'ja' ? 'w-20' : 'w-40'
                                    }`}
                                >
                                    {t('BOARD_MEETING_MINUTES')}
                                </div>
                            }
                            className="mb-0"
                            labelAlign="left"
                        >
                            <Upload
                                onChange={onFileChange(
                                    'meetingMinutes',
                                    MeetingFileType.MEETING_MINUTES,
                                )}
                                fileList={fileData.meetingMinutes.fileList}
                                beforeUpload={validateFile('meetingMinutes')}
                                accept={ACCEPT_FILE_TYPES}
                                customRequest={onUpload(
                                    'meetingMinutes',
                                    MeetingFileType.MEETING_MINUTES,
                                )}
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
                                <Text className="text-black-45">
                                    {t('INVITATION_FILE_UPLOAD_NOTICE')}
                                </Text>
                                {fileData.meetingMinutes.errorUniqueFile && (
                                    <Text className="text-dust-red">
                                        {' '}
                                        {t('UNIQUE_FILE_ERROR_MESSAGE')}
                                    </Text>
                                )}
                                {fileData.meetingMinutes.errorWrongFileType && (
                                    <Text className="text-dust-red">
                                        {t('WRONG_FILE_TYPE_ERROR_MESSAGE')}
                                    </Text>
                                )}
                                {fileData.meetingMinutes.errorFileSize && (
                                    <Text className="text-dust-red">
                                        {t(
                                            'FILE_THROUGH_THE_CAPACITY_FOR_UPLOAD',
                                        )}
                                    </Text>
                                )}
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            label={t('TIME')}
                            rules={[
                                {
                                    required: true,
                                    message: t('REQUIRE_TIME'),
                                },
                            ]}
                            className="mb-0"
                        >
                            <RangePicker
                                name={'TIME'}
                                size="large"
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                style={{ width: '100%' }}
                                // value={data.startTime}
                                onChange={onChangeDateTime}
                                onOk={onOkDateTime}
                                // defaultPickerValue={}
                                allowEmpty={[false, false]}
                                value={[
                                    dayjs(data.startTime),
                                    dayjs(data.endTime),
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </Col>

                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            label={t('END_VOTING_TIME')}
                            rules={[
                                {
                                    required: true,
                                    message: t('REQUIRE_TIME'),
                                },
                            ]}
                            className="mb-0"
                        >
                            <DatePicker
                                name={'END_VOTING_TIME'}
                                size="large"
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                style={{ width: '100%' }}
                                // @ts-ignore
                                onChange={onChangeDateTime}
                                onOk={onOkDateTime}
                                value={dayjs(data.endVotingTime)}
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={24}>
                    <Form layout="vertical">
                        <Form.Item
                            name="note"
                            label={t('NOTE')}
                            rules={[
                                {
                                    max: 5000,
                                    message: t(
                                        'NOTE_MUST_BE_UP_TO_{max}_CHARACTERS',
                                        {
                                            max: 5000,
                                        },
                                    ),
                                },
                            ]}
                            className="mb-0"
                            // initialValue={data.note}
                        >
                            <TextArea
                                name="note"
                                size="large"
                                value={data.note}
                                onChange={onChange}
                                maxLength={4000}
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </BoxArea>
    )
}
export default BoardMeetingInformation
