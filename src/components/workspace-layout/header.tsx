import AccountInfo from '@/components/account-info'
import { LogoAppIcon } from '@/components/svgs'
import { Layout } from 'antd'
import Link from 'next/link'

const Header = () => (
    <Layout.Header className="fixed z-10 h-12 w-full bg-primary px-4 py-0 text-white">
        <div className="flex h-full items-center justify-between">
            <Link href="/dashboard">
                <LogoAppIcon />
            </Link>

            <AccountInfo name="Stan Lee" avatar="/images/default-avatar.png" />
        </div>
    </Layout.Header>
)

export default Header
