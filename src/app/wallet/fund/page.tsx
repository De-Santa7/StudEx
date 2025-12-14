// src/app/wallet/fund/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, CreditCard, Shield, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PaystackHook = dynamic(
  () => import("react-paystack").then((mod) => mod.usePaystackPayment),
  { ssr: false }
);

export default function FundWalletPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isPaystackReady, setIsPaystackReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const amountInKobo = (selectedAmount || parseInt(amount) || 0) * 100;

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@studex.com",
    amount: amountInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePaymentRef = useRef<any>(null);

  useEffect(() => {
    // Load current wallet balance
    const balance = localStorage.getItem("walletBalance");
    setCurrentBalance(balance ? parseFloat(balance) : 0);

    // Load Paystack
    const loadPaystack = async () => {
      if (typeof window === "undefined") return;
      const PaystackFunction = await import("react-paystack").then(
        (mod) => mod.usePaystackPayment
      );
      initializePaymentRef.current = PaystackFunction(config);
      setIsPaystackReady(true);
    };
    loadPaystack();
  }, [amountInKobo]);

  const handlePayment = useCallback(() => {
    const finalAmount = selectedAmount || parseInt(amount);
    
    if (!finalAmount || finalAmount < 100) {
      alert("Minimum amount is ₦100");
      return;
    }

    if (!isPaystackReady || !initializePaymentRef.current) {
      alert("Payment system loading...");
      return;
    }

    setIsProcessing(true);

    initializePaymentRef.current({
      onSuccess: (reference: any) => {
        // Add amount to wallet balance
        const newBalance = currentBalance + finalAmount;
        localStorage.setItem("walletBalance", newBalance.toString());
        
        // Save transaction
        const transactions = JSON.parse(localStorage.getItem("walletTransactions") || "[]");
        transactions.push({
          id: reference.reference,
          type: "credit",
          amount: finalAmount,
          date: new Date().toISOString(),
          status: "success",
          description: "Wallet funded via card"
        });
        localStorage.setItem("walletTransactions", JSON.stringify(transactions));

        alert(`Success! ₦${finalAmount.toLocaleString()} added to your wallet`);
        router.push("/account");
      },
      onClose: () => {
        setIsProcessing(false);
        alert("Payment cancelled");
      },
    });
  }, [isPaystackReady, amount, selectedAmount, currentBalance, router]);

  const selectQuickAmount = (amt: number) => {
    setSelectedAmount(amt);
    setAmount(amt.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50">
      {/* HEADER */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-50 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-purple-100 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6 text-purple-600" />
            </motion.button>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Fund Wallet
            </h1>
            <p className="text-xs text-gray-600">Add money to your wallet</p>
          </div>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-6 pb-24 max-w-3xl mx-auto space-y-6">

        {/* CURRENT BALANCE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <p className="text-sm opacity-90 mb-2">Current Balance</p>
          <p className="text-4xl font-black">₦{currentBalance.toLocaleString()}</p>
        </motion.div>

        {/* QUICK AMOUNTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-black text-gray-900 mb-4">Quick Add</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((amt) => (
              <motion.button
                key={amt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectQuickAmount(amt)}
                className={`py-4 rounded-xl font-bold transition-all ${
                  selectedAmount === amt
                    ? "bg-gradient-to-r from-purple-600 to-teal-600 text-white shadow-lg"
                    : "bg-white text-gray-800 shadow-md hover:shadow-lg"
                }`}
              >
                ₦{amt.toLocaleString()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CUSTOM AMOUNT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <label className="block text-sm font-bold text-purple-700 mb-3">
            Or Enter Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-4 text-purple-600 font-bold text-xl">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedAmount(null);
              }}
              placeholder="Enter amount"
              className="w-full pl-12 pr-4 py-4 text-2xl font-black border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
              min="100"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">Minimum: ₦100</p>
        </motion.div>

        {/* PAYMENT METHOD INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-black text-gray-900">Card Payment</p>
              <p className="text-xs text-gray-600">Secured by Paystack</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold">VISA</div>
            <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold">MASTERCARD</div>
            <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold">VERVE</div>
          </div>
        </motion.div>

        {/* SECURITY BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-5 border-2 border-purple-200"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <Shield className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-700">Secure</p>
            </div>
            <div className="text-center">
              <Zap className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-700">Instant</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-700">Verified</p>
            </div>
          </div>
        </motion.div>

        {/* PAY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={!isPaystackReady || isProcessing || (!selectedAmount && !amount)}
          className={`w-full py-5 rounded-2xl font-black text-xl text-white shadow-2xl flex items-center justify-center gap-3 ${
            !isPaystackReady || isProcessing || (!selectedAmount && !amount)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-teal-600"
          }`}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Wallet className="w-6 h-6" />
              </motion.div>
              Processing...
            </>
          ) : !isPaystackReady ? (
            <>
              <Shield className="w-6 h-6" />
              Loading Secure Payment...
            </>
          ) : (
            <>
              <Wallet className="w-6 h-6" />
              Add ₦{(selectedAmount || parseInt(amount) || 0).toLocaleString()}
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-600">
          Your payment is secured by Paystack. Funds reflect instantly.
        </p>
      </div>
    </div>
  );
}