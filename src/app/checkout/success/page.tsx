// src/app/checkout/success/page.tsx
"use client";

import { CheckCircle, Package, Truck, MapPin, Home } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cartStore";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const { items, getTotal, clearCart } = useCart();
  const delivery = 500;
  const total = getTotal() + delivery;

  useEffect(() => {
    // Clear cart on success
    clearCart();
  }, [clearCart]);

  return (
    <>
      <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center text-center space-y-8">
        {/* Success Icon */}
        <div className="bg-teal-100 rounded-full p-4 animate-pulse">
          <CheckCircle className="w-16 h-16 text-teal-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mt-2">
            Your items are being prepared. You’ll get a notification when it’s on the way.
          </p>
        </div>

        {/* Order Summary */}
        <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-teal-600">
            <Package className="w-5 h-5" />
            <p className="font-semibold">Order Summary</p>
          </div>

          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">{item.name}</span>
                <span>₦{item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>₦{delivery}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span style={{ color: "#14B8A6" }}>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-teal-600">
            <Truck className="w-5 h-5" />
            <p className="font-semibold">Delivery Address</p>
          </div>
          <p className="text-gray-700">John Doe</p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> University of Nigeria, Nsukka
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          <Link
            href="/account/orders"
            className="w-full py-4 bg-teal-500 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Track Order
          </Link>

          <Link
            href="/"
            className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Secure checkout powered by StudEx © 2025
        </p>
      </div>
    </>
  );
}