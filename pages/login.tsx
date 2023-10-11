import type { ReactElement } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Layout from "@/components/layout";

const LoginPage = () : ReactElement => {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col space-y-4">
                        <label className="flex flex-col space-y-1">
                            <span>Email</span>
                            <input type="email" className="border border-gray-300 rounded-md px-4 py-2" />
                        </label>
                        <label className="flex flex-col space-y-1">
                            <span>Password</span>
                            <input type="password" className="border border-gray-300 rounded-md px-4 py-2" />
                        </label>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2">Login</button>
                    </form>
                </CardContent>
                <CardFooter>
                    <span>Don't have an account? <a href="/register" className="text-blue-500">Register</a></span>
                </CardFooter>
            </Card>
        </Layout>
    )
}

export default LoginPage