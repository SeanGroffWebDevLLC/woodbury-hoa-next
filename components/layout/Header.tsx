"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { PaymentMethodSelector } from "@/components/dues/PaymentMethodSelector";
import type { LogoData } from "@/app/lib/get-logos";

// Annual dues amount (in cents)
const ANNUAL_DUES = 40000; // $400.00

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/documents", label: "Documents" },
  { href: "/calendar", label: "Calendar" },
  { href: "/board", label: "Board" },
  { href: "/dues", label: "Dues & Fees" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  logo: LogoData | null;
}

export function Header({ logo }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-12 w-auto"
              priority
            />
          ) : (
            <Image
              src="/woodbury-hoa-6.png"
              alt="Woodbury Estates HOA Phase 6"
              width={180}
              height={48}
              className="h-12 w-auto"
              priority
            />
          )}
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
          <PaymentMethodSelector
            amount={ANNUAL_DUES}
            feeTitle="Annual HOA Dues"
            description="Woodbury Estates HOA Phase 6 - Annual Dues Payment"
            className="bg-hoa-blue hover:bg-hoa-blue/90"
          />
        </nav>

        <MobileNav logo={logo} />
      </div>
    </header>
  );
}
