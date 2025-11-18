"use client";

import { Heart, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useCartStore } from "@/lib/cartStore";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  // Remove duplicates by ID for safe rendering
  const uniqueWishlist = [...new Map(wishlist.map((item) => [item.id, item])).values()];

  if (uniqueWishlist.length === 0) {
    return (
      <div className="p-8 text-center">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-black/70 text-lg">Your wishlist is empty</p>
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
          <Link href="/" className="text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-black">Wishlist ({uniqueWishlist.length})</h1>
          <button onClick={clearWishlist} className="text-red-500 text-sm font-medium">
            Clear
          </button>
        </div>
      </div>

      {/* WISHLIST ITEMS */}
      <div className="p-4 pb-32 space-y-4">
        {uniqueWishlist.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`} // fallback unique key
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface rounded-xl overflow-hidden shadow-sm"
          >
            <Link href={`/deals/${item.id}`}>
              <div className="flex gap-3 p-4 cursor-pointer hover:bg-white/50 transition-colors">
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
                  <p className="text-lg font-bold text-red-500">₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>

            <div className="flex justify-between items-center px-4 pb-3">
              <button
                onClick={() => {
                  addToCart({ id: item.id, title: item.title, price: item.price, img: item.img });
                  removeFromWishlist(item.id);
                }}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 shadow hover:shadow-md transition-shadow"
              >
                <Package className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="p-2 text-red-500"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-black/60"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-black/60"><span className="text-xs">Categories</span></Link>
          <Link href="/cart" className="text-black/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary font-bold"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-black/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}
