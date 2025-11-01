"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Package, User, DollarSign, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get all orders
    const saved = localStorage.getItem("studexOrders");
    if (saved) {
      const orders = JSON.parse(saved);
      const found = orders.find((o) => o.id === id);
      setOrder(found);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Loading order details...</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
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

  const getStatusIcon = (status) => {
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
    <div className="p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-purple-600 font-semibold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white shadow-sm rounded-xl p-6 border">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-100 text-purple-600 w-12 h-12 flex items-center justify-center rounded-full">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{order.product}</h1>
            <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-500" /> Buyer:{" "}
            <span className="font-semibold">{order.buyer}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-gray-500" /> Seller:{" "}
            <span className="font-semibold">{order.seller}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign className="w-4 h-4 text-gray-500" /> Amount:{" "}
            <span className="font-semibold">₦{order.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" /> Date:{" "}
            <span>{order.date}</span>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)} {order.status.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border">
        <h2 className="font-semibold text-gray-800 mb-2">Order Notes</h2>
        <p className="text-gray-600 text-sm">
          This section could display additional order information, like delivery address, payment
          reference, or dispute logs when integrated with backend data.
        </p>
      </div>
    </div>
  );
}
