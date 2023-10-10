/* eslint-disable */
import BoxArea from '@/components/box-area'
import { ACCEPT_FILE_TYPES, MeetingFileType } from '@/constants/meeting'
import serviceUpload from '@/services/upload'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
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
} from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { useTranslations } from 'next-intl'

const { Text } = Typography

const MeetingInformation = () => {
    const t = useTranslations()
    const [data, setData] = useCreateMeetingInformation()
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value,
        })
    }
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
            name: 'meetingInvitations' | 'meetingReports',
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
                                    type: 'url',
                                },
                                {},
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
                                onChange={onFileChange(
                                    'meetingReports',
                                    MeetingFileType.MEETING_MINUTES,
                                )}
                                beforeUpload={validateFile}
                                method="PUT"
                                accept={ACCEPT_FILE_TYPES}
                                action={onUpload(
                                    'meetingReports',
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
            </Row>
        </BoxArea>
    )
}

export default MeetingInformation
