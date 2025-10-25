// src/app/seller/listings/page.tsx
"use client";

import { Package, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SellerListings() {
  const products = JSON.parse(localStorage.getItem("sellerProducts") || "[]");

  return (
    <>
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/seller" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>My Listings</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products yet</p>
        ) : (
          <div className="space-y-3">
            {products.map((p: any) => (
              <div key={p.id} className="bg-surface rounded-xl p-4 flex justify-between">
                <div>
                  <p className="font-bold" style={{ color: "#7C3AED" }}>{p.name}</p>
                  <p className="text-sm text-gray-600">₦{p.price}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}