// src/app/food/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Clock, Star, Filter, Search, Plus, Heart, X, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const vendors = [
  { id: 1, name: "Mama Put", rating: 4.8, time: "10-15", img: "vendor-1.jpg", dishes: 32, location: "Near Gate 2" },
  { id: 2, name: "Jollof King", rating: 4.9, time: "12-18", img: "vendor-2.jpg", dishes: 28, location: "Cafeteria Block" },
  { id: 3, name: "Indomie Spot", rating: 4.7, time: "8-12", img: "vendor-3.jpg", dishes: 15, location: "Hostel A" },
  { id: 4, name: "Shawarma Palace", rating: 4.6, time: "15-20", img: "vendor-4.jpg", dishes: 22, location: "Near Library" },
];

const popular = [
  { id: 1, title: "Jollof Rice + Chicken", price: 1200, img: "jollo.jpg", vendor: "Mama Put", rating: 4.9 },
  { id: 2, title: "Beef Shawarma", price: 1000, img: "shawarma.jpg", vendor: "Shawarma Palace", rating: 4.8 },
  { id: 3, title: "Indomie + Egg + Plantain", price: 500, img: "indomie.jpg", vendor: "Indomie Spot", rating: 4.7 },
  { id: 4, title: "Eba + Egusi", price: 800, img: "eba.jpg", vendor: "Mama Put", rating: 4.6 },
];

export default function FoodPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // LOCAL WISHLIST STATE FOR INSTANT UI
  const [localWishlist, setLocalWishlist] = useState<Set<number>>(new Set());

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  // HYDRATE FROM ZUSTAND
  useEffect(() => {
    const items = useWishlistStore.getState().items ?? [];
    setLocalWishlist(new Set(items.map(i => i.id)));
  }, []);

  // SYNC ZUSTAND → LOCAL
  useEffect(() => {
    const unsubscribe = useWishlistStore.subscribe((state) => {
      setLocalWishlist(new Set(state.items?.map(i => i.id) || []));
    });
    return unsubscribe;
  }, []);

  const isInWishlist = useCallback((id: number) => localWishlist.has(id), [localWishlist]);

  const showToast = useCallback((msg: string) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 font-black text-sm text-white transition-all ${msg.includes("Wishlist") ? "bg-red-500" : "bg-emerald-500"}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }, []);

  const handleAddToCart = useCallback((item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    showToast("Added to Cart!");
  }, [addToCart, showToast]);

  const handleWishlist = useCallback((item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
      setLocalWishlist(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
      showToast("Removed from Wishlist!");
    } else {
      addToWishlist(item);
      setLocalWishlist(prev => new Set(prev).add(item.id));
      showToast("Added to Wishlist!");
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist, showToast]);

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  const filteredVendors = useMemo(() => 
    vendors.filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  return (
    <>
      {/* TOP BAR WITH BACK BUTTON */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <div className="flex-1 flex justify-center">
            <Image src="/images/logo-1.jpg" alt="StudEx" width={140} height={40} className="h-10 w-auto" priority />
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <h1 className="text-center text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent pb-3">
          Food & Snacks
        </h1>

        {/* SEARCH + FILTER */}
        <div className="px-4 pb-3 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search food, vendor or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="p-3 bg-orange-100 rounded-full hover:bg-orange-200 transition-all"
          >
            <Filter className="w-5 h-5 text-orange-600" />
          </button>
        </div>
      </motion.div>

      <div className="p-6 space-y-8 pb-32">
        {/* POPULAR DISHES — NOW CLICKABLE TO DISH DETAIL */}
        <motion.div {...fadeInUp}>
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Trending on PAU
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {popular.map((dish) => (
              <Link href={`/food/dish/${dish.id}`} key={dish.id}>
                <motion.div
                  {...cardHover}
                  className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                    <Image src={`/images/${dish.img}`} alt={dish.title} fill className="object-cover hover:scale-105 transition-transform" />
                  </div>

                  {/* + BUTTON */}
                  <motion.button
                    onClick={(e) => handleAddToCart({ id: dish.id, title: dish.title, price: dish.price, img: dish.img }, e)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg z-10"
                  >
                    <Plus className="w-4 h-4 text-orange-600" />
                  </motion.button>

                  {/* HEART BUTTON */}
                  <motion.button
                    onClick={(e) => handleWishlist({ id: dish.id, title: dish.title, price: dish.price, img: dish.img }, e)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-lg z-10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all duration-200 ${
                        isInWishlist(dish.id)
                          ? "fill-red-500 text-red-500 scale-110"
                          : "text-gray-400"
                      }`}
                    />
                  </motion.button>

                  {/* CONTENT */}
                  <p className="font-bold text-gray-800 text-sm line-clamp-1">{dish.title}</p>
                  <p className="text-xs text-gray-600">by {dish.vendor}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{dish.rating}</span>
                  </div>
                  <p className="font-black text-orange-500 text-lg mt-2">₦{dish.price.toLocaleString()}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* TOP VENDORS */}
        <motion.div {...fadeInUp}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-black text-gray-800">Top Vendors</h2>
            <Link href="/food/vendors" className="text-orange-600 text-sm font-bold flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {filteredVendors.map((vendor) => (
              <Link href={`/food/vendor/${vendor.id}`} key={vendor.id}>
                <motion.div
                  {...cardHover}
                  className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-orange-200">
                    <Image src={`/images/${vendor.img}`} alt={vendor.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-800">{vendor.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {vendor.location}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{vendor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>{vendor.time} mins</span>
                      </div>
                      <span>{vendor.dishes} items</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FILTER MODAL */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setFilterOpen(false)}
        >
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            className="bg-white rounded-t-3xl p-6 w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-gray-800">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-700 mb-3">Delivery Time</p>
                <div className="flex gap-2 flex-wrap">
                  {["<10 mins", "10-15 mins", "15-20 mins"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t === selectedTime ? null : t)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTime === t
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-black">
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <div className="text-orange-600 font-black"><span className="text-xs">Shop</span></div>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-gray-500"><span className="text-xs">Account</span></Link>
        </div>
      </motion.div>
    </>
  );
}