/* eslint-disable */
import CreateTitle from '@/components/content-page-title/create-title'
import { Form, notification } from 'antd'
import SaveCreateAccountButton from './save-button'
import { FETCH_STATUS } from '@/constants/common'
import { useTranslations } from 'next-intl'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import AccountInformation, { IUserRole } from './account-information'
import serviceUserRole from '@/services/user-role'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import serviceAccount from '@/services/account'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'

export interface IAccountCreateForm {
    companyName: string
    email: string
    username: string
    walletAddress: string
    shareQuantity?: number
    phone: string
    roleIds: string[]
    statusId: number
    avatar?: string
}

const CreateAccount = () => {
    const t = useTranslations()
    const [urlAvatar, setUrlAvatar] = useState<string>('')
    const [form] = useForm<IAccountCreateForm>()
    const router = useRouter()

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [userRoleList, setUserRoleList] = useState<IUserRole[]>([])

    const getUrlAvatar = (value: string) => {
        setUrlAvatar(value)
    }
    useEffect(() => {
        const fetchData = async () => {
            const userRoleList = await serviceUserRole.getAllUserRole({
                page: 1,
                limit: 10,
            })
            if (userRoleList) {
                setUserRoleList(userRoleList)
            }
        }
        fetchData()
    }, [])

    const onFinish = async (values: IAccountCreateForm) => {
        setStatus(FETCH_STATUS.LOADING)

        const userRolesArr = userRoleList
            .filter((item) => values.roleIds.includes(item.roleName))
            .map((item) => item.id)

        try {
            const res = await serviceAccount.createAccount({
                email: values.email,
                username: values.username,
                walletAddress: values.walletAddress,
                phone: values.phone,
                roleIds: [...userRolesArr],
                statusId: values.statusId,
                avatar: urlAvatar,
            })

            if (res) {
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATED_COMPANY_SUCCESSFULLY'),
                })
                router.push('/account')
                form.resetFields()
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: error.response?.data.info.message,
                })
            }
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <Form onFinish={onFinish} form={form} layout="vertical">
            <CreateTitle
                pageName={t('CREATE_NEW_ACCOUNT')}
                saveButton={
                    <SaveCreateAccountButton
                        form={form}
                        isLoading={status === FETCH_STATUS.LOADING}
                    />
                }
            />
            <div className="gap-6 p-6">
                <AccountInformation form={form} getUrlAvatar={getUrlAvatar} />
            </div>
        </Form>
    )
}

export default withAuth(CreateAccount, Permissions.CREATE_ACCOUNT)
