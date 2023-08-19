import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return <div>this is layout common{children}</div>
}

export default Layout
