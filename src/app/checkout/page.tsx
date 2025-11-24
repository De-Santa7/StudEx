// src/app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Package,
  CreditCard,
  MapPin,
  ArrowLeft,
  ChevronDown,
  Check,
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import dynamic from "next/dynamic";

const PaystackHook = dynamic(
  () => import("react-paystack").then((mod) => mod.usePaystackPayment),
  { ssr: false }
);

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalInKobo = total * 100;

  const hostels = [
    "Moremi Hall",
    "Angola Hall",
    "Mozambique Hall",
    "Fajuyi Hall",
    "Awolowo Hall",
    "ETF Hall",
    "Muritala Hall",
    "Postgraduate Hall",
  ];

  const [selectedHostel, setSelectedHostel] = useState(hostels[0]);
  const [showHostelDropdown, setShowHostelDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("pod");
  const [isPaystackReady, setIsPaystackReady] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@studex.com",
    amount: totalInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePaymentRef = useRef<any>(null);

  useEffect(() => {
    const loadPaystack = async () => {
      if (typeof window === "undefined") return;
      const PaystackFunction = await import("react-paystack").then(
        (mod) => mod.usePaystackPayment
      );
      initializePaymentRef.current = PaystackFunction(config);
      setIsPaystackReady(true);
    };
    loadPaystack();
  }, [totalInKobo]);

  const handleCardPayment = useCallback(() => {
    if (!isPaystackReady || !initializePaymentRef.current) {
      alert("Paystack loading...");
      return;
    }

    initializePaymentRef.current({
      onSuccess: (reference: any) => {
        alert(`Payment successful! Ref: ${reference.reference}`);
        clearCart();
        localStorage.removeItem("studex_cart");
        window.location.href = "/success";
      },
      onClose: () => {
        alert("Payment cancelled.");
      },
    });
  }, [isPaystackReady, clearCart]);

  const handlePlaceOrder = () => {
    if (selectedPayment === "card") {
      handleCardPayment();
    } else {
      alert(`Order placed! Delivering to ${selectedHostel}`);
      clearCart();
      localStorage.removeItem("studex_cart");
      window.location.href = "/success";
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Your cart is empty
          </h2>

          <Link href="/deals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-xl rounded-full shadow-2xl"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* TOP BAR */}
      <div className="sticky top-0 bg-white z-50 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/cart">
            <ArrowLeft className="w-7 h-7 text-gray-800" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 px-5 pt-6 pb-32 space-y-6">

        {/* ORDER SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <Package className="w-6 h-6 text-purple-600" />
            Order Summary
          </h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">× {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-900">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-gray-900">Total</span>
                <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* HOSTEL SELECT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-teal-600" />
            Delivery Hostel
          </h2>

          <button
            onClick={() => setShowHostelDropdown(!showHostelDropdown)}
            className="w-full p-5 bg-gray-50 rounded-xl text-gray-900 font-medium flex justify-between items-center border border-gray-200"
          >
            {selectedHostel}
            <ChevronDown
              className={`w-6 h-6 transition-transform ${
                showHostelDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showHostelDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
            >
              {hostels.map((hostel) => (
                <button
                  key={hostel}
                  onClick={() => {
                    setSelectedHostel(hostel);
                    setShowHostelDropdown(false);
                  }}
                  className="w-full text-left p-4 text-gray-800 hover:bg-purple-50 flex justify-between"
                >
                  {hostel}
                  {selectedHostel === hostel && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* PAYMENT METHOD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Payment Method
          </h2>

          <div className="space-y-4">

            {/* PAY ON DELIVERY */}
            <label className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl cursor-pointer border border-gray-200 hover:border-purple-400 transition">
              <input
                type="radio"
                name="payment"
                value="pod"
                checked={selectedPayment === "pod"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-6 h-6 text-purple-600"
              />
              <Package className="w-7 h-7 text-purple-600" />
              <span className="font-medium text-gray-900">Pay on Delivery</span>
            </label>

            {/* PAY WITH CARD — NOW WHITE */}
            <motion.label
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-4 p-5 rounded-xl cursor-pointer shadow-md border 
                ${
                  selectedPayment === "card"
                    ? "border-purple-500 bg-white"
                    : "border-gray-200 bg-white"
                }`}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-6 h-6 text-purple-600"
              />
              <CreditCard className="w-7 h-7 text-purple-600" />
              <span className="font-bold text-gray-900">Pay with Card</span>

              {selectedPayment === "card" && (
                <span className="ml-auto text-xs font-bold text-purple-600">
                  SECURED BY PAYSTACK
                </span>
              )}
            </motion.label>
          </div>
        </motion.div>

        {/* FINAL BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          disabled={selectedPayment === "card" && !isPaystackReady}
          className={`w-full py-6 rounded-2xl font-black text-2xl shadow-2xl 
            bg-gradient-to-r from-purple-600 to-teal-600 text-white
            ${
              !isPaystackReady && selectedPayment === "card"
                ? "opacity-80"
                : "hover:shadow-purple-500/50"
            }
          `}
        >
          {selectedPayment === "card"
            ? isPaystackReady
              ? `Pay ₦${total.toLocaleString()} Now`
              : "Loading Secure Payment..."
            : `Place Order — ₦${total.toLocaleString()}`}
        </motion.button>
      </div>
    </>
  );
}
