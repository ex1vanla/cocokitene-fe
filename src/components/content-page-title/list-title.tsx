import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Input, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const { Title } = Typography

interface IListTitle extends IBaseTitle {
    addIcon: ReactNode
    createLink: string
}

const ListTitle = ({ pageName, addIcon, createLink }: IListTitle) => {
    const router = useRouter()

    const t = useTranslations()

    const handleChange = (value: string) => {
        console.log(`selected ${value}`)
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
                    addonAfter={<SettingOutlined />}
                    placeholder={t('SEARCH')}
                />

                <Select
                    className="w-[200px]"
                    defaultValue={t('SORT_NEWEST_MEETING')}
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: '0', label: t('SORT_NEWEST_MEETING') },
                        { value: '1', label: t('SORT_OLDEST_MEETING') },
                    ]}
                />

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
            </div>
        </LayoutTitle>
    )
}

export default ListTitle
