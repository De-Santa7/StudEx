// src/app/cart/page.tsx
"use client";

import { Plus, Minus, Trash2, Package, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
          <Link href="/deals" className="text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-black">Cart ({cart.length})</h1>
          <button onClick={clearCart} className="text-red-500 text-sm font-medium">
            Clear
          </button>
        </div>
      </div>

      <div className="p-4 pb-32 space-y-4">
        {/* CART ITEMS */}
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-surface rounded-xl p-4 flex gap-3 shadow-sm"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={`/images/${item.img}`}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium text-black line-clamp-2">{item.title}</p>
              <p className="text-sm text-black/60">₦{item.price.toLocaleString()} each</p>
              <p className="text-lg font-bold text-red-500 mt-1">
                ₦{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="p-1 bg-white rounded-full shadow-sm hover:shadow transition-shadow"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 bg-white rounded-full shadow-sm hover:shadow transition-shadow"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        ))}

        {/* TOTAL & CHECKOUT */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 shadow-lg"
        >
          <div className="flex justify-between text-xl font-bold text-black mb-4">
            <span>Total</span>
            <span className="text-red-500">₦{total.toLocaleString()}</span>
          </div>

          {/* CHECKOUT BUTTON → /checkout */}
          <Link href="/checkout">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
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
          <Link href="/cart" className="text-primary font-bold">
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