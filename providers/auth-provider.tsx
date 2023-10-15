import { headers } from 'next/headers'
import { ReactElement } from 'react'
import  useAuthStore  from '@/stores/auth-store'
import { redirect } from 'next/navigation'


const AuthProvider  = ({ children } : any ) => {
    const headersList = headers()

    const token = headersList.get('x-authorization')
    const path = headersList.get('x-url')

    console.log('token', token)
    console.log('path', path)
    if (token)
        useAuthStore.setState({ token })

    //TODO

    //if (publicRoutes.includes(path!!)) return (<>{children}</>)

    //if (token === null) return redirect('/login')

    return renderChildren(children)
}

const renderChildren = (children: ReactElement) => (<>{children}</>)

export const publicRoutes = [
    "/",
    "/login",
    "/register",
]

export default AuthProvider
