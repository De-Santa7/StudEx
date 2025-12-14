// src/app/order-confirmation/[orderId]/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle, Clock, Package, MapPin, Calendar, Phone, MessageSquare, Home, Store, ArrowLeft, AlertCircle
} from "lucide-react";
import { useParams } from "next/navigation";

interface Order {
  id: string;
  reference: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  date: string;
  status: string;
  type: "service" | "food";
  serviceDetails?: {
    serviceName: string;
    date: string;
    time: string;
    location: string;
  };
  foodDetails?: any[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem("allOrders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Clock className="w-12 h-12 text-purple-600" />
        </motion.div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center bg-white rounded-3xl p-8 shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find order {orderId}</p>
          <Link href="/home">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-bold rounded-xl">
              Go Back Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const isService = order.type === "service";
  const isFoodOrder = order.type === "food";

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/95 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link href="/home">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-purple-100 rounded-full transition">
              <ArrowLeft className="w-6 h-6 text-purple-600" />
            </motion.div>
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Order Confirmed
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 px-6 pt-8 pb-32 max-w-4xl mx-auto">

        {/* SUCCESS ANIMATION */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-24 h-24">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>
          </div>
        </motion.div>

        {/* CONFIRMATION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-black text-gray-900 mb-2">Payment Received! ✓</h2>
          <p className="text-lg text-gray-600">Your order is now in our secure escrow</p>
          <p className="text-sm text-purple-600 font-bold mt-2">Order ID: {order.id}</p>
        </motion.div>

        {/* ESCROW STATUS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-3xl p-6 mb-6 border-2 border-purple-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">Payment is Safe in Escrow</p>
              <p className="text-sm text-gray-700 mt-1">
                {isService 
                  ? "Your ₦" + order.amount.toLocaleString() + " is held safely. It will be released to the seller only after you confirm receipt of the service."
                  : "Your ₦" + order.amount.toLocaleString() + " is held safely. It will be released to the seller only after the food is delivered."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ORDER DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-6"
        >
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-7 h-7 text-purple-600" />
            {isService ? "Service Details" : "Order Details"}
          </h3>

          {/* SERVICE DETAILS */}
          {isService && order.serviceDetails && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                <span className="font-semibold text-gray-700">Service</span>
                <span className="font-bold text-gray-900">{order.serviceDetails.serviceName}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Date
                </span>
                <span className="font-bold text-gray-900">{order.serviceDetails.date}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Time
                </span>
                <span className="font-bold text-gray-900">{order.serviceDetails.time}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                <span className="font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </span>
                <span className="font-bold text-gray-900">{order.serviceDetails.location}</span>
              </div>
            </div>
          )}

          {/* FOOD DETAILS */}
          {isFoodOrder && order.foodDetails && (
            <div className="space-y-3">
              {order.foodDetails.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">×{item.quantity}</p>
                  </div>
                  <p className="font-bold text-purple-600">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {/* AMOUNT */}
          <div className="border-t-2 border-purple-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-black text-purple-600">₦{order.amount.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* SELLER & BUYER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* SELLER INFO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Store className="w-6 h-6 text-teal-600" />
              {isService ? "Service Provider" : "Restaurant"}
            </h4>
            <p className="text-2xl font-black text-gray-900 mb-4">{order.sellerName}</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Status:</span> Waiting for seller to {isService ? "complete service" : "prepare order"}
              </p>
            </div>
          </motion.div>

          {/* BUYER INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-purple-600" />
              Your Order
            </h4>
            <p className="text-2xl font-black text-gray-900 mb-4">{order.buyerName}</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Ordered at:</span> {new Date(order.date).toLocaleString()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* WHAT HAPPENS NEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-300 mb-6"
        >
          <h4 className="text-lg font-black text-blue-900 mb-4">What Happens Next? 📋</h4>
          <div className="space-y-3 text-sm text-blue-900">
            <div className="flex gap-3">
              <div className="font-black text-lg text-blue-600 flex-shrink-0">1</div>
              <div>
                <p className="font-bold">Seller Prepares</p>
                <p className="text-xs opacity-80">{isService ? "The service provider will prepare for your appointment." : "The restaurant will start preparing your food."}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="font-black text-lg text-blue-600 flex-shrink-0">2</div>
              <div>
                <p className="font-bold">Service/Delivery</p>
                <p className="text-xs opacity-80">{isService ? "Show up at the scheduled time and location." : "Your food will be delivered to you."}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="font-black text-lg text-blue-600 flex-shrink-0">3</div>
              <div>
                <p className="font-bold">You Confirm</p>
                <p className="text-xs opacity-80">Confirm receipt of the {isService ? "service" : "food"}. Once you do, the seller gets paid.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="font-black text-lg text-blue-600 flex-shrink-0">4</div>
              <div>
                <p className="font-bold">Seller Withdraws</p>
                <p className="text-xs opacity-80">The seller can then withdraw their earnings to their bank.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* IMPORTANT INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-300 mb-8"
        >
          <h4 className="text-lg font-black text-amber-900 mb-4">⏰ Important: You have 7 days</h4>
          <p className="text-sm text-amber-900 mb-3">
            You have 7 days from now to confirm receipt. If the {isService ? "service" : "food"} doesn't meet your expectations, you can dispute and request a refund.
          </p>
          <p className="text-xs text-amber-800">
            Admin will review your case and either release funds to the seller or refund you.
          </p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <Link href="/account/orders" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black rounded-2xl shadow-lg"
            >
              View My Orders
            </motion.button>
          </Link>
          <Link href="/home" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-purple-600 font-black rounded-2xl shadow-lg border-2 border-purple-600"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
}