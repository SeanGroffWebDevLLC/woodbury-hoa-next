import type { Metadata } from "next";

export const revalidate = 86400;

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getNavLogo } from "@/app/lib/get-logos";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Woodbury Estates HOA Phase 6",
    template: "%s | Woodbury Estates HOA Phase 6",
  },
  description: "Welcome to Woodbury Estates HOA Phase 6 - Together We Thrive",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLogo = await getNavLogo();

  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <Header logo={navLogo} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
