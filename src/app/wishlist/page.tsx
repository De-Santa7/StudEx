// src/app/wishlist/page.tsx
"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlistStore";
import { useCart } from "@/lib/cartStore";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>
            Wishlist ({items.length})
          </h1>
          <Heart
            className="w-6 h-6"
            style={{
              color: "#7C3AED",
              fill: items.length > 0 ? "#7C3AED" : "none",
            }}
          />
        </div>
      </div>

      <div className="p-4 pb-24">
        {items.length === 0 ? (
          <div className="text-center mt-10">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: "#7C3AED" }} />
            <p style={{ color: "#7C3AED" }}>Your wishlist is empty</p>
            <Link href="/fashion" className="text-sm underline mt-2" style={{ color: "#14B8A6" }}>
              Explore Fashion
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <Link
              href={`/fashion/${item.id}`}
              key={item.id}
              className="block bg-surface rounded-xl p-4 mb-3 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-xl flex items-center justify-center text-3xl">
                  {item.img}
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: "#7C3AED" }}>{item.name}</p>
                  <p className="text-sm" style={{ color: "#14B8A6" }}>₦{item.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
                  }}
                  className="p-3 bg-accent text-white rounded-full shadow"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
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
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-primary/60"><span className="text-xs">Categories</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Wishlist</span></div>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}