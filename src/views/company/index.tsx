import withAuthAdmin from '@/components/component-auth-admin'
import ListTitle from '@/components/content-page-title/list-title'
import { Permissions } from '@/constants/permission'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useListCompany } from '@/stores/company/hooks'
import { checkPermission } from '@/utils/auth'
import CompanyList from '@/views/company/company-list'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CompanyView = () => {
    const t = useTranslations()
    const router = useRouter()
    const { companyState, getListCompanyAction, setFilterAction } =
        useListCompany()

    const { authState } = useAuthLogin()
    const permissionCreateCompany = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.CREATE_COMPANY,
    )

    useEffect(() => {
        getListCompanyAction({
            page: companyState.page,
            limit: companyState.limit,
            filter: { ...companyState.filter },
        })
        // eslint-disable-next-line
    }, [companyState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...companyState.filter, searchQuery: value })
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...companyState.filter, sortOrder: value })
    }
    return (
        <div>
            <ListTitle
                pageName={t('LIST_COMPANY')}
                addButton={
                    permissionCreateCompany && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => {
                                router.push('/company/create')
                            }}
                        >
                            {t('ADD_NEW')}
                        </Button>
                    )
                }
                defaultSort={companyState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <CompanyList data={companyState.companyList} />
            </div>
        </div>
    )
}

export default withAuthAdmin(CompanyView)
