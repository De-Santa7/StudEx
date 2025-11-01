// src/app/checkout/page.tsx
"use client";

import { useCart } from "@/lib/cartStore";
import Link from "next/link";
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const delivery = 500;
  const total = getTotal() + delivery;

  const handleProceedToPayment = () => {
    if (items.length === 0) return;

    // Simulate payment success
    // In real app: integrate Paystack here
    clearCart(); // Clear cart immediately
    router.push("/checkout/success");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/cart" className="text-purple-600 hover:underline flex items-center gap-1">
          <ArrowLeft size={18} /> Back to Cart
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-purple-600 mb-6">Checkout</h1>

      {/* ===== Delivery Information ===== */}
      <section className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-teal-500" /> Delivery Address
        </h2>
        <p className="text-gray-700">John Doe</p>
        <p className="text-gray-500">University of Nigeria, Nsukka</p>
        <p className="text-gray-500">+234 801 234 5678</p>
        <Link href="/account/address" className="text-sm text-teal-600 mt-2 inline-block hover:underline">
          Change Address
        </Link>
      </section>

      {/* ===== Order Summary ===== */}
      <section className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
          <Truck size={18} className="text-teal-500" /> Order Summary
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-teal-600">₦{item.price.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>₦{delivery}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-teal-600">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== Payment Method ===== */}
      <section className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-teal-500" /> Payment
        </h2>
        <p className="text-gray-600 mb-4">
          Pay securely using your student Paystack wallet or debit card.
        </p>

        <button
          onClick={handleProceedToPayment}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-2xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          Proceed to Payment
        </button>
      </section>

      {/* ===== Footer ===== */}
      <div className="text-center text-gray-500 text-sm mt-10">
        Secure checkout powered by StudEx © 2025
      </div>
    </main>
  );
}