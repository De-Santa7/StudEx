// src/app/admin/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Package,
  DollarSign,
  Store,
  FileText,
  LogOut,
  Bell,
  TrendingUp,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const name = localStorage.getItem("adminName") || "Admin";

    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAdminName(name);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    router.push("/admin/login");
  };

  const stats = [
    { label: "Total Users", value: "1,284", change: "+12%", icon: Users, color: "from-purple-500 to-purple-600" },
    { label: "Active Sellers", value: "87", change: "+8%", icon: Store, color: "from-teal-500 to-teal-600" },
    { label: "Total Orders", value: "342", change: "+23%", icon: Package, color: "from-amber-500 to-amber-600" },
    { label: "Platform Revenue", value: "₦2.4M", change: "+41%", icon: DollarSign, color: "from-emerald-500 to-emerald-600" },
  ];

  const quickActions = [
    { label: "Seller Approvals", href: "/admin/seller-approvals", icon: FileText, badge: 2 },
    { label: "All Sellers", href: "/admin/sellers", icon: Store },
    { label: "All Orders", href: "/admin/orders", icon: Package },
    { label: "Payouts", href: "/admin/payouts", icon: DollarSign },
    { label: "Manage Users", href: "/admin/users", icon: Users },
    { label: "Reports & Analytics", href: "/admin/analytics", icon: TrendingUp },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between p-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Admin Panel</h1>
              <p className="text-white/70 text-sm">
                Welcome back, <span className="font-bold text-purple-300">{adminName}</span>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-4">
            <button className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pb-32">
        <div className="grid grid-cols-2 gap-5 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-white/70 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-3xl p-6 mb-8 flex items-center justify-between backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">2 New Seller Requests</p>
              <p className="text-white/70 text-sm">Requires your approval</p>
            </div>
          </div>
          <Link
            href="/admin/seller-approvals"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl transition shadow-lg"
          >
            Review Now
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h2 className="text-2xl font-black text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <Link
                  href={action.href}
                  className="block bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{action.label}</p>
                        <p className="text-white/60 text-sm">Manage and monitor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {action.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full"
                        >
                          {action.badge} New
                        </motion.span>
                      )}
                      <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-2 transition" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-white/40 text-xs">
            © 2025 StudEx • Pan-Atlantic University Marketplace • Admin Portal v1.0
          </p>
        </div>
      </div>
    </>
  );
}