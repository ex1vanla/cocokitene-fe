import ListTitle from '@/components/content-page-title/list-title'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import CompanyList from '@/views/company/company-list'
import { useListCompany } from '@/stores/company/hooks'
import { useEffect } from 'react'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'

const CompanyView = () => {
    const t = useTranslations()
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
                addIcon={<VideoCameraAddOutlined />}
                createLink="/company/create"
                permisionBtnAdd={Permissions.CREATE_COMPANY}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <CompanyList data={companyState.companyList} />
            </div>
        </div>
    )
}

export default withAuth(CompanyView, Permissions.LIST_COMPANY)
