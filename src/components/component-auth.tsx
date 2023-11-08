import { useAuthLogin } from '@/stores/auth/hooks'
import { ComponentType, useEffect, useState } from 'react'

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
                <div className="mx-auto bg-white">Vui Long dang nhap!</div>
            ))
        )
    }
}

export default withAuth
