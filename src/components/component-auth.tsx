import { useAuthLogin } from '@/stores/auth/hooks'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { ComponentType, useEffect, useState } from 'react'

const Page401 = dynamic(() => import('./errors/401'), {
    loading: () => null,
    ssr: false,
})

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function WithAuth(props: P) {
        const { authState } = useAuthLogin()
        const [mounted, setMounted] = useState(false)
        useEffect(() => {
            setMounted(true)
        }, [])
        return (
            mounted &&
            (authState.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <Page401 />
            ))
        )
    }
}

export default withAuth
