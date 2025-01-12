/* eslint-disable */
import withAuth from '@/components/component-auth'
import UpdateTitle from '@/components/content-page-title/update-title'
import Loader from '@/components/loader'
import {
    ACCEPT_AVATAR_TYPES,
    AccountFileType,
    MAX_AVATAR_FILE_SIZE,
} from '@/constants/account'
import { FETCH_STATUS } from '@/constants/common'
import { Permissions } from '@/constants/permission'
import { FolderType } from '@/constants/s3'
import {
    UserStatus,
    UserStatusColor,
    UserStatusName,
} from '@/constants/user-status'
import companyServicePlan from '@/services/company-service-plan'
import serviceShareholder from '@/services/shareholder'
import serviceUpload from '@/services/upload'
import serviceUser from '@/services/user'
import serviceUserRole from '@/services/user-role'
import serviceUserStatus from '@/services/user-status'
import store from '@/stores'
import { useAuthLogin } from '@/stores/auth/hooks'
import { update } from '@/stores/auth/slice'
import { IAccount } from '@/stores/auth/type'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import SaveUpdateShareholderButton from '@/views/shareholder/shareholder-update/save-button'
import { PlusOutlined } from '@ant-design/icons'
import {
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Tag,
    Upload,
    UploadFile,
    message,
    notification,
} from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form'
import { RcFile } from 'antd/es/upload'
import { UploadProps } from 'antd/es/upload/interface'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()
const tagRenderStatus = (props: any) => {
    const { label, value, closable, onClose } = props
    const t = useTranslations()
    const onPreventMouseDown = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
    }
    return (
        <Tag
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {convertSnakeCaseToTitleCase(label)}
        </Tag>
    )
}
export interface IUserStatus {
    id: number
    status: UserStatus
}
export interface IRoleList {
    id: number
    roleName: string
}
export interface IShareholderUpdateForm {
    companyName: string
    email: string
    username: string
    walletAddress?: string | null
    shareQuantity?: number | null
    phone: string
    roleIds: string[]
    statusId: number
    avatar?: string
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

const UpdateShareholder = () => {
    const t = useTranslations()
    const router = useRouter()
    const [form] = useForm<IShareholderUpdateForm>()
    const { authState } = useAuthLogin()
    const [initShareholder, setInitShareholder] =
        useState<IShareholderUpdateForm>()
    const [userStatusList, setUserStatusList] = useState<IUserStatus[]>([])
    const [roleList, setRoleList] = useState<IRoleList[]>([])
    const [initStatus, setInitStatus] = useState<FETCH_STATUS>(
        FETCH_STATUS.IDLE,
    )
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileAvatarInfo, setFileAvatarInfo] = useState<{
        file: string | Blob | RcFile
        flag: boolean
    }>()

    const [allowUploadFile, setAllowUploadFile] = useState<boolean>(true)

    // select
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [requiredQuantity, setRequiredQuantity] = useState<boolean>(false)

    const quantity = useWatch('shareQuantity', form)

    const filteredOptions = roleList.filter(
        (o) => !selectedItems.includes(o.roleName),
    )
    const params = useParams()
    const shareholderId = Number(params.id)
    useEffect(() => {
        const fetchData = async () => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res = await serviceShareholder.getDetailShareholder(
                    shareholderId,
                )
                if (res) {
                    const userCompanyName =
                        authState.userData?.companyName ?? ''
                    setInitShareholder({
                        companyName: userCompanyName,
                        email: res.email,
                        username: res.username,
                        walletAddress: res.walletAddress,
                        shareQuantity: res.shareQuantity,
                        phone: res.phone,
                        statusId: res.userStatus.id,
                        avatar: res.avatar,
                        // ? process.env.NEXT_PUBLIC_PRE_URL_S3_LINK +
                        //   res.avatar
                        // : undefined,
                        roleIds: res.roles.map((item) => item.roleName),
                    })
                    form.setFieldsValue({
                        roleIds: res.roles.map((item) => item.roleName),
                        shareQuantity: res.shareQuantity,
                    })

                    if (res.avatar) {
                        setFileList([
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: res.avatar
                                    ? process.env.NEXT_PUBLIC_PRE_URL_S3_LINK +
                                      res.avatar
                                    : undefined,
                            },
                        ])
                    }
                    setSelectedItems(res.roles.map((item) => item.roleName))
                    setRequiredQuantity(
                        res.roles
                            .map((item) => item.roleName)
                            .includes('SHAREHOLDER'),
                    )
                }
                const userStatusList = await serviceUserStatus.getAllUserStatus(
                    {
                        page: 1,
                        limit: 10,
                    },
                )
                if (userStatusList) {
                    setUserStatusList(userStatusList)
                }
                const userRoleList = await serviceUserRole.getAllNormalUserRole(
                    {
                        page: 1,
                        limit: 10,
                    },
                )
                if (userRoleList) {
                    setRoleList(userRoleList)
                }
                const response =
                    await companyServicePlan.getAllowUploadFileForCompany()
                setAllowUploadFile(response)

                setInitStatus(FETCH_STATUS.SUCCESS)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: error.response?.data.info.message,
                        duration: 3,
                    })
                }
                setInitStatus(FETCH_STATUS.ERROR)
            }
        }
        if (shareholderId) {
            fetchData()
        }
    }, [shareholderId, authState.userData])
    // upload image
    const beforeUpload = (file: RcFile) => {
        const isLt20M =
            file.size < Number(MAX_AVATAR_FILE_SIZE) * (1024 * 1024 * 1024)
        const langCurrent = cookies.get('NEXT_LOCALE')
        if (!isLt20M) {
            if (langCurrent === 'en') {
                message.error(
                    `Image must smaller than ${MAX_AVATAR_FILE_SIZE}MB!`,
                )
                return false
            } else {
                message.error(
                    `添付ファイルのサイズが最大値を越えています。${MAX_AVATAR_FILE_SIZE}Mbyte以内で登録してください`,
                )

                return false
            }
        }

        const extension = file.name.split('.').slice(-1)[0]
        const isAcceptedType = ACCEPT_AVATAR_TYPES.split(',').includes(
            `.${extension}`,
        )
        if (!isAcceptedType) {
            if (langCurrent === 'en') {
                message.error(
                    `${ACCEPT_AVATAR_TYPES} ファイルのみアップロード可です`,
                )
                return false
            } else {
                message.error(
                    `${ACCEPT_AVATAR_TYPES} ファイルのみアップロード可です`,
                )
                return false
            }
        }

        return true
    }
    useEffect(() => {
        if (fileList.length == 0) {
            setFileAvatarInfo({
                file: '',
                flag: false,
            })
        }
    }, [JSON.stringify(fileList)])

    const onUpload =
        (name: 'avatarAccount', fileType: AccountFileType) =>
        async ({ file }: RcCustomRequestOptions) => {
            setFileAvatarInfo({ file: file, flag: true })
        }

    const handleCancel = () => setPreviewOpen(false)
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile)
        }
        setPreviewImage(file.url || (file.preview as string))
        setPreviewOpen(true)
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
        )
    }
    const handleChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => {
        if (newFileList.length == 0) {
            setFileList(newFileList)
        } else {
            setFileList([
                {
                    ...newFileList[0],
                    status: 'done',
                },
            ])
        }
    }

    //Quantity
    useEffect(() => {
        if (selectedItems.includes('SHAREHOLDER')) {
            setRequiredQuantity(true)
        } else if (!selectedItems.includes('SHAREHOLDER')) {
            setRequiredQuantity(false)
        } else {
            setRequiredQuantity(false)
        }
    }, [JSON.stringify(selectedItems)])

    useEffect(() => {
        if (quantity && +quantity > 0) {
            setRequiredQuantity(true)
        }
    }, [quantity])

    useEffect(() => {
        if (!requiredQuantity) {
            form.setFieldsValue({
                roleIds: selectedItems.filter((item) => item != 'SHAREHOLDER'),
                shareQuantity: null,
            })
            setSelectedItems(
                selectedItems.filter((item) => item != 'SHAREHOLDER'),
            )
        }
        if (requiredQuantity) {
            if (!selectedItems.includes('SHAREHOLDER')) {
                form.setFieldsValue({
                    roleIds: [...selectedItems, 'SHAREHOLDER'],
                })
                setSelectedItems([...selectedItems, 'SHAREHOLDER'])
            }
        }
    }, [requiredQuantity])

    const validateQuantity = (_: any, value: string) => {
        const regex = /^(0*[1-9]\d*|0+)$/
        if (!value) {
            return Promise.resolve()
        }
        // if (value) {
        if (!regex.test(value) || +value <= 0) {
            return Promise.reject(t('QUANTITY_VALIDATE'))
        }
        // }
        return Promise.resolve()
    }

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const onFinish = async (values: IShareholderUpdateForm) => {
        setStatus(FETCH_STATUS.LOADING)
        let urlAvatar: string = initShareholder?.avatar || ''
        const userRolesArr = roleList
            .filter((role) => values.roleIds.includes(role.roleName))
            .map((item) => item.id)

        try {
            if (fileAvatarInfo?.flag) {
                const res = await serviceUpload.getPresignedUrlAvatar(
                    FolderType.USER,
                    [fileAvatarInfo?.file as File],
                    AccountFileType.AVATAR,
                )
                await serviceUpload.uploadFile(
                    fileAvatarInfo?.file as File,
                    res.uploadUrls[0],
                )
                urlAvatar = res.uploadUrls[0]
                    .split('?')[0]
                    .split('.amazonaws.com/')[1]
            } else {
                if (fileList.length == 0) {
                    urlAvatar = ''
                }
            }
            const updateShareholderResponse =
                await serviceShareholder.updateShareholder(shareholderId, {
                    email: values.email,
                    username: values.username,
                    walletAddress: values.walletAddress || null,
                    shareQuantity: values.shareQuantity
                        ? +values.shareQuantity
                        : undefined,
                    phone: values.phone,
                    roleIds: [...userRolesArr],
                    statusId: values.statusId,
                    avatar: urlAvatar,
                })
            if (updateShareholderResponse) {
                notification.success({
                    message: t('UPDATED'),
                    description: t('UPDATED_SHAREHOLDER_SUCCESSFULLY'),
                    duration: 2,
                })

                setStatus(FETCH_STATUS.SUCCESS)
                if (updateShareholderResponse.id == authState.userData?.id) {
                    const newAuth: IAccount = {
                        companyId: serviceUser.getInfoStorage()?.companyId || 1,
                        companyName:
                            serviceUser.getInfoStorage()?.companyName || '',
                        email: values.email,
                        id: updateShareholderResponse.id,
                        permissionKeys:
                            serviceUser.getInfoStorage()?.permissionKeys || [],
                        username: values.username,
                        walletAddress: values.walletAddress || '',
                        avatar: urlAvatar || '',
                        defaultAvatarHashColor:
                            serviceUser.getInfoStorage()
                                ?.defaultAvatarHashColor || '',
                    }
                    store?.dispatch(update(newAuth))
                }

                if (values.shareQuantity) {
                    router.push(`/shareholder/detail/${shareholderId}`)
                } else {
                    router.push(`/shareholder/`)
                }
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

    if (!initShareholder || initStatus === FETCH_STATUS.LOADING) {
        return <Loader />
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t('UPLOAD')}</div>
        </div>
    )
    return (
        <div>
            <Form
                onFinish={onFinish}
                form={form}
                layout="vertical"
                initialValues={{
                    ...initShareholder,
                }}
            >
                <UpdateTitle
                    pageName={t('UPDATE_SHAREHOLDER')}
                    saveButton={
                        <SaveUpdateShareholderButton
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
                                    name="companyName"
                                    label={t('COMPANY_NAME')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_COMPANY_NAME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="username"
                                    label={t('SHAREHOLDER_NAME')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_USER_NAME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" maxLength={50} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="phone"
                                    label={t('PHONE')}
                                    rules={[
                                        { required: false },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" maxLength={11} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="email"
                                    label={t('EMAIL')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_EMAIL'),
                                        },
                                        {
                                            type: 'email',
                                            message: t('VALID_EMAIL'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="roleIds"
                                    label={t('ROLE')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_USER_ROLE'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        placeholder={t('SELECT_ROLES')}
                                        size="large"
                                        value={selectedItems}
                                        onChange={setSelectedItems}
                                        style={{ width: '100%' }}
                                        mode="multiple"
                                        tagRender={tagRenderStatus}
                                        options={filteredOptions.map(
                                            (role) => ({
                                                value: role.roleName,
                                                label: convertSnakeCaseToTitleCase(
                                                    role.roleName,
                                                ),
                                            }),
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="statusId"
                                    label={t('STATUS')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_USER_STATUS'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Select
                                        placeholder={t(
                                            'SELECT_SHAREHOLDER_STATUS',
                                        )}
                                        size="large"
                                        style={{ width: '100%' }}
                                        options={userStatusList.map(
                                            (status) => ({
                                                value: status.id,
                                                label: (
                                                    <span
                                                        style={{
                                                            color: UserStatusColor[
                                                                status.status
                                                            ],
                                                        }}
                                                    >
                                                        {t(
                                                            UserStatusName[
                                                                status.status
                                                            ],
                                                        )}
                                                    </span>
                                                ),
                                            }),
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="walletAddress"
                                    label={t('WALLET_ADDRESS')}
                                    rules={[{ required: false }]}
                                    className="mb-0"
                                >
                                    <Input size="large" maxLength={42} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="shareQuantity"
                                    label={t('QUANTITY')}
                                    rules={[
                                        {
                                            required: requiredQuantity,
                                            message: t('REQUIRE_QUANTITY'),
                                        },
                                        { validator: validateQuantity },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" maxLength={9} />
                                </Form.Item>
                            </Col>
                            {/* Avatar Update */}
                            <Col xs={24} lg={24}>
                                <Form.Item
                                    name="avatar"
                                    label={t('AVATAR')}
                                    rules={[{ required: false }]}
                                    className="mb-0"
                                >
                                    <Upload
                                        onChange={handleChange}
                                        fileList={fileList}
                                        beforeUpload={beforeUpload}
                                        multiple={true}
                                        // method="PUT"
                                        customRequest={onUpload(
                                            'avatarAccount',
                                            AccountFileType.AVATAR,
                                        )}
                                        listType="picture-card"
                                        accept={ACCEPT_AVATAR_TYPES}
                                        onPreview={handlePreview}
                                        disabled={!allowUploadFile}
                                    >
                                        {fileList.length >= 1
                                            ? null
                                            : uploadButton}
                                    </Upload>
                                    <Modal
                                        open={previewOpen}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handleCancel}
                                    >
                                        <img
                                            alt="example"
                                            style={{ width: '100%' }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </Form.Item>
                                <span className="text-black/[45%]">
                                    {t('INVITATION_AVATAR_UPLOAD_NOTICE')}
                                </span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Form>
        </div>
    )
}
export default withAuth(UpdateShareholder, Permissions.EDIT_SHAREHOLDERS)
