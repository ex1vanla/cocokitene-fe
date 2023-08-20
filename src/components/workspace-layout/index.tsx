'use client'

import Content from '@/components/workspace-layout/content'
import Header from '@/components/workspace-layout/header'
import Sidebar from '@/components/workspace-layout/sidebar'
import { Layout } from 'antd'
import { ReactNode, useState } from 'react'

export interface IWorkspaceLayout {
    children: ReactNode
}

const WorkspaceLayout = (props: IWorkspaceLayout) => {
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

export default WorkspaceLayout
