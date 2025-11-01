// src/app/deals/[id]/page.tsx
"use client";

import { ChevronLeft, Heart, ShoppingCart, Star, MapPin, Clock, Zap, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cartStore";
import { useWishlist } from "@/lib/wishlistStore";

const dealData = {
  1: {
    id: 1,
    name: "Nike Air Max 270",
    original: 45000,
    discounted: 32000,
    endsInSeconds: 3600 * 2 + 900,
    img: "Sneakers",
    rating: 4.8,
    reviews: 312,
    description: "Premium Nike Air Max 270 sneakers. Cushioned comfort with bold style. Limited flash deal!",
    seller: {
      name: "Sneaker Vault",
      avatar: "S",
      campus: "LASU Gate",
      rating: 4.9,
      totalSales: 1240,
      verified: true,
      phone: "+2348012345678",
    },
  },
  2: {
    id: 2,
    name: "Denim Jacket",
    original: 18000,
    discounted: 12000,
    endsInSeconds: 3600 * 4 + 1800,
    img: "Jacket",
    rating: 4.5,
    reviews: 89,
    description: "Classic blue denim jacket. Durable, stylish, perfect for campus drip.",
    seller: {
      name: "Campus Threads",
      avatar: "C",
      campus: "Faculty of Arts",
      rating: 4.7,
      totalSales: 567,
      verified: true,
      phone: "+2348123456789",
    },
  },
  3: {
    id: 3,
    name: "Gold Chain",
    original: 8000,
    discounted: 5000,
    endsInSeconds: 3600 + 2700,
    img: "Necklace",
    rating: 4.9,
    reviews: 203,
    description: "18k gold-plated chain. Lightweight, shiny, perfect for layering.",
    seller: {
      name: "Bling Queen",
      avatar: "B",
      campus: "Hostel Block C",
      rating: 4.8,
      totalSales: 890,
      verified: true,
      phone: "+2348034567890",
    },
  },
  4: {
    id: 4,
    name: "Suya & Plantain",
    original: 3500,
    discounted: 2500,
    endsInSeconds: 1800,
    img: "Skewers",
    rating: 4.7,
    reviews: 156,
    description: "Spicy beef suya with fried plantain. Campus favorite!",
    seller: {
      name: "Suya King",
      avatar: "S",
      campus: "Main Gate",
      rating: 4.9,
      totalSales: 892,
      verified: true,
      phone: "+2348098765432",
    },
  },
};

export default function DealDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const deal = dealData[id as string];
  const { addItem } = useCart();
  const { items: wishlist, addItem: addToWishlist, removeItem } = useWishlist();
  const [timeLeft, setTimeLeft] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!deal) return;

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const end = now + deal.endsInSeconds;
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Deal Expired");
        return;
      }

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [deal]);

  useEffect(() => {
    if (deal && wishlist.find((i) => i.id === deal.id)) {
      setIsWishlisted(true);
    }
  }, [deal, wishlist]);

  const openWhatsApp = () => {
    if (!deal.seller.phone) {
      alert("Seller phone number not available");
      return;
    }

    const discountPercent = Math.round(((deal.original - deal.discounted) / deal.original) * 100);
    const message = `Hi ${deal.seller.name}, I'm interested in your *${deal.name}* flash deal!\n\nOriginal: ₦${deal.original.toLocaleString()}\nDiscounted: ₦${deal.discounted.toLocaleString()} (-${discountPercent}%)\n\nIs it still available?`;
    const encoded = encodeURIComponent(message);
    const cleanPhone = deal.seller.phone.replace(/\D/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    
    window.open(url, "_blank");
  };

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl" style={{ color: "#7C3AED" }}>Deal not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.discounted,
      img: deal.img,
    });
    alert(`${deal.name} added to cart!`);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeItem(deal.id);
    } else {
      addToWishlist({
        id: deal.id,
        name: deal.name,
        price: deal.discounted,
        img: deal.img,
      });
    }
    setIsWishlisted(!isWishlisted);
  };

  const discountPercent = Math.round(((deal.original - deal.discounted) / deal.original) * 100);

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </button>
          <h1 className="text-lg font-bold flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Zap className="w-5 h-5 text-yellow-500" />
            Flash Deal
          </h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6 overflow-x-hidden">
        {/* Deal Image + Badge */}
        <div className="relative">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl h-64 flex items-center justify-center text-9xl">
            {deal.img}
          </div>
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
            -{discountPercent}%
          </div>
          <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeLeft}
          </div>
        </div>

        {/* Product Info + BUY NOW UNDER PRICE */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{deal.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(deal.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({deal.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg line-through text-gray-500">₦{deal.original.toLocaleString()}</span>
            <span className="text-3xl font-bold text-red-500">₦{deal.discounted.toLocaleString()}</span>
          </div>

          {/* BUY NOW BUTTON — UNDER PRICE */}
          <div className="mt-3">
            <Link href={`/checkout?product=${deal.id}&type=deal`}>
              <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="bg-surface rounded-xl p-4">
          <p className="text-gray-700">{deal.description}</p>
        </div>

        {/* Seller Card */}
        <div className="bg-surface rounded-xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {deal.seller.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold" style={{ color: "#7C3AED" }}>{deal.seller.name}</p>
              {deal.seller.verified && (
                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Verified</span>
              )}
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {deal.seller.campus}
            </p>
            <p className="text-xs text-gray-500 mt-1">{deal.seller.totalSales} sales</p>
          </div>
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