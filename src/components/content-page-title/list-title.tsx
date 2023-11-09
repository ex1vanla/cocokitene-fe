import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { SORT } from '@/constants/meeting'
import { Permissions } from '@/constants/permission'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ChangeEvent, ReactNode } from 'react'

const { Title } = Typography

interface IListTitle extends IBaseTitle {
    addIcon: ReactNode
    createLink: string
    // eslint-disable-next-line
    onChangeInput: (value: string) => void
    // eslint-disable-next-line
    onChangeSelect: (value: string) => void
}

const ListTitle = ({
    pageName,
    addIcon,
    createLink,
    onChangeInput,
    onChangeSelect,
}: IListTitle) => {
    const router = useRouter()

    const t = useTranslations()

    const { authState } = useAuthLogin()
    const permissionCreateMeeting = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.CREATE_MEETING,
    )

    const handleChangeSelect = (value: string) => {
        onChangeSelect(value)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeInput(event.target.value)
    }
    return (
        <LayoutTitle>
            <Title level={4} className="mb-0 font-medium">
                {pageName}
            </Title>
            <div className="flex items-center gap-2">
                <Input
                    className="w-[200px]"
                    size="large"
                    addonAfter={<SearchOutlined />}
                    placeholder={t('SEARCH')}
                    onChange={handleInputChange}
                />

                <Select
                    className="w-[200px]"
                    defaultValue={t('SORT_OLDEST_MEETING')}
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleChangeSelect}
                    options={[
                        { value: SORT.ASC, label: t('SORT_OLDEST_MEETING') },
                        { value: SORT.DESC, label: t('SORT_NEWEST_MEETING') },
                    ]}
                />
                {permissionCreateMeeting && (
                    <Button
                        type="primary"
                        icon={addIcon}
                        size="large"
                        onClick={() => {
                            router.push(createLink)
                        }}
                    >
                        {t('ADD_NEW')}
                    </Button>
                )}
            </div>
        </LayoutTitle>
    )
}

export default ListTitle
