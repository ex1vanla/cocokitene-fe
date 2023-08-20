import ListTitle from '@/components/content-page-title/list-title'
import { IWorkspaceLayout } from '@/components/workspace-layout'
import { SIDEBAR_CLOSE_WIDTH, SIDEBAR_OPEN_WIDTH } from '@/constants/common'
import { Layout } from 'antd'
import { usePathname } from 'next/navigation'

interface IContent extends IWorkspaceLayout {
    isCollapsed: boolean
}

const Content = ({ children, isCollapsed }: IContent) => {
    const sidebarWidth = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH
    const pathname = usePathname()

    return (
        <Layout.Content
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: `margin-left .15s`,
            }}
        >
            <ListTitle pageName={pathname} />
            {/* <CreateTitle pageName={pathname} /> */}
            <div className="content-main p-6">{children}</div>
        </Layout.Content>
    )
}

export default Content
