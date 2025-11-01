// src/app/admin/payouts/[id]/page.tsx
"use client";

import { ChevronLeft, DollarSign, CheckCircle, Clock, AlertCircle, User, Calendar, Landmark, ArrowRight, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PayoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [payout, setPayout] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [bank, setBank] = useState<any>(null);
  const [releasing, setReleasing] = useState(false);
  const [otherPayouts, setOtherPayouts] = useState<any[]>([]);

  useEffect(() => {
    // Load payout
    const allPayouts = JSON.parse(localStorage.getItem("adminPayouts") || "[]");
    const found = allPayouts.find((p: any) => p.id === id);
    setPayout(found);

    if (found) {
      // Load seller
      const sellerKey = `seller_${found.sellerId}`;
      const savedSeller = localStorage.getItem(sellerKey);
      if (savedSeller) {
        const sellerData = JSON.parse(savedSeller);
        setSeller(sellerData);

        // Load seller-specific bank
        const bankKey = `bank_${found.sellerId}`;
        const savedBank = localStorage.getItem(bankKey);
        if (savedBank) {
          setBank(JSON.parse(savedBank));
        }
      }

      // Load other payouts for this seller
      const sellerPayouts = allPayouts.filter((p: any) => p.sellerId === found.sellerId && p.id !== id);
      setOtherPayouts(sellerPayouts);
    }
  }, [id]);

  const handleReleasePayment = () => {
    if (!payout || payout.status !== "pending" || !bank || !seller) return;
    setReleasing(true);

    setTimeout(() => {
      // Update payout
      const updatedPayout = { ...payout, status: "completed" };
      const allPayouts = JSON.parse(localStorage.getItem("adminPayouts") || "[]");
      const newAll = allPayouts.map((p: any) => (p.id === payout.id ? updatedPayout : p));
      localStorage.setItem("adminPayouts", JSON.stringify(newAll));

      // Update seller escrow
      const updatedSeller = { ...seller, pendingPayout: Math.max(0, seller.pendingPayout - payout.amount) };
      localStorage.setItem(`seller_${payout.sellerId}`, JSON.stringify(updatedSeller));

      setPayout(updatedPayout);
      setSeller(updatedSeller);
      setReleasing(false);

      alert(`₦${payout.amount.toLocaleString()} released to ${bank.accountName}`);
    }, 1200);
  };

  const getStatusBadge = (status: string) => {
    const base = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold";
    switch (status) {
      case "completed": return `${base} bg-green-100 text-green-700`;
      case "pending": return `${base} bg-yellow-100 text-yellow-700`;
      case "failed": return `${base} bg-red-100 text-red-700`;
      default: return `${base} bg-gray-100 text-gray-700`;
    }
  };

  if (!payout) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <p className="text-xl" style={{ color: "#7C3AED" }}>Payout not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-1">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>
            Payout — {payout.id}
          </h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-6 pb-32 space-y-6 bg-gray-50 min-h-screen">
        {/* Payout Amount */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-5 h-5" />
            <p className="font-semibold">Payout Amount</p>
          </div>
          <p className="text-3xl font-bold">₦{payout.amount.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-1">
            {payout.status === "pending" ? "Ready for release" : payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
          </p>
        </div>

        {/* Seller Card */}
        {seller && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {seller.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold" style={{ color: "#7C3AED" }}>{seller.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    seller.status === "verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {seller.status === "verified" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {seller.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <User className="w-3 h-3" /> {seller.email}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Joined: {seller.joinDate}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Package className="w-3 h-3" /> {seller.totalProducts} products
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-4" style={{ color: "#7C3AED" }}>Transaction Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Payout ID</p>
              <p className="font-medium">{payout.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Date</p>
              <p className="font-medium">{payout.date}</p>
            </div>
            <div>
              <p className="text-gray-600">Transaction ID</p>
              <p className="font-medium">{payout.transactionId}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className={getStatusBadge(payout.status)}>
                {payout.status === "pending" && <Clock className="w-3 h-3" />}
                {payout.status === "completed" && <CheckCircle className="w-3 h-3" />}
                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5" style={{ color: "#7C3AED" }} />
            <h3 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Payout Destination</h3>
            {bank && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          {bank ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Bank</p>
                <p className="font-medium">{bank.bankName}</p>
              </div>
              <div>
                <p className="text-gray-600">Account Name</p>
                <p className="font-medium">{bank.accountName}</p>
              </div>
              <div>
                <p className="text-gray-600">Account Number</p>
                <p className="font-medium">{bank.accountNumber}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Seller has not added bank details</p>
            </div>
          )}
        </div>

        {/* Other Payouts */}
        {otherPayouts.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-4" style={{ color: "#7C3AED" }}>Other Payouts</h3>
            <div className="space-y-3">
              {otherPayouts.map((p: any) => (
                <Link key={p.id} href={`/admin/payouts/${p.id}`}>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        p.status === "completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {p.status === "completed" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">₦{p.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{p.date}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Release Button */}
        {payout.status === "pending" && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
            <button
              onClick={handleReleasePayment}
              disabled={!bank || releasing}
              className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                bank && !releasing
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {releasing ? (
                <>Processing...</>
              ) : (
                <>
                  <DollarSign className="w-5 h-5" />
                  Release ₦{payout.amount.toLocaleString()}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}