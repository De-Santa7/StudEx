"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetails() {
  const { id } = useParams();
  const router = useRouter();

  // ✅ Define proper type for the order
  const [order, setOrder] = useState<{
    id: string;
    date: string;
    status: string;
    total: string;
    products: {
      id: string;
      name: string;
      price: string;
      quantity: number;
      image: string;
    }[];
    delivery: {
      address: string;
      expectedDate: string;
    };
  } | null>(null);

  useEffect(() => {
    // Mock order data for now
    setTimeout(() => {
      setOrder({
        id: String(id),
        date: "2025-10-20",
        status: "shipped",
        total: "₦75,000",
        products: [
          {
            id: "PROD001",
            name: "HP Pavilion Laptop",
            price: "₦65,000",
            quantity: 1,
            image: "/placeholder1.png",
          },
        ],
        delivery: {
          address: "LASU Main Campus, Ojo, Lagos",
          expectedDate: "2025-10-28",
        },
      });
    }, 500);
  }, [id]);

  const statusSteps = [
    { key: "ordered", label: "Ordered", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const getStatusColor = (step: string) => {
    if (!order) return "text-gray-400";
    const stepsOrder = ["ordered", "shipped", "delivered"];
    if (step === order.status) return "text-teal-500";
    return stepsOrder.indexOf(step) < stepsOrder.indexOf(order.status)
      ? "text-teal-500"
      : "text-gray-400";
  };

  if (!order)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading order...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white border-b z-40 p-4 flex items-center gap-3">
        <button
          onClick={() => router.push("/account/orders")}
          className="text-purple-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="font-bold text-lg text-gray-800">Order Details</h1>
      </div>

      <motion.div
        className="p-4 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Order Summary */}
        <motion.div
          className="bg-white rounded-xl p-4 shadow-sm border"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-gray-500">
            Order ID:{" "}
            <span className="font-semibold text-gray-700">{order.id}</span>
          </p>
          <p className="text-sm text-gray-500">
            Date:{" "}
            <span className="font-semibold text-gray-700">{order.date}</span>
          </p>
          <p className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-purple-600">{order.total}</span>
          </p>
        </motion.div>

        {/* Product */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-600" /> Product
          </h2>
          {order.products.map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <Image
                src={p.image}
                alt={p.name}
                width={80}
                height={80}
                className="rounded-lg object-cover border"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{p.name}</p>
                <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
                <p className="font-semibold text-purple-600">{p.price}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Delivery */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-teal-600" /> Delivery Info
          </h2>
          <p className="text-sm text-gray-700">Address: {order.delivery.address}</p>
          <p className="text-sm text-gray-700">
            Expected Delivery:{" "}
            <span className="text-teal-600">{order.delivery.expectedDate}</span>
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border p-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-semibold text-gray-800 mb-4">Order Progress</h2>
          <div className="relative flex justify-between items-center">
            {/* Glowing progress line */}
            <motion.div
              className="absolute top-3 left-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width:
                  order.status === "ordered"
                    ? "33%"
                    : order.status === "shipped"
                    ? "66%"
                    : "100%",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            ></motion.div>

            {/* Steps */}
            {statusSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  className="flex flex-col items-center flex-1 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${getStatusColor(
                      step.key
                    )} ${
                      step.key === order.status
                        ? "bg-teal-50 shadow-md"
                        : "bg-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${getStatusColor(step.key)}`} />
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${getStatusColor(
                      step.key
                    )}`}
                  >
                    {step.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/chat/seller"
            className="flex-1 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Contact Seller
          </Link>
          <Link
            href="/support/report"
            className="flex-1 bg-gray-100 text-gray-700 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 border"
          >
            <AlertTriangle className="w-4 h-4 text-red-500" /> Report Issue
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
