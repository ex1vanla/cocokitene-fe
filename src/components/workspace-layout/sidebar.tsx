import { sidebarItems } from '@/constants/common'
import { Layout, Menu, MenuProps } from 'antd'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { createElement, useCallback, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const Sidebar = () => {
    const pathname = usePathname()

    console.log('pathname: ' + pathname)

    const router = useRouter()
    const t = useTranslations()

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

    const redirect = ({ key }: { key: string }) => {
        router.push(key)
    }

    const toggle = () => {
        setIsCollapsed(!isCollapsed)
    }

    const menuItems: MenuItem[] = sidebarItems.map((sidebarItem) => {
        const { label, key, icon } = sidebarItem
        return {
            key,
            icon: createElement(icon),
            label: t(label),
        }
    })

    const getSelectedKey = useCallback(() => {
        let selectedKey: string = ''
        for (const sidebarItem of sidebarItems) {
            if (pathname.includes(sidebarItem.key)) {
                selectedKey = sidebarItem.key
                break
            }
        }
        return selectedKey
    }, [pathname])

    return (
        <Layout.Sider
            width={208}
            collapsible
            onCollapse={toggle}
            collapsed={isCollapsed}
            className="fixed h-full overflow-auto bg-white"
        >
            <Menu
                className="h-full"
                onClick={redirect}
                mode={'inline'}
                selectedKeys={[getSelectedKey()]}
                items={menuItems}
            />
        </Layout.Sider>
    )
}

export default Sidebar
