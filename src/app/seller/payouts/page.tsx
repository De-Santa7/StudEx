// src/app/seller/payouts/page.tsx
"use client";

import { Landmark, DollarSign, ChevronLeft, CheckCircle, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SellerPayouts() {
  const [bank, setBank] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedBank = localStorage.getItem("sellerBank");
    if (savedBank) {
      setBank(JSON.parse(savedBank));
      setSaved(true);
    }
  }, []);

  const handleChange = (e: any) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    localStorage.setItem("sellerBank", JSON.stringify(bank));
    setSaved(true);
    setEditing(false);
    alert("Bank details saved!");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          {/* FIXED: Back to /seller */}
          <Link href="/seller" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Payouts</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-2xl p-6 text-white">
          <p className="text-sm opacity-90">Total Earned</p>
          <p className="text-3xl font-bold">₦184,000</p>
          <div className="bg-white/20 rounded-xl p-3 mt-3">
            <p className="text-sm">Pending Payout</p>
            <p className="text-2xl font-bold">₦42,000</p>
          </div>
        </div>

        {/* Bank Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5" style={{ color: "#7C3AED" }} />
            <h2 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Bank Details</h2>
            {saved && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          {saved && !editing ? (
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-600">Bank:</span> {bank.bankName}</p>
              <p><span className="text-gray-600">Account Name:</span> {bank.accountName}</p>
              <p><span className="text-gray-600">Account Number:</span> {bank.accountNumber}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 flex items-center gap-2 text-purple-600 font-semibold"
              >
                <Pencil className="w-4 h-4" /> Edit Bank Info
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3">
              <input
                name="bankName"
                placeholder="Bank Name"
                value={bank.bankName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: "#7C3AED" }}
                required
              />
              <input
                name="accountName"
                placeholder="Account Name"
                value={bank.accountName}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: "#7C3AED" }}
                required
              />
              <input
                name="accountNumber"
                placeholder="Account Number"
                value={bank.accountNumber}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border"
                style={{ borderColor: "#7C3AED" }}
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-500 text-white font-bold"
              >
                Save Bank Details
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}