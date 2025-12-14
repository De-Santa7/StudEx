// src/app/account/orders/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, CheckCircle, Clock, ChevronLeft, MapPin, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface OrderItem {
  title: string;
  qty: number;
  price: number;
  img?: string;
}

interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  date: string;
  status: "pending_confirmation" | "completed" | "disputed" | "refunded";
  type: "service" | "food";
  serviceDetails?: {
    serviceName: string;
    date: string;
    time: string;
    location: string;
  };
  foodDetails?: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
    setOrders(allOrders);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_confirmation": return "bg-amber-100 text-amber-600";
      case "completed": return "bg-emerald-100 text-emerald-600";
      case "disputed": return "bg-red-100 text-red-600";
      case "refunded": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_confirmation": return <Clock className="w-5 h-5" />;
      case "completed": return <CheckCircle className="w-5 h-5" />;
      case "disputed": return <AlertCircle className="w-5 h-5" />;
      case "refunded": return <AlertCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_confirmation": return "Waiting for Confirmation";
      case "completed": return "Completed";
      case "disputed": return "Disputed";
      case "refunded": return "Refunded";
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Clock className="w-12 h-12 text-purple-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-purple-100 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </motion.button>
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            My Orders
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-4 max-w-4xl mx-auto">
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <p className="text-gray-400 text-sm mt-2">Book a service or order food to get started</p>
            <Link href="/home">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-full font-black">
                Start Exploring
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <Link href={`/account/orders/${order.id}`}>
                <div className="cursor-pointer">
                  {/* HEADER */}
                  <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-black text-gray-800">{order.id}</p>
                        <p className="text-xs text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{getStatusLabel(order.status)}</span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER INFO */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="font-bold text-gray-800">
                        {order.type === "service" 
                          ? order.serviceDetails?.serviceName 
                          : "Food Order"}
                      </p>
                      <p className="text-sm text-gray-600">{order.sellerName}</p>
                    </div>

                    {order.type === "service" && order.serviceDetails && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{order.serviceDetails.date} at {order.serviceDetails.time}</span>
                      </div>
                    )}

                    {order.type === "food" && order.foodDetails && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {order.foodDetails.slice(0, 3).map((item, i) => (
                          <div key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                            {item.title} ×{item.qty}
                          </div>
                        ))}
                        {order.foodDetails.length > 3 && (
                          <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                            +{order.foodDetails.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* AMOUNT */}
                  <div className="bg-gray-50 px-4 py-3 border-t">
                    <p className="font-black text-xl text-purple-600">₦{order.amount.toLocaleString()}</p>
                  </div>
                </div>
              </Link>

              {/* ESCROW INFO - Show for pending confirmation */}
              {order.status === "pending_confirmation" && (
                <div className="px-4 py-2 bg-amber-50 border-t border-amber-200">
                  <p className="text-xs text-amber-800">
                    <span className="font-bold">⏳ In Escrow:</span> Payment is held safely. Confirm receipt after you receive the {order.type === "service" ? "service" : "food"}.
                  </p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3 max-w-4xl mx-auto w-full">
          <Link href="/" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/categories" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Services</span>
          </Link>
          <Link href="/cart" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Cart</span>
          </Link>
          <Link href="/wishlist" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Wishlist</span>
          </Link>
          <Link href="/account" className="text-purple-600 font-bold transition">
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}