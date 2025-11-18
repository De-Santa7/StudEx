// src/app/account/orders/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Package, Truck, CheckCircle, Clock, MapPin, MessageCircle, RefreshCw, Star, ChevronLeft, Phone, User } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  title: string;
  qty: number;
  price: number;
  img: string;
}

interface OrderDetail {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "preparing" | "on-the-way" | "delivered";
  vendor: string;
  location: string;
  rider?: {
    name: string;
    phone: string;
    eta: string;
  };
  timeline: { label: string; time: string; done: boolean }[];
}

const mockOrderDetail: Record<string, OrderDetail> = {
  "ORD-2025": {
    id: "ORD-2025",
    date: "Nov 18, 2025 • 2:15 PM",
    items: [
      { title: "Jollof Rice + Chicken", qty: 2, price: 1200, img: "jollof.jpg" },
      { title: "Plantain", qty: 1, price: 200, img: "plantain.jpg" },
    ],
    total: 2600,
    status: "on-the-way",
    vendor: "Mama Put",
    location: "Hostel B → Room 204",
    rider: { name: "Chinedu", phone: "+234 801 234 5678", eta: "5 mins" },
    timeline: [
      { label: "Order Placed", time: "2:15 PM", done: true },
      { label: "Preparing", time: "2:20 PM", done: true },
      { label: "Picked Up", time: "2:30 PM", done: true },
      { label: "On the Way", time: "2:35 PM", done: true },
      { label: "Delivered", time: "2:40 PM", done: false },
    ],
  },
  "ORD-2024": {
    id: "ORD-2024",
    date: "Nov 17, 2025 • 7:45 PM",
    items: [
      { title: "Indomie + Egg + Plantain", qty: 3, price: 500, img: "indomie.jpg" },
    ],
    total: 1500,
    status: "delivered",
    vendor: "Indomie Spot",
    location: "Cafeteria Block",
    timeline: [
      { label: "Order Placed", time: "7:45 PM", done: true },
      { label: "Preparing", time: "7:50 PM", done: true },
      { label: "Delivered", time: "8:05 PM", done: true },
    ],
  },
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const orderId = Array.isArray(id) ? id[0] : id;
  const order = mockOrderDetail[orderId] || mockOrderDetail["ORD-2025"];

  const [rating, setRating] = useState(0);

  const statusColors = {
    preparing: "bg-orange-500",
    "on-the-way": "bg-blue-500",
    delivered: "bg-emerald-500",
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b"
      >
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-black text-gray-800">Order Details</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-6 pb-32 space-y-6">
        {/* ORDER ID + STATUS */}
        <motion.div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="text-2xl font-black text-gray-800">{order.id}</p>
              <p className="text-sm text-gray-600 mt-1">{order.date}</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${statusColors[order.status]} animate-pulse`} />
          </div>
        </motion.div>

        {/* STATUS TIMELINE */}
        <motion.div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-black text-gray-800 mb-4">Order Status</h2>
          <div className="space-y-4">
            {order.timeline.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-500" : "bg-gray-200"}`}>
                  {step.done ? <CheckCircle className="w-6 h-6 text-white" /> : <Clock className="w-5 h-5 text-gray-500" />}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>{step.label}</p>
                  <p className="text-xs text-gray-500">{step.time}</p>
                </div>
                {i < order.timeline.length - 1 && (
                  <div className={`w-0.5 h-12 mx-auto ${step.done ? "bg-emerald-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIDER INFO (if on the way) */}
        {order.status === "on-the-way" && order.rider && (
          <motion.div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-800">{order.rider.name} is on the way</p>
                <p className="text-sm text-gray-600">ETA: {order.rider.eta}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={`tel:${order.rider.phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-full font-bold">
                <Phone className="w-5 h-5" /> Call Rider
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-700 rounded-full font-bold">
                <MessageCircle className="w-5 h-5" /> Chat
              </button>
            </div>
          </motion.div>
        )}

        {/* ITEMS */}
        <motion.div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-black text-gray-800 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-2 ring-gray-100">
                  <Image src={`/images/${item.img}`} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-bold text-orange-500">₦{(item.price * item.qty).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between">
            <p className="font-black text-gray-800">Total</p>
            <p className="font-black text-2xl text-orange-500">₦{order.total.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* DELIVERY ADDRESS */}
        <motion.div className="bg-gray-50 rounded-2xl p-6 flex items-center gap-4">
          <MapPin className="w-8 h-8 text-orange-500" />
          <div>
            <p className="font-bold text-gray-800">Delivery Location</p>
            <p className="text-sm text-gray-600">{order.location}</p>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3">
          {order.status === "delivered" && (
            <>
              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-black text-lg flex items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6" /> Reorder Same Items
              </button>
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="font-bold text-gray-800 mb-4">Rate Your Experience</p>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)}>
                      <Star className={`w-10 h-10 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {order.status === "on-the-way" && (
            <button className="w-full py-4 bg-blue-500 text-white rounded-full font-black text-lg">
              Track Live on Map
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <Link href="/food" className="text-gray-500"><span className="text-xs">Food</span></Link>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <div className="text-orange-600 font-black"><span className="text-xs">Account</span></div>
        </div>
      </motion.div>
    </>
  );
}