'use client'

import Content from '@/components/workspace-layout/content'
import Header from '@/components/workspace-layout/header'
import Sidebar from '@/components/workspace-layout/sidebar'
import { Layout } from 'antd'
import { ReactNode } from 'react'

export interface IWorkspaceLayout {
    pageName: string
    children: ReactNode
}

const WorkspaceLayout = (props: IWorkspaceLayout) => {
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout className="mt-12">
                <Sidebar />
                <Content {...props} />
            </Layout>
        </Layout>
    )
}

export default WorkspaceLayout
