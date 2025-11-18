// src/app/admin/payouts/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  DollarSign,
  CheckCircle,
  Clock,
  Calendar,
  Search,
  Download,
  Landmark,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export default function AdminPayouts() {
  const router = useRouter();
  const [payouts, setPayouts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [releasingId, setReleasingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("adminPayouts");
    let loadedPayouts: any[] = [];

    if (saved) {
      loadedPayouts = JSON.parse(saved);
    } else {
      const mock = [
        {
          id: "P123",
          sellerId: "SELL001",
          seller: "Amaka Bello",
          amount: 42000,
          status: "pending",
          date: "Oct 26, 2025",
          bankName: "GTBank",
          accountNumber: "0123456789",
          accountName: "Amaka Bello",
        },
        {
          id: "P124",
          sellerId: "SELL002",
          seller: "Victor Osahon",
          amount: 15800,
          status: "pending",
          date: "Oct 27, 2025",
          bankName: "Access Bank",
          accountNumber: "0987654321",
          accountName: "Victor Osahon",
        },
        {
          id: "P125",
          sellerId: "SELL003",
          seller: "Tunde Lawal",
          amount: 5000,
          status: "failed",
          date: "Oct 25, 2025",
          bankName: "Zenith Bank",
          accountNumber: "1112223334",
          accountName: "Tunde Lawal",
        },
        {
          id: "P126",
          sellerId: "SELL004",
          seller: "Chioma Eze",
          amount: 75000,
          status: "completed",
          date: "Oct 24, 2025",
          bankName: "First Bank",
          accountNumber: "5678901234",
          accountName: "Chioma Eze",
        },
      ];
      localStorage.setItem("adminPayouts", JSON.stringify(mock));
      loadedPayouts = mock;
    }

    setPayouts(loadedPayouts);
  }, []);

  const filteredPayouts = useMemo(() => {
    if (!searchQuery.trim()) return payouts;
    const q = searchQuery.toLowerCase();
    return payouts.filter(p =>
      (p.id || "").toLowerCase().includes(q) ||
      (p.seller || "").toLowerCase().includes(q) ||
      p.amount.toString().includes(q) ||
      (p.bankName || "").toLowerCase().includes(q) ||
      (p.accountNumber || "").includes(q)
    );
  }, [payouts, searchQuery]);

  const totalPending = filteredPayouts
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const releasePayment = (payoutId: string) => {
    setReleasingId(payoutId);
    setTimeout(() => {
      const updated = payouts.map(p =>
        p.id === payoutId ? { ...p, status: "completed" } : p
      );
      setPayouts(updated);
      localStorage.setItem("adminPayouts", JSON.stringify(updated));
      alert(`Payment released successfully`);
      setReleasingId(null);
    }, 1500);
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "??";
    return name.trim().split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

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
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-black text-white">Payouts</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search payout ID, seller, bank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 pt-4 pb-32 space-y-6">

        {/* ESCROW CARD */}
        <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-bold flex items-center gap-2">
                <DollarSign className="w-7 h-7" /> Pending Payout
              </p>
              <p className="text-4xl font-black mt-2">₦{totalPending.toLocaleString()}</p>
              <p className="text-white/80 text-sm mt-1">
                {filteredPayouts.filter(p => p.status === "pending").length} requests
              </p>
            </div>
            <button
              onClick={() => {
                const headers = ["ID","Seller","Amount","Status","Date","Bank","Account"];
                const rows = filteredPayouts.map(p => [p.id,p.seller,p.amount,p.status,p.date,p.bankName,p.accountNumber]);
                const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `payouts-${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
              }}
              className="px-5 py-3 bg-white/20 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/30 transition"
            >
              <Download className="w-5 h-5" /> Export
            </button>
          </div>
        </motion.div>

        {/* PAYOUTS LIST — CLICKABLE CARDS */}
        <div className="space-y-4">
          {filteredPayouts.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 mx-auto text-white/20" />
              <p className="text-white/60 mt-4">No payouts found</p>
            </div>
          ) : (
            filteredPayouts.map((payout, i) => (
              <motion.div
                key={payout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => router.push(`/admin/payouts/${payout.id}`)} // CLICKABLE!
                className="bg-white/5 backdrop-blur-xl rounded-2xl p- p-5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-teal-600 rounded-2xl flex items-center justify-center text-xl font-black text-white">
                      {getInitials(payout.seller)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{payout.seller || "Unknown"}</h3>
                      <p className="text-purple-300 text-sm font-mono">{payout.id}</p>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${
                    payout.status === "pending" ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : payout.status === "completed" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "bg-red-500/20 text-red-300 border border-red-500/50"
                  }`}>
                    {payout.status === "pending" && <Clock className="w-5 h-5" />}
                    {payout.status === "completed" && <CheckCircle className="w-5 h-5" />}
                    {payout.status === "failed" && <AlertCircle className="w-5 h-5" />}
                    {payout.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-5 text-sm">
                  <div>
                    <p className="text-white/60">Amount</p>
                    <p className="text-2xl font-black text-emerald-400">₦{payout.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 flex items-center gap-1">
                      <Landmark className="w-4 h-4" /> Bank
                    </p>
                    <p className="text-white font-medium">{payout.bankName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 flex items-center justify-end gap-1">
                      <Calendar className="w-4 h-4" /> {payout.date}
                    </p>
                  </div>
                </div>

                {payout.status === "pending" ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        releasePayment(payout.id);
                      }}
                      disabled={releasingId === payout.id}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition"
                    >
                      {releasingId === payout.id ? "Releasing..." : "Release Payment"}
                    </button>
                    <ArrowRight className="w-6 h-6 text-white/40" />
                  </div>
                ) : (
                  <div className="flex items-center justify-end">
                    <span className="text-white/60 text-sm">Tap to view details</span>
                    <ArrowRight className="w-6 h-6 text-white/40 ml-2" />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
}