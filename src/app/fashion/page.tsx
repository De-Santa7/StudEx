// src/app/fashion/page.tsx
"use client";
import { Search, Heart, Filter } from "lucide-react";
import Link from "next/link";

export default function FashionPage() {
  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-primary font-bold text-xl">
            StudEx
          </Link>
          <div className="flex gap-3">
            <button className="p-2 bg-surface rounded-full shadow-sm hover:shadow transition-shadow">
              <Search className="w-5 h-5 text-primary" />
            </button>
            <button className="p-2 bg-surface rounded-full shadow-sm hover:shadow transition-shadow">
              <Filter className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold text-primary mb-4">Fashion & Beauty</h1>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative group"
            >
              {/* Image Placeholder */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-dashed rounded-t-xl h-48 flex items-center justify-center">
                <span className="text-6xl text-purple-600 font-bold">{i}</span>
              </div>

              {/* Product Info */}
              <div className="p-3 relative">
                <p className="font-semibold text-primary">Trendy Outfit {i}</p>
                <p className="text-sm text-primary/70 mt-1">₦5,000</p>

                {/* Heart Button */}
                <button className="absolute top-12 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                  <Heart className="w-5 h-5 text-primary hover:fill-accent hover:text-accent transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-primary/60">
            <span className="text-xs">Home</span>
          </Link>
          <div className="flex flex-col items-center text-primary font-bold">
            <span className="text-xs">Fashion</span>
          </div>
          <Link href="/food" className="flex flex-col items-center text-primary/60">
            <span className="text-xs">Food</span>
          </Link>
        </div>
      </div>
    </>
  );
}