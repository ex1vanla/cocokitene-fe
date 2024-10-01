import withAuthAdmin from '@/components/component-auth-admin'
import CreateTitle from '@/components/content-page-title/create-title'
import { FETCH_STATUS } from '@/constants/common'
import {
    PaymentMethod,
    PaymentMethodName,
    StatusSubscription,
    StatusSubscriptionColor,
    StatusSubscriptionEnum,
    SubscriptionEnum,
    SubscriptionType,
} from '@/constants/service-subscript'
import serviceSubscriptionService from '@/services/system-admin/service-subscription'
import {
    Col,
    DatePicker,
    DatePickerProps,
    Form,
    Input,
    notification,
    Row,
    Select,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SaveCreateServiceSubscriptionButton from './save-button'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'

export interface IServiceSubscriptionCreateForm {
    companyId: number
    planId: number
    amount: number
    type: SubscriptionEnum
    paymentMethod: PaymentMethod
    status: StatusSubscriptionEnum
    activationDate: string
    expirationDate: string
    note?: string
}

const CreateServiceSubscription = () => {
    const [status, setStatus] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE)
    const [optionCompany, setOptionCompany] = useState<
        {
            value: number
            label: string
        }[]
    >([])
    const [optionServicePlan, setOptionServicePlan] = useState<
        {
            value: number
            label: string
            prince: number
        }[]
    >([])

    const t = useTranslations()
    const router = useRouter()

    const [form] = useForm<IServiceSubscriptionCreateForm>()

    useEffect(() => {
        const fetchData = async () => {
            const optionCompanyList =
                await serviceSubscriptionService.getAllCompanyOption()

            const optionServicePlanList =
                await serviceSubscriptionService.getAllServicePlanOption()

            if (optionCompanyList) {
                setOptionCompany(
                    optionCompanyList.map((option) => ({
                        value: option.id,
                        label: option.companyName,
                    })),
                )
            }
            if (optionServicePlanList) {
                setOptionServicePlan(
                    optionServicePlanList.map((option) => ({
                        value: option.id,
                        label: option.planName,
                        prince: option.prince,
                    })),
                )
            }
        }

        form.setFieldsValue({
            status: StatusSubscriptionEnum.PENDING,
        })
        fetchData()
        // eslint-disable-next-line
    }, [])

    const onFinish = async (value: IServiceSubscriptionCreateForm) => {
        console.log('value: ', {
            ...value,
            activationDate: dayjs(value.activationDate).format('YYYY-MM-DD'),
            expirationDate: dayjs(value.expirationDate).format('YYYY-MM-DD'),
        })
        try {
            const response =
                await serviceSubscriptionService.createServiceSubscription({
                    ...value,
                    amount: +value.amount,
                    activationDate: dayjs(value.activationDate).format(
                        'YYYY-MM-DD',
                    ),
                    expirationDate: dayjs(value.expirationDate).format(
                        'YYYY-MM-DD',
                    ),
                })
            if (response) {
                notification.success({
                    message: t('CREATED'),
                    description: t(''),
                    duration: 2,
                })
                router.push('/service-subscription')
                form.resetFields()
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t(error.response?.data.info.message),
                    duration: 3,
                })
            }
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    console.log('optionCompany: ', optionCompany)
    const disabledDate: DatePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs()
    }

    return (
        <div>
            <Form onFinish={onFinish} layout="vertical" form={form}>
                <CreateTitle
                    pageName={t('CREATE_SERVICE_SUBSCRIPTION')}
                    saveButton={
                        <SaveCreateServiceSubscriptionButton
                            form={form}
                            isLoading={status === FETCH_STATUS.LOADING}
                        />
                    }
                />
                <div className="p-6">
                    <div className="bg-white px-6 py-6 shadow-01">
                        <Row gutter={[16, 24]}>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="companyId"
                                    label={t('COMPANY_NAME')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_COMPANY_NAME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        showSearch
                                        placeholder=""
                                        optionFilterProp="label"
                                        options={optionCompany}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="planId"
                                    label={t('SERVICE_PLAN')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_SERVICE_PLAN'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        showSearch
                                        placeholder=""
                                        optionFilterProp="label"
                                        options={optionServicePlan}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="type"
                                    label={t('TYPE')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(''),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        showSearch
                                        placeholder=""
                                        options={[
                                            {
                                                value: SubscriptionEnum.EXTEND,
                                                label: t(
                                                    SubscriptionType[
                                                        SubscriptionEnum.EXTEND
                                                    ],
                                                ),
                                            },
                                            {
                                                value: SubscriptionEnum.CHANGE_SERVICE,
                                                label: t(
                                                    SubscriptionType[
                                                        SubscriptionEnum
                                                            .CHANGE_SERVICE
                                                    ],
                                                ),
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="paymentMethod"
                                    label={t('PAYMENT_METHOD')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(''),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        showSearch
                                        placeholder=""
                                        options={[
                                            {
                                                value: PaymentMethod.DIRECT_PAYMENT,
                                                label: t(
                                                    PaymentMethodName[
                                                        PaymentMethod
                                                            .DIRECT_PAYMENT
                                                    ],
                                                ),
                                            },
                                            {
                                                value: PaymentMethod.BANK_TRANSFER,
                                                label: t(
                                                    PaymentMethodName[
                                                        PaymentMethod
                                                            .BANK_TRANSFER
                                                    ],
                                                ),
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Form.Item
                                    name="activationDate"
                                    label={t('ACTIVATION_DATE')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_TIME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <DatePicker
                                        size="middle"
                                        placeholder={t('SELECT_DATE')}
                                        format="YYYY-MM-DD"
                                        style={{ width: '100%' }}
                                        disabledDate={disabledDate}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={12} lg={6}>
                                <Form.Item
                                    name="expirationDate"
                                    label={t('EXPIRATION_DATE')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_TIME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <DatePicker
                                        size="middle"
                                        placeholder={t('SELECT_DATE')}
                                        format="YYYY-MM-DD"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="amount"
                                    label={`${t('TOTAL_FREE')} (¥)`}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(''),
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="middle" maxLength={10} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="status"
                                    label={t('STATUS')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(''),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        showSearch
                                        placeholder=""
                                        options={[
                                            {
                                                value: StatusSubscriptionEnum.PENDING,
                                                label: (
                                                    <span
                                                        style={{
                                                            color: StatusSubscriptionColor[
                                                                StatusSubscriptionEnum
                                                                    .PENDING
                                                            ],
                                                        }}
                                                    >
                                                        {t(
                                                            StatusSubscription[
                                                                StatusSubscriptionEnum
                                                                    .PENDING
                                                            ],
                                                        )}
                                                    </span>
                                                ),
                                            },
                                            {
                                                value: StatusSubscriptionEnum.CONFIRMED,
                                                label: (
                                                    <span
                                                        style={{
                                                            color: StatusSubscriptionColor[
                                                                StatusSubscriptionEnum
                                                                    .CONFIRMED
                                                            ],
                                                        }}
                                                    >
                                                        {t(
                                                            StatusSubscription[
                                                                StatusSubscriptionEnum
                                                                    .CONFIRMED
                                                            ],
                                                        )}
                                                    </span>
                                                ),
                                            },
                                            {
                                                value: StatusSubscriptionEnum.CANCEL,
                                                label: (
                                                    <span
                                                        style={{
                                                            color: StatusSubscriptionColor[
                                                                StatusSubscriptionEnum
                                                                    .CANCEL
                                                            ],
                                                        }}
                                                    >
                                                        {t(
                                                            StatusSubscription[
                                                                StatusSubscriptionEnum
                                                                    .CANCEL
                                                            ],
                                                        )}
                                                    </span>
                                                ),
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={24}>
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
                                >
                                    <TextArea
                                        name="note"
                                        size="large"
                                        maxLength={5000}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default withAuthAdmin(CreateServiceSubscription)
