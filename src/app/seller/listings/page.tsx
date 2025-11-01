"use client";

import { Package, ChevronLeft, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerListings() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    setProducts(saved);
  }, []);

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("sellerProducts", JSON.stringify(updated));
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/seller" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>
            My Listings
          </h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products yet</p>
        ) : (
          <div className="space-y-3">
            {products.map((p: any) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border hover:shadow-md transition-all cursor-pointer"
                onClick={() => router.push(`/seller/listings/${p.id}`)}
              >
                <div className="flex items-center gap-3">
                  {p.images && p.images[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-600">₦{p.price}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => router.push(`/seller/edit/${p.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Pencil className="w-5 h-5 text-purple-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
