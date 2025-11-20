// src/app/food/vendor/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Package, Clock, Star, Search, Plus, Heart, MapPin, ChevronLeft, Sparkles } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

const vendorData: Record<string, any> = {
  "1": { name: "Mama Put", rating: 4.8, time: "10-15", location: "Near Gate 2", img: "vendor-1.jpg", dishes: 32 },
  "2": { name: "Jollof King", rating: 4.9, time: "12-18", location: "Cafeteria Block", img: "vendor-2.jpg", dishes: 28 },
  "3": { name: "Indomie Spot", rating: 4.7, time: "8-12", location: "Hostel A", img: "vendor-3.jpg", dishes: 15 },
  "4": { name: "Shawarma Palace", rating: 4.6, time: "15-20", location: "Near Library", img: "vendor-4.jpg", dishes: 22 },
};

const menu = [
  { id: 1, title: "Jollof Rice + Chicken", price: 1200, img: "jollof.jpg", category: "Rice", rating: 4.9 },
  { id: 2, title: "Eba + Egusi", price: 800, img: "eba.jpg", category: "Swallow", rating: 4.7 },
  { id: 3, title: "Indomie + Egg + Plantain", price: 500, img: "indomie.jpg", category: "Noodles", rating: 4.8 },
  { id: 4, title: "Beef Shawarma", price: 1000, img: "shawarma.jpg", category: "Fast Food", rating: 4.6 },
  { id: 5, title: "Pounded Yam + Oha", price: 1500, img: "pounded.jpg", category: "Swallow", rating: 4.9 },
  { id: 6, title: "Fried Rice + Salad", price: 1100, img: "friedrice.jpg", category: "Rice", rating: 4.7 },
];

export default function VendorMenu() {
  const router = useRouter();
  const { id } = useParams();
  const vendorId = Array.isArray(id) ? id[0] : id;
  const vendor = vendorData[vendorId] || vendorData["1"];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
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

  const isInWishlist = (id: number) => localWishlist.has(id);

  const showToast = useCallback((msg: string, isWishlist = false) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-20 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full shadow-2xl z-50 font-black text-white text-lg backdrop-blur-md ${isWishlist ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gradient-to-r from-purple-600 to-teal-600"}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }, []);

  const filtered = useMemo(() =>
    menu.filter(d =>
      (category === "All" || d.category === category) &&
      d.title.toLowerCase().includes(search.toLowerCase())
    ),
    [category, search]
  );

  const categories = ["All", "Rice", "Swallow", "Noodles", "Fast Food"];

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
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

  const goToDish = (dishId: number) => {
    router.push(`/food/dish/${dishId}`);
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b">
        <div className="flex items-center p-4 gap-3">
          <button onClick={() => router.back()} className="p-3 hover:bg-purple-100 rounded-full transition">
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              {vendor.name}
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {vendor.location}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text" placeholder="Search menu..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            />
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-8 pb-32">

        {/* VENDOR CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-5 border border-purple-100"
        >
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-purple-100">
            <Image src={`/images/${vendor.img}`} alt={vendor.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900">{vendor.name}</h2>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-gray-800">{vendor.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="font-medium">{vendor.time} mins</span>
              </div>
              <span className="text-gray-600">{vendor.dishes} items</span>
            </div>
          </div>
        </motion.div>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                category === cat
                  ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="space-y-4">
          {filtered.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToDish(dish.id)}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 flex gap-5 cursor-pointer relative overflow-hidden group"
            >
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={`/images/${dish.img}`} alt={dish.title} fill className="object-cover group-hover:scale-110 transition" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900">{dish.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{dish.category}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold">{dish.rating}</span>
                </div>
                <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mt-3">
                  ₦{dish.price.toLocaleString()}
                </p>
              </div>

              {/* + BUTTON */}
              <motion.button
                onClick={(e) => handleAddToCart({ id: dish.id, title: dish.title, price: dish.price, img: dish.img }, e)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
              >
                <Plus className="w-6 h-6 text-purple-600" />
              </motion.button>

              {/* HEART BUTTON */}
              <motion.button
                onClick={(e) => handleWishlist({ id: dish.id, title: dish.title, price: dish.price, img: dish.img }, e)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
              >
                <Heart className={`w-6 h-6 transition-all ${isInWishlist(dish.id) ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-600"}`} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 text-xs">Home</Link>
          <div className="text-purple-600 font-black text-sm">Food</div>
          <Link href="/cart" className="text-gray-500 text-xs">Cart</Link>
          <Link href="/wishlist" className="text-gray-500 text-xs">Wishlist</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </motion.div>
    </>
  );
}