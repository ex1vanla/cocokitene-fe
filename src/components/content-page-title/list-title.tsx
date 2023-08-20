import LayoutTitle, {
    IBaseTitle,
} from '@/components/content-page-title/layout-title'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Input, Select, Typography } from 'antd'

const { Title } = Typography

interface IListTitle extends IBaseTitle {}

const ListTitle = ({ pageName }: IListTitle) => {
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
                    placeholder="Search"
                />

                <Select
                    className="w-[200px]"
                    defaultValue="lucy"
                    size="large"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                    ]}
                />

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {}}
                >
                    Add New
                </Button>
            </div>
        </LayoutTitle>
    )
}

export default ListTitle
