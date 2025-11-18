// src/app/account/orders/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Truck, CheckCircle, Clock, ChevronLeft, MapPin, RefreshCw, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";

interface Order {
  id: string;
  date: string;
  items: { title: string; qty: number; price: number; img: string }[];
  total: number;
  status: "preparing" | "on-the-way" | "delivered" | "cancelled";
  vendor: string;
  location: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2025",
    date: "Nov 18, 2025",
    items: [
      { title: "Jollof Rice + Chicken", qty: 2, price: 1200, img: "jollof.jpg" },
      { title: "Plantain", qty: 1, price: 200, img: "plantain.jpg" },
    ],
    total: 2600,
    status: "on-the-way",
    vendor: "Mama Put",
    location: "Hostel B → Room 204",
  },
  {
    id: "ORD-2024",
    date: "Nov 17, 2025",
    items: [
      { title: "Indomie + Egg + Plantain", qty: 3, price: 500, img: "indomie.jpg" },
    ],
    total: 1500,
    status: "delivered",
    vendor: "Indomie Spot",
    location: "Cafeteria Block",
  },
  {
    id: "ORD-2023",
    date: "Nov 15, 2025",
    items: [
      { title: "Beef Shawarma", qty: 1, price: 1000, img: "shawarma.jpg" },
      { title: "Zobo Drink", qty: 1, price: 300, img: "zobo.jpg" },
    ],
    total: 1300,
    status: "preparing",
    vendor: "Shawarma Palace",
    location: "Near Library",
  },
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders] = useState<Order[]>(mockOrders);
  const { addToCart } = useCartStore();

  const [showTracker, setShowTracker] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "preparing": return "bg-orange-100 text-orange-600";
      case "on-the-way": return "bg-blue-100 text-blue-600";
      case "delivered": return "bg-emerald-100 text-emerald-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "preparing": return <Clock className="w-5 h-5" />;
      case "on-the-way": return <Truck className="w-5 h-5" />;
      case "delivered": return <CheckCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart({
        id: Date.now() + Math.random(),
        title: item.title,
        price: item.price,
        img: item.img,
        quantity: item.qty,
      });
    });
    router.push("/food");
  };

  const openTracker = (order: Order) => {
    setSelectedOrder(order);
    setShowTracker(true);
  };

  const openVendorContact = (order: Order) => {
    setSelectedOrder(order);
    setShowVendorModal(true);
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
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-black text-gray-800">My Orders</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-6 pb-32 space-y-6">
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <Link href="/food">
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-black">
                Order Now
              </button>
            </Link>
          </motion.div>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* CLICKABLE ORDER CARD */}
              <Link href={`/account/orders/${order.id}`}>
                <div className="cursor-pointer">
                  {/* HEADER */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-black text-gray-800">Order {order.id}</p>
                        <p className="text-xs text-gray-600">{order.date}</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace("-", " ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* ITEMS PREVIEW */}
                  <div className="p-4">
                    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                          <Image src={`/images/${item.img}`} alt={item.title} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LOCATION + PRICE */}
                  <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-40">{order.location}</span>
                    </div>
                    <p className="font-black text-xl text-orange-500">₦{order.total.toLocaleString()}</p>
                  </div>
                </div>
              </Link>

              {/* ACTION BUTTONS */}
              <div className="p-4 pt-0">
                <div className="flex gap-3">
                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-black flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reorder
                    </button>
                  )}
                  {order.status === "on-the-way" && (
                    <button
                      onClick={() => openTracker(order)}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-full font-black"
                    >
                      Track Order
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() => openVendorContact(order)}
                      className="flex-1 py-3 bg-gray-800 text-white rounded-full font-bold"
                    >
                      Contact Vendor
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* LIVE TRACKER MODAL */}
      {showTracker && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
          onClick={() => setShowTracker(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping" />
              <div className="absolute inset-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Truck className="w-16 h-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-800">Chinedu</h3>
            <p className="text-gray-600 mt-2">is bringing your food!</p>
            <p className="text-4xl font-black text-blue-500 mt-4">5 mins</p>
            <div className="flex gap-3 mt-8">
              <a href="tel:+2348012345678" className="flex-1 py-4 bg-blue-500 text-white rounded-full font-bold flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call Rider
              </a>
              <a href="https://wa.me/2348012345678" className="flex-1 py-4 bg-green-500 text-white rounded-full font-bold">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* VENDOR CONTACT MODAL */}
      {showVendorModal && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
          onClick={() => setShowVendorModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-12 h-12 text-orange-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">{selectedOrder.vendor}</h3>
            <p className="text-gray-600 mt-2">Contact for your order</p>
            <div className="space-y-4 mt-8">
              <a href="tel:+2348012345678" className="block py-4 bg-gray-800 text-white rounded-full font-bold">
                Call Vendor
              </a>
              <a href="https://wa.me/2348012345678" className="block py-4 bg-green-500 text-white rounded-full font-bold">
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

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