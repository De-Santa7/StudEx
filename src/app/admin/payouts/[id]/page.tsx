// src/app/admin/payouts/[id]/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Landmark,
  ArrowRight,
  Package,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PayoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [payout, setPayout] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [bank, setBank] = useState<any>(null);
  const [releasing, setReleasing] = useState(false);
  const [otherPayouts, setOtherPayouts] = useState<any[]>([]);

  useEffect(() => {
    const allPayouts = JSON.parse(localStorage.getItem("adminPayouts") || "[]");
    const found = allPayouts.find((p: any) => p.id === id);
    setPayout(found);

    if (found) {
      const sellerKey = `seller_${found.sellerId}`;
      const savedSeller = localStorage.getItem(sellerKey);
      if (savedSeller) {
        const sellerData = JSON.parse(savedSeller);
        setSeller(sellerData);

        const bankKey = `bank_${found.sellerId}`;
        const savedBank = localStorage.getItem(bankKey);
        if (savedBank) setBank(JSON.parse(savedBank));
      }

      const sellerPayouts = allPayouts.filter((p: any) => p.sellerId === found.sellerId && p.id !== id);
      setOtherPayouts(sellerPayouts);
    }
  }, [id]);

  const handleReleasePayment = () => {
    if (!payout || payout.status !== "pending" || !bank) return;

    setReleasing(true);
    setTimeout(() => {
      const allPayouts = JSON.parse(localStorage.getItem("adminPayouts") || "[]");
      const updatedPayouts = allPayouts.map((p: any) =>
        p.id === payout.id ? { ...p, status: "completed" } : p
      );
      localStorage.setItem("adminPayouts", JSON.stringify(updatedPayouts));

      if (seller) {
        const updatedSeller = {
          ...seller,
          pendingPayout: Math.max(0, (seller.pendingPayout || 0) - payout.amount),
        };
        localStorage.setItem(`seller_${payout.sellerId}`, JSON.stringify(updatedSeller));
        setSeller(updatedSeller);
      }

      setPayout({ ...payout, status: "completed" });
      setReleasing(false);
      alert(`₦${payout.amount.toLocaleString()} released successfully`);
    }, 1500);
  };

  const getInitials = (name: string) => name?.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "??";

  if (!payout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
          <AlertCircle className="w-20 h-20 mx-auto text-white/20" />
          <h2 className="text-3xl font-black text-white">Payout Not Found</h2>
          <button
            onClick={() => router.push("/admin/payouts")}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black rounded-2xl shadow-2xl"
          >
            Back to Payouts
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-xl transition">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-black text-white">Payout • {payout.id}</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 pt-4 pb-32 space-y-6">

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-7 text-white shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8" />
            <p className="text-lg font-bold">Payout Amount</p>
          </div>
          <p className="text-5xl font-black">₦{payout.amount.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-3">
            <div className={`px-5 py-2 rounded-full font-bold flex items-center gap-2 ${
              payout.status === "pending"
                ? "bg-amber-500/30 text-amber-300 border border-amber-500/50"
                : payout.status === "completed"
                ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
                : "bg-red-500/30 text-red-300 border border-red-500/50"
            }`}>
              {payout.status === "pending" && <Clock className="w-5 h-5" />}
              {payout.status === "completed" && <CheckCircle className="w-5 h-5" />}
              {payout.status === "failed" && <AlertTriangle className="w-5 h-5" />}
              {payout.status.toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* SELLER */}
        {seller && (
          <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-teal-600 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl">
                {getInitials(seller.name)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-white">{seller.name}</h2>
                <p className="text-purple-300 text-lg flex items-center gap-2 mt-1">
                  <User className="w-5 h-5" /> {seller.email}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-white/60">Joined</p>
                    <p className="text-white font-bold">{seller.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 flex items-center gap-1">
                      <Package className="w-5 h-5" /> Products
                    </p>
                    <p className="text-white font-bold">{seller.totalProducts}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* BANK */}
        <motion.div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <Landmark className="w-7 h-7 text-purple-400" />
            <h3 className="text-xl font-black text-white">Bank Details</h3>
            {bank && <CheckCircle className="w-7 h-7 text-emerald-400 ml-auto" />}
          </div>
          {bank ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Bank</p>
                  <p className="text-white font-bold text-lg">{bank.bankName}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Account Name</p>
                  <p className="text-white font-bold text-lg">{bank.accountName}</p>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-sm">Account Number</p>
                <p className="text-white font-mono text-2xl tracking-wider">{bank.accountNumber}</p>
              </div>
            </div>
          ) : (
            <p className="text-white/60 text-center py-8">No bank details</p>
          )}
        </motion.div>

        {/* RELEASE BUTTON */}
        {payout.status === "pending" && (
          <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-xl z-50">
            <button
              onClick={handleReleasePayment}
              disabled={!bank || releasing}
              className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3 ${
                bank && !releasing
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/50"
                  : "bg-white/20 text-white/50"
              }`}
            >
              {releasing ? "Releasing..." : <>Release ₦{payout.amount.toLocaleString()}</>}
            </button>
          </div>
        )}
      </div>
    </>
  );
}