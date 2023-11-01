'use client'

import Content from '@/components/workspace-layout/content'
import { useAuthLogin } from '@/stores/auth/hooks'
import { Layout } from 'antd'
import { ReactNode, useState } from 'react'
import Header from './header'
import dynamic from 'next/dynamic'

export interface IWorkspaceLayout {
    children: ReactNode
}

const Sidebar = dynamic(() => import('./sidebar'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

const WorkspaceLayout = (props: IWorkspaceLayout) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    const { authState } = useAuthLogin()
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout className="mt-12">
                {authState.isAuthenticated && (
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />
                )}

                <Content isCollapsed={isCollapsed} {...props} />
            </Layout>
        </Layout>
    )
}

export default WorkspaceLayout
