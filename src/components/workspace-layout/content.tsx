import { IWorkspaceLayout } from '@/components/workspace-layout'
import { SIDEBAR_CLOSE_WIDTH, SIDEBAR_OPEN_WIDTH } from '@/constants/common'
import { Layout } from 'antd'

interface IContent extends IWorkspaceLayout {
    isCollapsed: boolean
}

const Content = ({ pageName, children, isCollapsed }: IContent) => {
    const sidebarWidth = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH

    return (
        <Layout.Content
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: `margin-left .15s`,
            }}
        >
            <div>
                <h1> this is {pageName}</h1>
                <div>{children}</div>
            </div>
        </Layout.Content>
    )
}

export default Content
