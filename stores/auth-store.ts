import {create} from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
    authenticated: boolean
    token: string
    login: (token: string) => void
    logout: () => void
}

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                authenticated: false,
                token: '',
                login: (token: string) => set({authenticated: true, token}),
                logout: () => set({authenticated: false, token: ''})
            }),
            {
                name: 'auth-storage'
            }
        )
    )
)
export default useAuthStore