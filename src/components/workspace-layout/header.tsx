import { LogoAppIcon } from '@/components/svgs'
import { useAuthLogin } from '@/stores/auth/hooks'
import { Layout } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const AccountInfo = dynamic(() => import('../../components/account-info'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

const ConnectWallet = dynamic(
    () =>
        import(
            '../../views/landing/header-about-section/header/connect-wallet'
        ),
    {
        loading: () => <p>Loading...</p>,
        ssr: false,
    },
)

const Header = () => {
    const { authState } = useAuthLogin()
    return (
        <Layout.Header className="fixed z-10 h-12 w-full bg-primary px-4 py-0 text-white">
            <div className="flex h-full items-center justify-between">
                <Link href="/dashboard">
                    <LogoAppIcon />
                </Link>
                {authState.isAuthenticated ? (
                    <AccountInfo
                        name="Stan Lee"
                        avatar="/images/default-avatar.png"
                    />
                ) : (
                    <ConnectWallet />
                )}
            </div>
        </Layout.Header>
    )
}

export default Header
