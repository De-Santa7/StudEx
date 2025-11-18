// src/app/admin/seller-approvals/page.tsx
"use client";

import { motion } from "framer-motion";
import { Check, X, Eye, FileText, Calendar, Download, ExternalLink, Clock, Zap, ArrowLeft, UserCheck, School } from "lucide-react";
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
    const user = JSON.parse(localStorage.getItem("userProfile") || "{}");

    if (saved) {
      const app = JSON.parse(saved);
      setApplications([
        {
          id: 1,
          name: user.fullName || "Victor Osahon",
          email: user.email || "victor@pau.edu.ng",
          matric: user.matricNumber || "PAU20231234",
          submitted: new Date(app.submittedAt || Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          status: "pending",
          docs: {
            admission: app.files?.admission || "admission-letter.pdf",
            idCard: app.files?.idCard || "student-id-card.pdf",
          },
          docUrls: {
            admission: app.files?.admissionUrl || "/sample/pau-admission-letter.jpg",
            idCard: app.files?.idCardUrl || "/sample/pau-student-id.jpg",
          },
        },
      ]);
    } else {
      // Mock data if none exists
      setApplications([
        {
          id: 1,
          name: "Chinaza Okonkwo",
          email: "chinaza@pau.edu.ng",
          matric: "PAU20237890",
          submitted: "April 5, 2025",
          status: "pending",
          docs: {
            admission: "admission-letter.pdf",
            idCard: "student-id-card.pdf",
          },
          docUrls: {
            admission: "/sample/pau-admission-letter.jpg",
            idCard: "/sample/pau-student-id.jpg",
          },
        },
      ]);
    }
  }, []);

  // MOCK AI VERIFICATION (Simulates Gemini Vision)
  const autoApproveWithAI = async () => {
    setIsAutoApproving(true);
    setAutoResult({ status: "idle", message: "" });

    await new Promise(resolve => setTimeout(resolve, 2800));

    const approved = Math.random() > 0.25;

    if (approved) {
      localStorage.setItem("isSeller", "true");
      localStorage.removeItem("isSellerPending");
      localStorage.removeItem("sellerApplication");

      setApplications(prev => prev.map(a => ({ ...a, status: "approved" })));

      setAutoResult({
        status: "success",
        message: "AI VERIFIED: PAU student confirmed. Admission letter & ID card match.",
      });
    } else {
      const reasons = [
        "Student ID photo does not match face",
        "Name on admission letter doesn't match ID",
        "ID card expired or fake watermark detected",
        "Not a current PAU student",
      ];
      setAutoResult({
        status: "error",
        message: `AI REJECTED: ${reasons[Math.floor(Math.random() * reasons.length)]}`,
      });
    }

    setIsAutoApproving(false);
  };

  const approve = () => {
    localStorage.setItem("isSeller", "true");
    localStorage.removeItem("isSellerPending");
    localStorage.removeItem("sellerApplication");
    setApplications(prev => prev.map(a => ({ ...a, status: "approved" })));
  };

  const reject = () => {
    localStorage.removeItem("isSellerPending");
    localStorage.removeItem("sellerApplication");
    setApplications(prev => prev.map(a => ({ ...a, status: "rejected" })));
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between p-5">
          <button
            onClick={() => router.back()}
            className="text-white hover:bg-white/10 p-3 rounded-xl transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-purple-400" />
            Seller Approvals
          </h1>
          <div className="w-12" />
        </div>
      </motion.div>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 pb-32 space-y-6">

        {applications.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <School className="w-20 h-20 mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-lg">No pending applications</p>
            <p className="text-white/40 text-sm mt-2">All sellers verified</p>
          </motion.div>
        ) : (
          applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
            >
              {/* Applicant Info */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white">{app.name}</h3>
                  <p className="text-purple-300 font-medium">{app.email}</p>
                  <p className="text-white/60 text-sm flex items-center gap-2 mt-1">
                    <span className="font-mono bg-white/10 px-2 py-1 rounded">{app.matric}</span>
                  </p>
                  <p className="text-white/50 text-sm flex items-center gap-2 mt-3">
                    <Calendar className="w-4 h-4" />
                    Submitted on {app.submitted}
                  </p>
                </div>

                <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${
                  app.status === "pending" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50" :
                  app.status === "approved" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50" :
                  "bg-red-500/20 text-red-300 border border-red-500/50"
                }`}>
                  {app.status === "pending" ? <Clock className="w-5 h-5" /> :
                   app.status === "approved" ? <Check className="w-5 h-5" /> :
                   <X className="w-5 h-5" />}
                  {app.status.toUpperCase()}
                </div>
              </div>

              {/* AI Auto-Approval */}
              {app.status === "pending" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-6 p-5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-7 h-7 text-purple-400 animate-pulse" />
                      <div>
                        <p className="text-white font-bold text-lg">AI Verification</p>
                        <p className="text-white/70 text-sm">Powered by Gemini Vision</p>
                      </div>
                    </div>
                    <button
                      onClick={autoApproveWithAI}
                      disabled={isAutoApproving}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                    >
                      {isAutoApproving ? "Analyzing..." : "Run AI Check"}
                    </button>
                  </div>
                  {autoResult.status !== "idle" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm mt-3 font-medium ${autoResult.status === "success" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {autoResult.message}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* Documents */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-3">Submitted Documents</h4>
                {Object.entries(app.docs).map(([key, filename]: [string, any]) => {
                  const label = key === "admission" ? "Admission Letter" : "Student ID Card";
                  const icon = key === "admission" ? <FileText /> : <School />;
                  const url = app.docUrls[key];

                  return (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 rounded-2xl p-4 flex items-center justify-between border border-white/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-teal-600 rounded-xl flex items-center justify-center">
                          {icon}
                        </div>
                        <div>
                          <p className="text-white font-bold">{label}</p>
                          <p className="text-white/60 text-sm">{filename}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => window.open(url, "_blank")}
                          className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition">
                          <Download className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {app.status === "pending" && (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={approve}
                    className="flex-1 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-lg rounded-2xl hover:shadow-xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3"
                  >
                    <Check className="w-7 h-7" />
                    Approve Seller
                  </button>
                  <button
                    onClick={reject}
                    className="flex-1 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-lg rounded-2xl hover:shadow-xl hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3"
                  >
                    <X className="w-7 h-7" />
                    Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}