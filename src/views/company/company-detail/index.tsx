import DetailTitle from '@/components/content-page-title/detail-title'
import Loader from '@/components/loader'
import { useCompanyDetail } from '@/stores/company/hooks'
import { EActionStatus } from '@/stores/type'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import CompanyInfo from './company-info'
import SuperAdminInfo from './super-admin-info'
import { useTranslations } from 'next-intl'

const CompanyDetail = () => {
    const params = useParams()
    const companyId = +params.id
    const [{ company, status }, fetchCompanyDetail] = useCompanyDetail()
    const t = useTranslations()

    useEffect(() => {
        if (companyId) {
            fetchCompanyDetail(companyId)
        }
    }, [companyId, fetchCompanyDetail])

    if (!company || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                pageName={t('DETAIL_COMPANY')}
                editUrl={`/company/update/${companyId}`}
            />
            <div className="flex flex-col gap-6 p-6">
                <CompanyInfo />
                <SuperAdminInfo />
            </div>
        </div>
    )
}

export default CompanyDetail
