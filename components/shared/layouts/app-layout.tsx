"use client";

import "../../../assets/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ScriptProps } from "next/script";
import React from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import ModeToggle from "../mode-toggle";
import Link from "next/link";

export default function AppLayout({ children }: ScriptProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <header className="w-screen h-14 border-b dark:border-white/30 border-black/10 flex items-center justify-center pr-4 pl-10">
        <Link href="/" legacyBehavior passHref>
          <div className="flex cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6 mr-3"
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
            </svg>
            <span className="font-semibold font-mono">Finances</span>
          </div>
        </Link>
        <div className="m-auto" />
        <MainNav className="mx-6" />
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <main className="h-[calc(100vh-3.5rem)] grid place-items-center">
        {children}
      </main>
    </ThemeProvider>
  );
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
            className,
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
  );
});
ListItem.displayName = "ListItem";
