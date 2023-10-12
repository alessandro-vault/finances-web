import type {ReactElement} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import Layout from "@/components/layout";
import * as z from "zod";
import {Button} from "@/components/ui/button";

const LoginPage = (): ReactElement => {
    const form = useForm()

    const formSchema = z.object({
        username: z.string().min(6).max(32).regex(/^[a-zA-Z0-9]+$/),
        password: z.string().min(8).max(64),
    })
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials below</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Login
                        </Button>
                    </Form>
                </CardContent>
                <CardFooter>
                    <span>Don't have an account? <a href="/register" className="text-blue-500">Register</a></span>
                </CardFooter>
            </Card>
        </Layout>
    )
}

export default LoginPage