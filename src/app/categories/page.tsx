// src/app/categories/page.tsx
"use client";

import { ChevronLeft, Package, Pizza } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-primary">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Categories</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {/* Fashion & Beauty */}
        <Link href="/fashion">
          <div className="bg-surface p-6 rounded-2xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-300">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed rounded-2xl w-full h-40 mb-4 flex items-center justify-center">
              <Package className="w-16 h-16 text-purple-700" />
            </div>
            <p className="text-xl font-bold text-primary">Fashion & Beauty</p>
            <p className="text-sm text-primary/70 mt-1">Drip, Makeup, Skincare, Accessories</p>
          </div>
        </Link>

        {/* Food & Snacks */}
        <Link href="/food">
          <div className="bg-surface p-6 rounded-2xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-teal-300">
            <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-dashed rounded-2xl w-full h-40 mb-4 flex items-center justify-center">
              <Pizza className="w-16 h-16 text-orange-700" />
            </div>
            <p className="text-xl font-bold text-primary">Food & Snacks</p>
            <p className="text-sm text-primary/70 mt-1">Jollof, Suya, Drinks, Pizza</p>
          </div>
        </Link>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Categories</span></div>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}