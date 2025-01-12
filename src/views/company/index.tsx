import withAuthAdmin from '@/components/component-auth-admin'
import ListTitle from '@/components/content-page-title/list-title'
import { useListCompany } from '@/stores/company/hooks'
import CompanyList from '@/views/company/company-list'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Grid } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const { useBreakpoint } = Grid

const CompanyView = () => {
    const t = useTranslations()
    const screens = useBreakpoint()
    const router = useRouter()
    const { companyState, getListCompanyAction, setFilterAction } =
        useListCompany()

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
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size={screens.lg ? 'large' : 'middle'}
                        className="max-[470px]:px-2"
                        onClick={() => {
                            router.push('/company/create')
                        }}
                    >
                        {t('ADD_NEW')}
                    </Button>
                }
                defaultSort={companyState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6 max-sm:px-0">
                <CompanyList data={companyState.companyList} />
            </div>
        </div>
    )
}

export default withAuthAdmin(CompanyView)
