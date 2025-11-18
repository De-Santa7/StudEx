// src/app/food/vendor/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Package, Clock, Star, Search, Plus, Heart, X, MapPin, ChevronLeft } from "lucide-react";
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
  const { id } = useParams();
  const vendorId = Array.isArray(id) ? id[0] : id;
  const vendor = vendorData[vendorId] || vendorData["1"];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // LOCAL WISHLIST FOR INSTANT UI
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

  const isInWishlist = (id: number) => localWishlist.has(id);

  const showToast = useCallback((msg: string) => {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 font-black text-sm text-white transition-all ${msg.includes("Wishlist") ? "bg-red-500" : "bg-emerald-500"}`;
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

  const handleAddToCart = (item: any) => {
    addToCart(item);
    showToast("Added to Cart!");
  };

  const handleWishlist = (item: any) => {
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
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/food" className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-black text-gray-800">{vendor.name}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {vendor.location}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full text-sm"
            />
          </div>
        </div>
      </motion.div>

      <div className="p-6 space-y-6 pb-32">
        {/* VENDOR INFO */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-orange-200">
            <Image src={`/images/${vendor.img}`} alt={vendor.name} fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800">{vendor.name}</h2>
            <div className="flex items-center gap-3 text-sm text-gray-600">
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
        </motion.div>

        {/* CATEGORIES */}
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                category === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MENU ITEMS */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((dish) => (
            <Link href={`/food/dish/${dish.id}`} key={dish.id}>
              <motion.div
                whileHover={{ x: 4 }}
                className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex gap-4 cursor-pointer relative"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={`/images/${dish.img}`} alt={dish.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-800">{dish.title}</h3>
                  <p className="text-xs text-gray-500">{dish.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{dish.rating}</span>
                  </div>
                  <p className="font-black text-orange-500 text-lg mt-2">₦{dish.price.toLocaleString()}</p>
                </div>

                {/* + BUTTON */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart({ id: dish.id, title: dish.title, price: dish.price, img: dish.img });
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg z-10"
                >
                  <Plus className="w-4 h-4 text-orange-600" />
                </motion.button>

                {/* HEART BUTTON */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist({ id: dish.id, title: dish.title, price: dish.price, img: dish.img });
                  }}
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
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t z-50"
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