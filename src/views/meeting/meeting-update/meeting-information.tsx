/* eslint-disable */
import BoxArea from '@/components/box-area'
import { ACCEPT_FILE_TYPES, MeetingFileType } from '@/constants/meeting'
import serviceUpload from '@/services/upload'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { UploadOutlined } from '@ant-design/icons'
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Upload,
    Typography,
    UploadFile,
    DatePicker,
} from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { useTranslations } from 'next-intl'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import { urlRegex } from '@/constants/common'
import { useEffect, useState } from 'react'
import { getShortNameFromUrl } from '@/utils/meeting'

const { RangePicker } = DatePicker

const { Text } = Typography

const MeetingInformation = () => {
    const t = useTranslations()
    const [data, setData] = useUpdateMeetingInformation()
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value,
        })
    }

    // const [meetingInvitations, setMeetingInvitations] = useState<UploadFile[]>()
    const [meetingMinutes, setMeetingMinutes] = useState<UploadFile[]>()

    useEffect(() => {
        // if (data.meetingInvitations && data.meetingInvitations.length) {
        //     const invitations = data.meetingInvitations.map((file, index) => ({
        //         uid: index.toString(),
        //         name: getShortNameFromUrl(file.url) as string,
        //         url: file.url,
        //     }))
        //     setMeetingInvitations(invitations)
        // }

        if (data.meetingMinutes && data.meetingMinutes.length) {
            const minutes = data.meetingMinutes.map((file, index) => ({
                uid: index.toString(),
                name: getShortNameFromUrl(file.url) as string,
                url: file.url,
            }))
            setMeetingMinutes(minutes)
        }
    }, [data.meetingMinutes])

    const onUpload =
        (name: string, fileType: MeetingFileType) => async (file: RcFile) => {
            try {
                const res = await serviceUpload.upload([file], fileType)
                return res.uploadUrls[0]
            } catch (error) {
                return ''
            }
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
                            },
                        ],
                    })
                }
            }
            if (info.file.status === 'removed') {
                const url = info.file?.xhr?.responseURL?.split('?')[0]
                if (url) {
                    const values = data[name].filter((item) => item.url !== url)
                    setData({
                        ...data,
                        [name]: values,
                    })
                }
            }
        }
    const validateFile = (file: RcFile, FileList: RcFile[]) => {
        if (file.size > 10 * (1024 * 1024)) {
            return Upload.LIST_IGNORE
        }
        const extension = file.name.split('.').slice(-1)[0]
        if (!ACCEPT_FILE_TYPES.split(',').includes(`.${extension}`)) {
            return Upload.LIST_IGNORE
        }

        return true
    }

    const onChangeDateTime = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        const dt = { ...data }
        if (dateString[0]) {
            dt.startTime = new Date(dateString[0]).toISOString()
        }
        if (dateString[1]) {
            dt.endTime = new Date(dateString[1]).toISOString()
        }
        setData(dt)
    }

    const onOkDateTime = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
    ) => {
        // console.log('onOk: ', value);
    }

    return (
        <BoxArea title={t('MEETING_INFORMATION')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="title"
                            label={t('MEETING_NAME')}
                            rules={[{ required: true, whitespace: true }]}
                            className="mb-0"
                            initialValue={data.title}
                        >
                            <Input
                                name="title"
                                size="large"
                                value={data.title}
                                onChange={onChange}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="meetingLink"
                            label={t('MEETING_LINK')}
                            className="mb-0"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                },
                                // { type: 'url',  },
                                {
                                    pattern: urlRegex,
                                    message: t('INVALID_LINK_ERROR_MESSAGE'),
                                },
                            ]}
                            initialValue={data.meetingLink}
                        >
                            <Input
                                size="large"
                                name="meetingLink"
                                addonBefore="https://"
                                value={data.meetingLink}
                                onChange={onChange}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="horizontal">
                        <Form.Item
                            name="invitation"
                            label={t('MEETING_INVITATION') + ':'}
                            className="mb-0"
                        >
                            <Upload
                                fileList={data?.meetingInvitations?.map(
                                    (file, index) => ({
                                        uid: index.toString(),
                                        name: getShortNameFromUrl(
                                            file.url,
                                        ) as string,
                                        url: file.url,
                                    }),
                                )}
                                onChange={onFileChange(
                                    'meetingInvitations',
                                    MeetingFileType.MEETING_INVITATION,
                                )}
                                beforeUpload={validateFile}
                                method="PUT"
                                action={onUpload(
                                    'meetingInvitations',
                                    MeetingFileType.MEETING_INVITATION,
                                )}
                                accept={ACCEPT_FILE_TYPES}
                                name="meeting-invitations"
                            >
                                <div className="flex flex-col items-start">
                                    <Button icon={<UploadOutlined />}>
                                        {t('CLICK_TO_UPLOAD')}
                                    </Button>
                                    <Text className="text-black-45">
                                        {t('INVITATION_FILE_UPLOAD_NOTICE')}
                                    </Text>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="horizontal">
                        <Form.Item
                            name="minutes"
                            label={t('MEETING_MINUTES') + ':'}
                            className="mb-0"
                        >
                            <Upload
                                fileList={meetingMinutes}
                                onChange={onFileChange(
                                    'meetingMinutes',
                                    MeetingFileType.MEETING_MINUTES,
                                )}
                                beforeUpload={validateFile}
                                method="PUT"
                                accept={ACCEPT_FILE_TYPES}
                                action={onUpload(
                                    'meetingMinutes',
                                    MeetingFileType.MEETING_MINUTES,
                                )}
                            >
                                <div className="flex flex-col items-start">
                                    <Button icon={<UploadOutlined />}>
                                        {t('CLICK_TO_UPLOAD')}
                                    </Button>
                                    <Text className="text-black-45">
                                        {t('INVITATION_FILE_UPLOAD_NOTICE')}
                                    </Text>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Col>
                {/* <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="title"
                            label={t('START_TIME')}
                            rules={[{ required: true, whitespace: true }]}
                            className="mb-0"
                            initialValue={data.title}
                        >
                            <DatePicker size='large' style={{ width: '100%' }} />
                        </Form.Item>
                    </Form>
                </Col> */}
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            label={t('TIME')}
                            rules={[{ required: true }]}
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
            </Row>
        </BoxArea>
    )
}

export default MeetingInformation
