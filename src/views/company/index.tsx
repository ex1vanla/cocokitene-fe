import ListTitle from '@/components/content-page-title/list-title'
import { VideoCameraAddOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'
import CompanyList from '@/views/company/company-list'

const CompanyView = () => {
    const t = useTranslations()
    const handleInputChange = () => {

    }

    const handleSelectChange = () => {

    }
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
