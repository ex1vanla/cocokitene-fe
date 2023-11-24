'use client'

import Content from '@/components/system-admin-layout/content'
import { Layout } from 'antd'
import { ReactNode, useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export interface ISystemAdminLayout {
    children: ReactNode
}

const SystemAdminLayout = (props: ISystemAdminLayout) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout className="mt-12">
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />

                <Content isCollapsed={isCollapsed} {...props} />
            </Layout>
        </Layout>
    )
}

export default SystemAdminLayout
