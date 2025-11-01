// src/app/food/[id]/page.tsx
"use client";

import { ChevronLeft, Heart, ShoppingCart, Star, MapPin, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cartStore";
import { useWishlist } from "@/lib/wishlistStore";

// MOCK FOOD DATA — With Phone Numbers
const foodProducts = {
  1: {
    id: 1,
    name: "Jollof Rice",
    price: 2500,
    img: "Rice Bowl",
    rating: 4.9,
    reviews: 128,
    description: "Authentic Nigerian jollof rice with chicken, served with plantain and coleslaw.",
    seller: {
      name: "Mama's Kitchen",
      avatar: "M",
      campus: "LASU Main Campus",
      rating: 4.8,
      totalSales: 892,
      verified: true,
      phone: "+2348012345678",
    },
  },
  2: {
    id: 2,
    name: "Suya (Beef)",
    price: 3000,
    img: "Skewers",
    rating: 4.8,
    reviews: 95,
    description: "Spicy grilled beef suya with onions and special spice mix.",
    seller: {
      name: "Suya King",
      avatar: "S",
      campus: "LASU Gate",
      rating: 4.9,
      totalSales: 1203,
      verified: true,
      phone: "+2348123456789",
    },
  },
  3: {
    id: 3,
    name: "Coca-Cola",
    price: 500,
    img: "Bottle",
    rating: 4.7,
    reviews: 210,
    description: "Chilled 50cl bottle of Coca-Cola.",
    seller: {
      name: "Campus Mart",
      avatar: "C",
      campus: "LASU Hostels",
      rating: 4.6,
      totalSales: 3200,
      verified: true,
      phone: "+2348034567890",
    },
  },
  4: {
    id: 4,
    name: "Pizza Slice",
    price: 1500,
    img: "Pizza",
    rating: 4.6,
    reviews: 67,
    description: "Freshly baked pepperoni pizza slice.",
    seller: {
      name: "Pizza Hub",
      avatar: "P",
      campus: "Faculty of Science",
      rating: 4.7,
      totalSales: 450,
      verified: true,
      phone: "+2348076543210",
    },
  },
  5: {
    id: 5,
    name: "Plantain Chips",
    price: 800,
    img: "Chips",
    rating: 4.5,
    reviews: 89,
    description: "Crispy fried plantain chips with pepper.",
    seller: {
      name: "Snack Queen",
      avatar: "S",
      campus: "Student Union",
      rating: 4.5,
      totalSales: 680,
      verified: false,
      phone: "+2348098765432",
    },
  },
  6: {
    id: 6,
    name: "Zobo Drink",
    price: 700,
    img: "Glass",
    rating: 4.8,
    reviews: 102,
    description: "Fresh hibiscus tea with pineapple and ginger.",
    seller: {
      name: "Healthy Vibes",
      avatar: "H",
      campus: "Medical Center",
      rating: 4.9,
      totalSales: 510,
      verified: true,
      phone: "+2348055512345",
    },
  },
};

export default function FoodDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = foodProducts[id as string];
  const { addItem } = useCart();
  const { items: wishlist, addItem: addToWishlist, removeItem } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product && wishlist.find((i) => i.id === product.id)) {
      setIsWishlisted(true);
    }
  }, [product, wishlist]);

  // WHATSAPP CHAT FUNCTION
  const openWhatsApp = () => {
    if (!product.seller.phone) {
      alert("Seller phone number not available");
      return;
    }

    const message = `Hi ${product.seller.name}, I'm interested in your *${product.name}*!\n\nPrice: ₦${product.price.toLocaleString()}\n\nIs it still available?`;
    const encoded = encodeURIComponent(message);
    const cleanPhone = product.seller.phone.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    
    window.open(url, "_blank");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl" style={{ color: "#7C3AED" }}>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Product Details</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6 overflow-x-hidden">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl h-64 flex items-center justify-center text-9xl">
          {product.img}
        </div>

        {/* Product Info + BUY NOW UNDER PRICE */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{product.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-3xl font-bold mt-2" style={{ color: "#14B8A6" }}>
            ₦{product.price.toLocaleString()}
          </p>

          {/* BUY NOW BUTTON — UNDER PRICE */}
          <div className="mt-3">
            <Link href={`/checkout?product=${product.id}&type=food`}>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="bg-surface rounded-xl p-4">
          <p className="text-gray-700">{product.description}</p>
        </div>

        {/* Seller Card */}
        <div className="bg-surface rounded-xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {product.seller.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold" style={{ color: "#7C3AED" }}>{product.seller.name}</p>
              {product.seller.verified && (
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Verified</span>
              )}
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {product.seller.campus}
            </p>
            <p className="text-xs text-gray-500 mt-1">{product.seller.totalSales} sales</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* WHATSAPP BUTTON */}
        <div className="mx-4">
          <button
            onClick={openWhatsApp}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Seller on WhatsApp
          </button>
        </div>

        {/* Action Buttons — FIXED BOTTOM */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3">
          <button
            onClick={handleAddToCart}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: "#14B8A6" }}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <button
            onClick={toggleWishlist}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </>
  );
}