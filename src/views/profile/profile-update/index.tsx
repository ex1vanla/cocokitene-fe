/* eslint-disable */
import UpdateTitle from '@/components/content-page-title/update-title'
import { useTranslations } from 'next-intl'
import SaveUpdateAccountButton from './save-button'
import {
    Col,
    Form,
    Input,
    Modal,
    Row,
    Upload,
    message,
    notification,
} from 'antd'
import { FETCH_STATUS } from '@/constants/common'
import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loader from '@/components/loader'
import { AxiosError } from 'axios'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import { PlusOutlined } from '@ant-design/icons'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'
import { useAuthLogin } from '@/stores/auth/hooks'
import {
    ACCEPT_AVATAR_TYPES,
    AccountFileType,
    MAX_AVATAR_FILE_SIZE,
} from '@/constants/account'
import serviceUpload from '@/services/upload'
import serviceProfile from '@/services/profile'
import serviceUser from '@/services/user'
import { IAccount } from '@/stores/auth/type'

import store from '@/stores'
import { update } from '@/stores/auth/slice'
import { Cookies } from 'react-cookie'
import { FolderType } from '@/constants/s3'
const cookies = new Cookies()
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

export interface IProfileUpdateForm {
    companyName: string
    email: string
    username: string
    walletAddress?: string | null
    phone: string
    avatar?: string
}

const UpdateMyProfile = () => {
    const t = useTranslations()
    const router = useRouter()
    const [form] = useForm<IProfileUpdateForm>()
    const { authState } = useAuthLogin()

    const [initAccount, setInitAccount] = useState<IProfileUpdateForm>()
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

    useEffect(() => {
        const fetchData = async (accountId: number) => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res = await serviceProfile.getDetailProfile(accountId)

                if (res) {
                    const userCompanyName =
                        authState.userData?.companyName ?? ''
                    setInitAccount({
                        companyName: userCompanyName,
                        email: res.email,
                        username: res.username,
                        walletAddress: res.walletAddress,
                        phone: res.phone,
                        avatar: res.avatar,
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
                }

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
        if (authState.userData?.id) {
            fetchData(authState.userData.id)
        }
    }, [authState.userData?.id])

    // Upload Image
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
            setFileAvatarInfo({ file: '', flag: false })
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

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const onFinish = async (values: IProfileUpdateForm) => {
        setStatus(FETCH_STATUS.LOADING)
        let walletAddress = values.walletAddress || ''
        let urlAvatar: string = initAccount?.avatar || ''

        try {
            if (authState.userData?.id) {
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

                const updateAccountResponse =
                    await serviceProfile.updateProfile(authState.userData.id, {
                        username: values.username,
                        email: values.email,
                        walletAddress: walletAddress || null,
                        phone: values.phone,
                        avatar: urlAvatar,
                    })

                if (updateAccountResponse) {
                    notification.success({
                        message: t('UPDATED'),
                        description: t('UPDATED_ACCOUNT_SUCCESSFULLY'),
                        duration: 2,
                    })

                    setStatus(FETCH_STATUS.SUCCESS)
                    const newAuth: IAccount = {
                        companyId: serviceUser.getInfoStorage()?.companyId || 1,
                        companyName:
                            serviceUser.getInfoStorage()?.companyName || '',
                        email: values.email,
                        id: authState.userData.id,
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
                    router.push(`/profile`)
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

    if (!initAccount || initStatus === FETCH_STATUS.LOADING) {
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
                    ...initAccount,
                }}
            >
                <UpdateTitle
                    pageName={t('UPDATE_MY_PROFILE')}
                    saveButton={
                        <SaveUpdateAccountButton
                            form={form}
                            isLoading={status === FETCH_STATUS.LOADING}
                        />
                    }
                />
                <div className=" p-6 ">
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
                                    label={t('USERNAME')}
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
                                    name="walletAddress"
                                    label={t('WALLET_ADDRESS')}
                                    rules={[{ required: false }]}
                                    className="mb-0"
                                >
                                    <Input size="large" maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>

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
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
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
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default withAuth(UpdateMyProfile, Permissions.BASIC_PERMISSION)
