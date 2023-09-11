import BoxArea from '@/components/box-area'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Upload, Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Text } = Typography

const MeetingInformation = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('MEETING_INFORMATION')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="name"
                            label={t('MEETING_NAME')}
                            rules={[{ required: true }]}
                            className="mb-0"
                        >
                            <Input size="large" />
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} lg={12}>
                    <Form layout="vertical">
                        <Form.Item
                            name="url"
                            label={t('MEETING_LINK')}
                            className="mb-0"
                        >
                            <Input size="large" addonBefore="https://" />
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
                            <Upload fileList={[]}>
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
                            <Upload fileList={[]}>
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
