// src/app/admin/users/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Calendar,
  ShieldCheck,
  User,
  Ban,
  AlertTriangle,
  Eye,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminUserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("studexUsers");
    let users = saved ? JSON.parse(saved) : [];

    if (users.length === 0) {
      users = [
        { id: "1", name: "Chinedu Okeke", email: "chinedu@pau.edu.ng", matric: "PAU20237890", role: "buyer", joined: "Apr 1, 2025", orders: 23 },
        { id: "2", name: "Amaka Bello", email: "amaka@pau.edu.ng", matric: "PAU20230012", role: "seller", joined: "Mar 20, 2025", orders: 89 },
        { id: "3", name: "Victor Osahon", email: "victor@pau.edu.ng", matric: "PAU20231234", role: "seller", joined: "May 2, 2025", orders: 45 },
        { id: "4", name: "Chioma Eze", email: "chioma@pau.edu.ng", matric: "PAU20237891", role: "buyer", joined: "Jun 10, 2025", orders: 12 },
      ];
      localStorage.setItem("studexUsers", JSON.stringify(users));
    }

    const found = users.find((u: any) => u.id === id);
    setUser(found || null);
  }, [id]);

  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("") || "??";

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/20">
            <Users className="w-16 h-16 text-white/30" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white mb-2">User Not Found</h2>
            <p className="text-white/60">This user may have been removed or never existed.</p>
          </div>
          <button
            onClick={() => router.push("/admin/users")}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 mx-auto"
          >
            <Users className="w-6 h-6" />
            Back to All Users
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-black text-white">User Profile</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 pt-4 pb-32 space-y-6">

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-teal-600 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl">
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white">{user.name}</h2>
              <p className="text-purple-300 text-lg font-medium flex items-center gap-2 mt-1">
                <Mail className="w-5 h-5" /> {user.email}
              </p>
              <p className="text-white/60 text-sm font-mono mt-1">{user.matric}</p>
            </div>
            <div className={`px-5 py-3 rounded-full font-bold text-lg flex items-center gap-2 ${
              user.role === "seller"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/50"
            }`}>
              {user.role === "seller" ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <User className="w-6 h-6" />
              )}
              {user.role.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10">
              <p className="text-white/60 text-sm">Total Orders</p>
              <p className="text-4xl font-black text-emerald-400 mt-2">{user.orders || 0}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10">
              <Calendar className="w-10 h-10 mx-auto text-teal-400 mb-2" />
              <p className="text-white/60 text-sm">Joined</p>
              <p className="text-xl font-bold text-white">{user.joined}</p>
            </div>
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="space-y-4">
          <button className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            Send Warning
          </button>

          <button className="w-full py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3">
            <Ban className="w-6 h-6" />
            Ban User
          </button>

          {user.role === "seller" && (
            <button
              onClick={() => router.push(`/admin/sellers/SELL00${user.id}`)}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3"
            >
              <Eye className="w-6 h-6" />
              View Seller Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
}