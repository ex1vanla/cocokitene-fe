/*eslint-disable*/
import BoxArea from '@/components/box-area'
import ParticipantDetail from '@/components/participants-detail'
import { FETCH_STATUS } from '@/constants/common'
import useDebounce from '@/hooks/useDebounce'
import serviceMeeting from '@/services/meeting'
import { IMeetingParticipantsResponse } from '@/services/response.type'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { SettingOutlined } from '@ant-design/icons'
import { Empty, Input } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const Participants = () => {
    const t = useTranslations()
    const [query, setQuery] = useState('')
    const { id } = useParams()
    const [participants, setParticipants] = useState<{
        status: FETCH_STATUS
        data: IMeetingParticipantsResponse
    }>({
        status: FETCH_STATUS.IDLE,
        data: {
            userWithRoleMtg: [],
        },
    })

    const searchQuery = useDebounce(query, 200)
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
                        // ...participants,
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
            {participants.data.userWithRoleMtg.length > 0 ? (
                <div className="max-[470px]:px-3">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <Input
                            placeholder={t('SEARCH')}
                            className="mb-6 max-w-[320px]"
                            addonAfter={<SettingOutlined />}
                            onChange={onChange}
                            value={query}
                            // onFocus={() => setFocus(true)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {participants.data.userWithRoleMtg &&
                            participants.data.userWithRoleMtg.map(
                                (item, index) => (
                                    <ParticipantDetail
                                        key={index}
                                        isLoading={
                                            participants.status ===
                                            FETCH_STATUS.LOADING
                                        }
                                        title={convertSnakeCaseToTitleCase(
                                            item.roleMtgName,
                                        )}
                                        participantList={item.userParticipants}
                                    />
                                ),
                            )}
                    </div>
                </div>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )}
        </BoxArea>
    )
}

export default Participants
