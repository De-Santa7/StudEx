// src/app/nails/tech/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Star, MapPin, ChevronLeft, Search, Plus, Heart } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const techData: Record<string, any> = {
  "1": { name: "Queen Nails", rating: 4.9, location: "Moremi Hall", img: "nails-vendor-1.jpg", styles: 24 },
  "2": { name: "Nail Bae Pro", rating: 4.8, location: "Angola Hall", img: "nails-vendor-2.jpg", styles: 28 },
  "3": { name: "Glow Studio", rating: 4.7, location: "Fajuyi Hall", img: "nails-vendor-3.jpg", styles: 19 },
  "4": { name: "Chrome Queens", rating: 4.9, location: "Postgraduate Hall", img: "nails-vendor-4.jpg", styles: 22 },
};

const styles = [
  { id: 1, title: "Gel Manicure", price: 6000, img: "gel-manicure.jpg", rating: 4.9 },
  { id: 2, title: "Acrylic Full Set", price: 10000, img: "acrylic-nails.jpg", rating: 4.8 },
  { id: 3, title: "Chrome Nails", price: 8500, img: "chrome-nails.jpg", rating: 4.9 },
  { id: 4, title: "French Tips Classic", price: 5500, img: "french-tips.jpg", rating: 4.7 },
  { id: 5, title: "Ombré Nails", price: 7500, img: "ombre-nails.jpg", rating: 4.9 },
  { id: 6, title: "3D Nail Art", price: 12000, img: "3d-nails.jpg", rating: 5.0 },
];

export default function NailTechMenu() {
  const router = useRouter();
  const { id } = useParams();
  const techId = Array.isArray(id) ? id[0] : id;
  const tech = techData[techId] || techData["1"];

  const [search, setSearch] = useState("");
  const [localWishlist, setLocalWishlist] = useState<Set<number>>(new Set());

  const addToCart = useCartStore((s) => s.addToCart);
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  // Sync wishlist instantly
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

  const isInWishlist = (id: number) => localWishlist.has(id);

  const showToast = useCallback((msg: string, isWishlist = false) => {
    const t = document.createElement("div");
    t.className = `fixed top-20 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full shadow-2xl z-50 font-black text-white text-lg backdrop-blur-md ${isWishlist ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gradient-to-r from-purple-600 to-teal-600"}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }, []);

  const filtered = useMemo(() =>
    styles.filter(s => s.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...item, category: "Nails" });
    showToast("Added to Cart!");
  };

  const handleWishlist = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      setLocalWishlist(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      showToast("Removed from Wishlist", true);
    } else {
      addToWishlist(item);
      setLocalWishlist(prev => new Set(prev).add(item.id));
      showToast("Added to Wishlist", true);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b">
        <div className="flex items-center p-4 gap-3">
          <button onClick={() => router.back()} className="p-3 hover:bg-purple-100 rounded-full">
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              {tech.name}
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {tech.location}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search nail styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            />
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-8 pb-32">

        {/* TECH CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-5 border border-purple-100">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-purple-100">
            <Image src={`/images/${tech.img}`} alt={tech.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900">{tech.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-gray-800">{tech.rating}</span>
              </div>
              <span className="text-gray-600">{tech.styles} styles available</span>
            </div>
          </div>
        </motion.div>

        {/* STYLES LIST */}
        <div className="space-y-4">
          {filtered.map((style) => (
            <motion.div
              key={style.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/nails/${style.id}`)}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 flex gap-5 cursor-pointer relative overflow-hidden group"
            >
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={`/images/${style.img}`} alt={style.title} fill className="object-cover group-hover:scale-110 transition" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900">{style.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold">{style.rating}</span>
                </div>
                <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mt-3">
                  ₦{style.price.toLocaleString()}
                </p>
              </div>

              {/* + BUTTON */}
              <motion.button
                onClick={(e) => handleAddToCart(style, e)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
              >
                <Plus className="w-6 h-6 text-purple-600" />
              </motion.button>

              {/* HEART BUTTON */}
              <motion.button
                onClick={(e) => handleWishlist(style, e)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
              >
                <Heart className={`w-6 h-6 transition-all ${isInWishlist(style.id) ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-600"}`} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <div className="text-gray-500 text-xs">Home</div>
          <div className="text-purple-600 font-black text-sm">Nails</div>
          <div className="text-gray-500 text-xs">Cart</div>
          <div className="text-gray-500 text-xs">Wishlist</div>
          <div className="text-gray-500 text-xs">Account</div>
        </div>
      </motion.div>
    </>
  );
}