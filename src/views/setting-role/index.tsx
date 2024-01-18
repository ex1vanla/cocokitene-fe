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
import { IUpdatePermissionRole } from '@/services/request.type'
interface DataType {
    namePermission: string
    [key: string]: any
}

type PermissionChecked = {
    permissionId: number
    changeStatePermissionForRole: RoleChecked[]
}

type RoleChecked = {
    roleId: number
    state: number
}

const SettingRoleView = () => {
    const t = useTranslations()
    const {
        settingRoleState,
        getAllCombineRoleWithPermission,
        setOpenModal,
        setFilterAction,
    } = useSettingRole()
    const [clickButtonEdit, setClickButtonEdit] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState<any>({})
    const [dataInitial, setDataInitial] = useState<any>({})
    const [widthRoleColumn, setWidthRoleColumn] = useState<string>('20%')
    const [isLoading, setIsLoading] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE)
    const [data, setData] = useState<any>(null)
    const [columns, setColumns] = useState<any>(null)
    const [permissions, setPermissions] = useState<
        { id: number; key: string }[] | null
    >(null)
    const [roles, setRoles] = useState<{ id: number; key: string }[] | null>(
        null,
    )
    const [dataChecked, setDataCheked] = useState<IUpdatePermissionRole[]>([])

    useEffect(() => {
        if (settingRoleState.permissionRoleList && settingRoleState.permissionRoleList.length > 0) {
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
            setDataInitial(initialCheckboxState)

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
                        defaultChecked={
                            checkboxState[record.namePermission]?.[item]
                        }
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
                const permissionResponse =
                    await serviceSettingRole.getAllPermissions(1, 100)
                const permissionList = permissionResponse.map((item) => ({
                    id: item.id,
                    key: item.key,
                }))
                setPermissions(permissionList)

                const roleResponse = await serviceSettingRole.getAllRoles(
                    1,
                    100,
                )
                const roleList = roleResponse.map((item) => ({
                    id: item.id,
                    key: item.roleName,
                }))
                setRoles(roleList)
            } catch (error) {
                console.log('error', error)
                notification.error({
                    message: 'error',
                })
            }
        })()
        getAllCombineRoleWithPermission({
            searchQuery: settingRoleState.filter.searchQuery,
        })
    }, [settingRoleState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ searchQuery: value })
    }

    const handleSelectChange = () => {}

    const onChange = (
        namePermission: string,
        key: string,
        e: CheckboxChangeEvent,
    ) => {
        const checkValueChange =
            dataInitial[namePermission]?.[key] !== e.target.checked
        const idPermission = permissions?.find(
            (item) => item.key === namePermission,
        )?.id
        //find id role
        const idRole = roles?.find((item) => item.key === key)?.id
        //check trường hợp nếu data không giống với initial
        if (idPermission && idRole) {
            if (checkValueChange) {
                // Kiểm tra xem đã có đối tượng với permissionId tương ứng chưa
                const existingDataIndex = dataChecked.findIndex(
                    (item) => item.permissionId === idPermission,
                )

                if (existingDataIndex !== -1) {
                    // Nếu đã tồn tại, kiểm tra xem idRole đã được thêm vào roleId chưa
                    const existingRoleIndex = dataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole.findIndex(
                        (role) => role.roleId === idRole,
                    )

                    if (existingRoleIndex !== -1) {
                        // Nếu đã tồn tại, cập nhật giá trị của roleId
                        const newDataChecked = [...dataChecked]
                        newDataChecked[
                            existingDataIndex
                        ].changeStatePermissionForRole[existingRoleIndex] = {
                            roleId: idRole,
                            state: e.target.checked ? 1 : 0,
                        }
                        setDataCheked(newDataChecked)
                    } else {
                        // Nếu chưa có, thêm mới vào roleId
                        const newDataChecked = [...dataChecked]
                        newDataChecked[
                            existingDataIndex
                        ].changeStatePermissionForRole.push({
                            roleId: idRole,
                            state: e.target.checked ? 1 : 0,
                        })
                        setDataCheked(newDataChecked)
                    }
                } else {
                    // Nếu chưa có dữ liệu với permissionId tương ứng, tạo mới và thêm vào state
                    const newDataChecked = [
                        ...dataChecked,
                        {
                            permissionId: idPermission,
                            changeStatePermissionForRole: [
                                {
                                    roleId: idRole,
                                    state: e.target.checked ? 1 : 0,
                                },
                            ],
                        },
                    ]
                    setDataCheked(newDataChecked)
                }
                // Kiểm tra trong mảng có chưa. Nếu chưa có thì thêm vào còn có rồi thì update lại value
            } else {
                // Trường hợp data đang được chọn lại 2 lần. Loại bỏ nó đi
                const newDataChecked = [...dataChecked]
                const existingDataIndex = newDataChecked.findIndex(
                    (item) => item.permissionId === idPermission,
                )

                if (existingDataIndex !== -1) {
                    // Nếu tồn tại đối tượng với permissionId tương ứng
                    newDataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole = newDataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole.filter(
                        (role) => role.roleId !== idRole,
                    )

                    // Kiểm tra xem sau khi loại bỏ roleId, nếu mảng roleId trở thành rỗng, loại bỏ cả đối tượng
                    if (
                        newDataChecked[existingDataIndex]
                            .changeStatePermissionForRole.length === 0
                    ) {
                        newDataChecked.splice(existingDataIndex, 1)
                    }

                    setDataCheked(newDataChecked)
                }
            }
        }

        const updatedCheckboxState = { ...checkboxState }

        updatedCheckboxState[namePermission] = {
            ...updatedCheckboxState[namePermission],
            [key]: !updatedCheckboxState[namePermission]?.[key],
        }

        setCheckboxState(updatedCheckboxState)
    }

    const handleEditRolePerrmisson = () => {
        ;(async () => {
            try {
                const response = await serviceSettingRole.updateRolePermissions(
                    dataChecked,
                )
                if (response) {
                    notification.success({
                        message: 'Success',
                    })
                    setClickButtonEdit(!clickButtonEdit)
                    setDataCheked([])
                    getAllCombineRoleWithPermission()
                }
            } catch (error) {
                console.log('error', error)
                notification.error({
                    message: 'error',
                })
            }
        })()
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
