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

  const hideNav = pathname === "/" ||  // ← ADD THIS LINE
                  pathname?.startsWith("/admin") ||
                  pathname === "/login" ||
                  pathname === "/signup";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className={hideNav ? "min-h-screen" : "min-h-screen pb-[5.5rem]"}>
          {children}
        </main>

        {!hideNav && (
          <div className="fixed inset-x-0 bottom-0 z-50">
            <BottomNav />
          </div>
        )}

        <Toaster 
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}