// src/app/food/page.tsx  ← FINAL & FLAWLESS (OFFICIAL STUDEx GRADIENT)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, ChevronLeft, Sparkles, Flame, Clock, Star, 
  MapPin, Package, Zap, X, ChevronRight, CheckCircle
} from "lucide-react";
import { useState } from "react";

const heroBanners = [
  { title: "Jollof Wars Are On!", subtitle: "50% off first order", img: "jollof-banner.jpg" },
  { title: "Free Delivery Today!", subtitle: "Use code: STUDExHUNGRY", img: "delivery-banner.jpg" },
  { title: "Late Night Indomie?", subtitle: "Open till 3AM", img: "indomie-night.jpg" },
];

const trending = [
  { id: 1, name: "Jollof Rice + Chicken", price: 1200, vendor: "Mama Put", rating: 4.9, sales: "2.1k+", img: "jollof.jpg", badge: "Bestseller" },
  { id: 2, name: "Beef Shawarma", price: 1000, vendor: "Shawarma Palace", rating: 4.8, sales: "1.8k+", img: "shawarma.jpg", badge: "Trending" },
  { id: 3, name: "Indomie Supreme", price: 600, vendor: "Indomie Spot", rating: 4.7, sales: "3.2k+", img: "indomie.jpg", badge: "Campus King" },
  { id: 4, name: "Eba + Egusi + Beef", price: 900, vendor: "Mama Put", rating: 4.9, sales: "1.5k+", img: "eba.jpg" },
  { id: 5, name: "Suya (10 Sticks)", price: 1500, vendor: "Suya King", rating: 4.8, sales: "980+", img: "suya.jpg", badge: "Late Night" },
  { id: 6, name: "Pounded Yam + Oha", price: 1800, vendor: "Iya Basira", rating: 5.0, sales: "420+", img: "pounded.jpg" },
];

const topVendors = [
  { id: "mamaput", name: "Mama Put", rating: 4.9, time: "8–15 mins", location: "Gate 2", img: "vendor-mama.jpg", verified: true, open: true },
  { id: "jollofking", name: "Jollof King", rating: 4.9, time: "10–20 mins", location: "Cafeteria", img: "vendor-jollof.jpg", verified: true, open: true },
  { id: "indomiespot", name: "Indomie Spot", rating: 4.7, time: "5–12 mins", location: "Hostel A", img: "vendor-indomie.jpg", open: true },
  { id: "shawarmapalace", name: "Shawarma Palace", rating: 4.8, time: "15–25 mins", location: "Library Road", img: "vendor-shawarma.jpg", verified: true, open: false },
];

export default function FoodPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <>
      {/* TOP BAR */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-2xl z-50 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-3 hover:bg-purple-100 rounded-full transition active:scale-95">
            <ChevronLeft className="w-8 h-8 text-purple-700" />
          </button>
          <Link href="/" className="relative w-32 h-12">
            <Image src="/images/logo-1.jpg" alt="StudEx" fill className="object-contain" priority />
          </Link>
          <div className="w-12" />
        </div>

        <h1 className="text-center text-4xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent pb-4">
          Food & Snacks
        </h1>

        {/* SEARCH */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-5 top-4 w-6 h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Jollof? Shawarma? Indomie?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 text-lg font-medium placeholder-gray-500 transition-all"
            />
            <Flame className="absolute right-5 top-4 w-7 h-7 text-purple-600 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="pb-32">

        {/* HERO BANNER */}
        <div className="relative h-64 overflow-hidden">
          {heroBanners.map((banner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentBanner === i ? 1 : 0 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-teal-600/90" />
              <Image src={`/images/${banner.img}`} alt={banner.title} fill className="object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h2 className="text-4xl font-black drop-shadow-2xl">{banner.title}</h2>
                <p className="text-xl font-bold drop-shadow-lg">{banner.subtitle}</p>
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-3 h-3 rounded-full transition-all ${currentBanner === i ? "bg-white w-8" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 -mt-8 relative z-10 space-y-10">

          {/* TRUST BADGE */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-6 text-center border-4 border-purple-200"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="w-10 h-10 text-purple-600" />
              <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Lightning Fast Delivery
              </span>
              <Package className="w-10 h-10 text-teal-600" />
            </div>
            <p className="text-lg font-bold text-gray-700">Avg. 12 mins • 100% Escrow Protected</p>
          </motion.div>

          {/* TRENDING DISHES */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-600" />
                Trending Right Now
              </h2>
              <Link href="/food/trending" className="text-purple-600 font-bold text-sm">
                See All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {trending.map((dish, i) => (
                <Link href={`/food/dish/${dish.id}`} key={dish.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-purple-100"
                  >
                    <div className="relative h-48">
                      <Image src={`/images/${dish.img}`} alt={dish.name} fill className="object-cover" />
                      {dish.badge && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                          {dish.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-xl font-black drop-shadow-lg">{dish.name}</p>
                        <p className="text-sm opacity-90">{dish.vendor}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                            ₦{dish.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600">{dish.sales} ordered</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="font-black">{dish.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* TOP VENDORS */}
          <section>
            <h2 className="text-2xl font-black mb-6">Top Vendors Near You</h2>
            <div className="space-y-5">
              {topVendors.map((vendor, i) => (
                <Link href={`/food/vendor/${vendor.id}`} key={vendor.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100 flex"
                  >
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image src={`/images/${vendor.img}`} alt={vendor.name} fill className="object-cover" />
                      {vendor.open ? (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                          OPEN
                        </div>
                      ) : (
                        <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs font-black px-3 py-1 rounded-full">
                          CLOSED
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-black flex items-center gap-2">
                          {vendor.name}
                          {vendor.verified && <CheckCircle className="w-5 h-5 text-blue-600" />}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" /> {vendor.location}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="font-bold">{vendor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-5 h-5 text-teal-600" />
                            <span>{vendor.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button className="flex-1 bg-gray-100 py-3 rounded-2xl font-black text-purple-600 hover:bg-purple-100 transition">
                          View Menu
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 text-white py-3 rounded-2xl font-black shadow-lg hover:shadow-xl transition">
                          Order Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 text-xs">Home</Link>
          <Link href="/categories" className="text-gray-500 text-xs">Services</Link>
          <div className="text-purple-600 font-black text-sm flex items-center gap-2">
            Food
          </div>
          <Link href="/cart" className="text-gray-500 text-xs">Cart</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </div>
    </>
  );
}