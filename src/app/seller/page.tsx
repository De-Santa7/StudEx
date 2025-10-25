// src/app/seller/page.tsx
"use client";

import { Package, DollarSign, TrendingUp, Plus, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const sellerStatus = localStorage.getItem("isSeller") === "true";
    setIsSeller(sellerStatus);
    if (!sellerStatus) {
      router.push("/seller/onboarding");
    }
  }, [router]);  // ← CORRECT

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

  if (!isSeller) return null;

  return (
    <>
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4">
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Seller Dashboard</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-surface rounded-xl p-3 text-center">
              <s.icon className="w-6 h-6 mx-auto mb-1" style={{ color: s.color }} />
              <p className="text-lg font-bold" style={{ color: "#7C3AED" }}>{s.value}</p>
              <p className="text-xs text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {menu.map((m, i) => (
            <Link
              key={i}
              href={m.href}
              className="flex items-center justify-between p-4 bg-surface rounded-xl hover:shadow"
            >
              <div className="flex items-center gap-3">
                <m.icon className="w-5 h-5" style={{ color: "#7C3AED" }} />
                <span style={{ color: "#7C3AED" }}>{m.label}</span>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}