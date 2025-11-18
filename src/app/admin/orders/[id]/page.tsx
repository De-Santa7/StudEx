// src/app/admin/orders/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  DollarSign,
  Receipt,
  Shield,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [refundLoading, setRefundLoading] = useState(false);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
    const found = allOrders.find((o: any) => o.id === id);
    setOrder(found);

    if (found) {
      const mockItems = [
        { name: "MacBook Pro 2023 16GB", qty: 1, price: 850000 },
        { name: "Wireless Mouse", qty: 2, price: 15000 },
        { name: "USB-C Hub", qty: 1, price: 12000 },
        { name: "Laptop Stand", qty: 1, price: 18000 },
      ].slice(0, found.items);

      const calculatedTotal = mockItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      if (calculatedTotal !== found.total && mockItems.length > 0) {
        mockItems[0].price += found.total - calculatedTotal;
      }
      setItems(mockItems);
    }
  }, [id]);

  const handleRefund = () => {
    if (!order || order.status === "cancelled" || order.status === "delivered") return;

    setRefundLoading(true);
    setTimeout(() => {
      const allOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
      const updated = allOrders.map((o: any) =>
        o.id === order.id ? { ...o, status: "cancelled" } : o
      );
      localStorage.setItem("adminOrders", JSON.stringify(updated));
      setOrder({ ...order, status: "cancelled" });
      setRefundLoading(false);
      alert(`Order ${order.id} cancelled & refunded successfully`);
    }, 1800);
  };

  const timeline = [
    { status: "pending", label: "Order Placed", icon: <Receipt className="w-5 h-5" /> },
    { status: "confirmed", label: "Confirmed", icon: <Shield className="w-5 h-5" /> },
    { status: "shipped", label: "Shipped", icon: <Truck className="w-5 h-5" /> },
    { status: "delivered", label: "Delivered", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
          <Package className="w-20 h-20 mx-auto text-white/10" />
          <h2 className="text-3xl font-black text-white">Order Not Found</h2>
          <button
            onClick={() => router.push("/admin/orders")}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black rounded-2xl shadow-2xl"
          >
            Back to Orders
          </button>
        </motion.div>
      </div>
    );
  }

  const currentStep = order.status === "cancelled" ? -1 : timeline.findIndex(s => s.status === order.status);

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
          <h1 className="text-xl font-black text-white">Order • {order.id}</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 pt-4 pb-28 space-y-6">

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-7 text-white shadow-2xl ${
            order.status === "cancelled"
              ? "bg-gradient-to-r from-red-600 to-pink-600"
              : "bg-gradient-to-r from-emerald-500 to-teal-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-black">₦{order.total.toLocaleString()}</p>
              <p className="text-white/80 mt-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> {order.date}
              </p>
            </div>
            <div className="px-6 py-3 rounded-full font-black text-lg flex items-center gap-3 bg-white/20">
              {order.status === "pending" && <Clock className="w-6 h-6" />}
              {order.status === "shipped" && <Truck className="w-6 h-6" />}
              {order.status === "delivered" && <CheckCircle className="w-6 h-6" />}
              {order.status === "cancelled" && <XCircle className="w-6 h-6" />}
              {order.status.toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* TIMELINE */}
        {order.status !== "cancelled" && (
          <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-black text-white mb-6">Delivery Timeline</h3>
            <div className="space-y-8">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                    i <= currentStep ? "bg-emerald-500 text-white" : "bg-white/10 text-white/40"
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${i <= currentStep ? "text-white" : "text-white/40"}`}>
                      {step.label}
                    </p>
                    {i < currentStep && <p className="text-white/60 text-sm">Completed</p>}
                    {i === currentStep && <p className="text-emerald-400 text-sm">In Progress</p>}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`absolute left-6 top-14 w-0.5 h-20 ${i < currentStep ? "bg-emerald-500" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ORDER ITEMS */}
        <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <Package className="w-7 h-7" /> Items ({order.items})
          </h3>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-2xl p-4">
                <div>
                  <p className="text-white font-bold">{item.name}</p>
                  <p className="text-white/60 text-sm">Qty: {item.qty}</p>
                </div>
                <p className="text-xl font-black text-emerald-400">
                  ₦{(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* BUYER & SELLER */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-black text-white mb-4">Buyer</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                {order.buyer.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <p className="text-white font-bold">{order.buyer}</p>
                <p className="text-purple-300 text-sm">ID: {order.buyerId}</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-lg font-black text-white mb-4">Seller</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                {order.seller.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <p className="text-white font-bold">{order.seller}</p>
                <p className="text-purple-300 text-sm">ID: {order.sellerId}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TRACKING */}
        {order.tracking && (
          <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Truck className="w-7 h-7 text-blue-400" />
              <div>
                <p className="text-white font-bold">Tracking Number</p>
                <p className="text-purple-300 font-mono text-lg">{order.tracking}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* REFUND BUTTON — NOW ABOVE BOTTOM NAV */}
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-4"
          >
            <button
              onClick={handleRefund}
              disabled={refundLoading}
              className="w-full py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-xl rounded-3xl shadow-2xl flex items-center justify-center gap-3 hover:shadow-red-500/50 transition disabled:opacity-70"
            >
              {refundLoading ? (
                "Processing Refund..."
              ) : (
                <>
                  <XCircle className="w-7 h-7" />
                  Cancel & Refund Order
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* BOTTOM NAV — NOW VISIBLE */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-xl border-t border-white/10 z-40">
        <div className="flex justify-around py-4">
          <button className="text-white/60">Dashboard</button>
          <button className="text-white/60">Users</button>
          <button className="text-white font-black text-lg">Orders</button>
          <button className="text-white/60">Payouts</button>
        </div>
      </div>
    </>
  );
}