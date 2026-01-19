"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/documents", label: "Documents" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Contact" },
  { href: "/dues", label: "Dues & Fees" },
  { href: "/news", label: "News" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/woodbury-hoa-6.png"
            alt="Woodbury Estates HOA Phase 6"
            width={180}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-primary text-sm font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
