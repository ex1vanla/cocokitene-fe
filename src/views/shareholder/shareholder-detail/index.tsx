import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useShareholderDetail } from '@/stores/shareholder/hook'
import { useEffect } from 'react'
import { EActionStatus } from '@/stores/type'
import Loader from '@/components/loader'
import DetailTitle from '@/components/content-page-title/detail-title'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import ShareholderInfo from '@/views/shareholder/shareholder-detail/shareholder-info'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'

const ShareholderDetail = () => {
    const params = useParams()
    const router = useRouter()
    const shareholderId = +params.id
    const t = useTranslations()
    const [{ shareholder, status }, fetchShareholderDetail] =
        useShareholderDetail()

    useEffect(() => {
        if (shareholderId) {
            fetchShareholderDetail(shareholderId)
        }
    }, [shareholderId])

    if (!shareholder || status === EActionStatus.Pending) {
        return <Loader />
    }
    return (
        <div>
            <DetailTitle
                urlBack="/shareholder"
                pageName={t('DETAIL_SHAREHOLDER')}
                editButton={
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        size="large"
                        onClick={() =>
                            router.push(`/shareholder/update/${shareholderId}`)
                        }
                    >
                        {t('EDIT')}
                    </Button>
                }
            />
            <div className="p-6">
                <ShareholderInfo />
            </div>
        </div>
    )
}
export default withAuth(ShareholderDetail, Permissions.DETAIL_SHAREHOLDERS)