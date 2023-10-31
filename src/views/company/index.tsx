import ListTitle from '@/components/content-page-title/list-title'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import CompanyList from '@/views/company/company-list'
import { useListCompany } from '@/stores/company/hooks'
import { useEffect } from 'react'

const CompanyView = () => {
    const t = useTranslations()
    const { companyState, getListCompanyAction } = useListCompany()

    useEffect(() => {
        getListCompanyAction({
            page: companyState.page,
            limit: companyState.limit,
            filter: { ...companyState.filter },
        })
    }, [companyState.filter])

    console.log("checkkkkkk", companyState.companyList);
    const handleInputChange = () => {}

    const handleSelectChange = () => {}
    return (
        <div>
            <ListTitle
                pageName={t('LIST_COMPANY')}
                addIcon={<VideoCameraAddOutlined />}
                createLink="/company/create"
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <CompanyList />
            </div>
        </div>
    )
}

export default CompanyView
