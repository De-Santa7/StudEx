// src/app/seller/page.tsx
"use client";

import { Package, DollarSign, TrendingUp, Plus, FileText, ChevronRight, Store, ArrowUpRight, ArrowDownRight, Eye, EyeOff, Wallet, Clock, CheckCircle, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Order {
  id: string;
  buyerName: string;
  sellerName: string;
  amount: number;
  date: string;
  status: string;
  type: "service" | "food";
  serviceDetails?: any;
  foodDetails?: any[];
}

export default function SellerDashboard() {
  const router = useRouter();
  const [isSeller, setIsSeller] = useState<boolean | null>(null);
  
  // Unified wallet state
  const [walletBalance, setWalletBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [inEscrow, setInEscrow] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  // Orders state
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    const sellerStatus = localStorage.getItem("isSeller") === "true";
    setIsSeller(sellerStatus);
    if (!sellerStatus) {
      router.push("/seller/onboarding");
    }

    // Load wallet data
    const balance = localStorage.getItem("walletBalance");
    const escrow = localStorage.getItem("walletInEscrow");
    const earned = localStorage.getItem("totalEarned");
    const withdrawn = localStorage.getItem("totalWithdrawn");

    setWalletBalance(balance ? parseFloat(balance) : 0);
    setInEscrow(escrow ? parseFloat(escrow) : 0);
    setTotalEarned(earned ? parseFloat(earned) : 0);
    setTotalWithdrawn(withdrawn ? parseFloat(withdrawn) : 0);

    // Load pending orders
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
    const pending = allOrders.filter((o: Order) => o.status === "pending_confirmation");
    setPendingOrders(pending);

    // Count completed today
    const today = new Date().toDateString();
    const completedCount = allOrders.filter((o: Order) => {
      const orderDate = new Date(o.date).toDateString();
      return o.status === "completed" && orderDate === today;
    }).length;
    setCompletedToday(completedCount);
  }, [router]);

  if (isSeller === null) return null;
  if (!isSeller) return null;

  const stats = [
    {
      label: "Pending Orders",
      value: pendingOrders.length.toString(),
      change: "Awaiting completion",
      trend: "up" as const,
      icon: Clock,
      color: "from-amber-500 to-orange-600",
    },
    {
      label: "Total Earnings",
      value: `₦${totalEarned.toLocaleString()}`,
      change: `+${Math.round((totalEarned * 0.125)).toLocaleString()}`,
      trend: "up" as const,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "In Escrow",
      value: `₦${inEscrow.toLocaleString()}`,
      change: `${inEscrow > 0 ? "Waiting for buyer" : "None"}`,
      trend: "down" as const,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
    },
  ];

  const menu = [
    { label: "Pending Orders", href: "/seller/orders", icon: Package, color: "from-amber-500 to-orange-600", badge: pendingOrders.length },
    { label: "Add Service", href: "/seller/add", icon: Plus, color: "from-teal-500 to-cyan-600" },
    { label: "My Listings", href: "/seller/listings", icon: FileText, color: "from-indigo-500 to-blue-600" },
    { label: "Payouts", href: "/seller/payouts", icon: DollarSign, color: "from-green-500 to-emerald-600" },
  ];

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  const graphData = [65, 78, 72, 90, 85, 95, 88];
  const maxHeight = Math.max(...graphData);

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-1.jpg"
              alt="StudEx Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent flex items-center gap-2">
            <Store className="w-6 h-6" />
            Seller Hub
          </h1>
          <Link href="/seller/orders">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative bg-gradient-to-r from-purple-600 to-teal-500 text-white p-2.5 rounded-full shadow-lg"
            >
              <Bell className="w-5 h-5" />
              {pendingOrders.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-black text-white"
                >
                  {pendingOrders.length}
                </motion.div>
              )}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6 max-w-4xl mx-auto">
        {/* PENDING ORDERS ALERT */}
        {pendingOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="font-black text-amber-900">
                  {pendingOrders.length} Order{pendingOrders.length !== 1 ? "s" : ""} Waiting
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  Mark these orders as complete to notify buyers
                </p>
                <Link href="/seller/orders">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 px-4 py-2 bg-amber-600 text-white font-bold rounded-lg text-sm hover:bg-amber-700 transition"
                  >
                    View Orders →
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* RECENT PENDING ORDERS PREVIEW */}
        {pendingOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-black text-gray-800">Recent Orders to Complete</h3>
            {pendingOrders.slice(0, 2).map((order, i) => (
              <Link key={order.id} href={`/seller/orders/${order.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  {...cardHover}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{order.buyerName}</p>
                      <p className="text-sm text-gray-600">
                        {order.type === "service" ? order.serviceDetails?.serviceName : "Food Order"}
                      </p>
                    </div>
                    <p className="font-black text-purple-600">₦{order.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                </motion.div>
              </Link>
            ))}
            {pendingOrders.length > 2 && (
              <Link href="/seller/orders">
                <p className="text-sm font-bold text-purple-600 text-center">
                  +{pendingOrders.length - 2} more pending...
                </p>
              </Link>
            )}
          </motion.div>
        )}

        {/* UNIFIED WALLET CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                <span className="font-bold text-sm opacity-90">Available Balance</span>
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
              <p className="text-sm opacity-80 mt-1">Same wallet as your account</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-75">In Escrow</p>
                <p className="text-lg font-bold">₦{inEscrow.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-75">Total Earned</p>
                <p className="text-lg font-bold">₦{totalEarned.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-75">Withdrawn</p>
                <p className="text-lg font-bold">₦{totalWithdrawn.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/account" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  View Full Wallet
                </motion.button>
              </Link>
              <Link href="/wallet/withdraw">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-white/30 transition"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* STATS GRID */}
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
              <div className={`flex items-center justify-center gap-1 mt-2 text-xs font-bold ${s.trend === "up" ? "text-emerald-600" : "text-blue-600"}`}>
                {s.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* QUICK ACTIONS */}
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
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-sm border border-white/30 hover:shadow-xl transition-all relative"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-md`}>
                      <m.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{m.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.badge !== undefined && m.badge > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-black text-white"
                      >
                        {m.badge}
                      </motion.div>
                    )}
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* MINI EARNINGS CHART */}
        {walletBalance > 0 && (
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200"
          >
            <p className="text-sm font-bold text-teal-800 mb-4">Weekly Performance</p>
            <div className="flex items-end gap-1 h-16">
              {graphData.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: (h / maxHeight) * 64 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-teal-400 to-cyan-300 rounded-t-lg shadow-md hover:shadow-lg transition-all"
                />
              ))}
            </div>
            <p className="text-xs text-teal-700 mt-3">Earnings trend over the last 7 days</p>
          </motion.div>
        )}

        {/* PRO TIP */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            💡
          </div>
          <p className="text-sm font-medium text-gray-700">
            Complete orders quickly to get more ⭐ ratings!
          </p>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/categories" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Shop</span>
          </Link>
          <Link href="/cart" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Cart</span>
          </Link>
          <Link href="/wishlist" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Wishlist</span>
          </Link>
          <Link href="/account" className="text-teal-600 font-black transition">
            <span className="text-xs">Seller</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}