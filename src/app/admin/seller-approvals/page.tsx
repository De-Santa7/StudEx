// src/app/admin/seller-approvals/page.tsx
"use client";

import { Check, X, Eye, FileText, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSellerApprovals() {
  const [applications, setApplications] = useState<any[]>([]);

  // Load real applications from localStorage (from onboarding)
  useEffect(() => {
    const saved = localStorage.getItem("sellerApplication");
    if (saved) {
      const app = JSON.parse(saved);
      setApplications([
        {
          id: 1,
          name: "Current User", // In real app: get from auth
          email: JSON.parse(localStorage.getItem("userProfile") || "{}").email || "user@lasu.edu.ng",
          submitted: new Date(app.submittedAt).toLocaleDateString(),
          status: "pending",
          docs: app.files,
        },
      ]);
    } else {
      // Fallback mock if no real application
      setApplications([
        {
          id: 1,
          name: "Chinedu Okeke",
          email: "chinedu@lasu.edu.ng",
          submitted: "2025-04-01",
          status: "pending",
          docs: { id: "id.pdf", jamb: "jamb.pdf", proof: "receipt.pdf" },
        },
      ]);
    }
  }, []);

  const approve = () => {
    // REAL APPROVAL: Update user status
    localStorage.setItem("isSeller", "true");
    localStorage.removeItem("isSellerPending");

    // Update UI
    setApplications(prev =>
      prev.map(app => ({ ...app, status: "approved" }))
    );

    // Optional: Show success
    alert("Seller approved! User can now access dashboard.");
  };

  const reject = () => {
    localStorage.removeItem("isSellerPending");
    localStorage.removeItem("sellerApplication");

    setApplications(prev =>
      prev.map(app => ({ ...app, status: "rejected" }))
    );

    alert("Application rejected.");
  };

  return (
    <>
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4">
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Seller Approvals</h1>
        </div>
      </div>

      <div className="p-4 pb-24">
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-surface rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold" style={{ color: "#7C3AED" }}>{app.name}</p>
                  <p className="text-sm text-gray-600">{app.email}</p>
                  <p className="text-xs text-gray-500">Submitted: {app.submitted}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(app.docs).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded">
                    <FileText className="w-3 h-3" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              {app.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={approve}
                    className="flex-1 py-2 rounded-xl font-bold text-white flex items-center justify-center gap-1 transition-all"
                    style={{ backgroundColor: "#14B8A6" }}
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={reject}
                    className="flex-1 py-2 rounded-xl font-bold text-white flex items-center justify-center gap-1 transition-all"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {applications.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No pending applications</p>
        )}
      </div>
    </>
  );
}