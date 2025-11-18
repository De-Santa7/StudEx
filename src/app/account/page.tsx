// src/app/account/page.tsx
"use client";

import { User, Package, Heart, Settings, HelpCircle, LogOut, ChevronRight, Store, Clock, ArrowRight } from "lucide-react";
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

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <>
      {/* TOP BAR — BIG LOGO */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-1.jpg"
              alt="StudEx Logo"
              width={160}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            My Account
          </h1>
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6">
        {/* PROFILE CARD — GLASS + GRADIENT */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-purple-500/10 via-teal-500/10 to-white backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/30"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {user?.email[0].toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <p className="text-lg font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                {user?.name || "Campus Hustler"}
              </p>
              <p className="text-sm font-medium text-teal-600">{user?.email || "user@lasu.edu.ng"}</p>
            </div>
          </div>
        </motion.div>

        {/* SELLER STATUS — PENDING */}
        {sellerStatus === "pending" && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-3 shadow-md"
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Clock className="w-6 h-6 text-amber-600" />
            </motion.div>
            <div className="flex-1">
              <p className="font-bold text-amber-800">Application Under Review</p>
              <p className="text-xs text-amber-700">We'll notify you in 24–48 hours.</p>
            </div>
          </motion.div>
        )}

        {/* SELLER STATUS — APPROVED */}
        {sellerStatus === "approved" && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-5 flex items-center gap-3 shadow-md"
          >
            <Store className="w-6 h-6 text-teal-600" />
            <div className="flex-1">
              <p className="font-bold text-teal-800">Verified Seller</p>
              <p className="text-xs text-teal-700">Start listing products now!</p>
            </div>
            <Link href="/seller" className="ml-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                Dashboard
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* MENU ITEMS — PREMIUM */}
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
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-sm border border-white/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* BECOME A SELLER — HERO CARD */}
        {sellerStatus === "none" && (
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Store className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xl font-black">Become a Seller</p>
                    <p className="text-sm opacity-90">Earn on campus. List now.</p>
                  </div>
                </div>
                <Link href="/seller/onboarding">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-600 px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2"
                  >
                    Start Now <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* LOGOUT BUTTON — DANGER ZONE */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full mt-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>

      {/* BOTTOM NAV — STUDEx STYLE */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-gray-500"><span className="text-xs">Categories</span></Link>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <div className="text-teal-600 font-black"><span className="text-xs">Account</span></div>
        </div>
      </motion.div>
    </>
  );
}