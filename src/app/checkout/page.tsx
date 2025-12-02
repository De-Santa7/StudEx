// src/app/checkout/page.tsx  ← UNIVERSAL CHECKOUT: FOOD + SERVICES (PERFECT)
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Package, CreditCard, ArrowLeft, Shield, Lock, Sparkles, Check, Star, Calendar, MapPin, Clock
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useBookingStore } from "@/lib/bookingStore"; // ← NEW
import dynamic from "next/dynamic";

const PaystackHook = dynamic(
  () => import("react-paystack").then((mod) => mod.usePaystackPayment),
  { ssr: false }
);

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const { booking, clearBooking } = useBookingStore();

  const isServiceBooking = !!booking && cart.length === 0;
  const isFoodOrder = cart.length > 0;

  const foodTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceTotal = booking?.total || 0;
  const finalTotal = isServiceBooking ? serviceTotal : foodTotal;
  const finalTotalInKobo = finalTotal * 100;

  const [isPaystackReady, setIsPaystackReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@studex.com",
    amount: finalTotalInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    metadata: isServiceBooking
      ? {
          type: "service_booking",
          provider: booking.providerName,
          date: booking.date,
          time: booking.time,
        }
      : { type: "food_order" },
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
  }, [finalTotalInKobo]);

  const handleCardPayment = useCallback(() => {
    if (!isPaystackReady || !initializePaymentRef.current) {
      alert("Paystack loading...");
      return;
    }

    setIsProcessing(true);

    initializePaymentRef.current({
      onSuccess: () => {
        if (isFoodOrder) clearCart();
        if (isServiceBooking) clearBooking();
        localStorage.removeItem("studex_cart");
        window.location.href = "/success";
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });
  }, [isPaystackReady, isFoodOrder, isServiceBooking, clearCart, clearBooking]);

  // EMPTY STATE — ONLY IF NO CART AND NO BOOKING
  if (!isFoodOrder && !isServiceBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Package className="w-32 h-32 text-purple-300 mx-auto mb-8" />
          </motion.div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Nothing to checkout
          </h2>
          <p className="text-gray-600 mb-8">Go book a service or add food to cart!</p>
          <Link href="/home">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-xl rounded-full shadow-2xl">
              Explore StudEx
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* PREMIUM TOP BAR */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b border-purple-100 shadow-lg">
        <div className="flex items-center justify-between px-6 py-5">
          <Link href={isServiceBooking ? `/lashes/${booking?.providerId}` : "/cart"}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-purple-100 rounded-full transition">
              <ArrowLeft className="w-7 h-7 text-purple-600" />
            </motion.div>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Secure Checkout
            </h1>
            <p className="text-xs text-gray-500 flex items-center gap-1 justify-center">
              <Shield className="w-3 h-3" /> 256-bit Encryption
            </p>
          </div>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50 px-6 pt-8 pb-32">

        {/* ORDER SUMMARY */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white mb-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              {isServiceBooking ? <Calendar className="w-7 h-7 text-purple-600" /> : <Package className="w-7 h-7 text-purple-600" />}
              {isServiceBooking ? "Your Appointment" : "Your Order"}
            </h2>
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-6 h-6 text-teal-500" />
            </motion.div>
          </div>

          <div className="space-y-5">

            {/* SERVICE BOOKING DISPLAY */}
            {isServiceBooking && booking && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-3xl p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-purple-200">
                    <Image src={`/images/${booking.providerImg}`} alt={booking.providerName} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{booking.providerName}</h3>
                    <p className="text-purple-700 font-bold">Lash Appointment</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center gap-3"><Calendar className="w-5 h-5" /> <span className="font-medium">{booking.date}</span></div>
                  <div className="flex items-center gap-3"><Clock className="w-5 h-5" /> <span className="font-medium">{booking.time}</span></div>
                  <div className="flex items-center gap-3 col-span-2"><MapPin className="w-5 h-5" /> <span className="font-medium">{booking.location}</span></div>
                </div>
              </motion.div>
            )}

            {/* FOOD CART DISPLAY */}
            {isFoodOrder && cart.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl">
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">{item.title}</p>
                  <p className="text-sm text-purple-600 font-medium">×{item.quantity}</p>
                </div>
                <p className="font-black text-xl text-purple-600">₦{(item.price * item.quantity).toLocaleString()}</p>
              </motion.div>
            ))}

            {/* TOTAL */}
            <div className="border-t-2 border-purple-200 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Service Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount</span>
                  <span className="text-4xl font-black">₦{finalTotal.toLocaleString()}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* SECURITY BADGES */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white mb-6">
          <div className="flex items-center justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-10 h-10 text-green-600 mb-2" />
              <p className="text-xs font-bold text-gray-700">Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="w-10 h-10 text-blue-600 mb-2" />
              <p className="text-xs font-bold text-gray-700">Encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-10 h-10 text-purple-600 mb-2" />
              <p className="text-xs font-bold text-gray-700">Verified</p>
            </div>
          </div>
        </motion.div>

        {/* PAYMENT METHOD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-600 to-teal-600 rounded-3xl p-8 shadow-2xl text-white mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <CreditCard className="w-7 h-7" /> Payment Method
            </h2>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Star className="w-6 h-6 text-yellow-300 fill-current" />
            </motion.div>
          </div>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-10 h-10 text-purple-600" />
              </div>
              <div>
                <p className="text-xl font-black text-white">Card Payment</p>
                <p className="text-sm text-white/80 font-medium">Secured by Paystack</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="px-4 py-2 bg-white/20 rounded-lg text-xs font-bold">VISA</div>
              <div className="px-4 py-2 bg-white/20 rounded-lg text-xs font-bold">MASTERCARD</div>
              <div className="px-4 py-2 bg-white/20 rounded-lg text-xs font-bold">VERVE</div>
            </div>
          </div>
        </motion.div>

        {/* ESCROW TRUST */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-purple-100 rounded-2xl p-6 mb-8 text-center border-2 border-purple-300">
          <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <p className="font-black text-lg text-gray-900">100% Money-Back Guarantee</p>
          <p className="text-sm text-gray-700 mt-2">
            {isServiceBooking ? "Payment held in escrow until service is PERFECT" : "Your food will arrive hot & fresh"}
          </p>
        </motion.div>

        {/* PAY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleCardPayment}
          disabled={!isPaystackReady || isProcessing}
          className={`w-full py-8 rounded-3xl font-black text-3xl shadow-2xl 
            bg-gradient-to-r from-purple-600 to-teal-600 text-white
            flex items-center justify-center gap-4
            ${!isPaystackReady || isProcessing ? "opacity-70 cursor-not-allowed" : "hover:shadow-purple-500/50"}
          `}
        >
          {isProcessing ? (
            <> <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Lock className="w-8 h-8" />
              </motion.div> Processing...
            </>
          ) : !isPaystackReady ? (
            <> <Shield className="w-8 h-8" /> Loading Secure Payment... </>
          ) : (
            <> <CreditCard className="w-10 h-10" /> Pay ₦{finalTotal.toLocaleString()} Now </>
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-600 mt-6">
          By completing this purchase, you agree to StudEx{" "}
          <Link href="/terms" className="text-purple-600 underline font-bold">Terms & Conditions</Link>
        </p>
      </div>
    </>
  );
}