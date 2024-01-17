import withAuthAdmin from '@/components/component-auth-admin'
import ListTitle from '@/components/content-page-title/list-title'
import { useListCompany } from '@/stores/company/hooks'
import { useListPlan } from '@/stores/service-plan/hooks'
import CompanyList from '@/views/company/company-list'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PlanList from './service-plan-list'

const ServicePlanList = () => {
    const t = useTranslations()
    const router = useRouter()
    // const { companyState, getListCompanyAction, setFilterAction } =
    //     useListCompany()

    const { planState, getListPlanAction, setFilterAction } = useListPlan()

    // console.log('planState', planState)

    useEffect(() => {
        getListPlanAction({
            page: planState.page,
            limit: planState.limit,
            filter: { ...planState.filter },
        })
        // eslint-disable-next-line
    }, [planState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...planState.filter, searchQuery: value })
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...planState.filter, sortOrder: value })
    }
    return (
        <div>
            <ListTitle
                pageName={t('LIST_SERVICE_PLAN')}
                addButton={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => {
                            router.push('/plan/create')
                        }}
                    >
                        {t('ADD_NEW')}
                    </Button>
                }
                defaultSort={planState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="w-full p-6">
                <div className="w-full bg-white p-6 px-6 py-4 shadow-01">
                    <PlanList />
                </div>
                {/* <CompanyList data={companyState.companyList} /> */}
            </div>
        </div>
    )
}

export default withAuthAdmin(ServicePlanList)
