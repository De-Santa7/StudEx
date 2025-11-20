// src/app/food/dish/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Star, Clock, Plus, Heart, ChevronLeft, Sparkles } from "lucide-react";
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

  const [localWishlist, setLocalWishlist] = useState<Set<number>>(new Set());

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  useEffect(() => {
    const items = useWishlistStore.getState().items ?? [];
    setLocalWishlist(new Set(items.map(i => i.id)));
  }, []);

  useEffect(() => {
    const unsubscribe = useWishlistStore.subscribe((state) => {
      setLocalWishlist(new Set(state.items?.map(i => i.id) || []));
    });
    return unsubscribe;
  }, []);

  const isInWishlist = useMemo(() => localWishlist.has(numericId), [localWishlist, numericId]);

  const showToast = useCallback((msg: string, isWishlist = false) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-20 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full shadow-2xl z-50 font-black text-white text-lg backdrop-blur-md ${isWishlist ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gradient-to-r from-purple-600 to-teal-600"}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart({ id: numericId, title: dish.title, price: dish.price, img: dish.img });
    showToast("Added to Cart!");
  }, [addToCart, numericId, dish, showToast]);

  const handleWishlist = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist(numericId);
      setLocalWishlist(prev => { const n = new Set(prev); n.delete(numericId); return n; });
      showToast("Removed from Wishlist", true);
    } else {
      addToWishlist({ id: numericId, title: dish.title, price: dish.price, img: dish.img });
      setLocalWishlist(prev => new Set(prev).add(numericId));
      showToast("Added to Wishlist", true);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist, numericId, dish, showToast]);

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-gray-100"
      >
        <div className="flex items-center p-4">
          <button
            onClick={() => router.back()}
            className="p-3 hover:bg-purple-100 rounded-full transition-all"
          >
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <h1 className="ml-3 text-xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            Food Detail
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-8 pb-32">

        {/* HERO IMAGE */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-80 rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image src={`/images/${dish.img}`} alt={dish.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* FLOATING WISHLIST BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-4 bg-white/90 backdrop-blur rounded-full shadow-xl"
          >
            <Heart className={`w-7 h-7 transition-all ${isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-700"}`} />
          </motion.button>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-black text-gray-900">{dish.title}</h1>
            <p className="text-lg text-gray-600 mt-1">by <span className="font-bold text-purple-600">{dish.vendor}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-xl font-black">{dish.rating}</span>
              <span className="text-gray-500">({dish.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-base text-gray-700 leading-relaxed">{dish.desc}</p>

          {/* PRICE */}
          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            ₦{dish.price.toLocaleString()}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 pt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-xl rounded-2xl shadow-2xl flex items-center justify-center gap-3"
          >
            <Plus className="w-7 h-7" />
            Add to Cart
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="p-5 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-xl"
          >
            <Heart className={`w-8 h-8 transition-all ${isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-600"}`} />
          </motion.button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <div className="text-gray-500 text-xs">Home</div>
          <div className="text-purple-600 font-black text-sm">Food</div>
          <div className="text-gray-500 text-xs">Cart</div>
          <div className="text-gray-500 text-xs">Wishlist</div>
          <div className="text-gray-500 text-xs">Account</div>
        </div>
      </motion.div>
    </>
  );
}