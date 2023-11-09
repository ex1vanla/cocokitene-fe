import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { Permissions } from '@/constants/permission'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const { Title } = Typography

interface IDetailTitle extends IBaseTitle {
    extraButton?: ReactNode
    editUrl: string
}

const DetailTitle = ({ pageName, extraButton, editUrl }: IDetailTitle) => {
    const t = useTranslations()
    const router = useRouter()
    const { authState } = useAuthLogin()
    const permissionEditMeeting = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_MEETING,
    )

    return (
        <LayoutTitle>
            <div className="flex items-center gap-2">
                <ArrowLeftOutlined
                    onClick={() => {
                        router.back()
                    }}
                />
                <Title level={4} className="mb-0 font-medium">
                    {pageName}
                </Title>
            </div>
            {permissionEditMeeting && (
                <div className="flex items-center gap-2">
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        size="large"
                        onClick={() => router.push(editUrl)}
                    >
                        {t('EDIT')}
                    </Button>
                    {extraButton}
                </div>
            )}
        </LayoutTitle>
    )
}

export default DetailTitle
