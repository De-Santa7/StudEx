// src/app/page.tsx
"use client";
import { Search, Heart, LogIn, UserPlus, LogOut } from "lucide-react";
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
              {/* LOGIN = BOLD PURPLE */}
              <Link href="/login">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                  <LogIn className="w-4 h-4 text-white" />
                  Login
                </button>
              </Link>

              {/* SIGN UP = BOLD TEAL + DARK TEXT */}
              <Link href="/signup">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-accent text-primary rounded-full text-sm font-bold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg">
                  <UserPlus className="w-4 h-4 text-primary" />
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-bold">Campus Style & Snacks</h2>
          <p className="text-sm mt-1">Fashion, Beauty & Food — Delivered Fast</p>
          <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-medium shadow hover:shadow-lg transition-all hover:scale-105">
            Shop Now
          </button>
        </div>

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

        {/* Flash Deals */}
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="text-lg font-semibold">Flash Deals</h3>
            <button className="text-primary text-sm font-medium hover:underline">See All</button>
          </div>
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface p-4 rounded-xl min-w-[140px] hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30"
              >
                <div className="relative">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-28" />
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4 text-primary hover:fill-accent hover:text-accent transition-colors" />
                  </button>
                </div>
                <p className="text-sm font-medium mt-2 text-primary">Item {i}</p>
                <p className="text-xs text-primary/70">₦2,500</p>
              </div>
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
    </>
  );
}