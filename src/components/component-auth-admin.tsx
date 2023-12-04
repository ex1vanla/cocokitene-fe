import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import Login from '@/views/login'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect, useState } from 'react'


const withAuthAdmin = <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    return function WithAuth(props: P) {
        const { authAdminState } = useAuthAdminLogin()
        const [mounted, setMounted] = useState(false)
        const router= useRouter();
        useEffect(() => {
            setMounted(true)
            if(!authAdminState.isAuthenticated){
                router.push("/login")
            }
        }, [authAdminState])

        return (
            mounted &&
            (authAdminState.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                null
            ))
        )
    }
}

export default withAuthAdmin
