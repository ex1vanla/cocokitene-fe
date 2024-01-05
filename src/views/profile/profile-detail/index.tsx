import DetailTitle from '@/components/content-page-title/detail-title'
import Loader from '@/components/loader'
import { useAccountDetail } from '@/stores/account/hook'
import { useAuthLogin } from '@/stores/auth/hooks'
import { EActionStatus } from '@/stores/type'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import MyProfileInfo from './profile-info'

const MyProfileDetail = () => {
    const router = useRouter()
    const t = useTranslations()

    const { authState } = useAuthLogin()

    const [{ account, status }, fetchAccountDetail] = useAccountDetail()

    useEffect(() => {
        if (authState.userData?.id) {
            fetchAccountDetail(authState.userData?.id)
        }
    }, [authState.userData?.id, fetchAccountDetail])

    if (!account || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                urlBack="/dashboard"
                pageName={t('MY_PROFILE')}
                editButton={
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        size="large"
                        onClick={() => router.push(`/profile/update`)}
                    >
                        {t('EDIT')}
                    </Button>
                }
            />
            <div className="p-6">
                <div className="bg-white p-6 px-6 py-4 shadow-01">
                    <MyProfileInfo />
                </div>
            </div>
        </div>
    )
}

export default MyProfileDetail
