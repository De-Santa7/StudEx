// src/app/layout.tsx
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import BottomNav from "@/components/layout/BottomNav";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar on admin, login, and signup pages
  const hideNav = pathname?.startsWith("/admin") || pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className={hideNav ? "min-h-screen" : "min-h-screen pb-[5.5rem]"}>
          {children}
        </main>

        {/* Fixed Bottom Navigation - Hidden on admin/login/signup */}
        {!hideNav && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <BottomNav />
          </div>
        )}

        <Toaster />
      </body>
    </html>
  );
}