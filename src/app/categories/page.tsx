// src/app/categories/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles } from "lucide-react";

export default function CategoriesPage() {
  const router = useRouter();

  const categories = [
    { title: "Lashes",       href: "/lashes",   image: "/images/lashes-1.jpg" },
    { title: "Nails",        href: "/nails",    image: "/images/nails-1.jpg" },
    { title: "Makeup",       href: "/makeup",   image: "/images/makeup-1.jpg" },
    { title: "Hair & Braids", href: "/hair",    image: "/images/hair-1.jpg" },
    { title: "Laundry",      href: "/laundry",  image: "/images/laundry-1.jpg" },
    { title: "Food & Drinks", href: "/food",    image: "/images/food-1.jpg" },
  ];

  return (
    <>
      {/* STUDEx LUXURY HEADER */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-2xl z-50 border-b border-purple-100">
        <div className="flex items-center justify-between px-5 py-5">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-teal-100 hover:from-purple-200 hover:to-teal-200 transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-purple-700" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Choose Your Glow
            </h1>
            <p className="text-xs text-gray-500 mt-1">Campus beauty & essentials</p>
          </div>
          <div className="w-12" />
        </div>
      </div>

      <div className="px-5 pt-6 pb-32">

        {/* HERO TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            What do you need today?
          </h2>
          <Sparkles className="w-9 h-9 mx-auto mt-4 text-purple-500 animate-pulse" />
        </motion.div>

        {/* PREMIUM GRID — ONLY YOUR GRADIENT */}
        <div className="grid grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={cat.href}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-500"
                >
                  {/* OFFICIAL GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 via-purple-600/20 to-teal-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* GLOW — YOUR COLORS ONLY */}
                  <div className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500" />
                  </div>

                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                  </div>

                  {/* TITLE + ANIMATED UNDERLINE */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <p className="text-2xl font-black text-white drop-shadow-2xl">
                      {cat.title}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "60%" }}
                      className="h-1 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full mx-auto mt-2 shadow-lg"
                    />
                  </div>

                  {/* STUDEx BADGE */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-3 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-bold shadow-lg">
                      <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                        NEW
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SUBTLE CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Can’t decide?{" "}
            <Link href="/explore" className="font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent underline">
              Let us surprise you
            </Link>
          </p>
        </motion.div>
      </div>

      {/* BOTTOM NAV — ACTIVE TAB WITH YOUR GRADIENT */}
      <nav className="bottom-nav-safe">
        <div className="flex justify-around items-center h-full px-6">
          <Link href="/home" className="text-gray-600"><span className="text-xs font-medium">Home</span></Link>
          <div className="relative">
            <span className="text-xs font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">Categories</span>
            <motion.div
              layoutId="activeTab"
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full shadow-lg"
            />
          </div>
          <Link href="/cart" className="text-gray-600"><span className="text-xs font-medium">Cart</span></Link>
          <Link href="/book" className="text-gray-600"><span className="text-xs font-medium">Bookings</span></Link>
          <Link href="/profile" className="text-gray-600"><span className="text-xs font-medium">Profile</span></Link>
        </div>
      </nav>
    </>
  );
}