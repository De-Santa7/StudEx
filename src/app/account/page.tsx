// src/app/account/page.tsx
"use client";

import { User, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, Store, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sellerStatus, setSellerStatus] = useState<"none" | "pending" | "approved">("none");

  useEffect(() => {
    const pending = localStorage.getItem("isSellerPending") === "true";
    const approved = localStorage.getItem("isSeller") === "true";
    if (approved) setSellerStatus("approved");
    else if (pending) setSellerStatus("pending");
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4">
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>My Account</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Profile */}
        <div className="bg-surface rounded-xl p-4 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.email[0].toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-bold" style={{ color: "#7C3AED" }}>{user?.name || "User"}</p>
            <p className="text-sm" style={{ color: "#14B8A6" }}>{user?.email || "user@lasu.edu.ng"}</p>
          </div>
        </div>

        {/* Seller Status: PENDING */}
        {sellerStatus === "pending" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: "#f59e0b" }} />
            <div>
              <p className="font-medium" style={{ color: "#7C3AED" }}>Seller Application Pending</p>
              <p className="text-xs text-gray-600">We'll review your documents in 24-48 hours.</p>
            </div>
          </div>
        )}

        {/* Seller Status: APPROVED */}
        {sellerStatus === "approved" && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4 flex items-center gap-3">
            <Store className="w-5 h-5" style={{ color: "#14B8A6" }} />
            <div>
              <p className="font-medium" style={{ color: "#7C3AED" }}>Verified Seller</p>
              <p className="text-xs text-gray-600">You can now list products.</p>
            </div>
            <Link
              href="/seller"  // FIXED: Was /seller/dashboard
              className="ml-auto px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-bold"
            >
              Dashboard
            </Link>
          </div>
        )}

        {/* Menu */}
        <div className="space-y-2">
          <Link href="/account/orders" className="flex items-center justify-between p-4 bg-surface rounded-xl">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <span style={{ color: "#7C3AED" }}>My Orders</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>

          <Link href="/wishlist" className="flex items-center justify-between p-4 bg-surface rounded-xl">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <span style={{ color: "#7C3AED" }}>Wishlist</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>

          <Link href="/account/address" className="flex items-center justify-between p-4 bg-surface rounded-xl">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <span style={{ color: "#7C3AED" }}>Address Book</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>

          <Link href="/help" className="flex items-center justify-between p-4 bg-surface rounded-xl">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <span style={{ color: "#7C3AED" }}>Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
          </Link>

          {/* Become a Seller */}
          {sellerStatus === "none" && (
            <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl p-4 text-white mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Store className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Become a Seller</p>
                    <p className="text-xs opacity-90">List products & earn</p>
                  </div>
                </div>
                <Link
                  href="/seller/onboarding"  // CORRECT
                  className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold shadow"
                >
                  Start Now
                </Link>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: "#ef4444", color: "white" }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-primary/60"><span className="text-xs">Categories</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Account</span></div>
        </div>
      </div>
    </>
  );
}