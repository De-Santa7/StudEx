// src/app/categories/page.tsx  ← OFFICIAL STUDEx 3.0 CATEGORIES PAGE

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, Zap, Package, Scissors, Shirt } from "lucide-react";

export default function CategoriesPage() {
  const router = useRouter();

  const categories = [
    { 
      title: "Lashes", 
      href: "/lashes", 
      image: "/images/lashes-1.jpg",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "Nails", 
      href: "/nails", 
      image: "/images/nails-1.jpg",
      icon: Zap,
      color: "from-teal-500 to-cyan-500"
    },
    { 
      title: "Laundry", 
      href: "/laundry", 
      image: "/images/laundry-1.jpg",
      icon: Shirt,
      color: "from-blue-500 to-indigo-500"
    },
    { 
      title: "Food", 
      href: "/food", 
      image: "/images/food-1.jpg",
      icon: Package,
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <>
      {/* LUXURY HEADER */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-3xl z-50 border-b border-purple-100">
        <div className="flex items-center justify-between p-5">
          <button
            onClick={() => router.back()}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 hover:from-purple-200 hover:to-teal-200 active:scale-95 transition-all shadow-lg"
          >
            <ChevronLeft className="w-7 h-7 text-purple-700" />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              Choose Your Vibe
            </h1>
            <p className="text-sm font-medium text-gray-600 mt-1">Campus luxury, one tap away</p>
          </div>

          <div className="w-14" />
        </div>
      </div>

      <div className="px-6 pt-8 pb-40">

        {/* HERO STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-black leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-teal-600 bg-clip-text text-transparent">
              What do you
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              need today?
            </span>
          </h2>
          <div className="flex justify-center gap-3 mt-6">
            <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
            <Sparkles className="w-8 h-8 text-pink-500 animate-pulse delay-75" />
            <Sparkles className="w-10 h-10 text-teal-500 animate-pulse delay-150" />
          </div>
        </motion.div>

        {/* EPIC GRID — ONLY 4 ICONIC CATEGORIES */}
        <div className="grid grid-cols-2 gap-8">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
              >
                <Link href={cat.href}>
                  <motion.div
                    whileHover={{ y: -16, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20"
                  >
                    {/* DYNAMIC GRADIENT OVERLAY */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-90 transition-all duration-700`} />
                    
                    {/* EPIC GLOW */}
                    <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000">
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                    </div>

                    {/* IMAGE */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-cover group-hover:scale-125 transition-transform duration-1000"
                        priority={i < 2}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="text-white">
                        <Icon className="w-12 h-12 mb-3 drop-shadow-2xl" />
                        <h3 className="text-4xl font-black drop-shadow-2xl tracking-tight">
                          {cat.title}
                        </h3>
                      </div>

                      {/* ANIMATED BAR */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "70%" }}
                        transition={{ duration: 0.6 }}
                        className={`h-2 mt-4 rounded-full bg-gradient-to-r ${cat.color} shadow-2xl`}
                      />
                    </div>

                    {/* FLOATING BADGE */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="absolute top-6 right-6"
                    >
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl">
                        <span className={`font-black text-sm bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                          LIVE
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FINAL CTA — BOSS ENERGY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-lg font-medium text-gray-600">
            Everything you need. Nothing you don’t.
          </p>
          <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mt-3">
            Just StudEx.
          </p>
        </motion.div>
      </div>

      {/* BOTTOM NAV — ACTIVE WITH GRADIENT DOT */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-3xl border-t border-purple-100 z-50">
        <div className="flex justify-around py-4">
          <Link href="/" className="text-gray-500 text-xs font-medium">Home</Link>
          <div className="relative">
            <span className="text-xs font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Categories
            </span>
            <motion.div
              layoutId="activeCategoryTab"
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-2xl"
            />
          </div>
          <Link href="/cart" className="text-gray-500 text-xs font-medium">Cart</Link>
          <Link href="/bookings" className="text-gray-500 text-xs font-medium">Bookings</Link>
          <Link href="/profile" className="text-gray-500 text-xs font-medium">Profile</Link>
        </div>
      </div>
    </>
  );
}