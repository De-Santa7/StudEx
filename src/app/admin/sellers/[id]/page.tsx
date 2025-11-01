// src/app/admin/sellers/[id]/page.tsx
"use client";

import { ChevronLeft, Landmark, DollarSign, CheckCircle, Clock, AlertCircle, ArrowRight, User, Store, Calendar, Package } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSellerProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [seller, setSeller] = useState<any>(null);
  const [bank, setBank] = useState<any>(null);
  const [releasing, setReleasing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // Find seller from mock list
    const mockSellers = [
      {
        id: "SELL001",
        name: "Amaka Bello",
        email: "amaka@lasu.edu.ng",
        joinDate: "2025-03-10",
        totalProducts: 12,
        status: "verified",
        avatar: "A",
        campus: "LASU Gate",
        totalSales: 1240,
        rating: 4.9,
        pendingPayout: 42000,
      },
      {
        id: "SELL002",
        name: "Chinedu Okeke",
        email: "chinedu@lasu.edu.ng",
        joinDate: "2025-05-02",
        totalProducts: 4,
        status: "pending",
        avatar: "C",
        campus: "Faculty of Arts",
        totalSales: 567,
        rating: 4.7,
        pendingPayout: 15000,
      },
      {
        id: "SELL003",
        name: "Kemi Johnson",
        email: "kemi@lasu.edu.ng",
        joinDate: "2025-04-18",
        totalProducts: 9,
        status: "verified",
        avatar: "K",
        campus: "Hostel Block C",
        totalSales: 890,
        rating: 4.8,
        pendingPayout: 28000,
      },
    ];

    const found = mockSellers.find(s => s.id === id);
    setSeller(found);

    // Load bank from localStorage
    const savedBank = localStorage.getItem("sellerBank");
    if (savedBank) {
      setBank(JSON.parse(savedBank));
    }

    // Mock payout history
    setHistory([
      { date: "2025-10-28", amount: 35000, status: "completed" },
      { date: "2025-10-15", amount: 28000, status: "completed" },
      { date: "2025-10-01", amount: 42000, status: "pending" },
    ]);
  }, [id]);

  const handleReleasePayment = () => {
    if (!bank) return;
    setReleasing(true);
    setTimeout(() => {
      alert(`₦${seller.pendingPayout.toLocaleString()} released to ${bank.accountName}`);
      setReleasing(false);
      // Update history
      setHistory([
        { date: new Date().toISOString().split("T")[0], amount: seller.pendingPayout, status: "completed" },
        ...history.slice(0, -1)
      ]);
    }, 1500);
  };

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl" style={{ color: "#7C3AED" }}>Seller not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="text-primary">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>
            Seller Profile
          </h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-32 space-y-6">
        {/* Seller Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border flex items-start gap-3">
          <div className="bg-purple-100 text-purple-600 w-12 h-12 flex items-center justify-center rounded-full">
            <Store className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-800">{seller.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                seller.status === "verified"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {seller.status === "verified" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {seller.status.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
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

        {/* Escrow Summary */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-5 text-white shadow">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5" />
            <p className="font-semibold">Escrow Balance</p>
          </div>
          <p className="text-3xl font-bold">₦{seller.pendingPayout.toLocaleString()}</p>
          <p className="text-sm opacity-90">Ready for release</p>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5" style={{ color: "#7C3AED" }} />
            <h3 className="font-semibold" style={{ color: "#7C3AED" }}>Payout Details</h3>
            {bank && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          {bank ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bank</span>
                <span className="font-medium">{bank.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name</span>
                <span className="font-medium">{bank.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number</span>
                <span className="font-medium">{bank.accountNumber}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Seller has not added bank details</p>
            </div>
          )}
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <h3 className="font-semibold mb-3" style={{ color: "#7C3AED" }}>Recent Payouts</h3>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">₦{h.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{h.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  h.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {h.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Release Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <button
            onClick={handleReleasePayment}
            disabled={!bank || releasing}
            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
              bank && !releasing
                ? "bg-teal-500 hover:bg-teal-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {releasing ? (
              <>Processing...</>
            ) : bank ? (
              <>
                <DollarSign className="w-5 h-5" />
                Release ₦{seller.pendingPayout.toLocaleString()}
              </>
            ) : (
              "Bank Details Required"
            )}
          </button>
        </div>
      </div>
    </>
  );
}