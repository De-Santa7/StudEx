// src/app/account/page.tsx
"use client";

import { User, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, Store, Clock, ArrowRight, Wallet, Plus, Eye, EyeOff, History, Send } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sellerStatus, setSellerStatus] = useState<"none" | "pending" | "approved">("none");
  const [walletBalance, setWalletBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const pending = localStorage.getItem("isSellerPending") === "true";
    const approved = localStorage.getItem("isSeller") === "true";
    if (approved) setSellerStatus("approved");
    else if (pending) setSellerStatus("pending");

    // Load wallet balance from localStorage
    const balance = localStorage.getItem("walletBalance");
    setWalletBalance(balance ? parseFloat(balance) : 0);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link href="/home" className="flex items-center">
            <Image
              src="/images/logo-1.jpg"
              alt="StudEx Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            My Account
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 pb-24 space-y-5 max-w-3xl mx-auto">
        {/* PROFILE CARD */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-purple-500/10 via-teal-500/10 to-white backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/30"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <p className="text-lg font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                {user?.name || "Campus Hustler"}
              </p>
              <p className="text-sm font-medium text-teal-600">{user?.email || "user@pau.edu.ng"}</p>
            </div>
          </div>
        </motion.div>

        {/* WALLET CARD - PRIMARY LOCATION */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                <span className="font-bold text-sm opacity-90">Wallet Balance</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </motion.button>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-black">
                {showBalance ? `₦${walletBalance.toLocaleString()}` : "₦••••••"}
              </p>
              <p className="text-sm opacity-80 mt-1">Available balance</p>
            </div>

            <div className="flex gap-3">
              <Link href="/wallet/fund" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Fund Wallet
                </motion.button>
              </Link>
              <Link href="/wallet/withdraw">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-white/30 transition"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/wallet/history">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-white/30 transition"
                >
                  <History className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* SELLER STATUS - PENDING */}
        {sellerStatus === "pending" && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Clock className="w-5 h-5 text-amber-600" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold text-amber-800 text-sm">Application Under Review</p>
              <p className="text-xs text-amber-700">We'll notify you in 24–48 hours.</p>
            </div>
          </motion.div>
        )}

        {/* SELLER STATUS - APPROVED */}
        {sellerStatus === "approved" && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <Store className="w-5 h-5 text-teal-600" />
            <div className="flex-1">
              <p className="font-bold text-teal-800 text-sm">Verified Seller</p>
              <p className="text-xs text-teal-700">Start listing products now!</p>
            </div>
            <Link href="/seller">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
              >
                Dashboard
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* MENU ITEMS */}
        <motion.div {...fadeInUp} className="space-y-3">
          {[
            { href: "/account/orders", icon: Package, label: "My Orders", color: "from-purple-500 to-purple-600" },
            { href: "/wishlist", icon: Heart, label: "Wishlist", color: "from-pink-500 to-rose-500" },
            { href: "/account/address", icon: Settings, label: "Address Book", color: "from-indigo-500 to-blue-600" },
            { href: "/help", icon: HelpCircle, label: "Help & Support", color: "from-teal-500 to-cyan-600" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={item.href}>
                <motion.div
                  {...cardHover}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* BECOME A SELLER */}
        {sellerStatus === "none" && (
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black">Become a Seller</p>
                    <p className="text-xs opacity-90">Earn on campus. List now.</p>
                  </div>
                </div>
                <Link href="/seller/onboarding">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                  >
                    Start <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* LOGOUT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full mt-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </>
  );
}