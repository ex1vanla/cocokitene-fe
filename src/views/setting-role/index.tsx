import ListTitle from '@/components/content-page-title/list-title'
import { useSettingRole } from '@/stores/setting-role/hooks'
import { EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Checkbox from 'antd/es/checkbox/Checkbox'
import Table, { ColumnsType } from 'antd/es/table'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ModalRegisterRole from './modal-register-role'
interface DataType {
    namePermission: string
    [key: string]: any
}

const datatest = {
    create_account: {
        admin: 1,
        member: 0,
        shareholder: 1,
        sponsor: 1,
        export: 0,
    },
    edit_account: {
        admin: 1,
        member: 0,
        shareholder: 1,
        sponsor: 0,
        export: 0,
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
                initialCheckboxState[permissionKey][valueKey] =
                    permissionData[valueKey] === 1
            })
        })

        setCheckboxState(initialCheckboxState)
    }, [])

    const handleInputChange = () => {}

    const handleSelectChange = () => {}

    const result = Object.entries(datatest).map(([namePermission, values]) => ({
        namePermission,
        ...values,
    }))

    const onChange = (namePermission: string, key: string) => {
        const updatedCheckboxState = { ...checkboxState }

        updatedCheckboxState[namePermission] = {
            ...updatedCheckboxState[namePermission],
            [key]: !updatedCheckboxState[namePermission]?.[key],
        }

        setCheckboxState(updatedCheckboxState)
    }

    const columnData = Object.keys(Object.values(datatest)[0]).map((item) => ({
        title: item,
        dataIndex: item,
        render: (values: any, record: any): JSX.Element => (
            <Checkbox
                style={{ pointerEvents: !clickButtonEdit ? 'none' : 'auto' }}
                checked={checkboxState[record.namePermission]?.[item]}
                onChange={() => onChange(record.namePermission, item)}
            />
        ),
    }))

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'namePermission',
            render: (text: string) => <a>{text}</a>,
        },
        ...columnData,
    ]

    const data: DataType[] = [...result]

    return (
        <div>
            <ListTitle
                pageName={t('SETTING_ROLE')}
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
                    <Button
                        type={!clickButtonEdit ? 'primary' : 'default'}
                        icon={
                            !clickButtonEdit ? (
                                <EditOutlined />
                            ) : (
                                <SaveOutlined />
                            )
                        }
                        size="large"
                        onClick={() => setClickButtonEdit(!clickButtonEdit)}
                    >
                        {!clickButtonEdit ? 'Edit' : 'Save'}
                    </Button>
                }
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <Table columns={columns} dataSource={data} />
            </div>
            <ModalRegisterRole />
        </div>
    )
}

export default SettingRoleView
