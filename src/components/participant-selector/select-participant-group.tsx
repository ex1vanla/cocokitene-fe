import { SettingOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslations } from 'next-intl'

export interface ISelectParticipantGroup {
    onSelectParticipant: () => void
}

const SelectParticipantGroup = ({
    onSelectParticipant,
}: ISelectParticipantGroup) => {
    const t = useTranslations()
    return (
        <Input
            placeholder={t('SEARCH_TO_ADD_NEW')}
            addonAfter={<SettingOutlined />}
            onChange={onSelectParticipant}
        />
    )
}

export default SelectParticipantGroup
