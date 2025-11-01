// src/app/page.tsx
"use client";

import { Search, Heart, LogIn, UserPlus, LogOut, Package, Zap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/authStore";

export default function HomePage() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">StudEx</h1>

          {/* RIGHT SIDE: Login/Signup OR Search */}
          {isLoggedIn ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search Fashion, Beauty, Food..."
                className="pl-10 pr-4 py-2 bg-surface rounded-full text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-primary" />
            </div>
          ) : (
            <div className="flex gap-3">
              {/* LOGIN = BOLD PURPLE PILL */}
              <Link href="/login">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                  <LogIn className="w-4 h-4 text-white" />
                  Login
                </button>
              </Link>

              {/* SIGN UP = WHITE + PURPLE + CURVED RECTANGLE */}
              <Link href="/signup">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-primary rounded-xl text-sm font-bold border border-primary hover:bg-primary/5 transition-all shadow hover:shadow-lg">
                  <UserPlus className="w-4 h-4 text-primary" />
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* HERO BANNER — CLICKABLE */}
        <Link href="/categories">
          <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95">
            <h2 className="text-2xl font-bold">Campus Style & Snacks</h2>
            <p className="text-sm mt-1">Fashion, Beauty & Food — Delivered Fast</p>
            <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-medium shadow hover:shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2">
              <Package className="w-4 h-4" />
              Shop Now
            </button>
          </div>
        </Link>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/fashion">
              <div className="bg-surface p-6 rounded-2xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-300">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed rounded-2xl w-full h-32 mb-3 flex items-center justify-center">
                  <span className="text-4xl text-purple-700">Clothes</span>
                </div>
                <p className="text-lg font-bold text-primary">Fashion & Beauty</p>
                <p className="text-xs text-primary/70 mt-1">Drip, Makeup, Skincare</p>
              </div>
            </Link>

            <Link href="/food">
              <div className="bg-surface p-6 rounded-2xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-teal-300">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-dashed rounded-2xl w-full h-32 mb-3 flex items-center justify-center">
                  <span className="text-4xl text-orange-700">Pizza</span>
                </div>
                <p className="text-lg font-bold text-primary">Food & Snacks</p>
                <p className="text-xs text-primary/70 mt-1">Jollof, Suya, Drinks</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Flash Deals — CLICKABLE SECTION */}
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Flash Deals
            </h3>
            <Link href="/deals" className="text-primary text-sm font-medium hover:underline">
              See All →
            </Link>
          </div>
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/deals/${i}`}>
                <div className="bg-surface p-4 rounded-xl min-w-[140px] hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30 active:scale-95">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-dashed rounded-xl w-full h-28 flex items-center justify-center">
                      <span className="text-3xl">Deal {i}</span>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:scale-110 transition-transform"
                    >
                      <Heart className="w-4 h-4 text-primary hover:fill-red-500 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  <p className="text-sm font-medium mt-2 text-primary">Flash Item {i}</p>
                  <p className="text-xs text-primary/70 line-through">₦3,500</p>
                  <p className="text-sm font-bold text-red-500">₦2,500</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* TEMP: Login Toggle */}
        <div className="p-4 bg-surface rounded-xl text-center">
          <p className="text-sm text-primary/80 mb-2">
            {isLoggedIn ? "You are logged in" : "Not logged in"}
          </p>
          <button
            onClick={isLoggedIn ? logout : login}
            className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow hover:shadow-lg"
          >
            {isLoggedIn ? "Logout" : "Test Login"}
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <div className="text-primary font-bold"><span className="text-xs">Home</span></div>
          <Link href="/categories" className="text-primary/60"><span className="text-xs">Categories</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}