// src/app/success/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 bg-white z-40 border-b shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <div />
          <h1 className="text-xl font-bold text-black">Order Confirmed</h1>
          <div />
        </div>
      </motion.div>

      <div className="p-6 pb-32 max-w-md mx-auto">
        {/* SUCCESS ICON */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <CheckCircle className="w-28 h-28 text-green-500" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">Check</span>
            </motion.div>
          </div>
        </motion.div>

        {/* TITLE */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-black text-center mb-3"
        >
          Order Placed!
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-black/70 text-center mb-8 leading-relaxed"
        >
          Your food is being prepared with love and will be delivered to your hostel in <strong>15–25 mins</strong>.
        </motion.p>

        {/* TRACKING CARD */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-2xl p-5 mb-10 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-black/60">Tracking ID</p>
                <p className="font-bold text-black">#STX-2025-11</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-black/60">Est. Delivery</p>
              <p className="font-bold text-primary">25 mins</p>
            </div>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-primary py-3 rounded-full font-bold border-2 border-primary/20 hover:border-primary transition-all"
            >
              Order Again
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg"
      >
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary font-bold">
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/categories" className="text-black/60">
            <span className="text-xs">Categories</span>
          </Link>
          <Link href="/cart" className="text-black/60">
            <span className="text-xs">Cart</span>
          </Link>
          <Link href="/wishlist" className="text-black/60">
            <span className="text-xs">Wishlist</span>
          </Link>
          <Link href="/account" className="text-black/60">
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}