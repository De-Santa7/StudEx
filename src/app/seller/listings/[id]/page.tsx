"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Package, Tag, DollarSign, FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default function SellerProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    const found = all.find((p: any) => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>Product not found.</p>
        <button
          onClick={() => router.push("/seller/listings")}
          className="mt-4 text-purple-600 font-semibold underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/seller/listings" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>
            Product Details
          </h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Images */}
        {product.images && product.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {product.images.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                alt={`Product ${i + 1}`}
                className="w-full h-40 object-cover rounded-xl"
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-xl font-semibold text-purple-700 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> ₦{product.price}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Tag className="w-4 h-4" /> {product.condition}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Package className="w-4 h-4" /> Category: {product.category}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Added on {product.date}
          </p>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
            <FileText className="w-4 h-4" /> Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={() => router.push(`/seller/edit/${product.id}`)}
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700"
          >
            Edit
          </button>
          <button
            onClick={() => router.push("/seller/listings")}
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold shadow hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
