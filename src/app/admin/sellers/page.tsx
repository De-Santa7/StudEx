// src/app/admin/sellers/page.tsx
"use client";

import { Store, CheckCircle, Clock, Search, User, Eye, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSellers() {
  const [sellers, setSellers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Mock data — will be replaced by API
    setSellers([
      {
        id: "SELL001",
        name: "Amaka Bello",
        email: "amaka@lasu.edu.ng",
        joinDate: "2025-03-10",
        totalProducts: 12,
        status: "verified",
      },
      {
        id: "SELL002",
        name: "Chinedu Okeke",
        email: "chinedu@lasu.edu.ng",
        joinDate: "2025-05-02",
        totalProducts: 4,
        status: "pending",
      },
      {
        id: "SELL003",
        name: "Kemi Johnson",
        email: "kemi@lasu.edu.ng",
        joinDate: "2025-04-18",
        totalProducts: 9,
        status: "verified",
      },
      {
        id: "SELL004",
        name: "Tunde Ade",
        email: "tunde@lasu.edu.ng",
        joinDate: "2025-06-01",
        totalProducts: 7,
        status: "verified",
      },
    ]);
  }, []);

  const filtered = sellers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "verified")
      return "bg-green-100 text-green-700 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold";
    return "bg-yellow-100 text-yellow-700 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold";
  };

  const viewSeller = (id: string) => {
    router.push(`/admin/sellers/${id}`);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Users className="w-6 h-6" />
            Sellers
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sellers..."
              className="pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-48"
            />
          </div>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-surface rounded-xl p-3 text-center">
            <p className="text-2xl font-bold" style={{ color: "#7C3AED" }}>
              {sellers.length}
            </p>
            <p className="text-xs text-gray-600">Total Sellers</p>
          </div>
          <div className="bg-surface rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600">
              {sellers.filter(s => s.status === "verified").length}
            </p>
            <p className="text-xs text-gray-600">Verified</p>
          </div>
          <div className="bg-surface rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {sellers.filter(s => s.status === "pending").length}
            </p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
        </div>

        {/* Sellers List */}
        {filtered.length > 0 ? (
          filtered.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-600 w-10 h-10 flex items-center justify-center rounded-full">
                  <Store className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800">{seller.name}</p>
                    <span className={getStatusBadge(seller.status)}>
                      {seller.status === "verified" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      {seller.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <User className="w-3 h-3" /> {seller.email}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>Joined: {seller.joinDate}</span>
                    <span>•</span>
                    <span>{seller.totalProducts} products</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => viewSeller(seller.id)}
                className="mt-3 w-full py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold flex items-center justify-center gap-1 hover:bg-purple-700 transition"
              >
                <Eye className="w-4 h-4" /> View Profile
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No sellers found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="text-primary/60"><span className="text-xs">Dashboard</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Sellers</span></div>
          <Link href="/admin/orders" className="text-primary/60"><span className="text-xs">Orders</span></Link>
          <Link href="/admin/products" className="text-primary/60"><span className="text-xs">Products</span></Link>
          <Link href="/admin/settings" className="text-primary/60"><span className="text-xs">Settings</span></Link>
        </div>
      </div>
    </>
  );
}