"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle } from "lucide-react";
import Image from "next/image";

type Order = {
  id: string;
  date: string;
  status: "ordered" | "shipped" | "delivered";
  total: string;
  product: {
    name: string;
    image: string;
  };
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    setOrders([
      {
        id: "ORD-001",
        date: "2025-10-20",
        status: "delivered",
        total: "₦45,000",
        product: {
          name: "Wireless Bluetooth Headphones",
          image: "/placeholder1.png",
        },
      },
      {
        id: "ORD-002",
        date: "2025-10-25",
        status: "shipped",
        total: "₦75,000",
        product: {
          name: "HP Pavilion Laptop",
          image: "/placeholder2.png",
        },
      },
      {
        id: "ORD-003",
        date: "2025-10-28",
        status: "ordered",
        total: "₦18,000",
        product: {
          name: "Gaming Mouse RGB Edition",
          image: "/placeholder3.png",
        },
      },
    ]);
  }, []);

  const getStatusBadge = (status: "ordered" | "shipped" | "delivered") => {
    const colorMap = {
      ordered: "bg-yellow-100 text-yellow-700",
      shipped: "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
    };

    const iconMap = {
      ordered: Package,
      shipped: Truck,
      delivered: CheckCircle,
    };

    const Icon = iconMap[status];

    return (
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${colorMap[status]}`}
      >
        <Icon className="w-4 h-4" />{" "}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40 p-4">
        <h1 className="text-lg font-bold text-purple-600">My Orders</h1>
      </div>

      {/* Orders List */}
      <motion.div
        className="p-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4 hover:shadow-md transition cursor-pointer"
              onClick={() => router.push(`/account/orders/${order.id}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Product Image */}
              <Image
                src={order.product.image}
                alt={order.product.name}
                width={70}
                height={70}
                className="rounded-lg object-cover border"
              />

              {/* Order Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {order.product.name}
                </p>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
                <p className="text-sm text-purple-600 font-semibold mt-1">
                  {order.total}
                </p>
              </div>

              {/* Status */}
              <div>{getStatusBadge(order.status)}</div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
