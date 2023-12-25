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
interface DataType {
    namePermission: string
    [key: string]: any
}

const datatest = {
    create_account: {
        super_admin: 1,
        admin: 0,
        shareholder: 1,
        user: 1,
    },
    edit_account: {
        super_admin: 1,
        admin: 1,
        shareholder: 0,
        user: 0,
    },
    detail_account: {
        super_admin: 1,
        admin: 0,
        shareholder: 0,
        user: 0,
    },
    list_account: {
        super_admin: 1,
        admin: 1,
        shareholder: 1,
        user: 1,
    },
    create_company: {
        super_admin: 1,
        admin: 0,
        shareholder: 0,
        user: 0,
    },
    edit_company: {
        super_admin: 1,
        admin: 1,
        shareholder: 1,
        user: 1,
    },
    detail_company: {
        super_admin: 1,
        admin: 0,
        shareholder: 0,
        user: 0,
    },
    list_company: {
        super_admin: 1,
        admin: 1,
        shareholder: 1,
        user: 1,
    },
}

const SettingRoleView = () => {
    const { setOpenModal } = useSettingRole()
    const [clickButtonEdit, setClickButtonEdit] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState<any>({})
    const t = useTranslations()

    useEffect(() => {
        const initialCheckboxState: any = {}
        Object.keys(datatest).forEach((item) => {
            initialCheckboxState[item] = {}
            const permissionData = datatest[item as keyof typeof datatest]

            Object.keys(permissionData).forEach((key) => {
                const permissionKey = item as keyof typeof datatest
                const valueKey =
                    key as keyof (typeof datatest)[typeof permissionKey]
                console.log('check valueKey', valueKey)
                initialCheckboxState[permissionKey][valueKey] =
                    permissionData[valueKey] === 1
            })
        })

        setCheckboxState(initialCheckboxState)
    }, [])

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

    const result = Object.entries(datatest).map(([namePermission, values]) => ({
        namePermission,
        ...values,
    }))

    const columnData = Object.keys(Object.values(datatest)[0]).map((item) => ({
        title: convertSnakeCaseToTitleCase(item),
        dataIndex: item,
        render: (values: any, record: any): JSX.Element => (
            <Checkbox
                style={{ pointerEvents: !clickButtonEdit ? 'none' : 'auto' }}
                checked={checkboxState[record.namePermission]?.[item]}
                onChange={(e) => onChange(record.namePermission, item, e)}
            />
        ),
        width: '20%',
    }))

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'namePermission',
            render: (text: string) => <>{convertSnakeCaseToTitleCase(text)} </>,
        },
        ...columnData,
    ]

    const data: DataType[] = [...result]

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
                <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
            <ModalRegisterRole />
        </div>
    )
}

export default SettingRoleView
