// src/app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Package, CreditCard, MapPin, ArrowLeft, ChevronDown, Check } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// DYNAMIC IMPORT — MUST BE HERE
const PaystackHook = dynamic(
  () => import("react-paystack").then((mod) => mod.usePaystackPayment),
  { ssr: false }
);

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();

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

  // Stable reference to Paystack
  const initializePaymentRef = useRef<any>(null);

  // Load Paystack dynamically
  useEffect(() => {
    const loadPaystack = async () => {
      if (typeof window === "undefined") return;

      const PaystackFunction = await import("react-paystack").then((mod) => mod.usePaystackPayment);
      initializePaymentRef.current = PaystackFunction(config);
      setIsPaystackReady(true);
    };

    loadPaystack();
  }, [totalInKobo]); // Re-run if total changes

  const handleCardPayment = useCallback(() => {
    if (!isPaystackReady || !initializePaymentRef.current) {
      alert("Paystack is still loading...");
      return;
    }

    initializePaymentRef.current({
      onSuccess: (reference: any) => {
        alert(`Payment successful! Ref: ${reference.reference}`);
        clearCart();
        router.push("/success");
      },
      onClose: () => {
        alert("Payment cancelled.");
      },
    });
  }, [isPaystackReady, clearCart, router]);

  const handlePlaceOrder = () => {
    if (selectedPayment === "card") {
      handleCardPayment();
    } else {
      alert(`Order placed! Delivering to: ${selectedHostel}`);
      clearCart();
      router.push("/success");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-black/70 text-lg">Your cart is empty</p>
        <Link href="/deals">
          <button className="mt-4 text-primary font-medium underline">Browse Deals</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* TOP BAR */}
      <div className="sticky top-0 bg-white z-40 border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link href="/cart" className="text-black">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-black">Checkout</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6">
        {/* ORDER SUMMARY */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface rounded-xl p-4 space-y-3">
          <h2 className="font-bold text-black flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Order Summary
          </h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-black/80">{item.title} × {item.quantity}</span>
              <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-red-500">₦{total.toLocaleString()}</span>
          </div>
        </motion.div>

        {/* DELIVERY ADDRESS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface rounded-xl p-4">
          <h2 className="font-bold text-black flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            Delivery Address
          </h2>
          <button
            onClick={() => setShowHostelDropdown(!showHostelDropdown)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-300 hover:border-primary transition-all"
          >
            <span className="font-medium">{selectedHostel}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showHostelDropdown ? "rotate-180" : ""}`} />
          </button>
          {showHostelDropdown && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {hostels.map((hostel) => (
                <button
                  key={hostel}
                  onClick={() => {
                    setSelectedHostel(hostel);
                    setShowHostelDropdown(false);
                  }}
                  className="w-full text-left p-3 hover:bg-primary/5 flex items-center justify-between transition-colors"
                >
                  <span>{hostel}</span>
                  {selectedHostel === hostel && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* PAYMENT METHOD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface rounded-xl p-4">
          <h2 className="font-bold text-black flex items-center gap-2 mb-3">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Method
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border cursor-pointer transition-all hover:border-primary">
              <input
                type="radio"
                name="payment"
                value="pod"
                checked={selectedPayment === "pod"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <Package className="w-5 h-5 text-primary" />
              <span className="flex-1">Pay on Delivery (Cash)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border cursor-pointer transition-all hover:border-primary">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === "card"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="flex-1">Pay with Debit Card</span>
            </label>
          </div>
        </motion.div>

        {/* PAY / PLACE ORDER BUTTON */}
        <motion.button
          whileHover={{ scale: isPaystackReady && selectedPayment === "card" ? 1.02 : 1 }}
          whileTap={{ scale: isPaystackReady && selectedPayment === "card" ? 0.98 : 1 }}
          onClick={handlePlaceOrder}
          disabled={selectedPayment === "card" && !isPaystackReady}
          className={`
            w-full py-4 rounded-full font-bold text-lg shadow-lg transition-all
            ${isPaystackReady && selectedPayment === "card"
              ? "bg-primary text-white hover:shadow-xl"
              : selectedPayment === "pod"
              ? "bg-primary text-white hover:shadow-xl"
              : "bg-purple-300 text-white cursor-not-allowed"
            }
          `}
        >
          {selectedPayment === "card"
            ? isPaystackReady
              ? `Pay ₦${total.toLocaleString()}`
              : "Loading Paystack..."
            : `Place Order — ₦${total.toLocaleString()}`}
        </motion.button>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-black/60">
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
      </div>
    </>
  );
}