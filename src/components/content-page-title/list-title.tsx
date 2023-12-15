import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { SORT } from '@/constants/meeting'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Select, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { ChangeEvent, ReactNode } from 'react'

const { Title } = Typography

interface IListTitle extends IBaseTitle {
    addButton?: ReactNode
    editButton?: ReactNode
    // eslint-disable-next-line
    onChangeInput: (value: string) => void
    // eslint-disable-next-line
    onChangeSelect: (value: string) => void
    defaultSort?: string
}

const ListTitle = ({
    pageName,
    addButton,
    editButton,
    onChangeInput,
    onChangeSelect,
    defaultSort,
}: IListTitle) => {
    const t = useTranslations()

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
                    defaultValue={
                        defaultSort == SORT.ASC
                            ? t('SORT_OLDEST_MEETING')
                            : t('SORT_NEWEST_MEETING')
                    }
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleChangeSelect}
                    options={[
                        { value: SORT.ASC, label: t('SORT_OLDEST_MEETING') },
                        { value: SORT.DESC, label: t('SORT_NEWEST_MEETING') },
                    ]}
                />
                {addButton}
                {editButton}
            </div>
        </LayoutTitle>
    )
}

export default ListTitle
