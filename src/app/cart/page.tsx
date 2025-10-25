// src/app/cart/page.tsx
"use client";

import { ShoppingCart, Trash2, Plus, Minus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function CartPage() {
  const { items, updateQty, removeItem, getTotal } = useCart();
  const delivery = 500;
  const total = getTotal() + delivery;

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>
            My Cart ({items.length})
          </h1>
          <ShoppingCart className="w-6 h-6" style={{ color: "#7C3AED" }} />
        </div>
      </div>

      <div className="p-4 pb-32">
        {items.length === 0 ? (
          <div className="text-center mt-10">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: "#7C3AED" }} />
            <p style={{ color: "#7C3AED" }}>Your cart is empty</p>
            <Link href="/fashion" className="text-sm underline mt-2" style={{ color: "#14B8A6" }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <Link
                href={`/fashion/${item.id}`}
                key={item.id}
                className="block bg-surface rounded-xl p-4 mb-3 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-gradient-to-br from-purple-100 to-teal-100 w-20 h-20 rounded-xl flex items-center justify-center text-3xl">
                    {item.img}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: "#7C3AED" }}>{item.name}</p>
                    <p className="text-sm" style={{ color: "#14B8A6" }}>₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        updateQty(item.id, item.qty - 1);
                      }}
                      className="p-1 bg-white rounded-full shadow"
                    >
                      <Minus className="w-4 h-4" style={{ color: "#7C3AED" }} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        updateQty(item.id, item.qty + 1);
                      }}
                      className="p-1 bg-white rounded-full shadow"
                    >
                      <Plus className="w-4 h-4" style={{ color: "#7C3AED" }} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item.id);
                    }}
                    className="p-2"
                  >
                    <Trash2 className="w-5 h-5" style={{ color: "#ef4444" }} />
                  </button>
                </div>
              </Link>
            ))}

            {/* Summary */}
            <div className="bg-surface rounded-xl p-4 mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span style={{ color: "#7C3AED" }}>₦{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span style={{ color: "#7C3AED" }}>₦{delivery}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span style={{ color: "#14B8A6" }}>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 py-4 rounded-2xl font-bold text-white shadow-lg"
              style={{ backgroundColor: "#14B8A6" }}
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-primary/60"><span className="text-xs">Categories</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Cart</span></div>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}