"use client"
import '../../../assets/styles/globals.css'
import { ThemeProvider, useTheme } from "next-themes";
import { ScriptProps } from "next/script";
import React from "react";
import { cn } from "@/lib/utils"
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import { MainNav } from './main-nav';
import { UserNav } from './user-nav';
import ModeToggle from '../mode-toggle';

export default function AppLayout({children}: ScriptProps){
    const { theme } = useTheme()

    return (
        <html lang="en">
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <header className="h-14 flex items-center px-10">
                <h1>Finances</h1>
                <MainNav className="mx-6"/>
                <div className='ml-auto flex items-center space-x-4'>
                    <ModeToggle />
                    <UserNav />
                </div>
            </header>
            <main className="h-[calc(100vh-3.5rem)] grid place-items-center">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
