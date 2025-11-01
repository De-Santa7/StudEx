// src/app/admin/payouts/page.tsx
"use client";

import { ChevronLeft, DollarSign, CheckCircle, Clock, User, Calendar, ArrowRight, Search, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function AdminPayouts() {
  const router = useRouter();
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          seller: "John Doe",
          amount: 15000,
          status: "pending",
          date: "2025-10-26",
          transactionId: "TXN-PY12345",
          bankName: "GTBank",
          accountNumber: "0123456789",
          accountName: "John Doe",
        },
        {
          id: "P124",
          sellerId: "SELL002",
          seller: "Jane Smith",
          amount: 8500,
          status: "pending",
          date: "2025-10-27",
          transactionId: "TXN-PY12456",
          bankName: "Access Bank",
          accountNumber: "0987654321",
          accountName: "Jane Smith",
        },
        {
          id: "P125",
          sellerId: "SELL003",
          seller: "Daniel Lee",
          amount: 5000,
          status: "failed",
          date: "2025-10-25",
          transactionId: "TXN-PY12567",
          bankName: "Zenith Bank",
          accountNumber: "1112223334",
          accountName: "Daniel Lee",
        },
        {
          id: "P126",
          sellerId: "SELL004",
          seller: "Amaka Bello",
          amount: 42000,
          status: "completed",
          date: "2025-10-24",
          transactionId: "TXN-PY12678",
          bankName: "First Bank",
          accountNumber: "5678901234",
          accountName: "Amaka Bello",
        },
      ];
      localStorage.setItem("adminPayouts", JSON.stringify(mock));
      loadedPayouts = mock;
    }

    setPayouts(loadedPayouts);

    // Create seller profiles if not exist
    setTimeout(() => {
      loadedPayouts.forEach((p: any) => {
        const sellerKey = `seller_${p.sellerId}`;
        if (localStorage.getItem(sellerKey)) return;

        const name = p.seller?.trim() || "Unknown Seller";
        const email = `${name.toLowerCase().replace(/\s+/g, ".")}@lasu.edu.ng`;

        const mockSeller = {
          id: p.sellerId,
          name,
          email,
          joinDate: "2025-03-10",
          totalProducts: 10,
          status: "verified",
          avatar: name.charAt(0).toUpperCase(),
          campus: "LASU Gate",
          totalSales: 1200,
          rating: 4.8,
          pendingPayout: p.status === "pending" ? p.amount : 0,
        };

        localStorage.setItem(sellerKey, JSON.stringify(mockSeller));
      });
    }, 100);
  }, []);

  // BULLETPROOF SEARCH
  const filteredPayouts = useMemo(() => {
    if (!searchQuery.trim()) return payouts;

    const query = searchQuery.toLowerCase().trim();

    return payouts.filter((p) => {
      const id = (p.id ?? "").toString().toLowerCase();
      const seller = (p.seller ?? "").toString().toLowerCase();
      const amount = (p.amount ?? "").toString();
      const date = (p.date ?? "").toString();
      const bankName = (p.bankName ?? "").toString().toLowerCase();
      const accountNumber = (p.accountNumber ?? "").toString();
      const transactionId = (p.transactionId ?? "").toString().toLowerCase();

      return (
        id.includes(query) ||
        seller.includes(query) ||
        amount.includes(query) ||
        date.includes(query) ||
        bankName.includes(query) ||
        accountNumber.includes(query) ||
        transactionId.includes(query)
      );
    });
  }, [payouts, searchQuery]);

  // EXPORT TO CSV
  const exportToCSV = () => {
    if (filteredPayouts.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Payout ID",
      "Seller",
      "Amount",
      "Status",
      "Date",
      "Bank",
      "Account Number",
      "Transaction ID"
    ];

    const rows = filteredPayouts.map(p => [
      p.id,
      p.seller || "",
      p.amount,
      p.status,
      p.date,
      p.bankName || "",
      p.accountNumber || "",
      p.transactionId || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `payouts-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const releasePayment = async (payoutId: string) => {
    setLoading(true);
    const payout = payouts.find(p => p.id === payoutId);
    if (!payout) return;

    await new Promise(resolve => setTimeout(resolve, 800));

    const updatedPayouts = payouts.map(p =>
      p.id === payoutId ? { ...p, status: "completed" } : p
    );

    setPayouts(updatedPayouts);
    localStorage.setItem("adminPayouts", JSON.stringify(updatedPayouts));

    const sellerKey = `seller_${payout.sellerId}`;
    const sellerData = JSON.parse(localStorage.getItem(sellerKey) || "{}");
    if (sellerData.pendingPayout !== undefined) {
      sellerData.pendingPayout = Math.max(0, sellerData.pendingPayout - payout.amount);
      localStorage.setItem(sellerKey, JSON.stringify(sellerData));
    }

    alert(`₦${payout.amount.toLocaleString()} released to ${payout.accountName}`);
    setLoading(false);
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

  const totalEscrow = filteredPayouts
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-1">
            <ChevronLeft className="w-6 h-6" style={{ color: "#7C3AED" }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>
            Payouts
          </h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-6 pb-32 space-y-6 bg-gray-50 min-h-screen">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, seller, amount, date, bank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Escrow Summary */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-5 h-5" />
            <p className="text-sm opacity-90">Total Escrow Balance</p>
          </div>
          <p className="text-3xl font-bold">₦{totalEscrow.toLocaleString()}</p>
          <p className="text-sm opacity-80 mt-1">
            {filteredPayouts.filter(p => p.status === "pending").length} pending
          </p>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export to CSV
          </button>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-sm text-gray-600">
            Found <strong>{filteredPayouts.length}</strong> payout{filteredPayouts.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Payouts List */}
        <div className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold" style={{ color: "#7C3AED" }}>
                All Payouts
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="p-3">Payout ID</th>
                    <th className="p-3">Seller</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        No payouts found
                      </td>
                    </tr>
                  ) : (
                    filteredPayouts.map((payout) => (
                      <tr key={payout.id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3 text-sm font-medium">{payout.id}</td>
                        <td className="p-3">
                          <Link href={`/admin/sellers/${payout.sellerId}`}>
                            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-sm font-medium underline text-purple-700">
                                {payout.seller}
                              </span>
                            </div>
                          </Link>
                        </td>
                        <td className="p-3 text-sm font-bold text-teal-600">
                          ₦{payout.amount.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span className={getStatusBadge(payout.status)}>
                            {payout.status === "pending" && <Clock className="w-3 h-3" />}
                            {payout.status === "completed" && <CheckCircle className="w-3 h-3" />}
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {payout.date}
                          </div>
                        </td>
                        <td className="p-3">
                          {payout.status === "pending" ? (
                            <button
                              onClick={() => releasePayment(payout.id)}
                              disabled={loading}
                              className="px-3 py-1.5 bg-teal-500 text-white text-xs font-bold rounded-lg hover:bg-teal-600 transition shadow-sm disabled:opacity-50"
                            >
                              {loading ? "..." : "Release"}
                            </button>
                          ) : (
                            <Link href={`/admin/payouts/${payout.id}`}>
                              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition">
                                View
                              </button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredPayouts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-gray-500">
                No payouts found
              </div>
            ) : (
              filteredPayouts.map((payout) => (
                <div key={payout.id} className="bg-white rounded-2xl p-4 shadow-sm border">
                  <div className="flex items-start justify-between mb-3">
                    <Link href={`/admin/sellers/${payout.sellerId}`} className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-purple-700 underline">{payout.seller}</p>
                        <p className="text-xs text-gray-500">{payout.id}</p>
                      </div>
                    </Link>
                    <span className={getStatusBadge(payout.status)}>
                      {payout.status === "pending" && <Clock className="w-3 h-3" />}
                      {payout.status === "completed" && <CheckCircle className="w-3 h-3" />}
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-lg font-bold text-teal-600">
                        ₦{payout.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {payout.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {payout.status === "pending" ? (
                      <button
                        onClick={() => releasePayment(payout.id)}
                        disabled={loading}
                        className="w-full py-2 bg-teal-500 text-white rounded-xl font-bold text-sm hover:bg-teal-600 transition disabled:opacity-50"
                      >
                        {loading ? "Releasing..." : "Release Payment"}
                      </button>
                    ) : (
                      <Link href={`/admin/payouts/${payout.id}`}>
                        <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition flex items-center justify-center gap-1">
                          View Details <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="flex justify-around py-2">
          <Link href="/admin" className="text-primary/60"><span className="text-xs">Dashboard</span></Link>
          <Link href="/admin/sellers" className="text-primary/60"><span className="text-xs">Sellers</span></Link>
          <div className="text-primary font-bold"><span className="text-xs">Payouts</span></div>
          <Link href="/admin/orders" className="text-primary/60"><span className="text-xs">Orders</span></Link>
        </div>
      </div>
    </>
  );
}