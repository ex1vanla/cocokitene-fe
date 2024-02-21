/*eslint-disable*/
import BoxArea from '@/components/box-area'
import ParticipantDetail from '@/components/participants-detail'
import { FETCH_STATUS } from '@/constants/common'
import useDebounce from '@/hooks/useDebounce'
import serviceMeeting from '@/services/meeting'
import { IMeetingParticipantsResponse } from '@/services/response.type'
import { SettingOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const obj = {
    USER: [
        {
            defaultAvatarHashColor: '#1e71e6',
            avatar: 'https://cocokitene.s3.ap-southeast-1.amazonaws.com/avatars/1705916842789/cty%20TTM1_HuyNT-avarta.jpg',
            name: 'Dev-CS',
            joined: false,
        },
    ],
    ADMIN: [
        {
            defaultAvatarHashColor: '#1e71e6',
            avatar: 'https://cocokitene.s3.ap-southeast-1.amazonaws.com/avatars/1705916842789/cty%20TTM1_HuyNT-avarta.jpg',
            name: 'Dev-CS',
            joined: false,
        },
    ],
    SHAREHOLDER: [
        {
            defaultAvatarHashColor: '#1e71e6',
            avatar: 'https://cocokitene.s3.ap-southeast-1.amazonaws.com/avatars/1705916842789/cty%20TTM1_HuyNT-avarta.jpg',
            name: 'Dev-CS',
            joined: false,
        },
    ],
}

const Participants = () => {
    const t = useTranslations()
    const [query, setQuery] = useState('')
    const { id } = useParams()
    const [participants, setParticipants] = useState<{
        status: FETCH_STATUS
        data: IMeetingParticipantsResponse
    }>({
        status: FETCH_STATUS.IDLE,
        data: {},
    })
    const searchQuery = useDebounce(query, 200)

    console.log('participants :', participants.data)

    useEffect(() => {
        if (id) {
            ;(async () => {
                try {
                    setParticipants({
                        ...participants,
                        status: FETCH_STATUS.LOADING,
                    })
                    const res = await serviceMeeting.getMeetingParticipants(
                        Number(id),
                        searchQuery.trim(),
                    )
                    setParticipants({
                        data: res,
                        status: FETCH_STATUS.SUCCESS,
                    })
                } catch (error) {
                    setParticipants({
                        ...participants,
                        status: FETCH_STATUS.ERROR,
                    })
                }
            })()
        }
    }, [searchQuery, id])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Input
                    placeholder={t('SEARCH')}
                    className="mb-6"
                    addonAfter={<SettingOutlined />}
                    onChange={onChange}
                    value={query}
                    // onFocus={() => setFocus(true)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Object.keys(participants.data).map((item) => {
                    return (
                        <ParticipantDetail
                            isLoading={
                                participants.status === FETCH_STATUS.LOADING
                            }
                            title={t(item)}
                            participantList={participants.data[item]}
                        />
                    )
                })}
            </div>
        </BoxArea>
    )
}

export default Participants
