// src/app/seller/page.tsx
"use client";

import { Package, DollarSign, TrendingUp, Plus, FileText, ChevronRight, Store, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

  // Mock stats with trend
  const stats = [
    { label: "Total Sales", value: "₦184,000", change: "+12.5%", trend: "up", icon: DollarSign, color: "from-emerald-500 to-teal-600" },
    { label: "Active Listings", value: "12", change: "+3", trend: "up", icon: Package, color: "from-purple-500 to-purple-600" },
    { label: "Pending Payout", value: "₦42,000", change: "-₦8,000", trend: "down", icon: TrendingUp, color: "from-amber-500 to-orange-600" },
  ];

  const menu = [
    { label: "Add Product", href: "/seller/add", icon: Plus, color: "from-teal-500 to-cyan-600" },
    { label: "My Listings", href: "/seller/listings", icon: Package, color: "from-indigo-500 to-blue-600" },
    { label: "Payouts", href: "/seller/payouts", icon: DollarSign, color: "from-green-500 to-emerald-600" },
    { label: "Onboarding", href: "/seller/onboarding", icon: FileText, color: "from-gray-500 to-slate-600" },
  ];

  if (isSeller === null) return null;
  if (!isSeller) return null;

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <>
      {/* TOP BAR — BIG LOGO + TITLE */}
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
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent flex items-center gap-2">
            <Store className="w-6 h-6" />
            Seller Hub
          </h1>
          <Link href="/seller/add">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-purple-600 to-teal-500 text-white p-2.5 rounded-full shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6">
        {/* STATS GRID — GLASS + TREND */}
        <motion.div {...fadeInUp} className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg border border-white/30"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-xs text-gray-600 mt-1">{s.label}</p>
              <div className={`flex items-center justify-center gap-1 mt-2 text-xs font-bold ${s.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                {s.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* QUICK ACTIONS — PREMIUM */}
        <motion.div {...fadeInUp} className="space-y-3">
          {menu.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={m.href}>
                <motion.div
                  {...cardHover}
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-sm border border-white/30 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-md`}>
                      <m.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{m.label}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* EARNINGS CARD — HERO */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-600 rounded-2xl p-6 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-3xl font-black">₦142,000</p>
                <p className="text-xs mt-1 opacity-80">+₦28,000 this week</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-5 py-3 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
              >
                Withdraw <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mini Graph */}
            <div className="flex items-end gap-1 h-12 mt-4">
              {[65, 78, 72, 90, 85, 95, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-white/30 rounded-t-full"
                  style={{ height: `${h}px` }}  // FIXED: Add "px"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* PRO TIP */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            Tip
          </div>
          <p className="text-sm font-medium text-gray-700">
            Add high-quality photos to boost sales by <strong>3x</strong>!
          </p>
        </motion.div>
      </div>

      {/* BOTTOM NAV — SELLER MODE */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-gray-500"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <div className="text-teal-600 font-black"><span className="text-xs">Seller</span></div>
        </div>
      </motion.div>
    </>
  );
}