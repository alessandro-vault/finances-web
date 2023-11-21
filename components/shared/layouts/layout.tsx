"use client";

import { ThemeProvider, useTheme } from "next-themes";
import Link from "next/link";
import "@/assets/stylesheets/globals.css";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import ModeToggle from "@/components/shared/mode-toggle";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <header
        className={`w-screen h-14 border-b dark:border-white/30 border-black/10 flex items-center justify-center pr-4 pl-10 ${
          pathname == "/" ? "site-header" : ""
        }`}
        suppressHydrationWarning
      >
        <Link href="/" legacyBehavior passHref>
          <div className="flex cursor-pointer select-none">
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
        <div className="m-auto"></div>
        <NavigationMenu>
          <Link href="/login" legacyBehavior passHref>
            <Button variant="outline">Login</Button>
          </Link>
          <div className="w-2" />
          <Link href="/register" legacyBehavior passHref>
            <Button variant="link">Register</Button>
          </Link>
          <div className="w-1" />
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink>{theme}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="h-[calc(100vh-3.5rem)] grid place-items-center">
        {children}
      </main>
    </ThemeProvider>
  );
}
