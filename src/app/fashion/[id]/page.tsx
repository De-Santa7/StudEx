// src/app/fashion/[id]/page.tsx
"use client";

import { ShoppingCart, Heart, ChevronLeft, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/cartStore";
import { useWishlist } from "@/lib/wishlistStore";
import { useEffect, useState } from "react";

const products = [
  { id: 1, name: "Nike Air Max", price: 45000, category: "Shoes", img: "Sneakers", rating: 4.8, desc: "Premium comfort. Campus-ready. Built to last." },
  { id: 2, name: "Denim Jacket", price: 18000, category: "Clothing", img: "Jacket", rating: 4.5, desc: "Classic style. Durable denim. Perfect for all seasons." },
  { id: 3, name: "Gold Chain", price: 8000, category: "Jewelry", img: "Necklace", rating: 4.9, desc: "18k gold-plated. Shine on a budget." },
  { id: 4, name: "Laptop Bag", price: 12000, category: "Accessories", img: "Bag", rating: 4.6, desc: "Water-resistant. Padded laptop sleeve." },
  { id: 5, name: "Sneaker Cleaner", price: 3500, category: "Care", img: "Bottle", rating: 4.7, desc: "Removes dirt. Keeps kicks fresh." },
  { id: 6, name: "Sunglasses", price: 9000, category: "Eyewear", img: "Glasses", rating: 4.8, desc: "UV protection. Anti-scratch lens." },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  // CLIENT-ONLY STATE
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product!.id);
    } else {
      addToWishlist(product!);
    }
    setIsWishlisted(!isWishlisted);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
        <p className="text-xl" style={{ color: "#7C3AED" }}>Product not found</p>
        <Link href="/fashion" className="mt-4 text-sm underline" style={{ color: "#14B8A6" }}>
          Back to Fashion
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/fashion" className="p-2">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>{product.name}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 pb-32">
        {/* Image */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-64 rounded-2xl flex items-center justify-center text-9xl mb-6">
          {product.img}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>{product.name}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h--5 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: "#7C3AED" }}>{product.rating}</span>
          </div>

          <p className="text-lg font-bold" style={{ color: "#14B8A6" }}>₦{product.price.toLocaleString()}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{product.desc}</p>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-4 right-4 flex gap-3">
          <button
            onClick={handleWishlist}
            className="flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all"
            style={{ 
              borderColor: "#7C3AED", 
              color: isWishlisted ? "white" : "#7C3AED",
              backgroundColor: isWishlisted ? "#7C3AED" : "white",
            }}
          >
            <Heart 
              className="w-5 h-5" 
              style={{ 
                fill: isWishlisted ? "white" : "none", 
                color: isWishlisted ? "white" : "#7C3AED" 
              }} 
            />
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>

          <button
            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}
            className="flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: "#14B8A6" }}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/fashion" className="text-primary font-bold"><span className="text-xs">Fashion</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary/60"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}