// src/app/seller/listings/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Package, Tag, DollarSign, FileText, Calendar, Eye, TrendingUp, Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SellerProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    const found = all.find((p: any) => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen text-center px-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-gradient-to-br from-purple-100 to-teal-100 rounded-full flex items-center justify-center mb-6"
        >
          <Package className="w-12 h-12 text-purple-600" />
        </motion.div>
        <h2 className="text-xl font-black text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-600 mb-6">This item may have been removed.</p>
        <Link href="/seller/listings">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Listings
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <>
      {/* TOP BAR — BIG LOGO */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/seller/listings" className="text-purple-600">
            <ChevronLeft className="w-7 h-7" />
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-1.jpg"
              alt="StudEx Logo"
              width={160}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Product Details
          </h1>
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6">
        {/* IMAGE CAROUSEL */}
        {product.images && product.images.length > 0 && (
          <motion.div {...fadeInUp} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center">
                {product.images.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImage ? "bg-purple-600 w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* TITLE + PRICE */}
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl font-black text-gray-800 line-clamp-2">{product.name}</h2>
          <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent mt-1">
            ₦{Number(product.price).toLocaleString()}
          </p>
        </motion.div>

        {/* STATS ROW */}
        <motion.div {...fadeInUp} className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 text-center shadow-md">
            <Eye className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <p className="text-sm font-bold text-emerald-800">124 Views</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 text-center shadow-md">
            <Package className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-sm font-bold text-purple-800">In Stock</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 text-center shadow-md">
            <TrendingUp className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <p className="text-sm font-bold text-amber-800">+3 Sales</p>
          </div>
        </motion.div>

        {/* INFO GRID */}
        <motion.div {...fadeInUp} className="space-y-3 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/30">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Condition</p>
              <p className="font-bold text-gray-800 capitalize">{product.condition.replace("-", " ")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-teal-600" />
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-bold text-gray-800">{product.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Listed On</p>
              <p className="font-bold text-gray-800">{product.date}</p>
            </div>
          </div>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div {...fadeInUp} className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/30">
          <h3 className="font-black text-lg text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div {...fadeInUp} className="flex gap-4 pt-4">
          <Link href={`/seller/edit/${product.id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2"
            >
              <Edit3 className="w-5 h-5" />
              Edit Product
            </motion.button>
          </Link>
          <Link href="/seller/listings" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-gray-700 rounded-2xl font-black text-lg shadow-lg border border-gray-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM NAV — SELLER MODE */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-gray-500"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <div className="text-teal-600 font-black"><span className="text-xs">Seller</span></div>
        </div>
      </motion.div>
    </>
  );
}