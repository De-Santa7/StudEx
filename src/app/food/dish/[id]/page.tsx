// src/app/food/dish/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Star, Clock, Plus, Heart, ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const dishData: Record<string, any> = {
  "1": { title: "Jollof Rice + Chicken", price: 1200, img: "jollof.jpg", vendor: "Mama Put", desc: "Spicy Nigerian jollof with grilled chicken and plantain.", rating: 4.9, reviews: 142 },
  "2": { title: "Eba + Egusi", price: 800, img: "eba.jpg", vendor: "Mama Put", desc: "Smooth eba with rich egusi soup and beef.", rating: 4.7, reviews: 89 },
  "3": { title: "Indomie + Egg + Plantain", price: 500, img: "indomie.jpg", vendor: "Indomie Spot", desc: "Classic campus combo. Fast and filling.", rating: 4.8, reviews: 201 },
  "4": { title: "Beef Shawarma", price: 1000, img: "shawarma.jpg", vendor: "Shawarma Palace", desc: "Juicy beef shawarma with garlic sauce.", rating: 4.6, reviews: 110 },
};

export default function FoodDetail() {
  const router = useRouter();
  const { id } = useParams();
  const dishId = Array.isArray(id) ? id[0] : id;
  const dish = dishData[dishId] || dishData["1"];
  const numericId = parseInt(dishId);

  // LOCAL STATE FOR INSTANT UI
  const [localWishlist, setLocalWishlist] = useState<Set<number>>(new Set());

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  // HYDRATE FROM ZUSTAND ONCE
  useEffect(() => {
    const items = useWishlistStore.getState().items ?? [];
    setLocalWishlist(new Set(items.map(i => i.id)));
  }, []);

  // SYNC ZUSTAND → LOCAL (cached selector)
  useEffect(() => {
    const unsubscribe = useWishlistStore.subscribe((state) => {
      setLocalWishlist(new Set(state.items?.map(i => i.id) || []));
    });
    return unsubscribe;
  }, []);

  // MEMOIZED SELECTOR — PREVENTS INFINITE LOOP
  const isInWishlist = useMemo(() => {
    return localWishlist.has(numericId);
  }, [localWishlist, numericId]);

  const showToast = useCallback((msg: string) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 font-black text-sm text-white ${msg.includes("Wishlist") ? "bg-red-500" : "bg-emerald-500"}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart({ id: numericId, title: dish.title, price: dish.price, img: dish.img });
    showToast("Added to Cart!");
  }, [addToCart, numericId, dish, showToast]);

  const handleWishlist = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist(numericId);
      setLocalWishlist(prev => {
        const next = new Set(prev);
        next.delete(numericId);
        return next;
      });
      showToast("Removed from Wishlist!");
    } else {
      addToWishlist({ id: numericId, title: dish.title, price: dish.price, img: dish.img });
      setLocalWishlist(prev => new Set(prev).add(numericId));
      showToast("Added to Wishlist!");
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist, numericId, dish, showToast]);

  return (
    <>
      {/* TOP BAR WITH BACK */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b"
      >
        <div className="flex items-center p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-black text-gray-800 ml-2">Food Detail</h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-6 pb-32">
        {/* IMAGE */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image src={`/images/${dish.img}`} alt={dish.title} fill className="object-cover" />
        </motion.div>

        {/* INFO */}
        <div>
          <h1 className="text-2xl font-black text-gray-800">{dish.title}</h1>
          <p className="text-sm text-gray-600 mt-1">by {dish.vendor}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold">{dish.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({dish.reviews} reviews)</span>
          </div>
          <p className="text-lg font-black text-orange-500 mt-3">₦{dish.price.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-3">{dish.desc}</p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlist}
            className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${
                isInWishlist ? "fill-red-500 text-red-500 scale-110" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50"
      >
        <div className="flex justify-around py-3">
          <div className="text-gray-500"><span className="text-xs">Home</span></div>
          <div className="text-orange-600 font-black"><span className="text-xs">Shop</span></div>
          <div className="text-gray-500"><span className="text-xs">Cart</span></div>
          <div className="text-gray-500"><span className="text-xs">Wishlist</span></div>
        </div>
      </motion.div>
    </>
  );
}