// src/app/laundry/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Star, Heart, ChevronLeft, Plus, Truck, Clock } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const laundryData: Record<string, any> = {
  "1": { title: "Wash + Fold (10kg)", price: 3000, img: "wash-fold.jpg", vendor: "FreshFold OAU", desc: "Professional wash, dry & perfectly folded. Includes pickup & delivery.", duration: "24-48 hrs", rating: 4.9, reviews: 892 },
  "2": { title: "Wash + Iron (5kg)", price: 4000, img: "wash-iron.jpg", vendor: "PressKing", desc: "Washed, dried, and crisply ironed. Ready to wear.", duration: "24-36 hrs", rating: 4.9, reviews: 761 },
  "3": { title: "Dry Cleaning (Native)", price: 2500, img: "dry-clean.jpg", vendor: "CleanQueen", desc: "Gentle dry clean for your ankara, lace, and traditional outfits.", duration: "48 hrs", rating: 4.8, reviews: 543 },
  "4": { title: "Express 24hr (5kg)", price: 6000, img: "express-laundry.jpg", vendor: "Spin & Glow", desc: "Same-day rush service. Drop off morning, collect evening.", duration: "24 hrs", rating: 5.0, reviews: 1021 },
};

export default function LaundryDetail() {
  const router = useRouter();
  const { id } = useParams();
  const laundryId = Array.isArray(id) ? id[0] : id;
  const service = laundryData[laundryId] || laundryData["1"];
  const numericId = parseInt(laundryId);

  const [localWishlist, setLocalWishlist] = useState<Set<number>>(new Set());

  const addToCart = useCartStore((s) => s.addToCart);
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  useEffect(() => {
    const items = useWishlistStore.getState().items ?? [];
    setLocalWishlist(new Set(items.map(i => i.id)));
  }, []);

  useEffect(() => {
    const unsub = useWishlistStore.subscribe((state) => {
      setLocalWishlist(new Set(state.items?.map(i => i.id) || []));
    });
    return unsub;
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
    addToCart({ 
      id: numericId, 
      title: service.title, 
      price: service.price, 
      img: service.img, 
      category: "Laundry" 
    });
    showToast("Added to Cart!");
  }, [addToCart, numericId, service, showToast]);

  const handleWishlist = useCallback(() => {
    if (isInWishlist) {
      removeFromWishlist(numericId);
      setLocalWishlist(prev => { const n = new Set(prev); n.delete(numericId); return n; });
      showToast("Removed from Wishlist", true);
    } else {
      addToWishlist({ id: numericId, title: service.title, price: service.price, img: service.img });
      setLocalWishlist(prev => new Set(prev).add(numericId));
      showToast("Added to Wishlist", true);
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist, numericId, service, showToast]);

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-gray-100">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="p-3 hover:bg-purple-100 rounded-full transition">
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <h1 className="ml-3 text-xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            Laundry Detail
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-8 pb-32">
        {/* HERO IMAGE */}
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
          <Image src={`/images/${service.img}`} alt={service.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Floating Heart */}
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleWishlist}
            className="absolute top-4 right-4 p-4 bg-white/90 backdrop-blur rounded-full shadow-xl">
            <Heart className={`w-7 h-7 ${isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-700"}`} />
          </motion.button>

          {/* Pickup + Delivery Badge */}
          <div className="absolute bottom-4 left-4 px-5 py-3 bg-white/90 backdrop-blur rounded-full shadow-xl flex items-center gap-2">
            <Truck className="w-6 h-6 text-teal-600" />
            <p className="font-black text-purple-600">Free Pickup & Delivery</p>
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900">{service.title}</h1>
            <p className="text-lg text-gray-600 mt-1">by <span className="font-bold text-purple-600">{service.vendor}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-xl font-black">{service.rating}</span>
            </div>
            <span className="text-gray-500">({service.reviews} reviews)</span>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{service.duration}</span>
            </div>
          </div>

          <p className="text-base text-gray-700 leading-relaxed">{service.desc}</p>

          <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            ₦{service.price.toLocaleString()}
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
            Book Service
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            onClick={handleWishlist}
            className="p-5 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl shadow-xl"
          >
            <Heart className={`w-8 h-8 ${isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-600"}`} />
          </motion.button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <div className="text-gray-500 text-xs">Home</div>
          <div className="text-purple-600 font-black text-sm">Laundry</div>
          <div className="text-gray-500 text-xs">Cart</div>
          <div className="text-gray-500 text-xs">Wishlist</div>
          <div className="text-gray-500 text-xs">Account</div>
        </div>
      </motion.div>
    </>
  );
}