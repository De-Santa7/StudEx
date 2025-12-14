"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package, CheckCircle, ChevronLeft, AlertCircle, Calendar, MapPin, User, DollarSign, Clock, Phone, MessageCircle
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Order {
  id: string;
  reference: string;
  buyerId: string;
  buyerName: string;
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
  foodDetails?: any[];
}

function SellerOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
    const foundOrder = allOrders.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [orderId]);

  const handleMarkAsComplete = async () => {
    if (!order) return;

    setCompleting(true);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update order status to completed in escrow (seller marked it done)
    const allOrders = JSON.parse(localStorage.getItem("allOrders") || "[]");
    const updatedOrders = allOrders.map((o: Order) =>
      o.id === orderId ? { ...o, status: "completed" } : o
    );
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));

    // Update transaction status to show seller completed it
    const transactions = JSON.parse(localStorage.getItem("sellerTransactions") || "[]");
    const updatedTransactions = transactions.map((t: any) =>
      t.orderId === orderId ? { ...t, status: "shipped" } : t
    );
    localStorage.setItem("sellerTransactions", JSON.stringify(updatedTransactions));

    setOrder(prev => prev ? { ...prev, status: "completed" } : null);
    setCompleting(false);
    setShowCompleteModal(false);

    setTimeout(() => {
      router.push("/seller/orders");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
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
          <Link href="/seller/orders">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-bold rounded-xl mt-4">
              Back to Orders
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const isService = order.type === "service";
  const isPending = order.status === "pending_confirmation";
  const isCompleted = order.status === "completed";

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link href="/seller/orders">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-purple-100 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </motion.button>
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Order Details
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6 max-w-4xl mx-auto">
        {/* ORDER ID + STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-3xl p-6 border-2 border-purple-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Order ID</p>
              <p className="text-3xl font-black text-gray-800">{order.id}</p>
              <p className="text-sm text-gray-600 mt-2">{new Date(order.date).toLocaleString()}</p>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${
              isPending ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
            }`}>
              {isPending ? (
                <>
                  <Clock className="w-5 h-5" />
                  Pending
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Completed
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* WHAT TO DO */}
        {isPending && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 border-2 border-blue-300 rounded-3xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <p className="font-black text-blue-900 text-lg">Mark Order as Complete</p>
                <p className="text-sm text-blue-800 mt-2">
                  {isService 
                    ? "Once you've completed the service, tap the button below to confirm."
                    : "Once the food is ready for pickup/delivery, confirm it here."}
                </p>
                <p className="text-xs text-blue-700 mt-2">
                  Payment (₦{order.amount.toLocaleString()}) is held in escrow until the buyer confirms receipt.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 border-2 border-green-300 rounded-3xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="font-black text-green-900 text-lg">You've Completed This Order</p>
                <p className="text-sm text-green-800 mt-2">
                  Waiting for buyer to confirm receipt. Once they do, ₦{order.amount.toLocaleString()} will be added to your wallet.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* BUYER INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-7 h-7 text-purple-600" />
            Customer Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.buyerName}</p>
                <p className="text-sm text-gray-600">Customer Name</p>
              </div>
            </div>

            {isService && order.serviceDetails && (
              <>
                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                  <p className="font-bold text-gray-900 mb-3">Service Details:</p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold">Service:</span> {order.serviceDetails.serviceName}</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span><span className="font-semibold">Date:</span> {order.serviceDetails.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span><span className="font-semibold">Time:</span> {order.serviceDetails.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span><span className="font-semibold">Location:</span> {order.serviceDetails.location}</span>
                    </p>
                  </div>
                </div>
              </>
            )}

            {!isService && order.foodDetails && (
              <>
                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                  <p className="font-bold text-gray-900 mb-3">Order Items:</p>
                  <div className="space-y-2">
                    {order.foodDetails.map((item, i) => (
                      <div key={i} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                        {item.title} ×{item.qty} - ₦{(item.price * item.qty).toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* AMOUNT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-3xl p-6 border-2 border-purple-200"
        >
          <p className="text-sm text-gray-700 font-semibold mb-2">Order Amount</p>
          <p className="text-4xl font-black text-purple-600">₦{order.amount.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-3">
            This amount is in escrow. It will be released to your wallet once the buyer confirms receipt.
          </p>
        </motion.div>

        {/* MARK AS COMPLETE BUTTON */}
        {isPending && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCompleteModal(true)}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            Mark as Complete
          </motion.button>
        )}

        {isCompleted && (
          <div className="text-center py-6 bg-green-50 rounded-2xl">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-gray-700 font-semibold">
              Waiting for buyer to confirm receipt...
            </p>
          </div>
        )}
      </div>

      {/* COMPLETE ORDER MODAL */}
      {showCompleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !completing && setShowCompleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-gray-900 mb-4">Mark as Complete?</h3>
            <p className="text-gray-700 mb-6">
              {isService 
                ? "Are you ready to mark this service as complete?"
                : "Is the food ready for pickup/delivery?"}
            </p>

            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-bold">Order Amount:</span>
              </p>
              <p className="text-3xl font-black text-purple-600 mt-2">₦{order.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">
                In escrow until buyer confirms
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !completing && setShowCompleteModal(false)}
                disabled={completing}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold disabled:opacity-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMarkAsComplete}
                disabled={completing}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-xl font-black disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {completing ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Clock className="w-5 h-5" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Yes, Complete
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-40 shadow-2xl"
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
          <Link href="/seller" className="text-purple-600 font-bold transition">
            <span className="text-xs">Seller</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

export default SellerOrderDetailPage;