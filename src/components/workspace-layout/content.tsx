import { IWorkspaceLayout } from '@/components/workspace-layout'
import { Layout } from 'antd'

const Content = ({ pageName, children }: IWorkspaceLayout) => {
    return (
        <Layout.Content className="ml-[208px]">
            <div>
                <h1> this is {pageName}</h1>
                <div>{children}</div>
            </div>
        </Layout.Content>
    )
}

export default Content
