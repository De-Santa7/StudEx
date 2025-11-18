// src/app/seller/payouts/page.tsx
"use client";

import { Landmark, DollarSign, ChevronLeft, CheckCircle, Pencil, TrendingUp, Calendar, Clock, Receipt, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Payout {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "completed";
  type: "payout";
  reference: string;
  method: string;
  fee: number;
  net: number;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export default function SellerPayouts() {
  const [bank, setBank] = useState<BankDetails>({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  useEffect(() => {
    // Load & Migrate Bank Details
    const savedBank = localStorage.getItem("sellerBank");
    if (savedBank) {
      const parsed = JSON.parse(savedBank);
      setBank(parsed);
      setSaved(true);
    }

    // Load & Migrate Payouts
    const savedPayouts = localStorage.getItem("sellerPayouts");
    if (savedPayouts) {
      const parsed = JSON.parse(savedPayouts);
      const upgraded = parsed.map((p: any): Payout => ({
        id: p.id || Date.now().toString(),
        amount: p.amount || 0,
        date: p.date || new Date().toISOString().split("T")[0],
        status: p.status || "pending",
        type: "payout",
        reference: p.reference || `PAY-${new Date(p.date || Date.now()).getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
        method: p.method || "Bank Transfer",
        fee: p.fee ?? Math.floor((p.amount || 0) * 0.005), // 0.5% fee
        net: p.net ?? (p.amount || 0) - (p.fee ?? Math.floor((p.amount || 0) * 0.005)),
      }));
      setPayouts(upgraded);
      localStorage.setItem("sellerPayouts", JSON.stringify(upgraded));
    } else {
      // Mock Nigerian-Realistic Data
      const mock: Payout[] = [
        {
          id: "1",
          amount: 42000,
          date: "2025-11-10",
          status: "completed",
          type: "payout",
          reference: "PAY-2025-11-001",
          method: "Bank Transfer",
          fee: 250,
          net: 41750,
        },
        {
          id: "2",
          amount: 28000,
          date: "2025-10-25",
          status: "completed",
          type: "payout",
          reference: "PAY-2025-10-002",
          method: "Bank Transfer",
          fee: 200,
          net: 27800,
        },
        {
          id: "3",
          amount: 15000,
          date: "2025-10-15",
          status: "pending",
          type: "payout",
          reference: "PAY-2025-10-003",
          method: "Bank Transfer",
          fee: 150,
          net: 14850,
        },
      ];
      setPayouts(mock);
      localStorage.setItem("sellerPayouts", JSON.stringify(mock));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sellerBank", JSON.stringify(bank));
    setSaved(true);
    setEditing(false);
  };

  const totalEarned = payouts.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayout = payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const paidOut = totalEarned - pendingPayout;

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

  return (
    <>
      {/* TOP BAR — BIG LOGO */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/seller" className="text-purple-600">
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
            Payouts
          </h1>
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6">
        {/* EARNINGS HERO */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <p className="text-sm opacity-90">Total Earned</p>
            <p className="text-4xl font-black">₦{totalEarned.toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <p className="text-sm">Pending</p>
                </div>
                <p className="text-2xl font-bold">₦{pendingPayout.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <p className="text-sm">Paid Out</p>
                </div>
                <p className="text-2xl font-bold">₦{paidOut.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-end gap-1 h-12 mt-5">
              {[45, 68, 55, 82, 78, 92, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-white/40 rounded-t-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* BANK DETAILS */}
        <motion.div {...fadeInUp} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Landmark className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-black text-gray-800">Bank Details</h2>
            </div>
            {saved && <CheckCircle className="w-6 h-6 text-emerald-500" />}
          </div>

          {saved && !editing ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bank</span>
                <span className="font-bold text-gray-800">{bank.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name</span>
                <span className="font-bold text-gray-800">{bank.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number</span>
                <span className="font-bold text-gray-800">{bank.accountNumber}</span>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full py-3 bg-purple-100 text-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit Bank Info
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <input
                name="bankName"
                placeholder="Bank Name (e.g. GTBank)"
                value={bank.bankName}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all"
                style={{ borderColor: bank.bankName ? "#7C3AED" : "#d1d5db" }}
                required
              />
              <input
                name="accountName"
                placeholder="Account Name"
                value={bank.accountName}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all"
                style={{ borderColor: bank.accountName ? "#7C3AED" : "#d1d5db" }}
                required
              />
              <input
                name="accountNumber"
                placeholder="Account Number"
                value={bank.accountNumber}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all"
                style={{ borderColor: bank.accountNumber ? "#7C3AED" : "#d1d5db" }}
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-xl font-black shadow-lg"
                >
                  Save Details
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-black"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </motion.div>

        {/* PAYOUT HISTORY — CLICKABLE */}
        <motion.div {...fadeInUp}>
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Payout History
          </h2>
          <div className="space-y-3">
            {payouts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No payouts yet. Keep selling!</p>
            ) : (
              payouts.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => setSelectedPayout(p)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left"
                >
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-sm border border-white/30 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        p.status === "completed" ? "bg-emerald-100" : "bg-amber-100"
                      }`}>
                        {p.status === "completed" ? (
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">₦{p.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(p.date).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      p.status === "completed" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {p.status === "completed" ? "Paid" : "Pending"}
                    </span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* PAYOUT DETAIL MODAL — BULLETPROOF */}
      {selectedPayout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPayout(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                <Receipt className="w-6 h-6 text-purple-600" />
                Payout Receipt
              </h3>
              <button
                onClick={() => setSelectedPayout(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Gross Amount</p>
                <p className="text-3xl font-black text-gray-800">
                  ₦{selectedPayout.amount.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-bold capitalize">{selectedPayout.status}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-bold">
                    {new Date(selectedPayout.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Reference</p>
                  <p className="font-bold text-xs">{selectedPayout.reference}</p>
                </div>
                <div>
                  <p className="text-gray-600">Method</p>
                  <p className="font-bold">{selectedPayout.method}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gross Amount</span>
                  <span className="font-bold">₦{selectedPayout.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-bold text-red-600">
                    -₦{selectedPayout.fee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black mt-2 pt-2 border-t">
                  <span>Net Amount</span>
                  <span className="text-teal-600">
                    ₦{selectedPayout.net.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-xs font-medium text-emerald-800">
                  {selectedPayout.status === "completed"
                    ? "Successfully transferred to your bank account"
                    : "Processing — will be paid within 1–2 business days"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
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