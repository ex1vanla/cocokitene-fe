import { useAuthLogin } from '@/stores/auth/hooks'
import { notification } from 'antd'
import { useTranslations } from 'next-intl'
import { ComponentType, useEffect, useState } from 'react'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function WithAuth(props: P) {
        const t = useTranslations()
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
                <div className="mx-auto bg-white">
                    Vui Long dang nhap!
                </div>
            ))
        )
    }
}

export default withAuth
