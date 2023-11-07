import Link from "next/link";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "items-center space-x-4 lg:space-x-6 hidden sm:flex",
        className,
      )}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium font-mono transition-colors hover:text-primary"
      >
        <Button variant="link">Inicio</Button>
      </Link>
      <Link
        href="/plans"
        className="text-sm font-medium font-mono text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="link">Planes</Button>
      </Link>
      <Link
        href="/calculate"
        className="text-sm font-medium font-mono text-muted-foreground transition-colors hover:text-primary"
      >
        <Button variant="link">Calcular</Button>
      </Link>
    </nav>
  );
}
