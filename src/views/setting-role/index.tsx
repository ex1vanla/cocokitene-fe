import ListTitle from '@/components/content-page-title/list-title'
import { useSettingRole } from '@/stores/setting-role/hooks'
import { EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import Table, { ColumnsType } from 'antd/es/table'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ModalRegisterRole from './modal-register-role'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { FETCH_STATUS } from '@/constants/common'
interface DataType {
    namePermission: string
    [key: string]: any
}

// const datatest = {
//     create_account: {
//         super_admin: 1,
//         admin: 0,
//         shareholder: 0,
//         user: 0,
//     },
//     edit_account: {
//         super_admin: 1,
//         admin: 1,
//         shareholder: 0,
//         user: 0,
//     },
//     detail_account: {
//         super_admin: 1,
//         admin: 0,
//         shareholder: 0,
//         user: 0,
//     },
//     list_account: {
//         super_admin: 1,
//         admin: 1,
//         shareholder: 1,
//         user: 1,
//     },
//     create_company: {
//         super_admin: 1,
//         admin: 0,
//         shareholder: 0,
//         user: 0,
//     },
//     edit_company: {
//         super_admin: 1,
//         admin: 1,
//         shareholder: 1,
//         user: 1,
//     },
//     detail_company: {
//         super_admin: 1,
//         admin: 1,
//         shareholder: 0,
//         user: 0,
//     },
//     list_company: {
//         super_admin: 1,
//         admin: 0,
//         shareholder: 1,
//         user: 1,
//     },
// }

const SettingRoleView = () => {
    const { settingRoleState, getAllCombineRoleWithPermission, setOpenModal } =
        useSettingRole()
    const [clickButtonEdit, setClickButtonEdit] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState<any>({})
    const [widthRoleColumn, setWidthRoleColumn] = useState<string>('20%')
    const [isLoading, setIsLoading] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE)
    const [data, setData] = useState<any>(null)
    const [columns, setColumns] = useState<any>(null)
    const t = useTranslations()

    console.log('check settingrole state', settingRoleState.permissionRoleList)

    useEffect(() => {
        if (settingRoleState.permissionRoleList) {
            const initialCheckboxState: any = {}
            Object.entries(settingRoleState.permissionRoleList).forEach(
                ([item, permissionData]) => {
                    initialCheckboxState[item] = {}

                    Object.entries(permissionData).forEach(([key, value]) => {
                        initialCheckboxState[item][key] = value === 1
                    })
                },
            )
            setCheckboxState(initialCheckboxState)

            const totalRoleColumn = Object.keys(
                Object.values(settingRoleState.permissionRoleList)[0],
            ).length
            const widthRolesColumn = 80 //default 80%
            setWidthRoleColumn(
                `${(widthRolesColumn / totalRoleColumn).toFixed(2)}%`,
            )
            setIsLoading(FETCH_STATUS.SUCCESS)

            const result = Object.entries(
                settingRoleState.permissionRoleList,
            ).map(([namePermission, values]) => ({
                namePermission,
                ...values,
            }))

            const columnData = Object.keys(
                Object.values(settingRoleState.permissionRoleList)[0],
            ).map((item) => ({
                title: convertSnakeCaseToTitleCase(item),
                dataIndex: item,
                render: (values: any, record: any): JSX.Element => (
                    <Checkbox
                        style={{
                            pointerEvents: !clickButtonEdit ? 'none' : 'auto',
                        }}
                        checked={checkboxState[record.namePermission]?.[item]}
                        onChange={(e) =>
                            onChange(record.namePermission, item, e)
                        }
                    />
                ),
                width: widthRoleColumn,
            }))

            const columns: ColumnsType<DataType> = [
                {
                    title: '',
                    dataIndex: 'namePermission',
                    render: (text: string) => (
                        <>{convertSnakeCaseToTitleCase(text)} </>
                    ),
                },
                ...columnData,
            ]

            setColumns(columns)

            const data: DataType[] = [...result]
            setData(data)
        } else {
            getAllCombineRoleWithPermission()
        }
    }, [settingRoleState.permissionRoleList])

    const handleInputChange = () => {}

    const handleSelectChange = () => {}

    const onChange = (
        namePermission: string,
        key: string,
        e: CheckboxChangeEvent,
    ) => {
        const updatedCheckboxState = { ...checkboxState }

        updatedCheckboxState[namePermission] = {
            ...updatedCheckboxState[namePermission],
            [key]: !updatedCheckboxState[namePermission]?.[key],
        }

        setCheckboxState(updatedCheckboxState)
    }

    const handleEditRolePerrmisson = () => {
        notification.success({
            message: 'Success',
        })
        setClickButtonEdit(!clickButtonEdit)
    }

    return (
        <div>
            <ListTitle
                pageName={'Setting Role'}
                addButton={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setOpenModal(true)}
                    >
                        {t('ADD_NEW')}
                    </Button>
                }
                editButton={
                    <>
                        {!clickButtonEdit ? (
                            <Button
                                type={'primary'}
                                icon={<EditOutlined />}
                                size="large"
                                onClick={() =>
                                    setClickButtonEdit(!clickButtonEdit)
                                }
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button
                                type={'default'}
                                icon={<SaveOutlined />}
                                size="large"
                                onClick={() => handleEditRolePerrmisson()}
                            >
                                Save
                            </Button>
                        )}
                    </>
                }
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.namePermission}
                    loading={isLoading != FETCH_STATUS.SUCCESS}
                />
            </div>
            <ModalRegisterRole />
        </div>
    )
}

export default SettingRoleView
