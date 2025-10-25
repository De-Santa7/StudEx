// src/app/admin/page.tsx
"use client";

import { Shield, Users, Package, DollarSign, ChevronRight, Store, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem("isAdmin") === "true";
      if (adminStatus) {
        setIsAdmin(true);
      } else {
        router.push("/admin/login");
      }
      setIsLoading(false);
    };

    checkAdmin();
  }, [router]);

  // Show loading spinner while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Only render if admin
  if (!isAdmin) return null;

  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "#7C3AED" },
    { label: "Active Sellers", value: "87", icon: Store, color: "#14B8A6" },
    { label: "Total Orders", value: "342", icon: Package, color: "#f59e0b" },
    { label: "Revenue", value: "₦2.4M", icon: DollarSign, color: "#10b981" },
  ];

  const menu = [
    { label: "Seller Approvals", href: "/admin/seller-approvals", icon: FileText },
    { label: "All Sellers", href: "/admin/sellers", icon: Store },
    { label: "All Orders", href: "/admin/orders", icon: Package },
    { label: "Payouts", href: "/admin/payouts", icon: DollarSign },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Shield className="w-6 h-6" style={{ color: "#7C3AED" }} />
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/admin/login");
            }}
            className="text-sm underline"
            style={{ color: "#ef4444" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface rounded-xl p-4">
              <stat.icon className="w-8 h-8 mb-2" style={{ color: stat.color }} />
              <p className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          {menu.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center justify-between p-4 bg-surface rounded-xl hover:shadow transition-shadow"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" style={{ color: "#7C3AED" }} />
                <span style={{ color: "#7C3AED" }}>{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: "#7C3AED" }} />
            </Link>
          ))}
        </div>

        {/* Pending Sellers Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" style={{ color: "#f59e0b" }} />
            <div>
              <p className="font-medium" style={{ color: "#7C3AED" }}>2 New Seller Requests</p>
              <p className="text-xs text-gray-600">Review documents now</p>
            </div>
          </div>
          <Link
            href="/admin/seller-approvals"
            className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-bold"
          >
            Review
          </Link>
        </div>
      </div>
    </>
  );
}