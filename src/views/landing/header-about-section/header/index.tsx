'use client'
import Image from 'next/image'
// import Logo from '@/public/images/logo.png'
import Link from 'next/link'
import Menu from './menu'
import ConnectWallet from './connect-wallet'
import { useEffect, useState } from 'react'
import Account from './account'

const LandingHeader = () => {
    const [metaClass, setMetaClass] = useState('')
    const [isConnected, setConnected] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY
            if (top > 64) {
                setMetaClass('bg-primary pb-2 opacity-1')
            } else if (top < 64) {
                setMetaClass('opacity-1')
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
            className={`fixed top-0 z-10 w-full transition-colors ${metaClass}`}
        >
            <div className="mx-auto flex max-w-[1280px] justify-between">
                <Link className="flex-shrink-0 cursor-pointer" href={'/'}>
                    <Image
                        src={'/images/logo.png'}
                        height={64}
                        width={178}
                        alt="logo"
                    />
                </Link>
                <div className="flex items-center gap-10">
                    <Menu />
                    {isConnected ? (
                        <Account
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
