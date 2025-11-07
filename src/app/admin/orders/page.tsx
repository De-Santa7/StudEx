// src/app/admin/orders/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  User,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("studexOrders");
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      setOrders([
        {
          id: "ORD12345",
          product: "Used MacBook Pro 2020",
          buyer: "Chinedu Okeke",
          seller: "Amaka Bello",
          amount: 450000,
          date: "2025-04-12",
          status: "completed",
        },
        {
          id: "ORD67890",
          product: "Calculus Textbook",
          buyer: "Tunde Lawal",
          seller: "Kemi Johnson",
          amount: 8500,
          date: "2025-05-05",
          status: "pending",
        },
        {
          id: "ORD45678",
          product: "HP Pavilion Laptop",
          buyer: "Moses Ibe",
          seller: "Amaka Bello",
          amount: 320000,
          date: "2025-03-29",
          status: "cancelled",
        },
      ]);
    }
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.seller.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>
              All Orders
            </h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ===== Orders List ===== */}
      <div className="p-4 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((order) => (
            <Link
              href={`/admin/orders/${order.id}`}
              key={order.id}
              className="block transition-transform hover:scale-[1.02]"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col md:flex-row justify-between gap-3 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 text-purple-600 w-10 h-10 flex items-center justify-center rounded-full">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.product}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <User className="w-3 h-3" /> Buyer: {order.buyer}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <User className="w-3 h-3" /> Seller: {order.seller}
                    </p>
                    <p className="text-xs text-gray-500">Date: {order.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:gap-4">
                  <p className="flex items-center gap-1 font-semibold text-gray-800">
                    <DollarSign className="w-4 h-4" />
                    ₦{order.amount.toLocaleString()}
                  </p>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No orders found</p>
        )}
      </div>
    </>
  );
}
