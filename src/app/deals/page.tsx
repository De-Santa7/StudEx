// src/app/deals/page.tsx
"use client";

import { Heart, Clock, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlistStore";
import { useState } from "react";

export default function DealsPage() {
  const { addItem: addToWishlist } = useWishlist();

  // Mock deals with countdown
  const deals = [
    {
      id: 1,
      name: "Nike Air Max 270",
      original: 45000,
      discounted: 32000,
      endsIn: "2h 15m",
      img: "Sneakers",
    },
    {
      id: 2,
      name: "Denim Jacket",
      original: 18000,
      discounted: 12000,
      endsIn: "4h 30m",
      img: "Jacket",
    },
    {
      id: 3,
      name: "Gold Chain",
      original: 8000,
      discounted: 5000,
      endsIn: "1h 45m",
      img: "Necklace",
    },
    {
      id: 4,
      name: "Suya & Plantain",
      original: 3500,
      discounted: 2500,
      endsIn: "30m",
      img: "Skewers",
    },
  ];

  const handleWishlist = (e: React.MouseEvent, deal: any) => {
    e.stopPropagation();
    addToWishlist({
      id: deal.id,
      name: deal.name,
      price: deal.discounted,
      img: deal.img,
    });
    alert(`${deal.name} added to wishlist!`);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-primary">
            <ArrowLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </Link>
          <h1 className="text-lg font-bold flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Zap className="w-5 h-5 text-yellow-500" />
            Flash Deals
          </h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Limited Time Only!</h2>
          <p className="text-sm mt-1">Grab these deals before they expire</p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 gap-4">
          {deals.map((deal) => (
            <Link key={deal.id} href={`/deals/${deal.id}`}>
              <div className="bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer relative group border border-transparent hover:border-yellow-300">
                {/* Image */}
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 h-48 flex items-center justify-center text-6xl relative">
                  {deal.img}
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -
                    {Math.round(((deal.original - deal.discounted) / deal.original) * 100)}%
                  </div>
                  {/* Countdown */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {deal.endsIn}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-semibold text-sm" style={{ color: "#7C3AED" }}>
                    {deal.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs line-through text-gray-500">
                      ₦{deal.original.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-red-500">
                      ₦{deal.discounted.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => handleWishlist(e, deal)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-5 h-5" style={{ color: "#7C3AED" }} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {deals.length === 0 && (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No active deals right now</p>
            <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Deals</span></div>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}