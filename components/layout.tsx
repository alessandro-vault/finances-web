import {ScriptProps} from "next/script";
import { ThemeProvider } from "next-themes";

export default function Layout({children}: ScriptProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="w-screen h-screen grid place-items-center">
                {children}
            </main>
        </ThemeProvider>
    )
}