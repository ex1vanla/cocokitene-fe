import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

const withAuthAdmin = <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    return function WithAuth(props: P) {
        const { authAdminState, setUserAdminLogged } = useAuthAdminLogin()
        const router = useRouter()
        useEffect(() => {
            if (!authAdminState.isAuthenticated) {
                setUserAdminLogged(false)
                router.push('/login')
            }
        }, [authAdminState.isAuthenticated])

        useEffect(() => {
            if (!authAdminState.userLogged) {
                notification.error({
                    message: 'Login',
                    description: 'Please login to access system admin!',
                })
            }
        }, [authAdminState.userLogged])

        return authAdminState.isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : null
    }
}

export default withAuthAdmin
