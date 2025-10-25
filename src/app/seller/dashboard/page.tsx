// src/app/seller/dashboard/page.tsx
"use client";

import { Package, DollarSign, TrendingUp, Plus, Store } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seller = localStorage.getItem("isSeller") === "true";
    setIsSeller(seller);
    if (!seller) {
      router.push("/seller/onboarding");
    }
  }, [router]);

  if (!isSeller) return null;

  const stats = [
    { label: "Total Sales", value: "₦45,000", icon: DollarSign, color: "#14B8A6" },
    { label: "Active Listings", value: "12", icon: Package, color: "#7C3AED"Sant },
    { label: "Growth", value: "+23%", icon: TrendingUp, color: "#f59e0b" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/account" className="p-2">
            <Store className="w-6 h-6 rotate-180" style={{ color: "#7C3AED" }} />
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Seller Dashboard</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface rounded-xl p-4 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link
            href="/seller/listings"
            className="flex items-center justify-between p-4 bg-surface rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <span style={{ color: "#7C3AED" }}>Manage Listings</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>

          <Link
            href="/seller/add"
            className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl text-white font-bold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Link>

          <Link
            href="/seller/payouts"
            className="flex items-center justify-between p-4 bg-surface rounded-xl"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5" style={{ color: "#14B8A6" }} />
              <span style={{ color: "#7C3AED" }}>Payouts</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <h2 className="font-bold mb-3" style={{ color: "#7C3AED" }}>Recent Orders</h2>
          <div className="space-y-3">
            {["Nike Air Max", "Denim Jacket"].map((item, i) => (
              <div key={i} className="bg-surface rounded-xl p-4 flex justify-between">
                <div>
                  <p className="font-medium" style={{ color: "#7C3AED" }}>{item}</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <p className="font-bold" style={{ color: "#14B8A6" }}>₦45,000</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/fashion" className="text-primary/60"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Seller</span></div>
        </div>
      </div>
    </>
  );
}