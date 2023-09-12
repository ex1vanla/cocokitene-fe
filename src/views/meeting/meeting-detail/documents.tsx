import BoxArea from '@/components/box-area'
import { PdfIcon } from '@/components/svgs'
import { MeetingResourceType, FileType } from '@/constants/meeting'
import { Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Text } = Typography

const data1 = [
    {
        url: 'meeting2023.pdf',
        type: FileType.PDF,
    },
    {
        url: 'meeting2024.pdf',
        type: FileType.PDF,
    },
    {
        url: 'meeting2025.pdf',
        type: FileType.PDF,
    },
]

const data2 = [
    {
        url: 'recordmeeting2023.pdf',
        type: FileType.PDF,
    },
    {
        url: 'recordmeeting2024.pdf',
        type: FileType.PDF,
    },
]

const data3 = [
    {
        url: 'zoom.us/meeting/28102hakdna0120',
        type: FileType.LINK,
    },
]

interface MeetingResource {
    url: string
    type: FileType
}

interface IDocumentList {
    meetingResourceType: MeetingResourceType
    resources: MeetingResource[]
}

const Resource = ({ url, type }: MeetingResource) => {
    const getIconFromFileType = () => {
        switch (type) {
            case FileType.PDF:
                return <PdfIcon fill="#5151E5" />
            default:
                return null
        }
    }
    return (
        <div className="flex items-center gap-2">
            {getIconFromFileType()}
            <Text className="cursor-pointer text-primary">{url}</Text>
        </div>
    )
}

const DocumentList = ({ meetingResourceType, resources }: IDocumentList) => {
    const t = useTranslations()

    return (
        <div className="flex gap-3">
            <Text className="text-black-45">{t(meetingResourceType)}:</Text>
            <div className="flex flex-col gap-1">
                {resources.map((resource, index) => (
                    <Resource
                        key={index}
                        url={resource.url}
                        type={resource.type}
                    />
                ))}
            </div>
        </div>
    )
}

const Documents = () => {
    const t = useTranslations()

    return (
        <BoxArea title={t('DOCUMENTS')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={
                            MeetingResourceType.MEETING_INVITATIONS
                        }
                        resources={data1}
                    />
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={
                            MeetingResourceType.MEETING_MINUTES
                        }
                        resources={data2}
                    />
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={MeetingResourceType.MEETING_LINKS}
                        resources={data3}
                    />
                </Col>
            </Row>
        </BoxArea>
    )
}

export default Documents
