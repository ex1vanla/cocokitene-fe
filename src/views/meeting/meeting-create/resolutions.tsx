import BoxArea from '@/components/box-area'
import ResolutionItem from '@/components/resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const data = Array.from(Array(5).keys())

const Resolutions = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.map((x, index) => (
                    <ResolutionItem
                        key={index}
                        type={ResolutionType.RESOLUTION}
                        index={index + 1}
                        title=""
                        content=""
                        onChangeTitle={() => {
                            console.log('title')
                        }}
                        onChangeContent={() => {
                            console.log('content')
                        }}
                        onDelete={() => {
                            console.log('delete')
                        }}
                    />
                ))}
            </div>
            <Button icon={<PlusOutlined />}>{t('ADD_NEW')}</Button>
        </BoxArea>
    )
}

export default Resolutions
