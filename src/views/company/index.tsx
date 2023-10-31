import ListTitle from '@/components/content-page-title/list-title'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import CompanyList from '@/views/company/company-list'
import { useListCompany } from '@/stores/company/hooks'
import { useEffect } from 'react'

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
    }, [companyState.filter])

    const handleInputChange = (value: string) => {
        console.log("value", value);
        setFilterAction({ ...companyState.filter, searchQuery: value })
    }

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
                <CompanyList data={companyState.companyList} />
            </div>
        </div>
    )
}

export default CompanyView
