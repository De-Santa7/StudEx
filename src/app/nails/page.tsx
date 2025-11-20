// src/app/nails/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Clock, Star, Filter, Search, Plus, Heart, X, MapPin, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const vendors = [
  { id: 1, name: "Queen Nails by Temi", rating: 4.9, time: "45-60", img: "nails-vendor-1.jpg", dishes: 24, location: "Angola Hall Basement" },
  { id: 2, name: "Glow Studio", rating: 4.8, time: "50-70", img: "nails-vendor-2.jpg", dishes: 28, location: "Moremi Block C" },
  { id: 3, name: "Nail Bae OAU", rating: 4.7, time: "40-55", img: "nails-vendor-3.jpg", dishes: 19, location: "Fajuyi Hall" },
  { id: 4, name: "Chrome Queen", rating: 4.8, time: "60-90", img: "nails-vendor-4.jpg", dishes: 22, location: "Postgraduate Hall" },
];

const popular = [
  { id: 1, title: "Gel Manicure", price: 6000, img: "gel-manicure.jpg", vendor: "Queen Nails", rating: 4.9 },
  { id: 2, title: "Acrylic Full Set", price: 10000, img: "acrylic-nails.jpg", vendor: "Glow Studio", rating: 4.8 },
  { id: 3, title: "Chrome Nails", price: 8500, img: "chrome-nails.jpg", vendor: "Chrome Queen", rating: 4.9 },
  { id: 4, title: "French Tips Classic", price: 5500, img: "french-tips.jpg", vendor: "Nail Bae OAU", rating: 4.7 },
];

export default function NailsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
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

  const isInWishlist = useCallback((id: number) => localWishlist.has(id), [localWishlist]);

  const showToast = useCallback((msg: string, isWishlist = false) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-20 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full shadow-2xl z-50 font-black text-white text-lg backdrop-blur-md ${isWishlist ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gradient-to-r from-purple-600 to-teal-600"}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }, []);

  const handleAddToCart = useCallback((item: any, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(item);
    showToast("Added to Cart!");
  }, [addToCart, showToast]);

  const handleWishlist = useCallback((item: any, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      setLocalWishlist(prev => { const n = new Set(prev); n.delete(item.id); return n; });
      showToast("Removed from Wishlist", true);
    } else {
      addToWishlist(item);
      setLocalWishlist(prev => new Set(prev).add(item.id));
      showToast("Added to Wishlist", true);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist, showToast]);

  const filteredVendors = useMemo(() =>
    vendors.filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    ), [search]
  );

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-purple-100 rounded-full transition">
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <Image src="/images/logo-1.jpg" alt="StudEx" width={140} height={40} className="h-10" priority />
          <div className="w-10" />
        </div>

        <h1 className="text-center text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent pb-3">
          Nails & Beauty
        </h1>

        {/* SEARCH + FILTER */}
        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text" placeholder="Search nail tech or location..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
            />
          </div>
          <button onClick={() => setFilterOpen(true)} className="p-3.5 bg-gradient-to-r from-purple-100 to-teal-100 rounded-full">
            <Filter className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </motion.div>

      <div className="p-6 space-y-10 pb-32">

        {/* TRENDING NAILS */}
        <section>
          <h2 className="text-xl font-black text-gray-800 mb-5 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Trending on Campus
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {popular.map((item) => (
              <Link href={`/nails/${item.id}`} key={item.id}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative group"
                >
                  <div className="relative h-48">
                    <Image src={`/images/${item.img}`} alt={item.title} fill className="object-cover group-hover:scale-110 transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <button
                    onClick={(e) => handleAddToCart({ id: item.id, title: item.title, price: item.price, img: item.img }, e)}
                    className="absolute top-3 right-3 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
                  >
                    <Plus className="w-5 h-5 text-purple-600" />
                  </button>

                  <button
                    onClick={(e) => handleWishlist({ id: item.id, title: item.title, price: item.price, img: item.img }, e)}
                    className="absolute bottom-3 right-3 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
                  >
                    <Heart className={`w-5 h-5 transition-all ${isInWishlist(item.id) ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-600"}`} />
                  </button>

                  <div className="p-4 pt-3">
                    <p className="font-black text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">by {item.vendor}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-sm">{item.rating}</span>
                    </div>
                    <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mt-2">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* TOP NAIL TECHS */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-black text-gray-800">Top Nail Techs</h2>
            <Link href="/nails/techs" className="text-purple-600 font-bold text-sm flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {filteredVendors.map((v) => (
              <Link href={`/nails/tech/${v.id}`} key={v.id}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex items-center gap-5"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-purple-100">
                    <Image src={`/images/${v.img}`} alt={v.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg text-gray-900">{v.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {v.location}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-bold">{v.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <span>{v.time} mins</span>
                      </div>
                      <span className="text-gray-600">{v.dishes} styles</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-purple-400" />
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* FILTER MODAL */}
      {filterOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={() => setFilterOpen(false)}>
          <motion.div initial={{ y: 400 }} animate={{ y: 0 }} className="bg-white rounded-t-3xl p-6 w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">Filters</h3>
              <button onClick={() => setFilterOpen(false)}><X className="w-7 h-7" /></button>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-lg rounded-2xl shadow-xl">
              Apply Filters
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 text-xs">Home</Link>
          <Link href="/categories" className="text-gray-500 text-xs">Categories</Link>
          <Link href="/cart" className="text-purple-600 font-black text-sm">Cart</Link>
          <Link href="/wishlist" className="text-gray-500 text-xs">Wishlist</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </motion.div>
    </>
  );
}