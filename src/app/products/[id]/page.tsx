// src/app/products/[id]/page.tsx
"use client";

import { Heart, MessageCircle, Share2, ShoppingCart, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // MOCK PRODUCT
  const product = {
    id,
    name: "MacBook Pro 2021 (M1)",
    price: "₦650,000",
    image: "/api/placeholder/400/400",
    seller: "Tunde A.",
    hostel: "New Hall, Room 204",
    condition: "Like New",
    description: "Used for 3 months. Perfect condition. Comes with charger and box. No scratches. M1 chip, 8GB RAM, 256GB SSD.",
    rating: 4.8,
    reviews: 23,
    inStock: true,
  };

  // GENERATE WHATSAPP NUMBER **ONLY ON CLIENT**
  useEffect(() => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    setWhatsappNumber(`234${randomNumber}`);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Product</h1>
          <div className="flex gap-3">
            <button className="text-gray-600">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="text-gray-600">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Image */}
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 mb-4" />

        {/* Details */}
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#7C3AED" }}>
          {product.name}
        </h1>

        <div className="flex items-center gap-2 mb-3">
          <p className="text-3xl font-bold" style={{ color: "#7C3AED" }}>
            {product.price}
          </p>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {product.condition}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2" style={{ color: "#7C3AED" }}>Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Seller */}
        <div className="bg-surface rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2" style={{ color: "#7C3AED" }}>Seller</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{product.seller}</p>
              <p className="text-sm text-gray-600">{product.hostel}</p>
            </div>
            {/* Only render link when number is ready */}
            {whatsappNumber ? (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-full"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            ) : (
              <div className="bg-gray-200 w-12 h-12 rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-teal-500">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="px-6 py-4 rounded-xl border-2 font-bold" style={{ borderColor: "#7C3AED", color: "#7C3AED" }}>
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}