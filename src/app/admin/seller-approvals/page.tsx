// src/app/admin/seller-approvals/page.tsx
"use client";

import { Check, X, Eye, FileText, Calendar, Download, ExternalLink, Clock, Zap, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSellerApprovals() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [isAutoApproving, setIsAutoApproving] = useState(false);
  const [autoResult, setAutoResult] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("sellerApplication");
    if (saved) {
      const app = JSON.parse(saved);
      const user = JSON.parse(localStorage.getItem("userProfile") || "{}");

      setApplications([
        {
          id: 1,
          name: user.fullName || "Current User",
          email: user.email || "user@lasu.edu.ng",
          submitted: new Date(app.submittedAt).toLocaleDateString(),
          status: "pending",
          docs: {
            admission: app.files?.admission || "admission-letter.pdf",
            jamb: app.files?.jamb || "jamb-result.pdf",
            proof: app.files?.proof || "payment-receipt.pdf",
          },
          docUrls: {
            admission: app.files?.admissionUrl || "/sample/admission-letter.jpg",
            jamb: app.files?.jambUrl || "/sample/jamb-result.jpg",
            proof: app.files?.proofUrl || "/sample/payment-receipt.jpg",
          },
        },
      ]);
    } else {
      setApplications([
        {
          id: 1,
          name: "Chinedu Okeke",
          email: "chinedu@lasu.edu.ng",
          submitted: "2025-04-01",
          status: "pending",
          docs: {
            admission: "admission-letter.pdf",
            jamb: "jamb-result.pdf",
            proof: "payment-receipt.pdf",
          },
          docUrls: {
            admission: "/sample/admission-letter.jpg",
            jamb: "/sample/jamb-result.jpg",
            proof: "/sample/payment-receipt.jpg",
          },
        },
      ]);
    }
  }, []);

  // AUTO-APPROVAL WITH GEMINI VISION
  const autoApproveWithAI = async () => {
    setIsAutoApproving(true);
    setAutoResult({ status: "idle", message: "" });

    try {
      const app = applications[0];
      const { docUrls } = app;

      const mockValidation = await mockGeminiVision(docUrls);

      if (mockValidation.approved) {
        localStorage.setItem("isSeller", "true");
        localStorage.removeItem("isSellerPending");
        localStorage.removeItem("sellerApplication");

        setApplications(prev => prev.map(a => ({ ...a, status: "approved" })));

        setAutoResult({
          status: "success",
          message: `Auto-approved! Reason: ${mockValidation.reason}`,
        });
      } else {
        setAutoResult({
          status: "error",
          message: `Auto-rejected: ${mockValidation.reason}`,
        });
      }
    } catch {
      setAutoResult({
        status: "error",
        message: "AI validation failed. Try again.",
      });
    } finally {
      setIsAutoApproving(false);
    }
  };

  const mockGeminiVision = async (urls: any): Promise<{ approved: boolean; reason: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const isValid = Math.random() > 0.2;

    if (isValid) {
      return {
        approved: true,
        reason: "All documents verified: LASU student, valid JAMB, payment confirmed.",
      };
    } else {
      const reasons = [
        "JAMB score below threshold",
        "Admission letter not from LASU",
        "Payment receipt missing bank stamp",
        "ID photo does not match",
      ];
      return {
        approved: false,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
      };
    }
  };

  const approve = () => {
    localStorage.setItem("isSeller", "true");
    localStorage.removeItem("isSellerPending");
    localStorage.removeItem("sellerApplication");

    setApplications(prev => prev.map(app => ({ ...app, status: "approved" })));
    alert("Seller approved manually!");
  };

  const reject = () => {
    localStorage.removeItem("isSellerPending");
    localStorage.removeItem("sellerApplication");

    setApplications(prev => prev.map(app => ({ ...app, status: "rejected" })));
    alert("Application rejected.");
  };

  const downloadFile = (filename: string) => {
    alert(`Downloading ${filename}...`);
  };

  return (
    <>
      {/* Top Bar with Back Button */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="p-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <FileText className="w-6 h-6" />
            Seller Approvals
          </h1>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-6">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No pending applications</p>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl p-5 shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-lg" style={{ color: "#7C3AED" }}>
                    {app.name}
                  </p>
                  <p className="text-sm text-gray-600">{app.email}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    Submitted: {app.submitted}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    app.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {app.status === "pending" ? (
                    <Clock className="w-4 h-4" />
                  ) : app.status === "approved" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  {app.status.toUpperCase()}
                </span>
              </div>

              {app.status === "pending" && (
                <div className="mb-5 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <p className="font-bold text-purple-800">AI Auto-Approval</p>
                    </div>
                    <button
                      onClick={autoApproveWithAI}
                      disabled={isAutoApproving}
                      className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-1"
                    >
                      {isAutoApproving ? "..." : "Run AI"}
                    </button>
                  </div>
                  {autoResult.status !== "idle" && (
                    <p
                      className={`text-xs mt-2 ${
                        autoResult.status === "success" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {autoResult.message}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3 mb-5">
                <p className="text-sm font-semibold" style={{ color: "#7C3AED" }}>
                  Uploaded Documents
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(app.docs).map(([key, filename]: [string, any]) => {
                    const label =
                      key === "admission"
                        ? "Admission Letter"
                        : key === "jamb"
                        ? "JAMB Result"
                        : "Proof of Payment";
                    const url = app.docUrls[key];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium">{label}</p>
                            <p className="text-xs text-gray-500">{filename}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadFile(filename)}
                            className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => window.open(url, "_blank")}
                            className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                            title="View"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {app.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={approve}
                    className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg"
                    style={{ backgroundColor: "#14B8A6" }}
                  >
                    <Check className="w-5 h-5" />
                    Approve Manually
                  </button>
                  <button
                    onClick={reject}
                    className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <div className="text-primary font-bold"><span className="text-xs">Approvals</span></div>
          <Link href="/admin/sellers" className="text-primary/60"><span className="text-xs">Sellers</span></Link>
          <Link href="/admin" className="text-primary/60"><span className="text-xs">Dashboard</span></Link>
        </div>
      </div>
    </>
  );
}
