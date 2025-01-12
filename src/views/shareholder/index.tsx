'use client'
import { useTranslations } from 'next-intl'
import { useListShareholder } from '@/stores/shareholder/hook'
import { useEffect, useState } from 'react'
import ListTitle from '@/components/content-page-title/list-title'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'
import ShareholderList from '@/views/shareholder/shareholder-list'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { SORT } from '@/constants/meeting'
import useDebounce from '@/hooks/useDebounce'

const ShareholderView = () => {
    const t = useTranslations()
    const { shareholderState, setFilterAction, getListShareholderAction } =
        useListShareholder()

    const [searchString, setSearchString] = useState<string>('')
    const searchQueryString = useDebounce(searchString, 200)

    useEffect(() => {
        return () => {
            setFilterAction({
                searchQuery: CONSTANT_EMPTY_STRING,
                sortOrder: SORT.DESC,
            })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setFilterAction({
            ...shareholderState.filter,
            searchQuery: searchQueryString,
        })
        // eslint-disable-next-line
    }, [searchQueryString])

    useEffect(() => {
        getListShareholderAction({
            page: shareholderState.page,
            limit: shareholderState.limit,
            filter: { ...shareholderState.filter },
        })
        // eslint-disable-next-line
    }, [shareholderState.filter])

    const handleInputChange = (value: string) => {
        // setFilterAction({ ...shareholderState.filter, searchQuery: value })
        setSearchString(value.toLocaleLowerCase().trim())
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...shareholderState.filter, sortOrder: value })
    }

    return (
        <div>
            <ListTitle
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
                pageName={t('LIST_SHAREHOLDERS')}
            />
            <div className="p-6 max-sm:px-0">
                <ShareholderList />
            </div>
        </div>
    )
}

// eslint-disable-next-line no-undef
export default withAuth(ShareholderView, Permissions.LIST_SHAREHOLDERS)
