/* eslint-disable */

import {
    Col,
    Form,
    FormInstance,
    Input,
    Modal,
    Row,
    Select,
    Tag,
    Upload,
    message,
} from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useTranslations } from 'next-intl'
import { IAccountCreateForm } from '.'
import {
    UserStatus,
    UserStatusColor,
    UserStatusName,
} from '@/constants/user-status'
import { useEffect, useMemo, useState } from 'react'
import serviceUserStatus from '@/services/user-status'
import serviceUserRole from '@/services/user-role'
import { RoleBgColor } from '@/constants/role'
import {
    ACCEPT_AVATAR_TYPES,
    AccountFileType,
    MAX_AVATAR_FILE_SIZE,
} from '@/constants/account'
import { PlusOutlined } from '@ant-design/icons'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import serviceUpload from '@/services/upload'
import { useAuthLogin } from '@/stores/auth/hooks'
import serviceAccount from '@/services/account'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

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

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })

export interface IUserStatus {
    id: number
    status: UserStatus
}

export interface IUserRole {
    id: number
    roleName: string
    description: string
}

interface AccountInfoProp {
    form: FormInstance<IAccountCreateForm>
    getFileAvatar: (a: { file: string | Blob | RcFile; flag: boolean }) => void
}

const AccountInformation = ({ form, getFileAvatar }: AccountInfoProp) => {
    const [userStatusList, setUserStatusList] = useState<IUserStatus[]>([])
    const [userRoleList, setUserRoleList] = useState<IUserRole[]>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [companyName, setCompanyName] = useState<string>('')

    const t = useTranslations()
    const { authState } = useAuthLogin()

    const filteredOptions = userRoleList?.filter(
        (o: IUserRole) => !selectedItems.includes(o.roleName),
    )

    useEffect(() => {
        const fetchData = async () => {
            const userStatusList = await serviceUserStatus.getAllUserStatus({
                page: 1,
                limit: 10,
            })
            if (userStatusList) {
                setUserStatusList(userStatusList)
            }
            const userRoleList = await serviceUserRole.getAllNormalUserRole({
                page: 1,
                limit: 10,
            })
            if (userRoleList) {
                setUserRoleList(userRoleList)
            }
            const userCompanyName = authState.userData?.id
                ? (await serviceAccount.getDetailAccount(authState.userData.id))
                      .company.companyName
                : ''
            setCompanyName(userCompanyName)
        }

        fetchData()
    }, [])

    const userStatusIdDefault = useMemo(() => {
        return userStatusList.find((item) => item.status == UserStatus.ACTIVE)
            ?.id
    }, [userStatusList])

    useEffect(() => {
        form.setFieldsValue({
            statusId: userStatusIdDefault,
            companyName: companyName,
        })
    }, [userStatusIdDefault, companyName])

    // Upload Image
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const beforeUpload = (file: RcFile) => {
        const isLt20M = file.size < Number(MAX_AVATAR_FILE_SIZE) * (1024 * 1024)
        if (!isLt20M) {
            message.error(`Image must smaller than ${MAX_AVATAR_FILE_SIZE}MB!`)
        }
        return isLt20M
    }

    const onUpload =
        (name: 'avatarAccount', fileType: AccountFileType) =>
        async ({ file }: RcCustomRequestOptions) => {
            // console.log('file :', file)
            getFileAvatar({ file: file, flag: true })
        }

    useEffect(() => {
        if (fileList.length == 0) {
            getFileAvatar({ file: '', flag: false })
        }
    }, [JSON.stringify(fileList)])

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

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <div className="bg-white p-6 px-6 py-4 shadow-01">
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="companyName"
                        label={t('COMPANY_NAME')}
                        rules={[{ required: true }]}
                        className="mb-0"
                        shouldUpdate={false}
                    >
                        <Input
                            size="large"
                            placeholder={companyName}
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="username"
                        label={t('USERNAME')}
                        rules={[{ required: true }]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="phone"
                        label={t('PHONE')}
                        rules={[
                            // { required: true },
                            {
                                pattern: new RegExp(/^[0-9]+$/),
                                message: t('PLEASE_ENTER_ ONLY_NUMBER'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="email"
                        label={t('EMAIL')}
                        rules={[{ required: true, type: 'email' }]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="roleIds"
                        label={t('ROLES')}
                        rules={[{ required: true }]}
                        className="mb-0"
                    >
                        <Select
                            placeholder={t('SELECT_ROLES')}
                            value={selectedItems}
                            onChange={setSelectedItems}
                            size="large"
                            style={{ width: '100%' }}
                            mode="multiple"
                            tagRender={tagRenderStatus}
                            options={filteredOptions.map((status) => ({
                                value: status.roleName,
                                label: convertSnakeCaseToTitleCase(
                                    status.roleName,
                                ),
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="statusId"
                        label={t('STATUS')}
                        rules={[{ required: true }]}
                        className="mb-0"
                    >
                        <Select
                            size="large"
                            style={{ width: '100%' }}
                            options={userStatusList.map((status) => ({
                                value: status.id,
                                label: (
                                    <span
                                        style={{
                                            color: UserStatusColor[
                                                status.status
                                            ],
                                        }}
                                    >
                                        {t(UserStatusName[status.status])}
                                    </span>
                                ),
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="walletAddress"
                        label={t('WALLET_ADDRESS')}
                        rules={[{ required: true }]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
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
            </Row>
        </div>
    )
}

export default AccountInformation
