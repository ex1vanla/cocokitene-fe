'use client'
// import Logo from '@/public/images/logo.png'
import { LogoAppIcon } from '@/components/svgs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AccountInfo from '../../../../components/account-info'
import ConnectWallet from './connect-wallet'
import Menu from './menu'

const LandingHeader = () => {
    const [metaClass, setMetaClass] = useState('')
    const [isConnected, setConnected] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY
            if (top > 64) {
                setMetaClass('bg-primary pb-2 opacity-100')
            } else if (top < 64) {
                setMetaClass('opacity-100')
            }
        }
        window.addEventListener('scroll', handleScroll)

        handleScroll()
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const onConnect = () => {
        setConnected(true)
    }

    return (
        <div
            id="landing-header"
            className={`fixed top-0 z-10 w-full opacity-0 transition-all ${metaClass}`}
        >
            <div className="mx-auto flex max-w-[1200px] justify-between py-3">
                <Link className="flex-shrink-0 cursor-pointer" href={'/'}>
                    <LogoAppIcon />
                </Link>
                <div className="flex items-center gap-10">
                    <Menu />
                    {isConnected ? (
                        <AccountInfo
                            name="Stan Lee"
                            avatar="/images/default-avatar.png"
                        />
                    ) : (
                        <div onClick={onConnect}>
                            <ConnectWallet />
                        </div>
                    )}{' '}
                    {/*just for test*/}
                </div>
            </div>
        </div>
    )
}

export default LandingHeader
