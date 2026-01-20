"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PaymentButton } from "@/components/dues/PaymentButton";
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

interface MobileNavProps {
  logo: LogoData | null;
}

export function MobileNav({ logo }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            {logo ? (
              <Image
                src={logo.url}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto"
              />
            ) : (
              <Image
                src="/woodbury-hoa-6.png"
                alt="Woodbury Estates HOA Phase 6"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            )}
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-1 flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 text-lg font-medium transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-4">
            <PaymentButton
              amount={ANNUAL_DUES}
              feeTitle="Annual HOA Dues"
              description="Woodbury Estates HOA Phase 6 - Annual Dues Payment"
              className="bg-hoa-blue hover:bg-hoa-blue/90 w-full"
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
