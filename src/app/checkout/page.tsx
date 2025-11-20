// src/app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Package, CreditCard, MapPin, ArrowLeft, ChevronDown, Check } from "lucide-react";
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
    "Moremi Hall", "Angola Hall", "Mozambique Hall", "Fajuyi Hall",
    "Awolowo Hall", "ETF Hall", "Muritala Hall", "Postgraduate Hall"
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
      const PaystackFunction = await import("react-paystack").then(mod => mod.usePaystackPayment);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your cart is empty</h2>
          
          {/* STUDEx PURPLE → TEAL GRADIENT BUTTON */}
          <Link href="/deals">
            <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-xl rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
              Continue Shopping
            </button>
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
        <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                <p className="font-bold text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
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

        {/* DELIVERY HOSTEL */}
        <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-teal-600" />
            Delivery Hostel
          </h2>
          <button
            onClick={() => setShowHostelDropdown(!showHostelDropdown)}
            className="w-full p-5 bg-gray-50 rounded-xl text-gray-900 font-medium text-left flex items-center justify-between border border-gray-200 hover:border-purple-400 transition"
          >
            {selectedHostel}
            <ChevronDown className={`w-6 h-6 transition-transform ${showHostelDropdown ? "rotate-180" : ""}`} />
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
                  className="w-full text-left p-4 text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50 transition flex items-center justify-between"
                >
                  {hostel}
                  {selectedHostel === hostel && <Check className="w-5 h-5 text-purple-600" />}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* PAYMENT METHOD */}
        <motion.div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Payment Method
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <input type="radio" name="payment" value="pod" checked={selectedPayment === "pod"} onChange={(e) => setSelectedPayment(e.target.value)} className="w-6 h-6 text-purple-600" />
                <Package className="w-7 h-7 text-purple-600" />
                <span className="font-medium text-gray-900">Pay on Delivery (Cash)</span>
              </div>
            </label>

            {/* CARD PAYMENT — STUDEx GRADIENT */}
            <label className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-600 to-teal-600 rounded-xl cursor-pointer text-white shadow-lg">
              <div className="flex items-center gap-4">
                <input type="radio" name="payment" value="card" checked={selectedPayment === "card"} onChange={(e) => setSelectedPayment(e.target.value)} className="w-6 h-6 text-white" />
                <CreditCard className="w-7 h-7 text-white" />
                <span className="font-bold">Pay with Card (Recommended)</span>
              </div>
              {selectedPayment === "card" && <span className="text-sm font-black">SECURED BY PAYSTACK</span>}
            </label>
          </div>
        </motion.div>

        {/* FINAL PAY BUTTON — FULL STUDEx GRADIENT */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          disabled={selectedPayment === "card" && !isPaystackReady}
          className={`
            w-full py-6 rounded-2xl font-black text-2xl shadow-2xl transition-all
            bg-gradient-to-r from-purple-600 to-teal-600 text-white
            ${!isPaystackReady && selectedPayment === "card" ? "opacity-80" : "hover:shadow-purple-500/50"}
          `}
        >
          {selectedPayment === "card"
            ? isPaystackReady
              ? `Pay ₦${total.toLocaleString()} Now`
              : "Loading Secure Payment..."
            : `Place Order — ₦${total.toLocaleString()}`}
        </motion.button>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-600 text-xs">Home</Link>
          <Link href="/deals" className="text-gray-600 text-xs">Deals</Link>
          <Link href="/cart" className="text-purple-600 font-bold text-sm">Cart ({cart.length})</Link>
          <Link href="/wishlist" className="text-gray-600 text-xs">Wishlist</Link>
          <Link href="/account" className="text-gray-600 text-xs">Account</Link>
        </div>
      </div>
    </>
  );
}