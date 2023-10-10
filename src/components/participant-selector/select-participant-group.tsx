/* eslint-disable */
import useDebounce from '@/hooks/useDebounce'
import { SettingOutlined } from '@ant-design/icons'
import { Input, Spin } from 'antd'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IParticipants } from '.'
import { FETCH_STATUS } from '@/constants/common'
import ParticipantOptionItem from './participant-option-item'
import serviceUser from '@/services/user'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export interface ISelectParticipantGroup {
    onSelectParticipant: (p: IParticipants) => void
}

const SelectParticipantGroup = ({
    onSelectParticipant,
}: ISelectParticipantGroup) => {
    const t = useTranslations()
    const [query, setQuery] = useState('')
    const [isFocus, setFocus] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [optionsData, setOptionsData] = useState<{
        status: FETCH_STATUS
        options: IParticipants[]
    }>({
        status: FETCH_STATUS.IDLE,
        options: [],
    })
    const searchQuery = useDebounce(query, 200)

    useOnClickOutside(ref, () => {
        setFocus(false)
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if (isFocus) {
            ;(async () => {
                try {
                    setOptionsData({
                        ...optionsData,
                        status: FETCH_STATUS.LOADING,
                    })
                    const optionsRes = await serviceUser.getAccountList(query)
                    console.log(
                        '🚀 ~ file: select-participant-group.tsx:46 ~ optionsRes:',
                        optionsRes,
                    )
                    setOptionsData({
                        options: optionsRes.items,
                        status: FETCH_STATUS.SUCCESS,
                    })
                } catch (error) {}
            })()
        }
    }, [searchQuery, isFocus])

    const onSelect = (p: IParticipants) => {
        onSelectParticipant(p)
        setFocus(false)
    }

    return (
        <div className="relative">
            <Input
                placeholder={t('SEARCH_TO_ADD_NEW')}
                addonAfter={<SettingOutlined />}
                onChange={onChange}
                value={query}
                onFocus={() => setFocus(true)}
            />
            {isFocus && (
                <div
                    ref={ref}
                    className="absolute z-50 w-full bg-neutral/2 p-2 shadow-lg transition-all"
                >
                    <div className="flex flex-col">
                        {optionsData?.options?.map((option, index) => (
                            <ParticipantOptionItem
                                key={index}
                                id={option.id}
                                username={option.username}
                                defaultAvatarHashColor={
                                    option.defaultAvatarHashColor
                                }
                                avatar={option.avatar}
                                onSelectParticipant={() => onSelect(option)}
                            />
                        ))}
                    </div>
                    {optionsData.status === FETCH_STATUS.LOADING && (
                        <div className="flex justify-center">
                            <Spin tip="Loading..." />
                        </div>
                    )}
                    {optionsData.status === FETCH_STATUS.SUCCESS &&
                        optionsData.options?.length === 0 && (
                            <div className="flex justify-center">No data</div>
                        )}
                </div>
            )}
        </div>
    )
}

export default SelectParticipantGroup
