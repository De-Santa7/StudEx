"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, ShieldCheck, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("studexUsers");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      setUsers([
        {
          id: 1,
          name: "Chinedu Okeke",
          email: "chinedu@lasu.edu.ng",
          role: "buyer",
          joined: "2025-04-01",
        },
        {
          id: 2,
          name: "Amaka Bello",
          email: "amaka@lasu.edu.ng",
          role: "seller",
          joined: "2025-03-20",
        },
        {
          id: 3,
          name: "Tunde Lawal",
          email: "tunde@lasu.edu.ng",
          role: "buyer",
          joined: "2025-05-05",
        },
      ]);
    }
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ===== Top Bar ===== */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-purple-600">All Users</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ===== Users List ===== */}
      <div className="p-4">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((user) => (
              <div
                key={user.id}
                onClick={() => router.push(`/admin/users/${user.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center border hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 w-10 h-10 flex items-center justify-center rounded-full font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {user.email}
                    </p>
                    <p className="text-xs text-gray-500">Joined: {user.joined}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user.role === "seller" ? (
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                      <ShieldCheck className="w-3 h-3" /> Seller
                    </span>
                  ) : (
                    <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                      Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No users found</p>
        )}
      </div>
    </>
  );
}
