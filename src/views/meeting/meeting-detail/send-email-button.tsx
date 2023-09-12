import { MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const SendEmailButton = () => {
    const t = useTranslations()
    return (
        <Button
            icon={<MailOutlined />}
            type="primary"
            size="large"
            onClick={() => {}}
        >
            {t('SEND_EMAIL_TO_SHAREHOLDERS')}
        </Button>
    )
}

export default SendEmailButton
