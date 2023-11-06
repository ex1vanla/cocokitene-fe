import { useAuthLogin } from '@/stores/auth/hooks'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { ComponentType, useEffect, useState } from 'react'

const WorkspaceLogin = dynamic(() => import('./workspace-login'), {
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
                <WorkspaceLogin />
            ))
        )
    }
}

export default withAuth
