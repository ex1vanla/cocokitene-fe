import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

const withAuthAdmin = <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    return function WithAuth(props: P) {
        const { authAdminState } = useAuthAdminLogin()
        const router = useRouter()
        useEffect(() => {
            if (!authAdminState.isAuthenticated ) {
                if (authAdminState.isAuthenticated == false) {
                    notification.error({
                        message: 'Login',
                        description: 'Please login to access system admin!',
                    })
                }
                router.push('/login')
            }
        }, [authAdminState.isAuthenticated])

        return authAdminState.isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : null
    }
}

export default withAuthAdmin
