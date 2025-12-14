// src/app/seller/payouts/page.tsx
"use client";

import { ChevronLeft, CheckCircle, AlertCircle, TrendingUp, Calendar, Clock, DollarSign, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  status: "in_escrow" | "released" | "withdrawn";
  buyerName: string;
  serviceName: string;
}

export default function SellerPayouts() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [inEscrow, setInEscrow] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    // Load from unified wallet (same as Account page)
    const balance = localStorage.getItem("walletBalance");
    const escrow = localStorage.getItem("walletInEscrow");
    const earned = localStorage.getItem("totalEarned");
    const withdrawn = localStorage.getItem("totalWithdrawn");

    setWalletBalance(balance ? parseFloat(balance) : 0);
    setInEscrow(escrow ? parseFloat(escrow) : 0);
    setTotalEarned(earned ? parseFloat(earned) : 0);
    setTotalWithdrawn(withdrawn ? parseFloat(withdrawn) : 0);

    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem("sellerTransactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Mock data
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          orderId: "ORD-001",
          amount: 15000,
          date: "2025-12-10",
          status: "released",
          buyerName: "Chinedu Okafor",
          serviceName: "Hair Braiding",
        },
        {
          id: "2",
          orderId: "ORD-002",
          amount: 8000,
          date: "2025-12-09",
          status: "in_escrow",
          buyerName: "Amara Johnson",
          serviceName: "Laundry Service",
        },
        {
          id: "3",
          orderId: "ORD-003",
          amount: 20000,
          date: "2025-12-05",
          status: "withdrawn",
          buyerName: "Zainab Hassan",
          serviceName: "Food Catering",
        },
      ];
      setTransactions(mockTransactions);
      localStorage.setItem("sellerTransactions", JSON.stringify(mockTransactions));
    }
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "released":
        return "bg-emerald-100 text-emerald-800";
      case "in_escrow":
        return "bg-amber-100 text-amber-800";
      case "withdrawn":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "released":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "in_escrow":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "withdrawn":
        return <DollarSign className="w-5 h-5 text-purple-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link href="/seller">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-purple-100 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </motion.button>
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Payout History
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 pb-32 space-y-6 max-w-4xl mx-auto">
        {/* WALLET OVERVIEW CARD */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="w-6 h-6" />
            <span className="font-bold text-sm opacity-90">Your Earnings</span>
          </div>

          <div className="mb-6">
            <p className="text-sm opacity-80">Current Balance</p>
            <p className="text-4xl font-black">₦{walletBalance.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-1">Ready to use or withdraw</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-75 mb-1">In Escrow</p>
              <p className="text-lg font-bold">₦{inEscrow.toLocaleString()}</p>
              <p className="text-xs opacity-75 mt-1">Waiting for buyer confirmation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-75 mb-1">Total Earned</p>
              <p className="text-lg font-bold">₦{totalEarned.toLocaleString()}</p>
              <p className="text-xs opacity-75 mt-1">All time earnings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-75 mb-1">Withdrawn</p>
              <p className="text-lg font-bold">₦{totalWithdrawn.toLocaleString()}</p>
              <p className="text-xs opacity-75 mt-1">To your bank</p>
            </div>
          </div>

          {/* Action Button */}
          <Link href="/wallet/withdraw" className="block mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Withdraw to Bank
            </motion.button>
          </Link>
        </motion.div>

        {/* TRANSACTION HISTORY */}
        <motion.div {...fadeInUp}>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Transaction History
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold">No transactions yet</p>
              <p className="text-sm text-gray-500">Your sales will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn, i) => (
                <motion.button
                  key={txn.id}
                  onClick={() => setSelectedTransaction(txn)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left"
                >
                  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        txn.status === "released"
                          ? "bg-emerald-100"
                          : txn.status === "in_escrow"
                          ? "bg-amber-100"
                          : "bg-purple-100"
                      }`}>
                        {getStatusIcon(txn.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">₦{txn.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">{txn.serviceName}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(txn.date).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                      txn.status
                    )}`}>
                      {txn.status === "released"
                        ? "Released"
                        : txn.status === "in_escrow"
                        ? "In Escrow"
                        : "Withdrawn"}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* INFO BOX */}
        <motion.div {...fadeInUp} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800">
            <span className="font-bold">💡 How it works:</span> When a buyer purchases your service, the money goes to escrow. Once they confirm receipt, it's released to your wallet. You can then withdraw to your bank anytime.
          </p>
        </motion.div>
      </div>

      {/* TRANSACTION DETAIL MODAL */}
      {selectedTransaction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-black text-gray-800 mb-4">Transaction Details</h3>

            <div className="space-y-4">
              {/* Amount */}
              <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-3xl font-black text-gray-800">
                  ₦{selectedTransaction.amount.toLocaleString()}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Service</p>
                  <p className="font-bold text-gray-800">{selectedTransaction.serviceName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Date</p>
                  <p className="font-bold text-gray-800">
                    {new Date(selectedTransaction.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Buyer</p>
                  <p className="font-bold text-gray-800 text-xs">{selectedTransaction.buyerName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Order ID</p>
                  <p className="font-bold text-gray-800 text-xs">{selectedTransaction.orderId}</p>
                </div>
              </div>

              {/* Status Info */}
              <div className={`rounded-xl p-3 text-center ${
                selectedTransaction.status === "released"
                  ? "bg-emerald-50"
                  : selectedTransaction.status === "in_escrow"
                  ? "bg-amber-50"
                  : "bg-purple-50"
              }`}>
                <p className={`text-xs font-bold ${
                  selectedTransaction.status === "released"
                    ? "text-emerald-800"
                    : selectedTransaction.status === "in_escrow"
                    ? "text-amber-800"
                    : "text-purple-800"
                }`}>
                  {selectedTransaction.status === "released"
                    ? "✓ Released to your wallet"
                    : selectedTransaction.status === "in_escrow"
                    ? "⏳ Waiting for buyer confirmation"
                    : "💳 Transferred to your bank"}
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTransaction(null)}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3 max-w-5xl mx-auto">
          <Link href="/" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/categories" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Shop</span>
          </Link>
          <Link href="/cart" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Cart</span>
          </Link>
          <Link href="/wishlist" className="text-gray-500 hover:text-purple-600 transition">
            <span className="text-xs font-semibold">Wishlist</span>
          </Link>
          <Link href="/seller" className="text-teal-600 font-bold transition">
            <span className="text-xs">Seller</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}