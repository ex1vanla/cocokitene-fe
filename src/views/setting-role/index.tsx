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
import serviceSettingRole from '@/services/setting-role'
interface DataType {
    namePermission: string
    [key: string]: any
}

type RolePermissionApi = {
    "permissionId": number;
    "roleIds": number[]
}

const SettingRoleView = () => {
    const t = useTranslations()
    const { settingRoleState, getAllCombineRoleWithPermission, setOpenModal } =
        useSettingRole()
    const [clickButtonEdit, setClickButtonEdit] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState<any>({})
    const [widthRoleColumn, setWidthRoleColumn] = useState<string>('20%')
    const [isLoading, setIsLoading] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE)
    const [data, setData] = useState<any>(null)
    const [columns, setColumns] = useState<any>(null)
    const [permissions, setPermissions] = useState<any>(null)
    const [roles, setRoles] = useState<any>(null)

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
        }
    }, [settingRoleState.permissionRoleList])

    useEffect(() => {
        if (settingRoleState.permissionRoleList) {
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
        }
    }, [checkboxState, clickButtonEdit])

    useEffect(() => {
        ;(async () => {
            try {
                // const permissionResponse = await serviceSettingRole.getAllPermissions(
                //     1,
                //     100,
                // )
                // const permissionList = permissionResponse.map((item) => ({
                //     value: item.id,
                //     label: convertSnakeCaseToTitleCase(item.key),
                // }))
                // setPermissions(permissionList)

                const roleResponse = await serviceSettingRole.getAllRoles(
                    1,
                    100,
                )
                const roleList = roleResponse.map((item) => ({
                    value: item.id,
                    label: convertSnakeCaseToTitleCase(item.key),
                }))
                setRoles(roleList)
            } catch (error) {
                console.log('error', error)
                notification.error({
                    message: 'error',
                })
            }
        })()
        getAllCombineRoleWithPermission()
    }, [])

    const handleInputChange = () => {}

    const handleSelectChange = () => {}

    const onChange = (
        namePermission: string,
        key: string,
        e: CheckboxChangeEvent,
    ) => {
        if(e.target.checked){

        }

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
                    pagination={false}
                />
            </div>
            <ModalRegisterRole />
        </div>
    )
}

export default SettingRoleView
