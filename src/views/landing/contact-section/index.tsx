'use client'

import {
    EnvironmentTwoTone,
    MailTwoTone,
    PhoneTwoTone,
} from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Title, Text } = Typography

const ContactSection = () => {
    const t = useTranslations()

    const onFinish = () => {}

    const onFinishFailed = () => {}

    const groupContactClass = 'flex gap-2 font-normal'

    return (
        <div className="bg-gray-sunset">
            <div className="bg-covert relative mx-auto my-0 min-h-[790px] max-w-[1250px] bg-landing-registration-bg bg-no-repeat">
                <div className="registration-form__wrapper absolute right-0 top-1/2 w-[560px] -translate-y-1/2 bg-white p-10 drop-shadow-md">
                    <Title className="text-center font-bold" level={2}>
                        {t('SEND_YOUR_REGISTRATION')}
                    </Title>
                    <div className="registration-form__content">
                        <Form
                            name="basic"
                            // labelCol={{ span: 8 }}
                            // wrapperCol={{ span: 16 }}
                            // style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('YOUR_NAME')}
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'PLEASE_INPUT_YOUR_NAME',
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('EMAIL')}
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'PLEASE_INPUT_YOUR_EMAIL',
                                                ),
                                            },
                                            {
                                                type: 'email',
                                                message: t(
                                                    'PLEASE_INPUT_A_VALID_EMAIL',
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('COMPANY')}
                                        name="company"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'PLEASE_INPUT_YOUR_COMPANY',
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={t('PHONE_NUMBER')}
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'PLEASE_INPUT_YOUR_PHONE_NUMBER',
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label={t('NOTE')} name="note">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item wrapperCol={{ offset: 10 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            {t('SUBMIT')}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="contact-information flex flex-col gap-3">
                        <Title level={5} className="font-bold">
                            {t('CONTACT_INFORMATION')}
                        </Title>
                        <div className={groupContactClass}>
                            <EnvironmentTwoTone />
                            <Text>{t('CONTACT_ADDRESS')}</Text>
                        </div>
                        <div className={groupContactClass}>
                            <MailTwoTone />
                            <Text>phuonga1k51@gmail.com</Text>
                        </div>
                        <div className={groupContactClass}>
                            <PhoneTwoTone />
                            <Text>+84 337479955</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSection
