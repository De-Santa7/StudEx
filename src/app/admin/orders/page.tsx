// src/app/admin/orders/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  X,
  Clock,
  Search,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("adminOrders");
    let loadedOrders: any[] = [];

    if (saved) {
      loadedOrders = JSON.parse(saved);
    } else {
      const mockOrders = [
        {
          id: "ORD001",
          buyer: "Chinedu Okeke",
          buyerId: "1",
          seller: "Amaka Bello",
          sellerId: "SELL002",
          items: 3,
          total: 48500,
          status: "delivered",
          date: "Oct 28, 2025",
          tracking: "SHIPPED-8891",
        },
        {
          id: "ORD002",
          buyer: "Victor Osahon",
          buyerId: "3",
          seller: "Chioma Eze",
          sellerId: "SELL004",
          items: 1,
          total: 12500,
          status: "shipped",
          date: "Oct 27, 2025",
          tracking: "SHIPPED-7742",
        },
        {
          id: "ORD003",
          buyer: "Tolu Adebayo",
          buyerId: "5",
          seller: "Amaka Bello",
          sellerId: "SELL002",
          items: 5,
          total: 92000,
          status: "pending",
          date: "Oct 26, 2025",
          tracking: null,
        },
        {
          id: "ORD004",
          buyer: "Sarah Johnson",
          buyerId: "6",
          seller: "Victor Osahon",
          sellerId: "SELL003",
          items: 2,
          total: 34000,
          status: "cancelled",
          date: "Oct 25, 2025",
          tracking: null,
        },
        {
          id: "ORD005",
          buyer: "Ifeanyi Nwosu",
          buyerId: "7",
          seller: "Amaka Bello",
          sellerId: "SELL002",
          items: 4,
          total: 67000,
          status: "shipped",
          date: "Oct 24, 2025",
          tracking: "SHIPPED-5501",
        },
      ];
      localStorage.setItem("adminOrders", JSON.stringify(mockOrders));
      loadedOrders = mockOrders;
    }
    setOrders(loadedOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.buyer.toLowerCase().includes(q) ||
          o.seller.toLowerCase().includes(q) ||
          o.total.toString().includes(q)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    return filtered.sort((a, b) => b.id.localeCompare(a.id));
  }, [orders, searchQuery, statusFilter]);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const getStatusBadge = (status: string) => {
    const base = "px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm";
    switch (status) {
      case "pending": return `${base} bg-amber-500/20 text-amber-300 border border-amber-500/50`;
      case "shipped": return `${base} bg-blue-500/20 text-blue-300 border border-blue-500/50`;
      case "delivered": return `${base} bg-emerald-500/20 text-emerald-300 border border-emerald-500/50`;
      case "cancelled": return `${base} bg-red-500/20 text-red-300 border border-red-500/50`;
      default: return `${base} bg-gray-500/20 text-gray-300`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-5 h-5" />;
      case "shipped": return <Truck className="w-5 h-5" />;
      case "delivered": return <CheckCircle className="w-5 h-5" />;
      case "cancelled": return <X className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-black text-white">Orders</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search order, buyer, seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "pending", "shipped", "delivered", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-5 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition ${
                  statusFilter === f
                    ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white shadow-lg"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} ({stats[f === "all" ? "total" : f]})
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 pt-4 pb-32 space-y-6">

        {/* STATS GRID — FIXED */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: stats.total, color: "from-purple-600 to-pink-600" },
            { label: "Pending", value: stats.pending, color: "from-amber-500 to-orange-600" },
            { label: "Shipped", value: stats.shipped, color: "from-blue-500 to-cyan-600" },
            { label: "Delivered", value: stats.delivered, color: "from-emerald-500 to-teal-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-xl`}
            >
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-3xl font-black mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-20 h-20 mx-auto text-white/10 mb-4" />
              <p className="text-white/60 text-lg">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center text-xl font-black text-white">
                      {order.id.slice(3)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{order.buyer}</h3>
                      <p className="text-purple-300 text-sm">to {order.seller}</p>
                    </div>
                  </div>
                  <div className={getStatusBadge(order.status)}>
                    {getStatusIcon(order.status)}
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Order ID</p>
                    <p className="text-white font-mono font-bold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-white/60 flex items-center gap-1">
                      <Package className="w-4 h-4" /> Items
                    </p>
                    <p className="text-white font-bold">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 flex items-center justify-end gap-1">
                      <Calendar className="w-4 h-4" /> Date
                    </p>
                    <p className="text-white font-medium">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <p className="text-3xl font-black text-emerald-400">
                    ₦{order.total.toLocaleString()}
                  </p>
                  <ArrowRight className="w-6 h-6 text-white/40" />
                </div>

                {order.tracking && (
                  <p className="text-white/60 text-sm mt-3 flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Tracking: {order.tracking}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}