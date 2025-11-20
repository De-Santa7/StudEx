"use client";

import { useEffect, useState } from "react";
import { Search, LogIn, UserPlus, Package, Zap, ArrowRight, Plus, Heart, Scissors, Shirt, Sparkles, CupSoda } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/lib/authStore";
import { useCartStore } from "@/lib/cartStore";
import { useWishlistStore } from "@/lib/wishlistStore";

export default function HomePage() {
  const { isLoggedIn, login, logout } = useAuth();
  const addToCart = useCartStore((state) => state.addToCart);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [toast, setToast] = useState("");
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };
  const buttonHover = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  // ✅ UPDATED SERVICES — ONLY THE 5 YOU REQUESTED
  const campusServices = [
    {
      id: 1,
      title: "Food & Snacks",
      icon: Package,
      img: "food-1.jpg",
      href: "/food",
      color: "from-orange-100 to-red-100",
      hover: "hover:border-orange-300",
    },
    {
      id: 2,
      title: "Nails & Beauty",
      icon: Sparkles,
      img: "nails-1.jpg",
      href: "/nails",
      color: "from-purple-100 to-teal-100",
      hover: "hover:border-purple-300",
    },
    {
      id: 3,
      title: "Laundry",
      icon: Shirt,
      img: "laundry-1.jpg",
      href: "/laundry",
      color: "from-blue-100 to-cyan-100",
      hover: "hover:border-blue-300",
    },
    {
      id: 4,
      title: "Lashes",
      icon: Scissors,
      img: "lashes-1.jpg",
      href: "/lashes",
      color: "from-pink-100 to-purple-100",
      hover: "hover:border-pink-300",
    },
    {
      id: 5,
      title: "Drinks",
      icon: CupSoda,
      img: "drinks-1.jpg",
      href: "/drinks",
      color: "from-teal-100 to-green-100",
      hover: "hover:border-teal-300",
    },
  ];

  const foodDeals = [
    { id: 1, title: "Jollof Rice + Chicken", oldPrice: 1800, newPrice: 1200, img: "deal-food-1.jpg", time: "15 mins" },
    { id: 2, title: "Shawarma Wrap", oldPrice: 1500, newPrice: 1000, img: "deal-food-2.jpg", time: "12 mins" },
    { id: 3, title: "Indomie + Egg", oldPrice: 800, newPrice: 500, img: "deal-food-3.jpg", time: "10 mins" },
  ];

  return (
    <>
      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 60, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50 font-medium text-sm text-white ${
            toast.includes("Wishlist") ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast}
        </motion.div>
      )}

      {/* TOP BAR */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-0 bg-white z-40 border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-1.jpg" alt="StudEx Logo" width={140} height={40} className="h-10 w-auto object-contain" priority />
          </Link>

          {isLoggedIn ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-10 pr-4 py-2 bg-surface rounded-full text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-primary" />
            </motion.div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <motion.button {...buttonHover} className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                  <LogIn className="w-4 h-4 text-white" /> Login
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button {...buttonHover} className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-primary rounded-xl text-sm font-bold border border-primary hover:bg-primary/5 transition-all shadow hover:shadow-lg">
                  <UserPlus className="w-4 h-4 text-primary" /> Sign Up
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="p-4 space-y-6 pb-24">
        {/* HERO */}
        <motion.div {...fadeInUp}>
          <Link href="/categories">
            <motion.div
              {...cardHover}
              className="relative rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-48 bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500"
            >
              <div className="relative z-10 h-full flex flex-col justify-end">
                <motion.h2 initial={{ x: -20 }} whileInView={{ x: 0 }} className="text-2xl font-bold drop-shadow-2xl">
                  The Amazon for Campus Hustlers
                </motion.h2>
                <motion.p initial={{ x: -20 }} whileInView={{ x: 0 }} transition={{ delay: 0.1 }} className="text-sm mt-1 text-white/95 drop-shadow-xl">
                  Food in 15 mins. Services in 60.
                </motion.p>
                <motion.button {...buttonHover} className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 w-fit">
                  <Package className="w-4 h-4" /> Get Started
                </motion.button>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* CAMPUS SERVICES — UPDATED */}
        <motion.div {...fadeInUp}>
          <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
            Campus Services
          </h3>
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {campusServices.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="min-w-[140px]">
                <Link href={service.href}>
                  <motion.div {...cardHover} className={`bg-gradient-to-br ${service.color} p-4 rounded-xl text-center shadow-md border border-transparent ${service.hover} transition-all duration-300 cursor-pointer`}>
                    <div className="relative w-full h-28 rounded-xl overflow-hidden mb-2">
                      <Image src={`/images/${service.img}`} alt={service.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <service.icon className="w-4 h-4 text-primary" />
                      <p className="text-xs font-bold text-black line-clamp-2">{service.title}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SEE MORE CATEGORIES */}
        <motion.div {...fadeInUp} className="flex justify-center">
          <Link href="/categories">
            <motion.button whileHover={{ x: 4 }} className="flex items-center gap-2 text-black font-medium text-sm hover:underline">
              See More Categories <ArrowRight className="w-4 h-4 text-black" />
            </motion.button>
          </Link>
        </motion.div>

        {/* FLASH DEALS */}
        <motion.div {...fadeInUp}>
          <div className="flex justify-between items-center mb-3">
            <motion.h3 initial={{ x: -20 }} whileInView={{ x: 0 }} className="text-lg font-bold text-black flex items-center gap-2">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Zap className="w-5 h-5 text-yellow-500" />
              </motion.div>
              Flash Deals
            </motion.h3>
            <Link href="/deals" className="text-black text-sm font-medium hover:underline">
              See All
            </Link>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {foodDeals.map((deal, i) => (
              <motion.div key={deal.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <Link href={`/deals/${deal.id}`}>
                  <motion.div {...cardHover} className="bg-surface p-4 rounded-xl min-w-[140px] hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30 relative pb-8">
                    <div className="relative w-full h-28 rounded-xl overflow-hidden">
                      <Image src={`/images/${deal.img}`} alt={deal.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                    </div>

                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({ id: deal.id, title: deal.title, price: deal.newPrice, img: deal.img });
                        showToast("Added to Cart!");
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow"
                    >
                      <Plus className="w-4 h-4 text-primary" />
                    </motion.button>

                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const item = { id: deal.id, title: deal.title, price: deal.newPrice, img: deal.img };
                        if (mounted && isInWishlist(deal.id)) {
                          removeFromWishlist(deal.id);
                          showToast("Removed from Wishlist!");
                        } else {
                          addToWishlist(item);
                          showToast("Added to Wishlist!");
                        }
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow"
                    >
                      <Heart className={`w-4 h-4 transition-all ${mounted && isInWishlist(deal.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </motion.button>

                    <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">{deal.time}</div>

                    <p className="text-sm font-medium mt-2 text-black line-clamp-2">{deal.title}</p>
                    <p className="text-xs text-black/60 line-clamp-1 line-through">₦{deal.oldPrice.toLocaleString()}</p>
                    <p className="text-sm font-bold text-red-500">₦{deal.newPrice.toLocaleString()}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div {...fadeInUp} className="p-4 bg-surface rounded-xl text-center">
          <p className="text-sm text-black/70 mb-2">{isLoggedIn ? "You are logged in" : "Not logged in"}</p>
          <motion.button {...buttonHover} onClick={isLoggedIn ? logout : login} className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow hover:shadow-lg">
            {isLoggedIn ? "Logout" : "Test Login"}
          </motion.button>
        </motion.div>
      </div>

      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary font-bold">
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/categories" className="text-black/60">
            <motion.div whileHover={{ y: -2 }} className="text-xs">
              Categories
            </motion.div>
          </Link>
          <Link href="/cart" className="text-black/60">
            <motion.div whileHover={{ y: -2 }} className="text-xs">
              Cart
            </motion.div>
          </Link>
          <Link href="/wishlist" className="text-black/60">
            <motion.div whileHover={{ y: -2 }} className="text-xs">
              Wishlist
            </motion.div>
          </Link>
          <Link href="/account" className="text-black/60">
            <motion.div whileHover={{ y: -2 }} className="text-xs">
              Account
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
