// src/app/food/page.tsx
"use client";

import { Search, Heart, Filter, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useWishlist } from "@/lib/wishlistStore";

export default function FoodPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { addItem: addToWishlist } = useWishlist();

  // REAL FOOD PRODUCTS
  const products = [
    { id: 1, name: "Jollof Rice", price: 2500, category: "Rice", img: "Rice Bowl", rating: 4.9 },
    { id: 2, name: "Suya (Beef)", price: 3000, category: "Grilled", img: "Skewers", rating: 4.8 },
    { id: 3, name: "Coca-Cola", price: 500, category: "Drinks", img: "Bottle", rating: 4.7 },
    { id: 4, name: "Pizza Slice", price: 1500, category: "Fast Food", img: "Pizza", rating: 4.6 },
    { id: 5, name: "Plantain Chips", price: 800, category: "Snacks", img: "Chips", rating: 4.5 },
    { id: 6, name: "Zobo Drink", price: 700, category: "Drinks", img: "Glass", rating: 4.8 },
  ];

  // Filter by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent card click
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
    alert(`${product.name} added to wishlist!`);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-primary">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 bg-surface rounded-full shadow-sm hover:shadow transition-shadow"
            >
              <Search className="w-5 h-5" style={{ color: "#7C3AED" }} />
            </button>
            <button
              onClick={() => setFilterOpen(true)}
              className="p-2 bg-surface rounded-full shadow-sm hover:shadow transition-shadow"
            >
              <Filter className="w-5 h-5" style={{ color: "#7C3AED" }} />
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        {searchOpen && (
          <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-lg z-50">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" style={{ color: "#7C3AED" }} />
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 outline-none"
                style={{ color: "#7C3AED" }}
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X className="w-5 h-5" style={{ color: "#7C3AED" }} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#7C3AED" }}>Food & Snacks</h1>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <Link key={p.id} href={`/food/${p.id}`} className="block">
              <div className="bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer relative group">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 h-48 flex items-center justify-center text-6xl">
                  {p.img}
                </div>

                <div className="p-3">
                  <p className="font-semibold" style={{ color: "#7C3AED" }}>{p.name}</p>
                  <p className="text-sm" style={{ color: "#14B8A6" }}>₦{p.price.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-xs" style={{ color: "#7C3AED" }}>{p.rating}</span>
                  </div>
                </div>

                {/* HEART BUTTON */}
                <button
                  onClick={(e) => handleWishlist(e, p)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-5 h-5" style={{ color: "#7C3AED" }} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FILTER MODAL */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full p-6 animate-in slide-in-from-bottom">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Filter</h2>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-6 h-6" style={{ color: "#7C3AED" }} />
              </button>
            </div>
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Food</span></div>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}