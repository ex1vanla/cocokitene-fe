import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import Loader from '@/components/loader'
import { useAccountDetail } from '@/stores/account/hook'
import { EActionStatus } from '@/stores/type'
import AccountInfo from './account-info'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'
import DetailTitle from '@/components/content-page-title/detail-title'

const AccountDetail = () => {
    const params = useParams()
    const accountId = +params.id
    const t = useTranslations()
    const [{ account, status }, fetchAccountDetail] = useAccountDetail()

    useEffect(() => {
        if (accountId) {
            fetchAccountDetail(accountId)
        }
    }, [accountId, fetchAccountDetail])

    if (!account || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                pageName={t('DETAIL_ACCOUNT')}
                editUrl={`/account/update/${accountId}`}
            />
            <div className="p-6">
                <AccountInfo />
            </div>
        </div>
    )
}

export default withAuth(AccountDetail, Permissions.DETAIL_ACCOUNT)
