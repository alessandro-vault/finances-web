"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Layout from "@/components/shared/layouts/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const formSchema = z.object({
    username: z
      .string()
      .min(6)
      .max(32)
      .regex(/^[a-zA-Z0-9]+$/),
    password: z.string().min(6).max(64),
    firstName: z.string().min(6).max(32),
    lastName: z.string().min(6).max(32),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await fetch("/api/auth/clients/register", {
      method: "POST",
      body: JSON.stringify(values),
    }).then(async (res) => {
      if (res.status === 201) {
        await signIn("credentials", {
          username: values.username,
          password: values.password,
          callbackUrl: "/",
        });
        // TODO: Redirect to dashboard
      }
    });
  };
  return (
    <Layout>
      <Card className="w-11/12 md:w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your credentials below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
              <section className="w-full flex gap-x-2 mb-4 ">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            autoComplete="firstName"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            {...field}
                            autoComplete="lastName"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-8 " type="submit">
                Login
              </Button>
            </Form>
          </form>
        </CardContent>
        <CardFooter className="text-xs flex justify-center">
          <span className="text-gray-500 dark:text-gray-200 mr-2">
            Don&apos;t have an account?
          </span>
          <Link href="/register" className="text-blue-300">
            Register
          </Link>
        </CardFooter>
      </Card>
    </Layout>
  );
}
