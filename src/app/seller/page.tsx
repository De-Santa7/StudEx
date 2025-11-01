// src/app/seller/page.tsx
"use client";

import { Package, DollarSign, TrendingUp, Plus, FileText, ChevronRight, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState<boolean | null>(null);

  useEffect(() => {
    const sellerStatus = localStorage.getItem("isSeller") === "true";
    setIsSeller(sellerStatus);
    if (!sellerStatus) {
      router.push("/seller/onboarding");
    }
  }, [router]);

  // Mock dynamic stats
  const stats = [
    { label: "Total Sales", value: "₦184,000", icon: DollarSign, color: "#10b981" },
    { label: "Active Listings", value: "12", icon: Package, color: "#7C3AED" },
    { label: "Pending Payout", value: "₦42,000", icon: TrendingUp, color: "#f59e0b" },
  ];

  const menu = [
    { label: "Add Product", href: "/seller/add", icon: Plus },
    { label: "My Listings", href: "/seller/listings", icon: Package },
    { label: "Payouts", href: "/seller/payouts", icon: DollarSign },
    { label: "Onboarding", href: "/seller/onboarding", icon: FileText },
  ];

  if (isSeller === null) return null; // Loading
  if (!isSeller) return null; // Redirecting

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Store className="w-6 h-6" />
            Seller Hub
          </h1>
          <Link href="/seller/add">
            <button className="bg-primary text-white p-2 rounded-full shadow hover:shadow-lg transition-all">
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-surface rounded-2xl p-4 text-center shadow-sm hover:shadow transition-shadow"
            >
              <s.icon className="w-7 h-7 mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-xl font-bold" style={{ color: "#7C3AED" }}>{s.value}</p>
              <p className="text-xs text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          {menu.map((m, i) => (
            <Link
              key={i}
              href={m.href}
              className="flex items-center justify-between p-4 bg-surface rounded-2xl hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <m.icon className="w-5 h-5" style={{ color: "#7C3AED" }} />
                </div>
                <span className="font-medium" style={{ color: "#7C3AED" }}>{m.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>

        {/* Earnings Card */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Available Balance</p>
              <p className="text-2xl font-bold">₦142,000</p>
            </div>
            <button className="bg-white text-teal-600 px-4 py-2 rounded-full text-sm font-bold shadow hover:shadow-md transition-all">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-primary/60"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Seller</span></div>
        </div>
      </div>
    </>
  );
}