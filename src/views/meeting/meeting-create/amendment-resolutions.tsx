import BoxArea from '@/components/box-area'
import CreateResolutionItem from '@/components/create-resolution-item'
import { ResolutionType } from '@/constants/meeting'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const data = Array.from(Array(2).keys())

const AmendmentResolutions = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.map((x, index) => (
                    <CreateResolutionItem
                        key={index}
                        type={ResolutionType.AMENDMENT_RESOLUTION}
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

export default AmendmentResolutions
