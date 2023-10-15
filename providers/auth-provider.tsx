import {createContext, useContext, useEffect} from "react";
import {useCookies} from "react-cookie";
import useAuthStore from "@/stores/auth-store";
import {usePathname, useRouter} from "next/navigation";


const AuthContext = createContext(false)
export const useAuth = () => {
    return useContext(AuthContext)
}
export default function AuthProvider({children, ...props}: any) {
    const router = useRouter()
    const path = usePathname()
    const [cookies, setCookie, removeCookie] = useCookies(['_finances_session'])
    const authStore = useAuthStore()


    useEffect(() => {
        if (!publicRoutes.includes(path))
            //router.push("/login")

        if (authStore.authenticated) {

        } else {
            //router.push("/login")
        }
    }, []);
    return <AuthContext.Provider value={authStore.authenticated}>{children}</AuthContext.Provider>
}

const publicRoutes = [
    "/",
    "/login",
    "/register",
]